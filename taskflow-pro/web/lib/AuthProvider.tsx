"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { login, logout } from "@/store/authSlice";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
     const res = await fetch("http://localhost:8080/api/auth/profile", {
       credentials: "include", // Kirim cookie HttpOnly
     });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        console.log("✅ AuthProvider: logged in user", data);
        dispatch(login({ user: data.user, token: "dummy" }));
      } catch (err) {
        console.warn("❌ AuthProvider error", err);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    init();
  });

  useEffect(() => {
    if (!loading && !isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
