// /lib/api/axios.client.ts
import axios from "axios";

export const getAuthAxiosClient = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
