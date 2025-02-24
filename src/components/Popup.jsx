import React, { useState } from "react";
import { InfoWindow } from "@react-google-maps/api";
import { Button } from "react-bootstrap";
import Banner  from "./Banner.jsx"

const Popup = ({ marker, onClose }) => {  
  if (!marker) return "";

  const [showBanner, setShowBanner] = useState(false);

  const handleMoreDetails = () => {
    setShowBanner(true);
  }

  
  return showBanner ? (
    <Banner marker = {marker} onClose = {() => setShowBanner(false)}/>
  ) : (
    marker && <InfoWindow
      position={{ lat: marker.latitude, lng: marker.longitude }}
      onCloseClick={onClose}
      options={{ pixelOffset: new window.google.maps.Size(0, -30) }} 
    >
      <>
      <h6>{marker.title}</h6>
      <Button 
        title="More Details" 
        style={{ backgroundColor: "red", color: "white", borderColor: "red", fontSize: "12px", padding: "5px 10px" }}
        onClick={ handleMoreDetails}
      >
        More Details
      </Button>
      </>
    </InfoWindow>
  );
};

export default Popup;