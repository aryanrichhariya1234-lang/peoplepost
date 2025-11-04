"use client";
import { useState } from "react";
const MOCK_ISSUES = [
  {
    id: 101,
    title: "Large Pothole at 5th & Main",
    category: "Pothole",
    address: "Bandra West, Mumbai, Maharashtra",
    description:
      "Deep pothole causing traffic issues and vehicle damage. Located directly in the right lane.",
    status: "NEW",
    submitted_at: "2025-10-25",
    images: ["/images/pothole1.jpg", "/images/pothole2.jpg"],
    coords: { lat: 19.056, lng: 72.825 }, // Mumbai
  },
  {
    id: 102,
    title: "Streetlight outage near school",
    category: "Streetlight",
    address: "Connaught Place, New Delhi",
    description:
      "Light has been out for three days. Safety concern for children walking home in the evening.",
    status: "IN_PROCESS",
    submitted_at: "2025-10-24",
    images: ["/images/light_out.jpg"],
    coords: { lat: 28.63, lng: 77.2166 }, // Delhi
  },
  {
    id: 103,
    title: "Excessive garbage buildup",
    category: "Garbage",
    address: "Koramangala, Bengaluru, Karnataka",
    description:
      "Illegal dumping has filled the entire curb. Needs immediate removal.",
    status: "RESOLVED",
    submitted_at: "2025-10-20",
    images: ["/images/garbage_pile.jpg", "/images/resolved_cleanup.jpg"],
    coords: { lat: 12.9345, lng: 77.625 }, // Bengaluru
  },
  {
    id: 104,
    title: "Broken sidewalk tile",
    category: "Other",
    address: "T Nagar, Chennai, Tamil Nadu",
    description:
      "Cracked sidewalk tile creating a tripping hazard right outside the library entrance.",
    status: "NEW",
    submitted_at: "2025-10-26",
    images: [],
    coords: { lat: 13.045, lng: 80.246 }, // Chennai
  },
  {
    id: 105,
    title: "Graffiti on park wall",
    category: "Other",
    address: "Park Street, Kolkata, West Bengal",
    description:
      "Large amount of spray paint vandalism on the main brick wall of the park entrance.",
    status: "IN_PROCESS",
    submitted_at: "2025-10-27",
    images: ["/images/graffiti.jpg"],
    coords: { lat: 22.545, lng: 88.35 }, // Kolkata
  },
];
import ReportList from "./ReportList";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../components/Map"), { ssr: false });
export default function GovermentBoard({ data }) {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 34.05, lng: -118.25 });
  const issues = data.data.map((item) => {
    const {
      id,
      created_at,
      description,
      title,
      address,
      status,
      imageUrls,
      category,
      lat,
      lng,
    } = item;
    const coords = { lat, lng };
    return {
      id,
      submitted_at: created_at,
      description,
      address,
      title,
      images: imageUrls,
      status,

      category,
      coords,
    };
  });

  return (
    <>
      <ReportList
        selectedIssue={selectedIssue}
        setSelectedIssue={setSelectedIssue}
        mock={issues}
        mapCenter={mapCenter}
        setMapCenter={setMapCenter}
      />

      <div className="w-full md:w-7/12 lg:w-8/12 bg-gray-100 relative">
        <div className="p-4 h-full md:h-full">
          <div className="w-full h-full md:h-full md:w-full">
            <Map
              mock={MOCK_ISSUES}
              position={mapCenter}
              setPosition={setMapCenter}
              selectedIssue={selectedIssue}
            />
          </div>
        </div>
      </div>
    </>
  );
}
