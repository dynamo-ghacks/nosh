"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Drawer } from "vaul";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Chat from '../components/chat-components';
import RestaurantCard from '../components/restaurant-cards';
import { useRouter } from 'next/navigation';
import executeRAGrequest from '../actions/rag';

const HomePage = (
    { userProfileUrl, username, userTags, recommendedRestaurant, nearestRestaurants }: {
        userProfileUrl: string, username: string,
        userTags: string[], recommendedRestaurant: {
            id: string, name: string, location: string, image: string, destinationTags: string[], userTags: string[], isHighlighted?: boolean,
        },
        nearestRestaurants: {
            id: string, name: string, location: string, image: string, destinationTags: string[], userTags: string[], isHighlighted?: boolean,
        }[]
    }
) => {
    const [open, setOpen] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const router = useRouter();
    const [messages, setMessages] = useState
        <{ text: string, isUser: boolean, restaurants?: { name: string, location: string, image: string, destinationTags: string[], userTags: string[], id: string }[] }[]>
        ([
            { text: `Hi ${username}! How can I help you today?`, isUser: false },
        ]);
    useEffect(() => {
        console.log(messages);
    }
        , [messages]);

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
        <div className="relative max-h-screen bg-gray-100 pb-20">
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

            <div className="relative z-10 flex flex-col min-h-screen text-black">
                <div className="p-4">
                    <button className="p-2 rounded-full bg-white shadow z-50"
                        onClick={() => router.back()}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                <div className="flex-grow"></div>

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
                            <div className="p-6 flex-1 overflow-y-auto pb-24">
                                <div
                                    className="cursor-pointer py-2"
                                    onClick={handleCloseDrawer}
                                >
                                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
                                </div>

                                <h2 className="text-xl font-semibold mb-6 text-center mt-6">Discovery</h2>

                                <Chat messages={messages}
                                    userProfileUrl={userProfileUrl}
                                    userTags={userTags}
                                />

                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        placeholder="Write your answer..."
                                        className="w-full p-2 pr-10 rounded-md border border-orange-300 pl-4 bg-orange-50"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                const userMessage = { text: e.currentTarget.value, isUser: true };
                                                setMessages(prevMessages => [...prevMessages, userMessage]);
                                                executeRAGrequest(e.currentTarget.value).then((response) => {
                                                    setMessages(prevMessages => [
                                                        ...prevMessages,
                                                        {
                                                            text: response.text,
                                                            isUser: false,
                                                            restaurants: response.destinationCited.map((destination) => ({
                                                                name: destination.name,
                                                                location: destination.address,
                                                                image: destination.image || "/images/restaurant-sign.png",
                                                                destinationTags: destination.tags,
                                                                userTags: userTags,
                                                                id: destination.id
                                                            }))
                                                        }
                                                    ]);

                                                });
                                                e.currentTarget.value = "";
                                            }
                                        }}
                                    />
                                    <svg className="w-6 h-6 text-gray-400 absolute right-3 top-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                                </div>

                                <h3 className="text-lg font-semibold mb-2 mt-8">Recommended for you</h3>
                                <RestaurantCard
                                    name={recommendedRestaurant.name}
                                    location={recommendedRestaurant.location}
                                    image={recommendedRestaurant.image}
                                    destinationTags={recommendedRestaurant.destinationTags}
                                    userTags={recommendedRestaurant.userTags}
                                    isHighlighted={true}
                                    viewDetailUrl={`/destination/${recommendedRestaurant.id}`}
                                />

                                <h3 className="text-lg font-semibold mb-2 mt-6">Nearest to you</h3>
                                {nearestRestaurants.map((restaurant, index) => (
                                    <RestaurantCard
                                        key={index}
                                        name={restaurant.name}
                                        location={restaurant.location}
                                        image={restaurant.image}
                                        destinationTags={restaurant.destinationTags}
                                        userTags={restaurant.userTags}
                                        viewDetailUrl={`/destination/${restaurant.id}`}
                                    />
                                ))}
                            </div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </div>
        </div>
    );
};

export default HomePage;