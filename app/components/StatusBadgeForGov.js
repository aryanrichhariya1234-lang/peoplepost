import {
  ClockIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function StatusBadgeForGov({ status }) {
  let colorClass = "";
  let icon = null;

  switch (status) {
    case "NEW":
      colorClass = "bg-red-100 text-red-800";
      icon = <ClockIcon className="w-4 h-4 mr-1" />;
      break;
    case "IN_PROCESS":
      colorClass = "bg-yellow-100 text-yellow-800";
      icon = <ArrowsRightLeftIcon className="w-4 h-4 mr-1" />;
      break;
    case "RESOLVED":
      colorClass = "bg-green-100 text-green-800";
      icon = <CheckCircleIcon className="w-4 h-4 mr-1" />;
      break;
    default:
      colorClass = "bg-gray-100 text-gray-800";
      icon = <XCircleIcon className="w-4 h-4 mr-1" />;
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase ${colorClass}`}
    >
      {icon}
      {status.replace("_", " ")}
    </span>
  );
}
