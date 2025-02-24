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
        const filename = `public/json_folder/events_${formattedDate}.json`;

        const response = await fetch(filename);
        const contentType = response.headers.get("content-type");
        console.log(`Content-Type: ${contentType}`)

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
            <Col xs={3} className="p-0">
              <Sidebar events={events} onEventClick={handleEventClick} />
            </Col>

            <Col xs={9} style={{ marginLeft: "350px" }}>
              <header className="text-center">
                <h1 style={{ fontSize: "55px", fontWeight: "bold" }}>𝔹𝕦𝕔𝕜𝕪 𝔹𝕦𝕝𝕝𝕖𝕥𝕚𝕟</h1>
                <p>Explore UW-Madison events on an interactive map.</p>
              </header>

              <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

              <Map events={events} selectedLocation={selectedLocation} />
            </Col>
          </Row>
        </Container>
    </>
  );
}

export default App;
