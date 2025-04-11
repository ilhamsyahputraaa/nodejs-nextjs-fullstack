# 🛡️ Auth Flow & Protected Route — Next.js + Zustand

## ✅ Alur Login & Auth

### 1. Backend: Login Controller

```ts
// POST /api/auth/login
const { email, password } = req.body;
const { user, token } = await loginUser(email, password);

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 1000 * 60 * 60 * 24, // 1 day
});

res.status(200).json({ user, token });
```

---

### 2. Frontend: Auth Store with Zustand

```ts
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  login: (user, token) => set({ user, token, isLoading: false }),
  logout: () => set({ user: null, token: null, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
```

---

### 3. Inisialisasi Auth di Provider

```tsx
"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login, logout, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/profile", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Unauthorized");

        const { user, token } = await res.json();
        login(user, token);
      } catch {
        logout();
      }
    };
    init();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
}
```

---

### 4. Proteksi Halaman

```tsx
// dashboard/page.tsx
import { useAuthStore } from "@/store/auth";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { user } = useAuthStore();
  if (!user) redirect("/login");

  return <div>Welcome, {user.email}</div>;
}
```

---

### 5. Login Page

```ts
const handleLogin = async () => {
  const res = await loginUser({ email, password });
  login(res.user, res.token);
  router.push("/dashboard");
};
```

---

## ⚠️ Masalah yang Pernah Muncul

| Masalah | Penyebab | Solusi |
|--------|----------|--------|
| `Invalid hook call` | Memanggil hook di luar React Component | Pindahkan ke `useEffect` dalam komponen |
| Halaman protected bisa diakses tanpa login | Tidak ada validasi user login | Tambahkan pengecekan dan redirect |
| Cookie tidak terbaca | Lupa `credentials: "include"` di fetch | Tambahkan option tersebut |
| Token tidak tersimpan di state FE | Token hanya di cookie server | Return token dari backend dan simpan di Zustand |

---

## 📌 Tips

- Gunakan cookie `httpOnly` untuk keamanan token.
- Gunakan `zustand` untuk state auth yang ringan dan reactive.
- Tambahkan `loading state` agar halaman tidak flicker saat auth dicek.
- Pisahkan `AuthProvider` di layout agar reusable di berbagai page.

---

## 📁 Struktur Rekomendasi

```
src/
│
├── store/
│   └── auth.ts        # Zustand store
├── hooks/
│   └── useInitAuth.ts # Init hook (optional, bisa merge ke provider)
├── components/
│   └── AuthProvider.tsx
├── pages/
│   └── login.tsx
│   └── dashboard.tsx
```

--- 