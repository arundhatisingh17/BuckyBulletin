# Bucky Bulletin - UW-Madison Events Map  
## https://buckybulletin.netlify.app

**Bucky Bulletin** is an interactive **Google Maps** application that displays events around **UW-Madison**.  

In the hectic day-to-day life of a college student, it can be very easy to miss out on the numerous events around that take place daily. We have personally been victims to this, and this led to the decision of creating **Bucky Bulletin** - a very convenient and accessible website to map out all the events on and around campus to help you find events that align with your timings and interests.


We, personally are active members of the tech community and constantly try to maximize visiting the talks given by the various experienced and influential speakers who visit UW Madison. Frequently, we have found ourselves in the CS Building looking at a poster, getting excited, and finding the date to be a week past. We are actively trying to prevent that from happening to us and other students, and we believe this is the best way possible!


A highly intuitive and interactive map that helps you navigate around the campus, find events that coincide with your availability and are proximal, or help you make note of events that are scheduled in the future.


The idea behind adding a map is to be able to help students assess how accessible these events are at any given time, and to be able to view all these events at once and how it can align with your time. It can help increase the engagement with these events, proving beneficial to both the speakers/hosts as well as the attendees. Students can reproduce these learnings in their everyday lives, which would otherwise be highly demanding and time consuming without a handy book of events to guide them along their journey.

---

## Features  

- Displays **UW-Madison events** on an interactive map.  
- **Sidebar with event list** – Click an event to pan the map.  
- **Custom Bucky Badger markers** for each event.  
- **Date Picker** – Load events dynamically based on the selected date.  
- **Google Maps Integration** – Smooth zoom, tilt, and pan support.  
- **Automated Web Scraping** – Event data is automatically collected from UW-Madison's official event listings.  
- **Daily Data Updates** – A scheduled web scraper fetches and updates event data, generating a new JSON file (`events_YYYY-MM-DD.json`) each day.  
- **Headless Browser Support** – Uses **Selenium** with **headless Chrome** to extract event details efficiently without manual intervention.  
- **Fully Automated Backend** – The scraping script runs on a **cron job** or **serverless function**, ensuring fresh event data is always available.

---
## Setup & Installation  

### **Clone the Repository**  
```sh
git clone https://github.com/arundhatisingh17/bucky-bulletin.git
cd bucky-bulletin
npm install
npm run dev
```
### **Usage**
---
We encourage anyone, especially our fellow UW-Madison students to fork this project and implement any ideas for the benefit of the community, here at UW Madison.


## **On, Wisconsin!**

<img src="https://raw.githubusercontent.com/arundhatisingh17/BuckyBulletin/main/src/assets/BuckyBadger.png" width="200">
