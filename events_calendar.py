from flask import Flask, render_template
from bs4 import BeautifulSoup
from datetime import datetime
import requests
import googlemaps

app = Flask(__name__)

present_date = datetime.today().strftime("%Y-%m-%d")


# scraping the events taking place on present_date
def scrape_events():
    url = "https://today.wisc.edu/events/day/{present_date}"
    response = requests.get(url)
    soup = BeautifulSoup(response.txt, "html.parser")