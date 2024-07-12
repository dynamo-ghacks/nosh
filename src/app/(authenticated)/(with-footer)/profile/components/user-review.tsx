import { ReviewItemCard } from '@/app/(authenticated)/destination/[id]/components/review-item-card';
import React from 'react';

const UserReview = ({
    restaurantName,
    isVerified,
    location,
    username,
    reviewDate,
    tags,
    reviewText
}:
    {
        restaurantName: string,
        isVerified: boolean,
        location: string,
        username: string,
        reviewDate: string,
        tags: string[],
        reviewText: string
    }
) => {
    return (
        <div className="bg-pink-50 p-6 rounded-xl text-black">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold">{
                    restaurantName.length > 40 ? restaurantName.substring(0, 40) + "..." : restaurantName
                }</h2>
                {isVerified && (
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center ml-2">
                        Verified
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                )}
            </div>

            <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{location}</span>
            </div>

            <ReviewItemCard userTags={[]} review={{
                id: "1",
                title: restaurantName,
                body: reviewText,
                tags: tags,
                user: {
                    name: username,
                    image: null
                },
                createdAt: new Date(),
                updatedAt: new Date(),
            }}
            />
        </div>
    );
};

export default UserReview;