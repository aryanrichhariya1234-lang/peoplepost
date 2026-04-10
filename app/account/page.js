"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import ReportCard from "../components/ReportCard";
import {
  getCurrentUser,
  getCurrentUserData,
} from "../data-service/clientfunctions";

export default function AccountPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUserData();

      const userReports = data || [];
      setReports(Array.isArray(userReports) ? userReports : []);

      setLoading(false);
    };

    fetchUser();
  }, []);

  const resolvedCount = reports.filter((r) => r.status === "resolved").length;

  const pendingCount = reports.length - resolvedCount;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-black">
        Loading your reports...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* BACK */}
        <header className="flex justify-between items-center pb-4">
          <Link
            href="/"
            className="text-xl font-semibold text-indigo-600 hover:text-indigo-700 flex items-center space-x-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </header>

        {/* TITLE */}
        <header className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-extrabold">My Reported Issues</h1>
          <p className="text-gray-600 mt-1">
            Review all problems you've filed.
          </p>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-indigo-500">
            <p className="text-sm text-gray-500">Total Reports</p>
            <p className="text-4xl font-bold mt-1">{reports.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
            <p className="text-sm text-gray-500">Pending / In Progress</p>
            <p className="text-4xl font-bold text-yellow-600 mt-1">
              {pendingCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
            <p className="text-sm text-gray-500">Resolved</p>
            <div className="flex items-center space-x-2">
              <p className="text-4xl font-bold text-green-600 mt-1">
                {resolvedCount}
              </p>
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* REPORT LIST */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Report History</h2>

          <div className="space-y-4">
            {reports.length > 0 ? (
              reports.map((report) => (
                <ReportCard key={report._id} report={report} />
              ))
            ) : (
              <div className="p-6 bg-white rounded-xl text-center text-gray-500 border border-dashed">
                <p className="font-semibold mb-2">No reports filed yet!</p>
                <p className="text-sm">Start by reporting a problem.</p>

                <Link
                  href="/report"
                  className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium underline"
                >
                  File a New Report →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
