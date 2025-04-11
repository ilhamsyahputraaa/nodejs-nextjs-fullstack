"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { useInitAuth } from "@/hooks/useInitAuth";

const publicRoutes = ["/login", "/register"]; // halaman yg bisa diakses tanpa login

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setLoading = useAuthStore((state) => state.setLoading);

useEffect(() => {
  const init = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/profile", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Not logged in");

      const { user, token } = await res.json();
      login(user, token);
    } catch {
      logout();
    }
  };

  init();
}, []);

  useEffect(() => {
    if (isLoading) return; // tunggu auth selesai cek

    const isPublic = publicRoutes.includes(pathname);

    if (!user && !isPublic) {
      // belum login dan coba buka halaman private
      router.replace("/login");
    }

    if (user && isPublic) {
      // udah login tapi coba buka login/register
      router.replace("/dashboard");
    }
  }, [user, isLoading, pathname]);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return <>{children}</>;
}
