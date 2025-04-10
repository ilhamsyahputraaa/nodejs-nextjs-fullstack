'use server'

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // if (!res.ok) throw new Error("Register failed");
  return res.json();
};


export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    // ⛔ TIDAK PERLU credentials karena ini server-side
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}



export const getProfile = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Token not found");

  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");

  return res.json();
};
