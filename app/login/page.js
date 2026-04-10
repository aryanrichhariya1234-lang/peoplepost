"use client";

import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { loginHandler } from "../data-service/clientfunctions";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await loginHandler({ email, password });

    setLoading(false);

    if (res?.error) {
      toast.error(res.message || "Invalid credentials ❌");
      return;
    }

    toast.success("Login successful 🎉");

    // redirect after toast
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        {/* HEADER */}
        <div className="text-center">
          <Link href="/" className="text-3xl font-extrabold text-indigo-600">
            CityPulse
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* FORM */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* SIGNUP LINK */}
        <div className="text-center text-sm mt-6">
          <Link
            href="/signup"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
