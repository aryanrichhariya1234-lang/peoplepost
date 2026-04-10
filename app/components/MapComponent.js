"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function MapComponent({ position, setPosition }) {
  return (
    <div className="p-6 h-full flex flex-col justify-center items-center text-gray-500 bg-gray-200 rounded-lg shadow-inner">
      <Map position={position} setPosition={setPosition} />
    </div>
  );
}
