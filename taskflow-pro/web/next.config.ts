import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  matcher: [
    "/dashboard/:path*", // ⬅️ Middleware hanya jalan untuk path ini
    "/dashboard"
  ],
};

export default nextConfig;
