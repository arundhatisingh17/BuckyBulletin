import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import mapStyle from "./MapStyle.jsx";
import Popup from "./components/Popup.jsx";

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "calc(100vh - 230px)", 
  minHeight: "400px", 
  marginLeft: "8%",
  marginBottom: "20px", 
  overflow: "hidden",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
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
      {selectedMarker && <Popup marker={selectedMarker} onClose={() => setSelectedMarker(null)} />}

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