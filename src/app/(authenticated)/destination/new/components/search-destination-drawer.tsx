"use client";

import React, { useCallback } from "react";
import { Card, Drawer, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { useCreateDestination } from "../hooks/useCreateDestionation";

export function SearchDestinationDrawer({
  open,
  onClose,
  hook,
}: {
  open: boolean;
  onClose: () => void;
  hook: ReturnType<typeof useCreateDestination>;
}) {
  const [inputValue, setInputValue] = useState("");
  const [places, setPlaces] = useState<
    { name: string; address: string; description: string }[]
  >([]);
  const { isLoaded, location } = hook;
  const [loading, setLoading] = useState(false);

  const fetchPlaces = useCallback(() => {
    if (inputValue.length < 3 || !isLoaded) return;

    const service = new google.maps.places.AutocompleteService();
    setLoading(true);
    service.getPlacePredictions(
      {
        input: inputValue,
        location: new google.maps.LatLng(location.lat, location.lng),
        radius: 50000,
        types: ["geocode"],
      },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (!predictions) return;

          const results = predictions.slice(0, 5).map((place) => ({
            name: place.structured_formatting.main_text,
            address: place.structured_formatting.secondary_text,
            description: place.description,
          }));
          setPlaces(results);
        }
        setLoading(false);
      }
    );
  }, [inputValue, isLoaded]);

  function handleSelect(place: { name: string; address: string }) {
    if (!hook.mapRef.current) return;
    const service = new google.maps.places.PlacesService(hook.mapRef.current);

    const request = {
      query: place.name,
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (!results) return;

        const place = results[0];
        if (!place) return;

        hook.setSelectedPlace({
          name: place.name ?? "",
          address: place.formatted_address ?? "",
          lat: place?.geometry?.location?.lat() ?? 0,
          lng: place?.geometry?.location?.lng() ?? 0,
          description: place.formatted_address,
          image: place.photos?.[0]?.getUrl(),
        });
      }
    });
  }

  return (
    <>
      <Drawer
        open={open}
        onClose={() => {}}
        position="bottom"
        className="max-w-md mx-auto h-[100svh]"
      >
        <Drawer.Header title="" className="hidden" />
        <Drawer.Items>
          <button
            type="button"
            onClick={onClose}
            className=" text-gray-800 text-xl font-semibold text-left w-full mb-10"
          >
            <FaTimes className="inline mr-4" />
            Search Destination
          </button>

          <TextInput
            type="text"
            placeholder="Search for a destination"
            rightIcon={HiSearch}
            className="mb-6 w-full [&_input]:border-orange-500 [&_input]:bg-orange-50 [&_svg]:text-orange-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchPlaces();
              }
            }}
            disabled={loading}
          />

          {loading && (
            <div role="status" className="w-full animate-pulse">
              <div className="h-[200px] bg-gray-200 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
              <div className="h-[200px] bg-gray-200 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
              <span className="sr-only">Loading...</span>
            </div>
          )}

          {!loading &&
            (places.length > 0 ? (
              <div className="flex flex-col gap-4">
                {places.map((place, index) => (
                  <Card
                    className="text-black border border-orange-500 rounded-2xl shadow-orange-50 hover:cursor-pointer hover:bg-orange-100 hover:shadow-sm hover:shadow-orange-100"
                    key={index}
                    onClick={() => {
                      onClose();
                      handleSelect(place);
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <p>{place.name}</p>
                      <p className="text-gray-500 text-sm">{place.address}</p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-800 text-lg text-center">
                No results found
              </p>
            ))}
        </Drawer.Items>
      </Drawer>
    </>
  );
}
