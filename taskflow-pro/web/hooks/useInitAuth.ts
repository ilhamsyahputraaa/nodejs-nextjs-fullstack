// hooks/useInitAuth.ts
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";

export function useInitAuth() {
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
}
