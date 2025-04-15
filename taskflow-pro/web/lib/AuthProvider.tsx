"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/store";
import { login, logout } from "@/store/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePathname, useRouter } from "next/navigation";

const publicRoutes = ["/login", "/register"];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const init = async () => {
      const token = Cookies.get("token");

      if (!token) {
        dispatch(logout());
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/auth/profile", {
          credentials: "include", // supaya cookie HttpOnly bisa kebaca
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Invalid token");

        const data = await res.json();
        dispatch(login({ user: data.user, token }));
      } catch (err) {
        dispatch(logout());
        Cookies.remove("token");
      }
    };

    init();
  }, []);

  // Redirect ke login kalau belum login dan buka private route
  useEffect(() => {
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [isAuthenticated, pathname]);

  return <>{children}</>;
}
