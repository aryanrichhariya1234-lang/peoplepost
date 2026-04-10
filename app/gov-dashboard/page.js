"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GovermentBoard from "../components/GovernmentBoard";
import {
  getPosts,
  getAIInsights,
  getCurrentUser,
} from "../data-service/clientfunctions";

export default function GovDashboardPage() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [insights, setInsights] = useState("");
  const [user, setUser] = useState(null);

  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingAI, setLoadingAI] = useState(true);
  const [authLoading, setAuthLoading] = useState(true); // ✅ auth check

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser();

        if (!userData) {
          router.push("/login");
          return;
        }

        if (userData.role !== "official") {
          router.push("/");
          return;
        }

        // ✅ allowed
        setUser(userData);
      } catch (err) {
        console.log(err);
        router.push("/login");
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (authLoading || !user) return;

    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setData(posts || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [authLoading, user]);

  useEffect(() => {
    if (authLoading || !user) return;

    const fetchAI = async () => {
      try {
        const ai = await getAIInsights();
        setInsights(ai || "");
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingAI(false);
      }
    };

    fetchAI();
  }, [authLoading, user]);

  const handleUpdateLocalData = (updatedItem) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      )
    );
  };

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking access...
      </div>
    );
  }

  if (loadingPosts) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 rounded-2xl shadow-lg m-4">
        <h2 className="text-2xl font-bold mb-3">🤖 AI Decision Intelligence</h2>

        {loadingAI ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-white/30 rounded w-3/4"></div>
            <div className="h-4 bg-white/30 rounded w-2/3"></div>
            <div className="h-4 bg-white/30 rounded w-1/2"></div>
          </div>
        ) : (
          <div className="space-y-2 whitespace-pre-line text-sm md:text-base">
            {insights || "No insights available"}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        <GovermentBoard data={data} onUpdate={handleUpdateLocalData} />
      </div>
    </div>
  );
}
