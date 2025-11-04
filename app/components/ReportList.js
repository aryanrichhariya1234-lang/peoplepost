"use client";
import { ArrowLeftIcon, MapPinIcon } from "@heroicons/react/24/outline";
import ReturnHomeButton from "./ReturnHome";
import StatusBadgeForGov from "./StatusBadgeForGov";
import toast from "react-hot-toast";
import { supabaseClient } from "../data-service/supabseClient";
import { useRouter } from "next/navigation";

export default function ReportList({
  selectedIssue,
  setSelectedIssue,
  mock: MOCK_ISSUES,
  setMapCenter,
  mapCenter,
}) {
  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    if (issue.coords) {
      setMapCenter(issue.coords);
    }
  };

  const handleBackToList = () => {
    setSelectedIssue(null);
  };

  return (
    <div className="w-full md:w-5/12 lg:w-4/12 border-r bg-white flex flex-col md:max-h-screen overflow-hidden">
      {selectedIssue ? (
        <IssueDetailPanel
          setSelectedIssue={setSelectedIssue}
          issue={selectedIssue}
          onBack={handleBackToList}
        />
      ) : (
        <>
          <header className="p-4 border-b sticky top-0 bg-white z-20 flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-gray-800">
                Pending Issues ({MOCK_ISSUES.length})
              </h1>
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
  );
}

const IssueDetailPanel = ({ issue, onBack, setSelectedIssue }) => {
  const router = useRouter();
  const handleStatusUpdate = async (newStatus) => {
    const { data, error } = await supabaseClient
      .from("reports")
      .update({ status: newStatus })
      .eq("id", issue.id);
    setSelectedIssue(null);
    router.refresh();

    toast.success(`Status changed to ${newStatus}`);
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
