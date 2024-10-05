import GoogleMapReact from "google-map-react";
import RoomIcon from "@mui/icons-material/Room";
import { useState } from "react";
import Autocomplete from "react-google-autocomplete";

const MarkerIconComponent = () => (
  <div>
    <RoomIcon />
  </div>
);

const GoogleMapCoponent = ({ values }) => {
  const [center, setCenter] = useState({
    lat: 33.88174543657033,
    lng: 35.50695910405766,
  });

  return (
    <>
      <Autocomplete
        apiKey={"AIzaSyBPy52rLwmQUXLYHhTx6aO3bwaIeE7RmU0"}
        onPlaceSelected={(place) => console.log(place)}
      />

      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBPy52rLwmQUXLYHhTx6aO3bwaIeE7RmU0" }}
        defaultCenter={
          values.lat
            ? {
                lat: values.lat,
                lng: values.lng,
              }
            : center.center
        }
        defaultZoom={center.zoom}
      >
        {values.lat && values.lng && (
          <MarkerIconComponent
            lat={values.lat ? values.lat : center.lat}
            lng={values.lng ? values.lng : center.lng}
            text={""}
          />
        )}
      </GoogleMapReact>
    </>
  );
};
export default GoogleMapCoponent;
