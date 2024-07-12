"use client";

import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useCreateDestination } from "../hooks/useCreateDestionation";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
  ":focus": {
    outline: "none",
    border: "none",
  },
};

export function MapPicker({
  selectedPlace,
  setSelectedPlace,
  view,
  setView,
}: {
  selectedPlace: {
    name: string;
    address: string;
    lat: number;
    lng: number;
    description?: string | null;
    image?: string | null;
  } | null;
  setSelectedPlace: React.Dispatch<
    React.SetStateAction<{
      name: string;
      address: string;
      lat: number;
      lng: number;
      description?: string | null;
      image?: string | null;
    } | null>
  >;
  view: "search" | "map" | null;
  setView: React.Dispatch<React.SetStateAction<"search" | "map" | null>>;
}) {
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((mapInstance: google.maps.Map | null) => {
    mapRef.current = mapInstance;

    if (!mapRef.current) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCenter({ lat: latitude, lng: longitude });
      fetchPlaceDetails(new google.maps.LatLng(latitude, longitude));
    });
  }, []);

  function getDistance(
    place: google.maps.places.PlaceResult,
    location: google.maps.LatLng
  ) {
    if (!place.geometry?.location) return Infinity;

    return Math.sqrt(
      Math.pow(place.geometry.location.lat() - location.lat(), 2) +
        Math.pow(place.geometry.location.lng() - location.lng(), 2)
    );
  }

  const fetchPlaceDetails = async (location: google.maps.LatLng) => {
    if (!mapRef.current) return;

    const service = new google.maps.places.PlacesService(mapRef.current);

    const request = {
      location,
      radius: 10,
    };

    service.nearbySearch(request, (results, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        results &&
        results.length > 0
      ) {
        const sortedResults = results
          .sort((a, b) => getDistance(a, location) - getDistance(b, location))
          .slice(0, 5);

        const placesDetailsPromises = sortedResults.map((place) => {
          return new Promise((resolve) => {
            if (!place.place_id) return resolve(null);

            service.getDetails(
              { placeId: place.place_id },
              (placeResult, placeStatus) => {
                if (
                  placeStatus === google.maps.places.PlacesServiceStatus.OK &&
                  placeResult
                ) {
                  resolve({
                    name: placeResult.name,
                    address: placeResult.formatted_address,
                    lat: placeResult.geometry?.location?.lat(),
                    lng: placeResult.geometry?.location?.lng(),
                    image: placeResult.photos?.[0]?.getUrl(),
                  });
                } else {
                  resolve(null);
                }
              }
            );
          });
        });

        Promise.all(placesDetailsPromises).then((places) => {
          let place = places[0] as {
            name: string;
            address: string;
            lat: number;
            lng: number;
            image: string;
          };
          setSelectedPlace(place);
        });
      }
    });
  };

  const onMapDragEnd = async () => {
    if (!mapRef.current) return;

    const center = mapRef.current.getCenter();
    if (!center) return;
    setCenter({ lat: center.lat(), lng: center.lng() });
    fetchPlaceDetails(center);
  };

  return (
    <>
      <div className="h-[80svh] relative">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={20}
          onLoad={onLoad}
          onDragEnd={() => {
            onMapDragEnd();
          }}
          options={{
            disableDefaultUI: true,
            mapTypeControl: false,
            streetViewControl: false,
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-500 text-6xl">
            <FaMapMarkerAlt />
          </div>
        </GoogleMap>
      </div>
      <div className="max-h-[240px] text-black fixed bottom-0 left-0 right-0 bg-transparent px-6 pb-6 shadow-md max-w-md mx-auto">
        <div className="pt-6 bg-white w-full rounded-t-2xl flex flex-col justify-between gap-6 h-full px-4">
          <div>
            <p className="font-semibold">{selectedPlace?.name}</p>
            <p className="text-sm text-gray-500 mt-4">
              {selectedPlace?.address}
            </p>
          </div>
          <button
            className="h-[40px] w-full justify-center rounded-lg bg-orange-500 px-5 py-2 text-center text-lg font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 flex flex-row gap-2 items-center"
            type="button"
            onClick={() => {
              setView(null);
            }}
          >
            <span>Next</span>
          </button>
        </div>
      </div>
    </>
  );
}
