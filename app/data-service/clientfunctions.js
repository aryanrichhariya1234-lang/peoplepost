"use client";

import toast from "react-hot-toast";

// 🔥 USE ENV (IMPORTANT)
const BASE_URL = "https://peoplepost-go.onrender.com/api/v1";

// ================== AUTH ==================

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

// ================== USER ==================

export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;

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

    if (!res.ok) return null;

    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
};

// ================== POSTS ==================

export const getPosts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return [];

    const data = await res.json();

    return data.data || data || [];
  } catch {
    return [];
  }
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
  } catch {
    return {
      error: true,
      message: "Network error",
    };
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

    if (!res.ok || data.status === "error" || data.status === "fail") {
      return { error: true };
    }

    return data.data;
  } catch {
    return { error: true };
  }
};

export const toggleLikePost = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/${id}/like`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch {
    return { error: true };
  }
};

// ================== AI ==================

export const getAIInsights = async () => {
  try {
    const res = await fetch(`${BASE_URL}/ai/insights`, {
      credentials: "include",
    });

    if (!res.ok) return "Failed to load insights";

    const data = await res.json();
    return data.insights;
  } catch {
    return "Failed to load insights";
  }
};

// ================== FORM HANDLERS ==================

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
