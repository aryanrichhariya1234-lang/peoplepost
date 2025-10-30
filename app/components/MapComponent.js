"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function MapComponent() {
  const position = { lat: 34.05, lng: -118.25 };
  return (
    <div className="p-6 h-full flex flex-col justify-center items-center text-gray-500 bg-gray-200 rounded-lg shadow-inner">
      <Map position={position} />
    </div>
  );
}
