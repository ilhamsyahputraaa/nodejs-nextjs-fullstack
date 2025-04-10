import axiosInstance from "./axios";

export const register = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post("/auth/login", data);
  if (typeof window !== "undefined") {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

export const getProfile = async () => {
  const res = await axiosInstance.get("/auth/profile");
  return res.data.user;
};
