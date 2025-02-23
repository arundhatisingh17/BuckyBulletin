import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";

const CustomPopup = ({ markers, map }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);

  const handleMarkerClick = (marker, event) => {
    setSelectedMarker(marker);

    if (map) {
      const projection = map.getProjection();
      const pos = projection.fromLatLngToPoint(event.latLng);
      setPopupPosition({ x: pos.x, y: pos.y });
    }
  };

  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          onClick={(event) => handleMarkerClick(marker, event)}
        />
      ))}

      {selectedMarker && popupPosition && (
        <div
          style={{
            position: "absolute",
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y - 40}px`,
            transform: "translate(-50%, -100%)",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            fontSize: "12px",
            textAlign: "center",
            minWidth: "120px",
            zIndex: 1000,
          }}
        >
          <strong>{selectedMarker.title}</strong>
          <p style={{ margin: "4px 0", fontSize: "10px" }}>{selectedMarker.description}</p>
          <button
            onClick={() => setSelectedMarker(null)}
            style={{
              background: "red",
              color: "white",
              fontSize: "10px",
              padding: "2px 6px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default CustomPopup;