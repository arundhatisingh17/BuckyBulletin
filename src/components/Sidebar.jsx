import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";

const Sidebar = ({ events, onEventClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(!isMobile); // Open by default on desktop

  // Update layout when window resizes
  useEffect(() => {
    const handleResize = () => {
      const mobileCheck = window.innerWidth < 768;
      setIsMobile(mobileCheck);
      setIsOpen(!mobileCheck); // Keep open by default on desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Toggle Button (Hidden When Sidebar is Open) */}
      {!isOpen && (
        <Button
          style={styles.toggleButton}
          onClick={() => setIsOpen(true)}
        >
          ☰ Events
        </Button>
      )}

      {/* Sidebar Container */}
      <div
        style={{
          ...styles.sidebar,
          ...(isMobile ? styles.mobileSidebar : {}),
          transform: isOpen ? "translateX(0)" : (isMobile ? "translateY(-100%)" : "translateX(-100%)"),
        }}
      >
        {/* Close Button (Always Visible Now) */}
        <Button
          style={styles.closeButton}
          onClick={() => setIsOpen(false)}
        >
          <span style={{ color: "black" }}>✖ Close</span>
        </Button>

        <h3 className="mt-3">Events</h3>
        <ListGroup variant="flush">
          {events.map((event, index) => (
            <ListGroup.Item
              key={index}
              style={{
                ...styles.eventItem,
                ...(hoveredIndex === index ? styles.eventItemHover : {}),
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                onEventClick({ lat: parseFloat(event.latitude), lng: parseFloat(event.longitude) });
                if (isMobile) setIsOpen(false); // Auto-close on mobile after selection
              }}
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
      </div>
    </>
  );
};

const styles = {
  toggleButton: {
    position: "fixed",
    left: "10px",
    top: "10px",
    zIndex: 1100,
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  closeButton: {
    position: "absolute",
    right: "15px",
    top: "10px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
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
    transition: "transform 0.3s ease-in-out",
  },
  mobileSidebar: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "#f8f9fa",
    borderRight: "none",
    textAlign: "center",
  },
  eventItem: {
    padding: "12px",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  },
  eventItemHover: {
    backgroundColor: "#e9ecef",
  },
};

export default Sidebar;