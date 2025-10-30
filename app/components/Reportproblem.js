"use client";
import {
  ArrowLeftIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { getPosition } from "../data-service/utils";
import { redirect } from "next/navigation";
const PROBLEM_TYPES = ["Pothole", "Streetlight", "Garbage", "Other"];

const SubmitButton = () => {
  return (
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white text-lg font-bold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 flex items-center justify-center disabled:opacity-50"
    >
      <>
        <PaperAirplaneIcon className="w-5 h-5 mr-2 transform rotate-45 -mt-1" />
        Submit Report
      </>
    </button>
  );
};
function Reportproblem() {
  async function currentLocation() {
    const position = await getPosition();
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    if (lat && lng) redirect(`/report?lat=${lat}&lng=${lng}`);
  }
  return (
    <div className="w-full md:w-5/12 lg:w-4/12 flex-shrink-0 p-4 sm:p-8 md:overflow-y-auto">
      <div className="max-w-xl mx-auto md:max-w-none space-y-8">
        <header className="flex items-center space-x-3 border-b pb-4">
          <Link
            href="/"
            className="text-gray-600 hover:text-indigo-600 transition p-1 rounded-full hover:bg-gray-200"
            aria-label="Back to Homepage"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Report a Community Problem
            </h1>
            <p className="text-gray-600 text-sm">
              Please provide details and location for quick resolution.
            </p>
          </div>
        </header>

        <form className="bg-white p-6 rounded-xl shadow-2xl space-y-6">
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Problem Category
            </label>
            <select
              id="type"
              name="type"
              required
              className={`w-full p-3 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="">Select an issue type...</option>
              {PROBLEM_TYPES.map((type) => (
                <option key={type} value={type} className="text-black">
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              maxLength={100}
              className={`w-full p-3 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter a descriptive title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Detailed Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              className={`w-full p-3 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Describe the problem, its severity, and exact location details."
            />
          </div>

          <div className="border-t pt-6">
            <label className="block text-lg font-semibold text-gray-800 flex items-center mb-4">
              <PhotoIcon className="w-5 h-5 mr-2 text-indigo-600" />
              Upload Photos (1 of 5)
            </label>

            <div
              className={`relative border-2 border-dashed p-6 rounded-lg text-center transition ${"border-indigo-400/50 bg-indigo-50 hover:bg-indigo-100 cursor-pointer"}`}
            >
              <input
                id="image-upload"
                type="file"
                name="images-selector"
                multiple
                accept="image/jpeg,image/png"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <p className="text-gray-600 font-medium"></p>
              <p className="text-xs text-gray-500 mt-1">
                JPEG, PNG only. Max 5 files.
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <label className="block text-lg font-semibold text-gray-800 flex items-center mb-4">
              <MapPinIcon className="w-5 h-5 mr-2 text-indigo-600" />
              Location Details
            </label>

            <button
              type="button"
              onClick={currentLocation}
              className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition flex items-center justify-center mb-4 text-sm"
            >
              <MapPinIcon className="w-5 h-5 mr-2" />
              Capture My Current GPS Location
            </button>
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

export default Reportproblem;
