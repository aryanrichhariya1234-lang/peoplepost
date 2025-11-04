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
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { submitReport } from "../data-service/clientfunctions";
import toast, { Toaster } from "react-hot-toast";

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

function Reportproblem({ id }) {
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);

  async function currentLocation() {
    const position = await getPosition();
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    if (lat && lng) redirect(`/report?lat=${lat}&lng=${lng}`);
  }

  const router = useRouter();
  const searchParams = useSearchParams();
  let lat = searchParams.get("lat") || "";
  let lng = searchParams.get("lng") || "";

  function handleImageChange(e) {
    const newFiles = Array.from(e.target.files);

    if (images.length >= 5) {
      toast.error("Maximum of 5 images allowed.");
      return;
    }

    let filesToAdd = [];
    let imageUrlsToAdd = [];

    // Determine how many files we can actually add (max 5)
    const remainingSlots = 5 - images.length;

    for (let i = 0; i < newFiles.length && i < remainingSlots; i++) {
      const file = newFiles[i];
      filesToAdd.push(file);
      imageUrlsToAdd.push(URL.createObjectURL(file));
    }

    if (newFiles.length > remainingSlots) {
      toast.error(`Only ${remainingSlots} more images could be added.`);
    }

    setImages((data) => [...data, ...filesToAdd]);
    setImage((data) => [...data, ...imageUrlsToAdd]);

    // Clear the input value so the same files can be selected again
    e.target.value = null;
  }

  function removeImage(indexToRemove) {
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(image[indexToRemove]);

    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setImage((prevImageUrls) =>
      prevImageUrls.filter((_, index) => index !== indexToRemove)
    );
  }

  async function onSubmit(data) {
    const { title, description, category, address } = data;
    const userId = id;
    const data1 = await submitReport(
      title,
      description,
      category,
      images,
      lat,
      lng,
      userId,
      address
    );
    toast.success("Report successfully submitted");
    router.push("/account");
  }

  const { register, handleSubmit } = useForm();
  const imageCount = images.length;
  const isUploadDisabled = imageCount >= 5;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            backgroundColor: "white",
            textAlign: "center",
            padding: "16px 24px",
            fontSize: "16px",
          },
        }}
        gutter={12}
        containerStyle={{ margin: "8px" }}
      />
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

          <form
            className="bg-white p-6 rounded-xl shadow-2xl space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Problem Category
              </label>
              <select
                id="category"
                name="category"
                required
                {...register("category")}
                className={` w-full placeholder-black text-black p-3 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`}
              >
                <option value="" className="text-black placeholder-black">
                  Select an issue type...
                </option>
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
                {...register("title")}
                required
                maxLength={100}
                className={`w-full placeholder-black text-black p-3 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`}
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
                {...register("description")}
                rows={4}
                required
                className={`w-full placeholder-black text-black p-3 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="Describe the problem, its severity, and exact location details."
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                {...register("address")}
                required
                maxLength={100}
                className={`w-full placeholder-black text-black p-3 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="Enter the address"
              />
            </div>

            <div className="border-t pt-6">
              <label className="block text-lg font-semibold text-gray-800 flex items-center mb-4">
                <PhotoIcon className="w-5 h-5 mr-2 text-indigo-600" />
                Upload Photos ({imageCount} of 5)
              </label>

              <div
                className={`relative border-2 border-dashed p-6 rounded-lg text-center transition ${
                  isUploadDisabled
                    ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                    : "border-indigo-400/50 bg-indigo-50 hover:bg-indigo-100 cursor-pointer"
                }`}
              >
                <input
                  id="image-upload"
                  type="file"
                  name="images"
                  multiple
                  disabled={isUploadDisabled}
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/jpg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <p className="text-gray-600 font-medium">
                  {isUploadDisabled
                    ? "Maximum 5 images reached"
                    : "Click to upload or drag & drop files here."}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPEG, PNG only. Max 5 files.
                </p>
              </div>

              {/* Image Previews with Remove Button */}
              <div className="flex flex-wrap gap-3 mt-4">
                {image.map((item, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={item}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition"
                      aria-label="Remove image"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
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

              {/* Display Lat/Lng if available */}
              {(lat || lng) && (
                <p className="text-sm text-gray-600 mt-2 p-2 bg-indigo-50 rounded-md">
                  Location Captured: Lat:{" "}
                  <span className="font-semibold">{lat}</span>, Lng:{" "}
                  <span className="font-semibold">{lng}</span>
                </p>
              )}
            </div>

            <SubmitButton />
          </form>
        </div>
      </div>
    </>
  );
}

export default Reportproblem;
