"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { googleMapsConfig } from "../../utils/googleMapsConfig";
import { env } from "@/env";

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
    <LoadScript googleMapsApiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
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
