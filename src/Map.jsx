import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import mapStyle from "./MapStyle.jsx";
import Popup from "./components/Popup.jsx";

const containerStyle = {
  width: "70vw",
  height: "80vh",
  position: "fixed",
  bottom: 10,
  left: 20,
};

const center = {
  lat: 43.072028,
  lng: -89.40747,
};

function Map() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [events, setEvents] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    fetch("../events.json")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      tilt={45}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ styles: mapStyle }}
    >
      {selectedMarker && <Popup marker={selectedMarker} onClose={() => setSelectedMarker(null)} />}

      {events.map((event, index) => (
        <Marker
          key={index}
          position={{ lat: parseFloat(event.latitude), lng: parseFloat(event.longitude) }}
          title={event.title}
          onClick={() => setSelectedMarker(event)} // This correctly sets the selected marker
        />
      ))}
    </GoogleMap>
  ) : (
    <p>Loading!</p>
  );
}

export default Map;