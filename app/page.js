import Link from "next/link";
import StatusBadge from "./components/StatusBadge";
import { getServerSupabaseClient } from "./data-service/supabaseServer";
import { signout } from "./data-service/actions";
import { getServerSupabaseClientReadyOnly } from "./data-service/supabaseReadOnly";

const LATEST_REPORTS = [
  {
    id: 1,
    title: "Large Pothole on Main St.",
    status: "NEW",
    time: "2 hours ago",
    location: "Downtown",
    imageUrl: "/images/pothole_placeholder.jpg",
  },
  {
    id: 2,
    title: "Overflowing Dumpster on Elm",
    status: "IN_PROCESS",
    time: "15 minutes ago",
    location: "North End",
    imageUrl: "/images/garbage_placeholder.jpg",
  },
  {
    id: 3,
    title: "Streetlight Out Near Park",
    status: "RESOLVED",
    time: "Yesterday",
    location: "West Side",
    imageUrl: "/images/streetlight_placeholder.jpg",
  },
];

const STATS = [
  { value: "1,500+", label: "Problems Reported", color: "indigo" },
  { value: "92%", label: "Issues Successfully Resolved", color: "green" },
  { value: "2.1 Days", label: "Average Resolution Time", color: "yellow" },
];

export default async function page() {
  const supabase = await getServerSupabaseClientReadyOnly();
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData.session?.user;
  const email = user?.email;

  let userRole = null;
  let name = "Guest";
  let isLoggedIn = !!user;

  if (user) {
    const { data, error } = await supabase
      .from("users")
      .select("name,role")
      .eq("email", email)
      .single();

    if (data) {
      console.log(data);
      userRole = data.role || "citizen";
      name = data.name || email.split("@")[0];

      name = name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      name = email.split("@")[0];
      name = name.charAt(0).toUpperCase() + name.slice(1);
      userRole = "citizen";
    }
  }

  const reportLink = userRole === "official" ? "/gov-dashboard" : "/report";
  const reportButtonText =
    userRole === "official" ? "Go to Dashboard" : "Report a New Problem";
  const userDashboardLink =
    userRole === "official" ? "/dashboard/inbox" : "/account";

  const NavLinks = () => {
    if (isLoggedIn) {
      const displayName = name || "Account";

      return (
        <div className="flex space-x-4 items-center">
          <Link
            href={userDashboardLink}
            className="text-white bg-indigo-600 hover:bg-indigo-700 font-medium py-2 px-4 rounded-lg transition duration-150"
          >
            {displayName}
          </Link>

          <form action={signout}>
            <button
              type="submit"
              className="text-gray-600 hover:text-red-600 font-medium transition duration-150 py-2 px-1"
            >
              Sign Out
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="flex space-x-4 justify-center items-center">
          <Link
            href="/login"
            className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150 hidden md:inline"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition duration-150"
          >
            Sign Up
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-indigo-600">
            CityPulse
          </Link>
          <NavLinks />
        </div>
      </nav>

      <section className="bg-indigo-50 pt-16 pb-16 px-4 text-center md:pt-24 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight sm:text-5xl md:text-6xl">
            See It. Report It.{" "}
            <span className="text-indigo-600 block sm:inline">Resolve It.</span>
          </h1>

          {userRole === "citizen" && (
            <p className="mt-4 text-lg font-semibold text-gray-700 max-w-2xl mx-auto sm:text-xl">
              Welcome back, {name}! Thank you for your continued help.
            </p>
          )}
          {userRole !== "citizen" && (
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto sm:text-xl">
              {userRole === "official"
                ? "Your management hub is ready for action."
                : "Your direct connection to city services. Post neighborhood issues and track progress in real-time."}
            </p>
          )}

          <Link
            href={reportLink}
            className="mt-8 inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-xl hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.02] text-lg"
          >
            {reportButtonText}
          </Link>
          {/* ---------------------------------------------------- */}
        </div>
      </section>

      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl shadow-lg border-t-4 border-${stat.color}-500 text-center transition duration-200 hover:shadow-xl`}
            >
              <p className="text-4xl font-extrabold text-gray-900">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {(userRole !== "citizen" || !isLoggedIn) && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-3">
              🚨 Latest Community Reports
            </h2>

            <div className="space-y-4">
              {LATEST_REPORTS.map((report) => (
                <div
                  key={report.id}
                  href={`/problems/${report.id}`}
                  className="block bg-white p-4 rounded-xl shadow-md transition duration-150 hover:shadow-lg hover:ring-2 ring-indigo-500/50 md:flex md:items-center md:space-x-4"
                >
                  <div className="flex-1 mt-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {report.title}
                      </h3>
                      <div className="mt-2 md:mt-0 md:ml-4 flex justify-start md:justify-end">
                        <StatusBadge status={report.status} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Reported {report.time} in the **{report.location}**
                      District.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center"></div>
          </div>
        </section>
      )}

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} CityPulse. Built with Next.js &
          Supabase.
        </div>
      </footer>
    </div>
  );
}
