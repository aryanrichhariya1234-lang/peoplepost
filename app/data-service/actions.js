"use server";
const BASE_URL = "https://peoplespost-3rje.onrender.com/api/v1";
export const getId = async () => {
  try {
    const res = await fetch(
      "https://peoplespost-3rje.onrender.com/api/v1/users/me",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await res.json();

    return data?.user?._id || null;
  } catch (err) {
    return null;
  }
};
