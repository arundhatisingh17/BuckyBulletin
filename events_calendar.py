from flask import Flask, request, jsonify
from selenium import webdriver
from dotenv import load_dotenv
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import requests
import googlemaps
import re
import json
import os
import time
import schedule
from flask_cors import CORS, cross_origin


app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})  # Allow all origins



present_date = datetime.today().strftime("%Y-%m-%d")

chrome_options = Options()
chrome_options.add_argument("--headless")  
chrome_options.add_argument("--disable-gpu")  
chrome_options.add_argument("--no-sandbox")  
chrome_options.add_argument("--disable-dev-shm-usage")  
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options = chrome_options)

load_dotenv()
API_KEY = os.getenv("VITE_GOOGLE_MAPS_API_KEY")
gmaps = googlemaps.Client(key=API_KEY)


@app.route("/api/date", methods=["POST"])
@cross_origin()
def set_date():

    if request.method == "OPTIONS":
        return jsonify({}), 200

    data = request.get_json()
    print(data)

    if "selected_date" in data:
        present_date = data["selected_date"]
        scrape_events(present_date)

        return jsonify({"message": "Date has been updated successfully"})
    else:
        return jsonify({"error": "Invalid Date"})
    


def get_30_days():
    dates = []
    for i in range(30):
        date_today = (datetime.today() + timedelta(days=i)).strftime("%Y-%m-%d")
        dates.append(date_today)
    return dates 

    

# scraping the events taking place on present_date
def scrape_events(present_date):

    json_filename = f"events_{present_date}.json"

    if os.path.exists(os.path.join("json_folder",json_filename)):
        print(f"Skipping scrape: {json_filename} already exists.")
        return

    url = f"https://today.wisc.edu/events/day/{present_date}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    events = soup.select("li.event-row")

    events_list = []

    for event in events:
        title_element = event.select_one("h3.event-title a")
        title = title_element.text.strip()

        event_link = title_element["href"] if title_element else None
        
        if event_link:
            if event_link.startswith("/events/view/"):
                event_url = "https://today.wisc.edu" + event_link
            else:
                event_url = event_link

        driver.get(event_url)
        time.sleep(1)  # Wait for the page to load

        event_stuff = BeautifulSoup(driver.page_source, "html.parser")

        description_element = event_stuff.select_one("div.event-description")
        event_description = description_element.get_text(strip=True) if description_element else event_url

        tag_elements = event_stuff.select("ul.event-tags li a")
        event_tags = [tag.text.strip() for tag in tag_elements] if tag_elements else []

        location_elements= event.select_one("p.event-location")

        if (location_elements):
            location_elements = location_elements.get_text(strip=True)
            geocoded_location = gmaps.geocode(location_elements + ", Madison, Wisconsin")
            if (geocoded_location):
                lat = geocoded_location[0]['geometry']['location']['lat']
                lon = geocoded_location[0]['geometry']['location']['lng']
            else:
                # default lat/lng for UW Madison
                lat = 43.0731
                lon = -89.4012 
        time_elements = event.select("p.event-time span.time-hm")
        time_values = [t.get_text(strip=True) for t in time_elements]

        
        am_pm_element = event.select("p.event-time")
        am_pm_list = []

        if am_pm_element:
            full_time_text = am_pm_element[0].get_text(separator=" ", strip=True)
            am_pm_matches = re.findall(r"(a\.m\.|p\.m\.)", full_time_text, re.IGNORECASE)
            am_pm_list.append(am_pm_matches)

        if time_values:
            if (len(time_values) == 1):
                assigned_am_pm = am_pm_matches[0] if am_pm_matches else ""
                start_time = f"{time_values[0]}{assigned_am_pm}"
                end_time = ""

            elif len(time_values) == 2:
                if (len(am_pm_matches) == 1):
                    assigned_am_pm = am_pm_matches[0] if am_pm_matches else ""
                    start_am_pm = assigned_am_pm
                    end_am_pm = assigned_am_pm
                
                elif (len(am_pm_matches) == 2):
                    start_am_pm, end_am_pm = am_pm_matches

                else:
                    start_am_pm = end_am_pm = ""

                start_time = f"{time_values[0]}{start_am_pm}"
                end_time = f"{time_values[1]}{end_am_pm}"

        else:
            start_time = "All Day!"
            end_time = None


    
        event_data = {
            "title" : title,
            "location" : location_elements,
            "start_time" : start_time,
            "end_time" : end_time,
            "latitude": lat,
            "longitude": lon,
            "description": event_description,
            "tags": event_tags,
        }

        events_list.append(event_data)


    # if 'events.json' in os.listdir("./"):
    #     os.remove("events.json")

    json_path = os.path.join("json_folder", json_filename)
        
    with open(json_path, "w") as json_file:
        json.dump(events_list, json_file, indent=4, ensure_ascii=False)


# schedule.every().day.at("00:00").do(scrape_events)


def schedule_scraping():
    dates = get_30_days()
    for date in dates:
        json_filename = f"events_{date}.json"
        json_path = os.path.join("json_folder", json_filename)

        if os.path.exists(json_path):
            os.remove(json_path)
            scrape_events(date)

        else:
            scrape_events(date)
           


if __name__ == "__main__":
    schedule_scraping()
    schedule.every().day.at("00:00").do(schedule_scraping)

    print("Scheduler is running, scraping will occur at midnight daily.")

    while True:
        schedule.run_pending()
        time.sleep(60)  

    # app.run(debug=True, port=5000)

# if __name__ == "__main__":
#     while True:
#         schedule.run_pending()
#         time.sleep(1)

# if __name__ == "__main__":
#     scrape_events()
