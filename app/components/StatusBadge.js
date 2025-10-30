export default function StatusBadge({ status }) {
  let colorClasses = "bg-gray-200 text-gray-700"; // Default

  switch (status) {
    case "NEW":
      colorClasses = "bg-red-500/10 text-red-700 ring-1 ring-red-500";
      break;
    case "IN_PROCESS":
      colorClasses = "bg-yellow-500/10 text-yellow-700 ring-1 ring-yellow-500";
      break;
    case "RESOLVED":
      colorClasses = "bg-green-500/10 text-green-700 ring-1 ring-green-500";
      break;
    default:
      break;
  }

  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full uppercase ${colorClasses}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
