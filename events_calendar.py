from flask import Flask, render_template
from bs4 import BeautifulSoup
from datetime import datetime
import requests
import googlemaps
import re
import json
import os
import schedule
import time


present_date = datetime.today().strftime("%Y-%m-%d")


# scraping the events taking place on present_date
def scrape_events():
    url = f"https://today.wisc.edu/events/day/{present_date}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    events = soup.select("li.event-row")

    events_list = []

    for event in events:
        title_element = event.select_one("h3.event-title a")
        title = title_element.text.strip()

        location_elements= event.select_one("p.event-location")

        if (location_elements):
            location_elements = location_elements.get_text(strip=True)


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
        }

        events_list.append(event_data)



    if 'events.json' in os.listdir("./"):
        os.remove("events.json")
        
    with open("events.json", "w") as json_file:
        json.dump(events_list, json_file, indent=4, ensure_ascii=False)

# schedule.every().day.at("00:00").do(scrape_events)


# if __name__ == "__main__":
#     while True:
#         schedule.run_pending()
#         time.sleep(1)

if __name__ == "__main__":
    scrape_events()
     

