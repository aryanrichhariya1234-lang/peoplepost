import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function ReturnHomeButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center p-3 mb-8 rounded-full text-white bg-indigo-600 shadow-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-105"
      aria-label="Return to Public Homepage"
    >
      <HomeIcon className="w-5 h-5 mr-2 hidden sm:inline" />
      <span className="text-sm font-semibold">Return Home</span>
    </Link>
  );
}
