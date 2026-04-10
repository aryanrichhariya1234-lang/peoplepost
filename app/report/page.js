"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import MapComponent from "../components/MapComponent";
import Reportproblem from "../components/Reportproblem";

export default function ReportProblemPage() {
  const [position, setPosition] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black">
      {/* 🔙 HEADER */}
      <div className="p-4 bg-white shadow flex items-center">
        <Link
          href="/"
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* LEFT FORM */}
        <Reportproblem position={position} />

        {/* RIGHT MAP */}
        <div className="w-full md:w-7/12 lg:w-8/12 md:sticky md:top-0 md:h-screen p-4 md:p-0">
          <MapComponent position={position} setPosition={setPosition} />
        </div>
      </div>
    </div>
  );
}
