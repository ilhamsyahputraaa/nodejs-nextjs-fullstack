"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";

const publicRoutes = ["/login", "/register"]; // halaman yg bisa diakses tanpa login

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  
  
  const { user, isLoading, hasCheckedAuth } = useAuthStore();
  const setCheckedAuth = useAuthStore((state) => state.setCheckedAuth);

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
        console.log("ini",user,token);
        
      } catch {
        logout();
      } finally {
        setCheckedAuth(true);
      }
    };
init()
  }, []);

useEffect(() => {
  if (!hasCheckedAuth) return;

  const isPublic = publicRoutes.includes(pathname);

  if (!user && !isPublic) {
    console.log("anda tidak terdaftar di tokennya");
    
    router.replace("/login");
  }

  if (user && isPublic) {
    router.replace("/dashboard");
  }
}, [user, pathname, hasCheckedAuth]);


  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return <>{children}</>;
}
