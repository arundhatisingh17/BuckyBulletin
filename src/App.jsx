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
  const [selectedDate, setSelectedDate] = useState(new Date()); // ✅ Track selected date

  // ✅ Format date as YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchEvents = () => {
      const formattedDate = formatDate(selectedDate);
      const filename = `/events_${formattedDate}.json`;

      fetch(filename)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`No events found for ${formattedDate}`);
          }
          return response.json();
        })
        .then((data) => setEvents(data))
        .catch((error) => console.error("Error fetching events:", error));
    };

    fetchEvents();
  }, [selectedDate]); 

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>WiscEvents</title>
          <meta name="description" content="Explore UW-Madison events on an interactive map." />
        </Helmet>

        <Container fluid>
          <Row>
            <Col xs={3} className="p-0">
              <Sidebar events={events} />
            </Col>

            <Col xs={9} style={{ marginLeft: "250px" }}>
              <header className="text-center">
                <h1 style={{ fontSize: "80px", fontWeight: "bold" }}>𝔹𝕦𝕔𝕜𝕪 𝔹𝕦𝕝𝕝𝕖𝕥𝕚𝕟</h1>
                <p>Explore UW-Madison events on an interactive map.</p>
              </header>

              <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
              
              <Map events={events} />
            </Col>
          </Row>
        </Container>
      </HelmetProvider>
    </>
  );
}

export default App;