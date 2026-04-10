"use server";

export const getId = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/v1/users/me", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    return data?.user?._id || null;
  } catch (err) {
    return null;
  }
};
