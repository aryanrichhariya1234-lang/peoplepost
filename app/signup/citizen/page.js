"use client";

import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { handleSignup } from "@/app/data-service/clientfunctions";

export default function CitizenSignUpPage() {
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

    const body = {
      name,
      email,
      password,
      passwordConfirm,
      role: "citizen",
    };

    const res = await handleSignup(body);

    setLoading(false);

    if (res?.error) {
      toast.error(res.message || "Signup failed ❌");
      return;
    }

    toast.success("Account created successfully 🎉");

    // redirect after short delay so toast is visible
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Citizen Sign Up
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join to report local issues and view community fixes.
          </p>
        </div>

        {/* ✅ FIXED FORM */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-3">
            {/* NAME */}
            <div>
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
            </div>

            {/* EMAIL */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-3 py-3 border rounded-lg"
                  placeholder="Email"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
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
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
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
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? "Creating..." : "Sign Up"}
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
