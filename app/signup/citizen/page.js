import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { signUpAction } from "@/app/data-service/actions";

const FormStatusMessage = ({ message, success }) => {
  if (!message) return null;
  return (
    <div
      className={`p-3 rounded-md text-center ${
        success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default async function CitizenSignUpPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Citizen Sign Up
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join to report local issues and view community fixes.
          </p>
        </div>

        <form className="mt-8 space-y-6" action={signUpAction}>
          <input type="hidden" name="role" value="citizen" />

          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Name"
                />
              </div>
            </div>
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Password (min. 8 characters)"
                />
              </div>
            </div>

            <div>
              <label htmlFor="passwordConfirm" className="sr-only">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            Sign Up as Citizen
          </button>
        </form>

        <div className="text-center text-sm">
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
