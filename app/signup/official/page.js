"use client";

import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { handleSignup } from "@/app/data-service/clientfunctions";

export default function OfficialSignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");
    const governmentId = formData.get("governmentId");

    const body = {
      name,
      email,
      password,
      passwordConfirm,
      governmentId,
      role: "official",
    };

    const res = await handleSignup(body);

    setLoading(false);

    if (res?.error) {
      toast.error(res.message || "Signup failed ❌");
      return;
    }

    toast.success("Account created! Await admin approval 🏛️");

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Government Official Sign Up
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Verification required. Your account will be reviewed by admin.
          </p>
        </div>

        {/* FORM */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3">
            {/* NAME */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="name"
                required
                className="w-full pl-10 pr-3 py-3 border rounded-lg"
                placeholder="Name"
              />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                required
                className="w-full pl-10 pr-3 py-3 border rounded-lg"
                placeholder="Email address"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="password"
                type="password"
                required
                className="w-full pl-10 pr-3 py-3 border rounded-lg"
                placeholder="Password"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="passwordConfirm"
                type="password"
                required
                className="w-full pl-10 pr-3 py-3 border rounded-lg"
                placeholder="Confirm Password"
              />
            </div>

            {/* GOVERNMENT ID */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Government ID
              </label>
              <input
                name="governmentId"
                required
                className="w-full px-3 py-3 border rounded-lg mt-1"
                placeholder="Department ID / Badge Number"
              />
              <p className="text-xs text-orange-500 mt-1">
                *Account will be verified manually by admin
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg text-white bg-teal-600 hover:bg-teal-700"
          >
            {loading ? "Creating..." : "Sign Up as Official"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <div className="text-center text-sm">
          <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
