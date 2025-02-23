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

const mapStyle = [
  {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#EDC79B" // Separate ground color
      },
      {
        "lightness": 15 // Keep ground bright so buildings don’t blend
      },
      {
        "gamma": 2.5 // Boosts contrast so buildings are more distinct
      },
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000" // Black outline to separate buildings
      },
      {
        "weight": 1 // Keep the outline thin
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  }
]

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
      tilt={45}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options = {{styles:mapStyle}}
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