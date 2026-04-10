"use client";

import Link from "next/link";
import {
  BuildingOfficeIcon,
  UserIcon,
  InboxStackIcon,
  ShieldCheckIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../data-service/clientfunctions";

// 🔥 fallback (only if backend fails)
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

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.log("User fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔥 HEADER */}
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-indigo-600">
            CityPulse
          </Link>

          <Link
            href="/"
            className="text-gray-600 hover:text-indigo-600 font-medium hidden sm:inline"
          >
            Go to Public Site
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 space-y-10">
        {/* 🔥 TITLE */}
        <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-2">
          {user?.name || "Official"}'s Command Center
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🔥 LEFT: PROFILE */}
          <section className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Your Profile Status
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-indigo-600">
              <div className="flex items-center space-x-3 mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  {user?.name || "Official"}
                </h3>
              </div>

              <dl className="text-sm space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Role:</dt>
                  <dd className="font-semibold text-indigo-700">
                    {user?.role || mockProfile.role}
                  </dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-gray-500">Department:</dt>
                  <dd className="text-gray-800">
                    {user?.department || mockProfile.department}
                  </dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-gray-500">User ID:</dt>
                  <dd className="text-gray-800">{user?._id || "N/A"}</dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-gray-500">Last Login:</dt>
                  <dd className="text-gray-800">{mockProfile.lastLogin}</dd>
                </div>
              </dl>

              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-4xl font-extrabold text-green-600">
                  {mockProfile.resolvedCount}
                </p>
                <p className="text-sm text-gray-600">Issues Resolved</p>
              </div>
            </div>
          </section>

          {/* 🔥 RIGHT: ACTIONS */}
          <section className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Quick Actions & Navigation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MANAGEMENT_OPTIONS.map((option) => (
                <Link
                  key={option.title}
                  href={option.href}
                  className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:ring-2 ring-indigo-500 transition"
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
                </Link>
              ))}

              {/* MAP CARD */}
              <div className="block p-6 bg-white rounded-xl shadow-md border-2 border-dashed border-gray-300 text-center">
                <MapPinIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-gray-700">
                  Live Map View
                </h3>
                <p className="text-gray-500 text-sm">
                  Monitor all reports geographically.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* 🔥 FOOTER */}
      <footer className="bg-gray-800 text-white py-6 mt-12 text-center text-sm">
        &copy; {new Date().getFullYear()} CityPulse Official
      </footer>
    </div>
  );
}
