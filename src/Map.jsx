import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import mapStyle from "./MapStyle.jsx";
import Popup from "./components/Popup.jsx";

const containerStyle = {
  position: "relative", 
  width: "100%",
  height: "67vh", 
  overflow: "visible", 
};

const center = {
  lat: 43.072028,
  lng: -89.40747,
};

function Map({ events }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={18}
      tilt={45}
      options={{
        styles: mapStyle,
        fullscreenControl: false,
      }}
    >
      {/* Show Popup when a marker is clicked */}
      {selectedMarker && <Popup marker={selectedMarker} onClose={() => setSelectedMarker(null)} />}

      {/* Render all event markers */}
      {events.map((event, index) => (
        <Marker
          key={index}
          position={{ lat: parseFloat(event.latitude), lng: parseFloat(event.longitude) }}
          title={event.title}
          onClick={() => setSelectedMarker(event)}
        />
      ))}
    </GoogleMap>
  ) : (
    <p>Loading!</p>
  );
}

export default Map;