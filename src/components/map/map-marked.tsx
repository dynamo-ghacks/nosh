"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { googleMapsConfig } from "../../utils/googleMapsConfig";

const options = {
  disableDefaultUI: true,
  mapTypeControl: false,
  streetViewControl: false,
};

const MapMarked = ({
  center,
  containerStyle,
}: {
  center: {
    lat: number;
    lng: number;
  };
  containerStyle: React.CSSProperties;
}) => {
  return (
    <LoadScript googleMapsApiKey={""}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={options}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapMarked;
