import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Map from "./Map.jsx";
import DatePicker from "./DatePicker.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar default open

  const formatDate = (date) => {
    if (!date) return null;
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    return localDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const formattedDate = formatDate(selectedDate);
        const filename = `./json_folder/events_${formattedDate}.json`;

        const response = await fetch(filename);
        const contentType = response.headers.get("content-type");
        console.log(`Content-Type: ${contentType}`);

        if (!response.ok || !contentType || !contentType.includes("application/json")) {
          console.warn(`No valid JSON found at ${filename}, setting empty events.`);
          setEvents([]);
          return;
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [selectedDate]);

  const handleEventClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <Container fluid>
        <Row>
          {/* Sidebar Column - Controls Open/Close */}
          <Col xs={isSidebarOpen ? 3 : 0} className="p-0">
            <Sidebar events={events} onEventClick={handleEventClick} setIsSidebarOpen={setIsSidebarOpen} />
          </Col>

          {/* Main Content - Adjusts Width Based on Sidebar State */}
          <Col xs={isSidebarOpen ? 9 : 12} className="content">
            <header className="text-center">
              <h1 className="title">𝔹𝕦𝕔𝕜𝕪 𝔹𝕦𝕝𝕝𝕖𝕥𝕚𝕟</h1>
              <p>Explore UW-Madison events on an interactive map.</p>
            </header>

            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            <Map events={events} selectedLocation={selectedLocation} isSidebarOpen={isSidebarOpen} />
          </Col>
          <Col style={{textAlign: "center", position: "relative" }}>
            <p>Some events are online-only and do not appear on the map. These are in red on the events sidebar!</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;