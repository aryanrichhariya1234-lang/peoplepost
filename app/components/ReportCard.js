import Link from "next/link";
import StatusBadge from "./StatusBadge";
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ReportCard({ report }) {
  return (
    <div className="block bg-white p-4 rounded-xl shadow-md transition duration-150 hover:shadow-lg hover:ring-2 ring-indigo-500/50">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate pr-4">
          {report.title}
        </h3>
        <StatusBadge status={report.status} />
      </div>

      <p className="text-sm text-indigo-600 font-medium uppercase mb-2">
        {report.category}
      </p>

      <div className="text-xs text-gray-500 space-y-1">
        <div className="flex items-center">
          <MapPinIcon className="w-4 h-4 mr-1 text-gray-400" />
          <span>Location: {report.address}</span>
        </div>
        <div className="flex items-center">
          <ClockIcon className="w-4 h-4 mr-1 text-gray-400" />
          <span>Reported: {report.created_at}</span>
        </div>
      </div>
    </div>
  );
}
