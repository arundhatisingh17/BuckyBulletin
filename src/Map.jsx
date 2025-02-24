import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import mapStyle from "./MapStyle.jsx";
import Popup from "./components/Popup.jsx";
import BuckyBadgerIcon from "./assets/BuckyBadger.png"

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "calc(100vh - 230px)", 
  minHeight: "400px", 
  marginLeft: "-50px",
  marginBottom: "20px", 
  overflow: "hidden",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
};

const center = {
  lat: 43.072028,
  lng: -89.40747,
};

function Map({ events, selectedLocation }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapRef = useRef("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [selectedMarker, setSelectedMarker] = useState("");


  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      mapRef.current.panTo(selectedLocation);
      mapRef.current.setZoom(12);
    }
  }, [selectedLocation]);

  return isLoaded ? (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        tilt={45}
        options={{
          styles: mapStyle,
          fullscreenControl: true,
          mapTypeControl: true,
        }}
        onLoad={(map) => (mapRef.current = map)}
      >
        {selectedMarker && <Popup marker={selectedMarker} onClose={() => setSelectedMarker("")} />}

        {events.map((event, index) => (
          <Marker
            key={index}
            position={{ lat: parseFloat(event.latitude), lng: parseFloat(event.longitude) }}
            title={event.title}
            onClick={() => setSelectedMarker(event)}
            icon={{
              url: BuckyBadgerIcon, 
              scaledSize: new window.google.maps.Size(35, 45), 
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 40), 
            }}
          />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <p>Loading!</p>
  );
}

export default Map;