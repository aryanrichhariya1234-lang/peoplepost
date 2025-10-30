import { MapPinIcon, XCircleIcon } from "@heroicons/react/24/outline";
import StatusBadge from "./StatusBadge";

export default function IssueModal({ issue, onClose }) {
  if (!issue) return null;

  // In a real app, this function would update the Supabase 'status' column
  const updateStatus = (newStatus) => {
    console.log(`Updating issue ${issue.id} to status: ${newStatus}`);
    // Supabase UPDATE call goes here
    onClose();
    // You would typically refetch the list data here to update the UI
  };

  return (
    <div
      className="fixed inset-0   bg-opacity-75 z-1000 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl m-4 mx-auto max-w-4xl p-6 sm:p-8 mt-10 mb-10"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <h2 className="text-3xl font-bold text-gray-900">{issue.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <XCircleIcon className="w-7 h-7" />
          </button>
        </div>

        {/* Status and Summary */}
        <div className="mb-6 flex flex-wrap items-center space-x-4">
          <StatusBadge status={issue.status} />
          <span className="text-sm text-gray-500">
            Submitted on: {issue.submitted_at}
          </span>
        </div>

        {/* Two-Column Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Description & Images (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold text-gray-700">Description</h3>
            <p className="text-gray-600 border p-4 rounded-lg bg-gray-50">
              {issue.description}
            </p>

            <h3 className="text-xl font-semibold text-gray-700">
              Reported Images
            </h3>
            {issue.images && issue.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {issue.images.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-video overflow-hidden rounded-lg shadow-md"
                  >
                    {/* Replace with Next.js Image component in final version */}
                    <img
                      src={img}
                      alt={`Issue photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">
                No images were provided for this report.
              </p>
            )}
          </div>

          {/* Right Column: Actions (1/3 width on desktop) */}
          <div className="lg:col-span-1 bg-indigo-50 p-4 rounded-xl shadow-inner space-y-4">
            <h3 className="text-xl font-bold text-indigo-700">Actions</h3>

            {/* Location */}
            <div className="p-3 bg-white rounded-lg shadow-sm border border-indigo-200">
              <p className="text-sm font-medium text-indigo-700 flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1" /> Location
              </p>
              <p className="text-gray-900 font-semibold mt-1">
                {issue.address}
              </p>
              <p className="text-xs text-gray-500">
                ({issue.coords.lat.toFixed(4)}, {issue.coords.lng.toFixed(4)})
              </p>
            </div>

            {/* Status Update Buttons */}
            <div className="space-y-2 pt-2 border-t border-indigo-100">
              <p className="font-semibold text-gray-700">Update Status:</p>
              <button
                onClick={() => updateStatus("IN_PROCESS")}
                className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
                disabled={issue.status === "IN_PROCESS"}
              >
                Mark as IN PROCESS
              </button>
              <button
                onClick={() => updateStatus("RESOLVED")}
                className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                disabled={issue.status === "RESOLVED"}
              >
                Mark as RESOLVED
              </button>
            </div>

            {/* Employee Notes Placeholder */}
            <textarea
              rows="3"
              placeholder="Add internal notes (Supabase write)"
              className="w-full p-2 border rounded-lg text-sm focus:ring-indigo-500"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
