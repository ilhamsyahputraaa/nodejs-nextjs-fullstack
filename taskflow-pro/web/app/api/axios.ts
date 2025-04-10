// lib/serverApi.ts
import axios from "axios";
import { cookies } from "next/headers";

export const serverApi = async () => {
  const cookieStore = await cookies(); // ⛔ error kalau dipakai di non-async context
  const token = cookieStore.get("token")?.value;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return instance;
};
