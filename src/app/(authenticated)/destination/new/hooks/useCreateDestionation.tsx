"use client";

import { useGoogleMapAPI } from "@/hooks/useGoogleMapAPI";
import { useRef, useState } from "react";

export function useCreateDestination() {
  const [view, setView] = useState<"search" | "map" | null>(null);

  const [selectedPlace, setSelectedPlace] = useState<{
    name: string;
    address: string;
    lat: number;
    lng: number;
    description?: string | null;
    image?: string | null;
  } | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { isLoaded, location } = useGoogleMapAPI();

  return {
    isLoaded,
    location,
    view,
    setView,
    selectedPlace,
    setSelectedPlace,
    mapRef,
  };
}
