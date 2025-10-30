"use client";
import dynamic from "next/dynamic";
import {
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowsRightLeftIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

import IssueModal from "../components/IssueModal";
import StatusBadgeForGov from "../components/StatusBadgeForGov";
import ReturnHomeButton from "../components/ReturnHome";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

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

const IssueDetailPanel = ({ issue, onBack, onStatusChange }) => {
  const handleStatusUpdate = (newStatus) => {
    console.log(`[ACTION] Updating Issue ${issue.id} status to: ${newStatus}`);
    onStatusChange(issue.id, newStatus);
    alert(`Status changed to ${newStatus}. (Mocked action)`);
  };

  return (
    <div className="p-6 h-full bg-white flex flex-col">
      <div className="flex items-center space-x-4 border-b pb-4 mb-4">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-indigo-600 transition"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 truncate">
          Issue #{issue.id} Details
        </h2>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2">
        {" "}
        <div className="p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
          <h3 className="font-semibold text-xl text-indigo-800 mb-1">
            {issue.title}
          </h3>
          <div className="flex items-center space-x-3">
            <StatusBadgeForGov status={issue.status} />
            <span className="text-sm text-gray-500">
              Filed: {issue.submitted_at}
            </span>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg border shadow-sm">
          <p className="font-semibold text-gray-700 flex items-center mb-1">
            <MapPinIcon className="w-4 h-4 mr-1 text-indigo-600" />
            Location: {issue.address}
          </p>
          <p className="text-sm text-gray-500">Category: {issue.category}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Detailed Description
          </h3>
          <p className="text-gray-600 bg-gray-50 p-3 rounded-md text-sm">
            {issue.description}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Reported Images ({issue.images.length})
          </h3>
          {issue.images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {issue.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Issue photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">
              No images attached by the reporter.
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="font-bold text-lg mb-2">Management Actions</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => handleStatusUpdate("IN_PROCESS")}
            className="flex-1 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
            disabled={
              issue.status === "RESOLVED" || issue.status === "IN_PROCESS"
            }
          >
            Mark IN PROCESS
          </button>
          <button
            onClick={() => handleStatusUpdate("RESOLVED")}
            className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            disabled={issue.status === "RESOLVED"}
          >
            Mark RESOLVED
          </button>
        </div>
      </div>
    </div>
  );
};

export default function GovDashboardPage() {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 34.05, lng: -118.25 });

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    if (issue.coords) {
      setMapCenter(issue.coords);
    }
  };

  const handleBackToList = () => {
    setSelectedIssue(null);
  };

  const handleStatusChange = (issueId, newStatus) => {
    console.log(`Issue ${issueId} status changed to ${newStatus}`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-5/12 lg:w-4/12 border-r bg-white flex flex-col md:max-h-screen overflow-hidden">
        {selectedIssue ? (
          <IssueDetailPanel
            issue={selectedIssue}
            onBack={handleBackToList}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <>
            <header className="p-4 border-b sticky top-0 bg-white z-20 flex justify-between items-center">
              <div className="space-y-1">
                <h1 className="text-xl font-bold text-gray-800">
                  Pending Issues ({MOCK_ISSUES.length})
                </h1>
                <input
                  type="text"
                  placeholder="Search reports or addresses..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
              <ReturnHomeButton />
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {MOCK_ISSUES.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => handleIssueClick(issue)}
                  className="p-4 bg-gray-50 border-l-4 border-indigo-600 rounded-lg shadow-sm hover:shadow-md transition duration-150 cursor-pointer space-y-1"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-semibold text-gray-900 truncate pr-2">
                      {issue.title}
                    </h3>
                    <StatusBadgeForGov status={issue.status} />
                  </div>
                  <p className="text-xs text-indigo-600 font-medium uppercase">
                    {issue.category}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1 text-gray-400" />
                    {issue.address}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="w-full md:w-7/12 lg:w-8/12 bg-gray-100 relative">
        <div className="p-4 h-full">
          {" "}
          <div className="w-full h-full">
            <Map
              mock={MOCK_ISSUES}
              position={mapCenter}
              setPosition={setMapCenter}
              selectedIssue={selectedIssue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
