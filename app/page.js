"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";

import StatusBadge from "./components/StatusBadge";
import {
  getPosts,
  getCurrentUser,
  logoutUser,
  toggleLikePost,
} from "./data-service/clientfunctions";

// 🔥 Recharts
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Page() {
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});

  // 🎨 COLORS
  const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts();
      const userData = await getCurrentUser();

      setReports(posts || []);
      setUser(userData || null);

      const likedMap = {};
      posts.forEach((post) => {
        const isLiked = post.likes?.some((l) => l.user === userData?._id);
        if (isLiked) likedMap[post._id] = true;
      });

      setLikedPosts(likedMap);
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleLike = async (id) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const res = await toggleLikePost(id);
    if (res.error) return;

    setLikedPosts((prev) => ({
      ...prev,
      [id]: res.liked,
    }));

    setReports((prev) =>
      prev.map((p) =>
        p._id === id
          ? {
              ...p,
              likes: res.liked
                ? [...(p.likes || []), { user: user._id }]
                : p.likes.filter((l) => l.user !== user._id),
            }
          : p
      )
    );
  };

  const handleLogout = async () => {
    await logoutUser();
    window.location.reload();
  };

  const reportLink = !user
    ? "/login"
    : user.role === "official"
    ? "/gov-dashboard"
    : "/report";

  // ================== 📊 CHART DATA ==================
  const cityCount = {};
  const categoryCount = {};
  const userCount = {};

  reports.forEach((post) => {
    cityCount[post.city] = (cityCount[post.city] || 0) + 1;
    categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
    userCount[post.user] = (userCount[post.user] || 0) + 1;
  });

  const cityData = Object.keys(cityCount).map((key) => ({
    name: key,
    value: cityCount[key],
  }));

  const categoryData = Object.keys(categoryCount).map((key) => ({
    name: key,
    value: categoryCount[key],
  }));

  const userData = Object.keys(userCount).map((key) => ({
    name: key.slice(-4),
    value: userCount[key],
  }));

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black">
      {/* 🔥 NAVBAR */}
      <nav className="bg-white/80 backdrop-blur border-b px-8 py-5 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <h1 className="text-3xl font-extrabold text-indigo-600">CityPulse</h1>

        <div className="flex items-center space-x-6 text-base font-medium">
          {!user ? (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/signup"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                href={user.role === "official" ? "/gov-dashboard" : "/account"}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                {user.role === "official" ? "Dashboard" : user.name}
              </Link>

              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* 🔥 HERO */}
      <section className="text-center py-20 px-4 bg-gradient-to-b from-indigo-50 via-white to-white">
        <h1 className="text-5xl font-extrabold">People’s Posts</h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          A unified platform for citizens to report civic issues.
        </p>

        <Link
          href={reportLink}
          className="mt-10 inline-block bg-indigo-600 text-white px-10 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
        >
          {user?.role === "official" ? "Go to Dashboard" : "Report a Problem"}
        </Link>
      </section>

      {/* 🔥 CHARTS */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">
          📊 City Insights Dashboard
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {/* 🌆 CITY */}
          <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center">
            <h3 className="font-semibold text-lg mb-6">Issues by City</h3>

            <PieChart width={400} height={350}>
              <Pie data={cityData} dataKey="value" outerRadius={130} label>
                {cityData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* 🏷 CATEGORY */}
          <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center">
            <h3 className="font-semibold text-lg mb-6">Issues by Category</h3>

            <BarChart width={400} height={350} data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </div>

          {/* 👤 USERS */}
          <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center">
            <h3 className="font-semibold text-lg mb-6">Top Reporters</h3>

            <BarChart width={400} height={350} data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {userData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </section>

      {/* 🔥 REPORTS */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold mb-6">Latest Reports</h2>

        <div className="space-y-6">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div
                key={report._id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{report.category}</h3>

                  <StatusBadge status={report.status} />
                </div>

                <p className="text-sm text-gray-500 mt-1">{report.Address}</p>

                <p className="mt-3 text-gray-700">{report.description}</p>

                {report.images?.length > 0 && (
                  <img
                    src={report.images[0]}
                    className="mt-4 h-52 w-full object-cover rounded-xl cursor-pointer hover:scale-105 transition"
                    onClick={() => setSelectedImage(report.images[0])}
                  />
                )}

                <div className="flex justify-between items-center mt-5 pt-3 border-t">
                  <span className="text-xs text-gray-500 capitalize">
                    Status: {report.status.replace("_", " ")}
                  </span>

                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">
                      {report.likes?.length || 0} likes
                    </span>

                    <button onClick={() => toggleLike(report._id)}>
                      <HeartIcon
                        className={`w-5 h-5 ${
                          likedPosts[report._id]
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No reports found</p>
          )}
        </div>
      </section>

      {/* 🔥 IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-h-[90%] max-w-[90%] rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}
