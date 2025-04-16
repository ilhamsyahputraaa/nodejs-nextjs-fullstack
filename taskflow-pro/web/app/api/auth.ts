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



export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // kirim cookie ke backend kalau pakai session
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json(); // ✅ parse response dulu

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  const token = data.token; // ✅ ambil token dari data

  const cookielogin = await cookies(); // ga perlu pakai await di sini

  // ✅ Set cookie
  cookielogin.set({
    name: "token",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  console.log("anda sudah login");
  console.log(data);

  return data;
}





export const getProfile = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Token not found");

  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch profile");

  return res.json();
};
