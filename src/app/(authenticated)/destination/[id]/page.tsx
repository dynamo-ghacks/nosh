import { Badge } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { FaMapPin, FaCheck } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import MapMarked from "../../../../components/map/map-marked";

export default async function Page() {
  const detail = {
    title: "Nancy",
    description:
      "Halal Restaurant in Jakarta Halal Restaurant in Jakarta. Halal Restaurant in Jakarta.",
    isVerified: true,
    tags: [
      { label: "Halal", check: true },
      { label: "Gluten Free", check: false },
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg",
    address: "Jl. Setiabudi No. 20, Jakarta Selatan",
    latitude: -6.1876407,
    longitude: 106.7596409,
  };
  return (
    <div className="flex flex-col gap-6 text-black">
      <Image
        src={detail.image}
        alt={detail.title}
        width={320}
        height={200}
        className="aspect-[3 / 2] rounded-lg w-full"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <h2 className="font-semibold text-2xl">{detail.title}</h2>
          {detail.isVerified && (
            <Badge
              color={"success"}
              icon={RiVerifiedBadgeFill}
              className="bg-emerald-500 text-white px-4 text-xs"
            >
              Verified
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {detail.description}
        </p>
        <div className="text-sm flex flex-row items-center gap-2">
          <FaMapPin />
          <p>{detail.address}</p>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          {detail.tags.map((tag) => (
            <Badge
              color={tag.check ? "success" : "failure"}
              icon={tag.check ? FaCheck : FaTimes}
            >
              {tag.check ? tag.label : `${tag.label}`}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-4">Map Location</p>
        <MapMarked
          center={{ lat: detail.latitude, lng: detail.longitude }}
          containerStyle={{
            width: "100%",
            height: "200px",
            borderRadius: "16px",
          }}
        />
      </div>
    </div>
  );
}
