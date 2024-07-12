import { TagView } from '@/components/tag/tag-view';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const RestaurantCard = ({ name, location, image, destinationTags, userTags, isHighlighted = false, viewDetailUrl }:
    { name: string, location: string, image: string, destinationTags: string[], userTags: string[], isHighlighted?: boolean, viewDetailUrl: string }
) => {
    const router = useRouter();
    return (
        <div className={`${isHighlighted ? 'bg-orange-100' : 'bg-white'
            } p-2
        rounded-lg overflow-hidden shadow-md mb-4`}>
            <div className="relative h-48 rounded-lg m-2">
                <Image
                    src={image}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
            </div>
            <div className="p-4">
                <h4 className="text-xl font-bold mb-1">{name}</h4>
                <p className="text-sm mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {location}
                </p>
                <div className="flex flex-row flex-wrap gap-2">
                    <TagView userTags={userTags} destTags={destinationTags}
                        nonHighlightedBgColor={isHighlighted ? 'bg-orange-100' : 'bg-white'}
                        highlightedBgColor='bg-orange-500'
                        highlightedTextColor='text-white'
                        nonHighlightedTextColor='text-orange-500'
                        maxTags={3}
                    />
                </div>
                <button className={`${isHighlighted ? 'bg-white text-orange-500' : 'border-orange-400 text-white'
                    }bg-white rounded-md py-2 px-3 w-full mt-4 border-2
                    ${isHighlighted ? 'hover:bg-orange-400' : 'hover:bg-orange-100'}
                    `}
                    onClick={() => router.push(viewDetailUrl)}
                >
                    View Detail
                </button>
            </div>
        </div>
    );
};

export default RestaurantCard;