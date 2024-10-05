import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapPicker = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 40.73061,
    lng: -73.935242,
  }); // Default to New York

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    onLocationSelect({ lat, lng }); // Pass selected coordinates to parent component
  };

  return (
    <GoogleMap
      center={markerPosition}
      zoom={10}
      mapContainerStyle={{ width: "100%", height: "400px" }}
      onClick={handleMapClick}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  );
};

export default MapPicker;
