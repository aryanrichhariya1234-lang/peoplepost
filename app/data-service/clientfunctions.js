"use client";

import toast from "react-hot-toast";
const BASE_URL = "https://peoplespost-3rje.onrender.com/api/v1";
// const BASE_URL = "http://localhost:3000/api/v1";
console.log(BASE_URL);
export const handleSignup = async (body) => {
  try {
    const res = await fetch(`${BASE_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        error: true,
        message: data.message || "Signup failed",
      };
    }

    return { success: true };
  } catch {
    return { error: true, message: "Network error" };
  }
};

export const loginHandler = async (body) => {
  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok || data.status === "error" || data.status === "fail") {
      return { error: true, message: "Invalid credentials" };
    }

    return { success: true };
  } catch {
    return { error: true, message: "Network error" };
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: true, message: data.message };
    }

    return { success: true };
  } catch {
    return { error: true, message: "Network error" };
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    return data.user || null;
  } catch {
    return null;
  }
};
export const getCurrentUserData = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
};

export const getPosts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok || data.status === "error" || data.status === "fail") {
      return [];
    }

    return data.data || data || []; // ✅ FIXED
  } catch {
    return [];
  }
};

export const updatePost = async ({ body, issue }) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/${issue.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok || data.status === "error" || data.status === "fail") {
      return { error: true };
    }

    return { success: true };
  } catch {
    return { error: true };
  }
};

export const handleLoginSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const result = await loginHandler({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (result.error) {
    toast.error(result.message);
    return;
  }

  toast.success("Login successful 🎉");

  setTimeout(() => {
    window.location.href = "/";
  }, 800);
};

export const handleSignupSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const body = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
    governmentId: formData.get("governmentId"),
    role: formData.get("governmentId") ? "official" : "citizen",
  };

  const result = await handleSignup(body);

  if (result.error) {
    toast.error(result.message);
    return;
  }

  toast.success("Signup successful 🎉");

  setTimeout(() => {
    window.location.href = "/login";
  }, 800);
};

export const createPost = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || data.status === "fail") {
      return {
        error: true,
        message: data.message || "Failed to create post",
      };
    }

    return {
      success: true,
      post: data.data,
    };
  } catch (err) {
    return {
      error: true,
      message: "Network error",
    };
  }
};

export const toggleLikePost = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/posts/${id}/like`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch (err) {
    return { error: true };
  }
};

export const getAIInsights = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/v1/ai/insights", {
      credentials: "include",
    });

    const data = await res.json();
    return data.insights;
  } catch {
    return "Failed to load insights";
  }
};
