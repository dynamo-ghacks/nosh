"use client";
import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const ProfileDisplay = ({ name, email, avatarUrl }:
  { name: string, email: string, avatarUrl?: string }
) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white w-full">
      <div className="w-24 h-24 mb-4 rounded-full bg-pink-200 overflow-hidden">
        {avatarUrl ? (
          <Image src={avatarUrl} alt={name} width={96} height={96} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>

      <h2 className="text-2xl font-bold text-coral-500 mb-2 text-orange-500">{name}</h2>

      <div className="flex items-center mb-6 text-gray-600">
        <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>{email}</span>
      </div>

      <button className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-coral-600 transition duration-300"
      onClick={() => signOut()}
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfileDisplay;