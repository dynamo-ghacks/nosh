"use client";

import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMapAPI } from "@/hooks/useGoogleMapAPI";
import { FaRegCircle } from "react-icons/fa";

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
  const { isLoaded } = useGoogleMapAPI();

  if (!isLoaded) {
    return (
      <div className="bg-gray-300 aspect-[3 / 2] rounded-lg h-[200px] w-full flex items-center justify-center">
        <FaRegCircle className="text-gray-400 text-4xl" />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      options={options}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MapMarked;
