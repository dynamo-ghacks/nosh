"use client";

import { useEffect, useRef, useState } from "react";

export function useCreateDestination() {
  const [view, setView] = useState<"search" | "map" | null>(null);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{
    name: string;
    address: string;
    lat: number;
    lng: number;
    description?: string | null;
    image?: string | null;
  } | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

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

  return {
    isLoaded,
    location,
    setLocation,
    view,
    setView,
    setIsLoaded,
    selectedPlace,
    setSelectedPlace,
    mapRef,
  };
}
