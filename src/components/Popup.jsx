import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { Card } from "react-bootstrap";

const Popup = ({ marker, onClose }) => {  // Removed 'markers' and 'map' props (they are not needed here)
  if (!marker) return null;  // Prevent errors if no marker is selected

  return (
    <InfoWindow
      position={{ lat: marker.latitude, lng: marker.longitude }}
      onCloseClick={onClose}
      options={{ pixelOffset: new window.google.maps.Size(0, -30) }} // Adjusts position
    >
      <Card style={{ width: "200px", boxShadow: "0px 4px 8px rgba(0,0,0,0.2)" }}>
        <Card.Body className="p-2">
          <Card.Title style={{ fontSize: "14px", marginBottom: "4px", textAlign: "center" }}>
            {marker.title}
          </Card.Title>
          <Card.Text style={{ fontSize: "12px", marginBottom: "4px", textAlign: "center" }}>
            {marker.description}
          </Card.Text>
          <div className="d-flex justify-content-center">
            <button
              onClick={onClose}
              style={{
                background: "red",
                color: "white",
                fontSize: "10px",
                padding: "4px 8px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </Card.Body>
      </Card>
    </InfoWindow>
  );
};

export default Popup;
