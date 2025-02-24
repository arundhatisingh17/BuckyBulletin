import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const Sidebar = ({ events, onEventClick }) => {
  return (
    <Container fluid style={styles.sidebar}>
      <Row>
        <Col>
          <h3 className="mt-3">Events</h3>
          <ListGroup variant="flush">
            {events.map((event) => (
              <ListGroup.Item
                key={event.id}
                style={styles.eventItem}
                onClick={() =>
                  onEventClick({ lat: parseFloat(event.latitude), lng: parseFloat(event.longitude) })
                }
              >
                <strong>{event.title}</strong> <br />
                <p style={{ fontWeight: "normal", fontStyle: "italic", marginBottom: "5px" }}>
                  {event.location}
                </p>
                <small style={{ color: "#666" }}>
                  {event.tags ? event.tags.join(", ") : "No Tags"}
                </small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  sidebar: {
    position: "fixed",
    left: 0,
    top: 0,
    width: "350px",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    overflowY: "auto",
    borderRight: "1px solid #ddd",
    zIndex: 1000,
    textAlign: "left",
  },
  eventItem: {
    padding: "12px",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "6px",
    cursor: "pointer", // ✅ Adds a clickable feel
    transition: "background-color 0.2s ease-in-out",
  },
  eventItemHover: {
    backgroundColor: "#e9ecef",
  },
};

export default Sidebar;