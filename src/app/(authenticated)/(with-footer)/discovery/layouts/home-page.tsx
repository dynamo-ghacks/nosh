"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Drawer } from "vaul";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Chat from '../components/chat-components';
import RestaurantCard from '../components/restaurant-cards';

const HomePage = (
    { userProfileUrl, username, userTags }: { userProfileUrl: string, username: string,
        userTags: string[]
     }
) => {
    const [open, setOpen] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const location = { lat: latitude, lng: longitude };
                    setCurrentLocation(location);
                    setSelectedLocation(location);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    const defaultLocation = { lat: 0, lng: 0 };
                    setCurrentLocation(defaultLocation);
                    setSelectedLocation(defaultLocation);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            const defaultLocation = { lat: 0, lng: 0 };
            setCurrentLocation(defaultLocation);
            setSelectedLocation(defaultLocation);
        }
    }, []);

    const handleCloseDrawer = () => {
        setOpen(false);
    };

    const onMapLoad = (map:
        google.maps.Map
    ) => {
        mapRef.current = map;
    };

    const mapOptions = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ]
    };

    const onMapDragEnd = () => {
        if (mapRef.current) {
            const newCenter = mapRef.current.getCenter();
            if (newCenter)
                setSelectedLocation({
                    lat: newCenter.lat(),
                    lng: newCenter.lng()
                });
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Map background */}
            <div className="absolute inset-0 bg-blue-100">
                <div className="absolute inset-0">
                    {isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%', }}
                            center={currentLocation || { lat: -6.200000, lng: 106.816666 }}
                            zoom={15}
                            onLoad={onMapLoad}
                            options={mapOptions}
                            onDragEnd={onMapDragEnd}
                        >
                            {selectedLocation && (
                                <Marker
                                    position={selectedLocation}
                                    draggable={true}
                                    onDragEnd={(e) => {
                                        if (e.latLng)
                                            setSelectedLocation({
                                                lat: e.latLng.lat(),
                                                lng: e.latLng.lng()
                                            });
                                    }}
                                />
                            )}
                        </GoogleMap>
                    ) : (
                        <div>Loading map...</div>
                    )}
                </div>
            </div>

            {/* Floating content */}
            <div className="relative z-10 flex flex-col min-h-screen text-black">
                {/* Back navigation */}
                <div className="p-4">
                    <button className="p-2 rounded-full bg-white shadow">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                {/* Spacer to push content to bottom */}
                <div className="flex-grow"></div>

                {/* Drawer component */}
                <Drawer.Root open={open} onClose={
                    () => setOpen(false)
                }>
                    <Drawer.Trigger asChild onClick={() => setOpen(true)}>
                        {!open &&
                            <div className="bg-white rounded-t-3xl shadow-lg p-6 text-black cursor-pointer pb-24">
                                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                                <h2 className="text-xl font-semibold mb-6 text-center mt-6">Discovery</h2>
                            </div>
                        }
                    </Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto text-black">
                            <div className="p-6 flex-1 overflow-y-auto">
                                <div
                                    className="cursor-pointer py-2"
                                    onClick={handleCloseDrawer}
                                >
                                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
                                </div>

                                <h2 className="text-xl font-semibold mb-6 text-center mt-6">Discovery</h2>

                                <Chat messages={[
                                    { text: `Hi ${username}! How can I help you today?`, isUser: false },
                                    { text: "I'm looking for a restaurant nearby.", isUser: true },
                                    { text: "Sure! Let me help you with that.", isUser: false },
                                    // Add more messages here
                                ]}
                                    userProfileUrl={userProfileUrl}
                                />

                                {/* Search input */}
                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        placeholder="Write your answer..."
                                        className="w-full p-2 pr-10 rounded-md border border-orange-300 pl-4 bg-orange-50"
                                    />
                                    <svg className="w-6 h-6 text-gray-400 absolute right-3 top-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                                </div>

                                {/* Recommended section */}
                                <h3 className="text-lg font-semibold mb-2">Recommended for you</h3>
                                <RestaurantCard
                                    name='Khalid'
                                    location='Jl. Setiabudi No. 20, Jakarta Selatan'
                                    image='/images/login-avatar.svg'
                                    destinationTags={['Gluten-Free Options', 'Vegetarian Friendly', 'Great Atmosphere']}
                                    userTags={userTags}
                                />
                            </div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </div>
        </div>
    );
};

export default HomePage;