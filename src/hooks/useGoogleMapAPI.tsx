"use client";

import { env } from "@/env";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const libraries: Libraries = ["places"];
export function useGoogleMapAPI() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      if (location.lat === 0 && location.lng === 0) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        });
      }
    }
  }, [isLoaded]);

  return { isLoaded, location, setLocation };
}
