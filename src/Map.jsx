import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '70vw',
  height: '80vh',
  position: "fixed",
  bottom: 10, 
  left: 20
}

const center = {
  lat: 43.072028,
  lng: -89.40747
}

function Map() {
  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  })

  const [events, setEvents] = useState([]); 

    useEffect(() => {
      fetch("../events.json")  
        .then(response => response.json())
        .then(data => {
          setEvents(data)
          console.log(data)
          console.log(data.latitude)
          console.log(data.longitude)
          console.log(typeof(data.latitude))
        })
        .catch(error => console.error("Error fetching events:", error));
    }, []);

//   const resetToStartingLocation = () => {
//     if (map) {
//       map.panTo(currentCenter);
//       map.setZoom(16);
//     }
//   };

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    // map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >

      {events.map((event, index) => (
        <Marker
          key={index}
          position={{ lat: parseFloat(event.latitude), lng: parseFloat(event.longitude)}}
          title={event.title}
        />
      ))}
      <></>
    </GoogleMap>
  ) : (
    <p>Loading!</p>
  )
}

export default Map