import Link from "next/link";
import {
  BuildingOfficeIcon,
  UserIcon,
  InboxStackIcon,
  ShieldCheckIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { getServerSupabaseClientReadyOnly } from "../data-service/supabaseReadOnly";
import { getcurrentOfficalData } from "../data-service/actions";

const mockProfile = {
  role: "Verified Official",
  department: "Public Works & Sanitation",
  status: "Active",

  lastLogin: "Today",
  resolvedCount: 412,
};

const MANAGEMENT_OPTIONS = [
  {
    title: "Issues Inbox",
    description: "Process all pending reports and update statuses.",
    href: "/dashboard/inbox",
    icon: <InboxStackIcon className="w-6 h-6 text-indigo-500" />,
  },
  {
    title: "My Account & Settings",
    description: "Manage login credentials and personal preferences.",
    href: "/account",
    icon: <UserIcon className="w-6 h-6 text-indigo-500" />,
  },
  {
    title: "Verification Requests",
    description: "Review and approve new official accounts (Admin only).",
    href: "/dashboard/verification",
    icon: <BuildingOfficeIcon className="w-6 h-6 text-indigo-500" />,
  },
];

export default async function DashboardPage() {
  const profile = mockProfile; // Placeholder for fetched user profile
  const data = await getcurrentOfficalData();
  const { name, governmentId } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header: Website Name acts as "Go to Home" button */}
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-extrabold text-indigo-600 hover:text-indigo-700 transition"
          >
            CityPulse
          </Link>
          <div className="flex space-x-4 items-center">
            <Link
              href="/"
              className="text-gray-600 hover:text-indigo-600 font-medium hidden sm:inline"
            >
              Go to Public Site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
        <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-2">
          {name}'s Command Center
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Profile and Key Metrics (1/3 width) */}
          <section className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Your Profile Status
            </h2>

            {/* Profile Card */}
            <div className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-indigo-600">
              <div className="flex items-center space-x-3 mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              </div>

              <dl className="text-sm space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500">Role:</dt>
                  <dd className="font-semibold text-indigo-700">
                    {profile.role}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500">Department:</dt>
                  <dd className="text-gray-800">{profile.department}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500">Badge ID:</dt>
                  <dd className="text-gray-800">{governmentId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500">Last Login:</dt>
                  <dd className="text-gray-800">{profile.lastLogin}</dd>
                </div>
              </dl>

              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-4xl font-extrabold text-green-600">
                  {profile.resolvedCount}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Issues Successfully Resolved
                </p>
              </div>
            </div>
          </section>

          <section className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Quick Actions & Navigation
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {MANAGEMENT_OPTIONS.map((option) => (
                <div
                  key={option.title}
                  className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:ring-2 ring-indigo-500 transition duration-150"
                >
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="p-3 bg-indigo-50 rounded-full">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {option.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </div>
              ))}

              <div className="block p-6 bg-white rounded-xl shadow-md border-2 border-dashed border-gray-300 text-center">
                <MapPinIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-gray-700">
                  Live Map View
                </h3>
                <p className="text-gray-500 text-sm">
                  Monitor all reports in real-time geographic locations.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} CityPulse Official.
        </div>
      </footer>
    </div>
  );
}
