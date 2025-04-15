import { useAppDispatch } from "@/store";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";

export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      dispatch(logout());
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return { handleLogout };
}
