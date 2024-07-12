import React from 'react';

const HomePage = () => {
    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Map background */}
            <div className="absolute inset-0 bg-blue-100">
                {/* Replace this div with your actual map component */}
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

                {/* Main content */}
                <div className="bg-white rounded-t-3xl shadow-lg p-6 text-black">
                    {/* Question and search */}
                    <h2 className="text-xl font-semibold mb-6 text-center mt-6">Where are you going to eat today?</h2>
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search your favorite restaurant..."
                            className="w-full p-2 pr-10 rounded-md border border-orange-300 pl-4 bg-orange-50"
                        />
                        <svg className="w-6 h-6 text-gray-400 absolute right-3 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Recommended section */}
                    <h3 className="text-lg font-semibold mb-2">Recommended for you</h3>
                    <div className="bg-orange-400 rounded-lg overflow-hidden shadow-md">
                        <div className="h-24 bg-gray-300"></div>
                        <div className="p-4">
                            <h4 className="text-xl font-bold text-white mb-2">Khalid</h4>
                            <ul className="text-white">
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Gluten-Free Options
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Gluten-Free Options
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Gluten-Free Options
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomePage;