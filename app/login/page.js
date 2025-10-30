import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { login } from "../data-service/actions";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <Link href="/" className="text-3xl font-extrabold text-indigo-600">
            CityPulse Login
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" action={login}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border ${"border-gray-300"} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  name="password"
                  className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border ${"border-gray-300"} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm mt-6">
          <a
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don&apos;t have an account? Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
