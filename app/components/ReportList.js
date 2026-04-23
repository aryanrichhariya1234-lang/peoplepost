"use client";

import { ArrowLeftIcon, MapPinIcon } from "@heroicons/react/24/outline";
import ReturnHomeButton from "./ReturnHome";
import StatusBadgeForGov from "./StatusBadgeForGov";
import toast from "react-hot-toast";
import { useState } from "react";
import { updatePost } from "../data-service/clientfunctions";

export default function ReportList({
  selectedIssue,
  setSelectedIssue,
  mock: MOCK_ISSUES,
  setMapCenter,
  onUpdateIssue,
}) {
  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    if (issue.coords) setMapCenter(issue.coords);
  };

  return (
    <div className="w-full md:w-5/12 lg:w-4/12 border-r bg-white flex flex-col h-screen overflow-hidden text-black">
      {selectedIssue ? (
        <IssueDetailPanel
          issue={selectedIssue}
          onUpdateIssue={onUpdateIssue}
          onBack={() => setSelectedIssue(null)}
        />
      ) : (
        <>
          <header className="p-4 border-b bg-white flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">
              Pending Issues ({MOCK_ISSUES.length})
            </h1>
            <ReturnHomeButton />
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {MOCK_ISSUES.map((issue) => (
              <div
                key={issue.id}
                onClick={() => handleIssueClick(issue)}
                className="p-4 bg-gray-50 border-l-4 border-indigo-600 rounded-lg shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold truncate">{issue.title}</h3>
                  <StatusBadgeForGov status={issue.status} />
                </div>
                <p className="text-xs text-indigo-600 uppercase">
                  {issue.category}
                </p>
                <p className="text-sm text-gray-500 flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  {issue.address}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const IssueDetailPanel = ({ issue, onBack, onUpdateIssue }) => {
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    setLoading(true);
    const res = await updatePost({
      body: { status: newStatus },
      issue,
    });
    setLoading(false);

    if (res?.error) {
      toast.error("Failed to update status ❌");
      return;
    }

    // Pass the raw object back to update the master list
    onUpdateIssue(res);
    toast.success(`Status changed to ${newStatus} ✅`);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* FIXED HEADER */}
      <div className="p-4 border-b flex items-center space-x-4">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold truncate">Issue Details</h2>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
          <h3 className="text-xl font-bold mb-2">{issue.title}</h3>
          <div className="flex items-center space-x-3">
            <StatusBadgeForGov status={issue.status} />
            <span className="text-xs text-gray-500">
              Filed: {issue.submitted_at}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-gray-400 uppercase">
            Location
          </h4>
          <p className="font-medium flex items-start">
            <MapPinIcon className="w-5 h-5 mr-1 text-indigo-600 shrink-0" />
            {issue.address}
          </p>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-gray-400 uppercase">
            Description
          </h4>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded">
            {issue.description}
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-400 uppercase">
            Evidence
          </h4>
          {issue?.images?.length ? (
            <div className="grid grid-cols-2 gap-2">
              {issue.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="issue"
                  className="w-full h-32 object-cover rounded-lg border"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">No images provided.</p>
          )}
        </div>
      </div>

      {/* FIXED FOOTER ACTIONS */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex space-x-3">
          <button
            disabled={
              loading ||
              issue.status === "IN_PROCESS" ||
              issue.status === "RESOLVED"
            }
            onClick={() => handleStatusUpdate("IN_PROCESS")}
            className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg shadow-sm disabled:opacity-50 transition-colors"
          >
            {loading ? "..." : "IN PROCESS"}
          </button>

          <button
            disabled={loading || issue.status === "RESOLVED"}
            onClick={() => handleStatusUpdate("RESOLVED")}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm disabled:opacity-50 transition-colors"
          >
            {loading ? "..." : "RESOLVED"}
          </button>
        </div>
      </div>
    </div>
  );
};
