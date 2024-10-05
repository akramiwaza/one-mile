import React, { useState } from "react";
import { GoogleMap, LoadScript, DrawingManager } from "@react-google-maps/api";

const libraries = ["drawing"]; // Use the drawing library

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.73061,
  lng: -73.935242, // Default to New York
};

const ZoneMap = () => {
  const [coordinates, setCoordinates] = useState([]);

  // Handle the completion of the drawing (e.g., polygon)
  const handleComplete = (shape) => {
    const path = shape.getPath();
    const coords = [];
    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      coords.push({
        lat: point.lat(),
        lng: point.lng(),
      });
    }

    setCoordinates(coords);

    // Disable the drawing mode after the first shape is drawn
    shape.setMap(null); // Optionally hide the shape (you can keep it visible if you prefer)
  };

  return (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Drawing Manager */}
        <DrawingManager
          onPolygonComplete={handleComplete} // Handle when a polygon is completed
          onPolylineComplete={handleComplete} // Handle when a polyline is completed
          options={{
            drawingControl: true,
            drawingControlOptions: {
              drawingModes: ["polygon", "polyline"], // Allow the user to draw polygons or polylines
            },
            polygonOptions: {
              fillColor: "#2196F3",
              fillOpacity: 0.5,
              strokeWeight: 2,
              clickable: false,
              editable: false,
              zIndex: 1,
            },
            polylineOptions: {
              strokeColor: "#2196F3",
              strokeWeight: 2,
            },
          }}
        />
      </GoogleMap>
      <div>
        <h3>Coordinates of the Drawn Shape:</h3>
        <ul>
          {coordinates.map((coord, index) => (
            <li key={index}>
              Lat: {coord.lat}, Lng: {coord.lng}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ZoneMap;
