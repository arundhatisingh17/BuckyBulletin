import { useState, useEffect } from "react";
import "./App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Map from "./Map.jsx";
import DatePicker from "./DatePicker.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date()); // ✅ Ensure correct date format

  // ✅ Format date as YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return ""; // ✅ Prevents undefined values
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    return localDate.toISOString().split("T")[0]; // ✅ Always returns YYYY-MM-DD
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const formattedDate = formatDate(selectedDate);
        const filename = `/json_folder/events_${formattedDate}.json`; // ✅ Ensure correct file path

        const response = await fetch(filename);
        const contentType = response.headers.get("content-type");

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
  }, [selectedDate]); // ✅ Re-fetch when the selected date changes

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Bucky Bulletin</title>
          <meta name="description" content="Explore UW-Madison events on an interactive map." />
        </Helmet>

        <Container fluid>
          <Row>
            {/* Sidebar (Always Visible) */}
            <Col xs={3} className="p-0">
              <Sidebar events={events} />
            </Col>

            {/* Main Content */}
            <Col xs={9} style={{ marginLeft: "250px" }}>
              <header className="text-center">
                <h1 style={{ fontSize: "55px", fontWeight: "bold" }}>𝔹𝕦𝕔𝕜𝕪 𝔹𝕦𝕝𝕝𝕖𝕥𝕚𝕟</h1>
                <p>Explore UW-Madison events on an interactive map.</p>
              </header>

              {/* Date Picker (Calendar Dropdown) */}
              <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

              {/* Map (Displays Markers Based on Selected Date) */}
              <Map events={events} />
            </Col>
          </Row>
        </Container>
      </HelmetProvider>
    </>
  );
}

export default App;