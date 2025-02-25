import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";

const Sidebar = ({ events, onEventClick, setIsSidebarOpen }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(!isMobile); // Open by default on desktop

  useEffect(() => {
    const handleResize = () => {
      const mobileCheck = window.innerWidth < 768;
      setIsMobile(mobileCheck);
      setIsOpen(!mobileCheck);
      setIsSidebarOpen(!mobileCheck); // Sync state with App
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(isOpen);
  }, [isOpen, setIsSidebarOpen]);

  // Dynamic button styles based on screen size
  const getToggleButtonStyle = () => {
    return isMobile
      ? {
          ...styles.toggleButton,
          fontSize: "12px", // Smaller font size
          padding: "6px 10px", // Reduce padding
          top: "50px", // Move down slightly to avoid title overlap
        }
      : styles.toggleButton;
  };

  return (
    <>
      {!isOpen && (
        <Button style={getToggleButtonStyle()} onClick={() => setIsOpen(true)}>
          ☰ Events
        </Button>
      )}

      <div
        style={{
          ...styles.sidebar,
          ...(isMobile ? styles.mobileSidebar : {}),
          transform: isOpen ? "translateX(0)" : isMobile ? "translateY(-100%)" : "translateX(-100%)",
        }}
      >
        <Button style={styles.closeButton} onClick={() => setIsOpen(false)}>
          <span style={{ color: "black" }}>✖ Close</span>
        </Button>

        <h3 className="mt-3">Events</h3>
        <ListGroup variant="flush">
          {events.map((event, index) => {
            const lat = parseFloat(event.latitude).toFixed(4);
            const lng = parseFloat(event.longitude).toFixed(4);

            const isRed = lat === "43.0722" && lng === "-89.4008";

            return (
              <ListGroup.Item
                key={index}
                style={{
                  ...styles.eventItem,
                  ...(hoveredIndex === index ? styles.eventItemHover : {}),
                  ...(isRed ? styles.eventItemRed : {}),
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  onEventClick({ lat: parseFloat(event.latitude), lng: parseFloat(event.longitude) });
                  if (isMobile) setIsOpen(false);
                }}
              >
                <strong>{event.title}</strong> <br />
                <p style={{ fontWeight: "normal", fontStyle: "italic", marginBottom: "5px" }}>{event.location}</p>
                <small style={{ color: isRed? "#D5D9DA": "#666" }}>{event.tags ? event.tags.join(", ") : "No Tags"}</small>
              </ListGroup.Item>
            );
          })}
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
    backgroundColor: "#B83F3F",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px", // Default size for desktop
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
  eventItemRed: {
    backgroundColor: "#B83F3F", 
    color: "white",
  },
};

export default Sidebar;