"use client";

import { UserIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
export default function SignUpRoleSelectionPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Choose Your Account Type
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Select the role that defines how you will use CityPulse.
          </p>
        </div>

        <div className="flex space-x-4 border-b pb-4">
          <Link
            href="/signup/citizen"
            className="flex-1 flex flex-col items-center p-6 border-2 rounded-lg transition border-indigo-600/50 bg-indigo-50 hover:bg-indigo-100 shadow-md cursor-pointer"
          >
            <UserIcon className="w-8 h-8 text-indigo-600" />
            <span className="mt-3 text-lg font-semibold text-black">
              Citizen
            </span>
            <p className="text-xs text-gray-600 mt-1 text-center">
              Report issues and track progress.
            </p>
          </Link>

          <Link
            href="/signup/official"
            className="flex-1 flex flex-col items-center p-6 border-2 rounded-lg transition border-teal-600/50 bg-teal-50 hover:bg-teal-100 shadow-md cursor-pointer"
          >
            <BuildingOfficeIcon className="w-8 h-8 text-teal-600" />
            <span className="mt-3 text-lg font-semibold text-black">
              Official
            </span>
            <p className="text-xs text-gray-600 mt-1 text-center">
              Manage and resolve reported issues.
            </p>
          </Link>
        </div>

        <div className="text-center text-sm">
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
