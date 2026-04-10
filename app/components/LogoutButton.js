"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { logoutUser } from "../data-service/clientfunctions";

export default function LogoutButton({ setUser }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();

    toast.success("Logged out");
    setUser(null);
    setTimeout(() => {
      router.replace("/");
    }, 1000);
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-600 hover:text-red-600 font-medium"
    >
      Sign Out
    </button>
  );
}
