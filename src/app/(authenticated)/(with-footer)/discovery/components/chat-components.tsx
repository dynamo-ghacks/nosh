import React from 'react';
import Image from 'next/image';
import RestaurantCard from './restaurant-cards';


const ChatBubble = ({ message, isUser, userProfileUrl, restaurants }:
    {
        message: string, isUser: boolean,
        userProfileUrl: string, userTags: string[], restaurants?: { name: string, location: string, image: string, destinationTags: string[], userTags: string[], id: string }[]
    }
) => (
    <>
        {restaurants && restaurants.length > 0 && restaurants.map((restaurant, index) => {
            return <div key={index} className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end mt-4`}>
                <Image
                    src={isUser ? userProfileUrl : '/images/ai-avatar.svg'}
                    alt={isUser ? 'User Avatar' : 'AI Avatar'}
                    width={32}
                    height={32}
                    className="rounded-full"
                />
                <div className={`rounded-lg p-3 max-w-xs lg:max-w-md mx-2 ${isUser ? 'bg-orange-500 text-white' : 'bg-pink-100 text-gray-800'
                    }`}>
                    <RestaurantCard
                        name={restaurant.name}
                        location={restaurant.location}
                        image={restaurant.image}
                        destinationTags={restaurant.destinationTags}
                        userTags={restaurant.userTags}
                        viewDetailUrl={`/destination/${restaurant.id}`}
                    />
                </div>
            </div>
        })}

        <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end mt-4`}>
            <Image
                src={isUser ? userProfileUrl : '/images/ai-avatar.svg'}
                alt={isUser ? 'User Avatar' : 'AI Avatar'}
                width={32}
                height={32}
                className="rounded-full"
            />
            <div className={`rounded-lg p-3 max-w-xs lg:max-w-md mx-2 ${isUser ? 'bg-orange-500 text-white' : 'bg-pink-100 text-gray-800'
                }`}>
                <p>{message}</p>
            </div>
        </div>
    </>
);

export const Chat = ({ messages, userProfileUrl, userTags, restaurants }:
    {
        messages: { text: string, isUser: boolean }[],
        userProfileUrl: string, userTags: string[],
        restaurants?: { name: string, location: string, image: string, destinationTags: string[], userTags: string[], id: string }[]
    }
) => (
    <div className="flex flex-col space-y-4 mb-8">
        {messages.map((msg, index) => {
            return <ChatBubble key={index} message={msg.text} isUser={msg.isUser}
                userProfileUrl={userProfileUrl} userTags={userTags} restaurants={restaurants}
            />
        })}
    </div>
);

export default Chat;