"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { createPost } from "../data-service/clientfunctions";
import { getPosition } from "../data-service/utils";
import { useRouter } from "next/navigation";

export default function Reportproblem({ position }) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [coords, setCoords] = useState(null);

  // 🔥 sync with map click
  useEffect(() => {
    if (position) {
      setCoords(position);
    }
  }, [position]);

  function handleImageChange(e) {
    const files = Array.from(e.target.files);

    if (images.length >= 5) {
      toast.error("Max 5 images allowed");
      return;
    }

    const allowed = files.slice(0, 5 - images.length);

    setImages((prev) => [...prev, ...allowed]);

    setPreview((prev) => [
      ...prev,
      ...allowed.map((file) => URL.createObjectURL(file)),
    ]);
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  }

  async function getCurrentLocation() {
    try {
      const pos = await getPosition();

      const newCoords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      setCoords(newCoords);

      toast.success("Location captured 📍");
    } catch {
      toast.error("Unable to get location");
    }
  }

  async function onSubmit(data) {
    if (!coords) {
      toast.error("Please select location on map");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("category", data.category);
      formData.append("Address", data.address);
      formData.append("description", data.description);

      // 🔥 send location as string
      formData.append(
        "location",
        JSON.stringify({ lat: coords.lat, lng: coords.lng })
      );

      images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await createPost(formData);

      if (res?.error) {
        toast.error(res.message);
        return;
      }

      toast.success("Report submitted 🚀");
      router.replace("/account");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  }

  return (
    <div className="w-full md:w-5/12 lg:w-4/12 p-6 bg-white text-black overflow-y-auto">
      <Toaster position="top-center" />

      <div className="space-y-6">
        {/* TITLE */}
        <h1 className="text-3xl font-bold">Report a Problem</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* CATEGORY */}
          <select
            {...register("category")}
            required
            className="w-full p-3 border rounded"
          >
            <option value="">Select Category</option>
            <option>Pothole</option>
            <option>Streetlight</option>
            <option>Garbage</option>
            <option>Water and Drainage</option>
            <option>Public Safety</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            {...register("description")}
            required
            placeholder="Describe the issue..."
            className="w-full p-3 border rounded"
          />

          {/* ADDRESS */}
          <input
            {...register("address")}
            required
            placeholder="Enter address"
            className="w-full p-3 border rounded"
          />

          {/* IMAGE */}
          <div>
            <p className="font-semibold mb-2">Upload Images (max 5)</p>

            <input type="file" multiple onChange={handleImageChange} />

            <div className="flex gap-2 mt-3 flex-wrap">
              {preview.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} className="w-24 h-24 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-0 right-0 bg-red-500 text-white px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <button
              type="button"
              onClick={getCurrentLocation}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Use My Location
            </button>

            {coords && (
              <p className="text-sm mt-2">
                Selected: {coords.lat}, {coords.lng}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold"
          >
            Submit My Report
          </button>
        </form>
      </div>
    </div>
  );
}
