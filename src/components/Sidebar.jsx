import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const Sidebar = ({ events }) => {
  return (
    <Container fluid style={styles.sidebar}>
      <Row>
        <Col>
          <h3 className="mt-3">Events</h3>
          <ListGroup variant="flush">
            {events.map((event) => (
              <ListGroup.Item key={event.id} style={styles.eventItem}>
                <strong>{event.title}</strong> <br />
                {event.tags ? event.tags.join(", ") : "No Tags"}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

// ✅ Sidebar Styles (Always Visible)
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
    direction: "rtl",
    textAlign: "left",
  },
  eventItem: {
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "5px",
    direction: "ltr", 
  },
};

export default Sidebar;