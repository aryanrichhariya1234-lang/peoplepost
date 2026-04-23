"use server";
const BASE_URL = "https://peoplepost-go.onrender.com/api/v1";
export const getId = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    return data?.user?._id || null;
  } catch (err) {
    return null;
  }
};
