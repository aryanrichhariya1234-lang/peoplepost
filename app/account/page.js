import Link from "next/link";

import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import ReportCard from "../components/ReportCard";
import { getCurrentUserData } from "../data-service/actions";

export default async function AccountPage() {
  const data = await getCurrentUserData();
  const userReports = data?.data;

  const reports = Array.isArray(userReports) ? userReports : [];

  const resolvedCount = reports.filter((r) => r.status === "RESOLVED").length;
  const pendingCount = reports.length - resolvedCount;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="flex justify-between items-center pb-4">
          <Link
            href="/"
            className="text-xl font-semibold text-indigo-600 hover:text-indigo-700 transition flex items-center space-x-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to CityPulse Home</span>
          </Link>
        </header>

        <header className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            My Reported Issues
          </h1>
          <p className="text-gray-600 mt-1">
            Review the status and history of all problems you've filed.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500">
            <p className="text-sm font-medium text-gray-500">Total Reports</p>
            <p className="text-4xl font-bold text-gray-900 mt-1">
              {reports.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
            <p className="text-sm font-medium text-gray-500">
              Pending / In Process
            </p>
            <p className="text-4xl font-bold text-yellow-600 mt-1">
              {pendingCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <p className="text-sm font-medium text-gray-500">
              Successfully Resolved
            </p>
            <div className="flex items-center space-x-2">
              <p className="text-4xl font-bold text-green-600 mt-1">
                {resolvedCount}
              </p>
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Report History
          </h2>
          <div className="space-y-4">
            {reports.length > 0 ? (
              reports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))
            ) : (
              <div className="p-6 bg-white rounded-xl text-center text-gray-500 border border-dashed">
                <p className="font-semibold mb-2">No reports filed yet!</p>
                <p className="text-sm">
                  Start by reporting a problem in your neighborhood.
                </p>
                <Link
                  href="/report"
                  className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium underline"
                >
                  File a New Report &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
