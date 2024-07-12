import React from "react";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

export default function Layout({ children }) {
  return (
    <div className="overflow-y-hidden relative h-full flex flex-col gap-4 min-h-screen bg-white p-6">
      <div className="flex flex-col items-start justify-start gap-4">
        <Link
          href={"/home"}
          className="text-gray-800 text-xl font-semibold text-left w-full"
        >
          <HiArrowLeft className="inline mr-4" />
          Destination
        </Link>
      </div>
      <div className="overflow-y-auto hide-scrollbar pb-20">{children}</div>
    </div>
  );
}
