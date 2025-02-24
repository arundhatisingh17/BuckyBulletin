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

  const styles = {
    container: {
      display: "flex",
      width: "100vw",
      height: "100vh", // ✅ Keeps the app within the screen
      overflow: "hidden",
      flexDirection: "column",
      justifyContent: "space-between", // ✅ Ensures elements are evenly spaced
    },
    mainContent: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      height: "100vh",
      overflow: "hidden",
      justifyContent: "center",
    },
    mapContainer: {
      flexGrow: 1,
      width: "calc(100vw - 250px)",
      height: "calc(100vh - 100px)", 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  

  // Fetch events from JSON
  useEffect(() => {
    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>WiscEvents</title>
          <meta name="description" content="Explore UW-Madison events on an interactive map." />
        </Helmet>

        <Container fluid>
          <Row>
            {/* Sidebar (Always Visible) */}
            <Col xs={3} className="p-0">
              <Sidebar events={events} />
            </Col>

            <Col xs={9} style={{ marginLeft: "250px" }}>
              <header className="text-center">
                <h1 style={{ fontSize: "80px", fontWeight: "bold" }}>𝔹𝕦𝕔𝕜𝕪 𝔹𝕦𝕝𝕝𝕖𝕥𝕚𝕟</h1>
                <p>Explore UW-Madison events on an interactive map.</p>
              </header>

              {/* Date Picker */}
              <DatePicker />

              {/* Map (Shifted Right to Make Space for Sidebar) */}
              <Map events={events} />
            </Col>
          </Row>
        </Container>
      </HelmetProvider>
    </>
  );
}

export default App;