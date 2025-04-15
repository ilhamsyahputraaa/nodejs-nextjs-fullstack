// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;


  const token = req.cookies.get("token")?.value;

  if (PUBLIC_ROUTES.includes(pathname)) {
    if (token) {

    console.log("anda sudah punya token, gaboleh ke login")
    return NextResponse.redirect(new URL('/', req.url));
    } else {
  return NextResponse.next();
    }
  }
  console.log("token dari middleware",token);
  
  if (!token) {
    console.log("anda tidak punya token");
    
    return NextResponse.redirect(new URL("/login", req.url));

  }


  // ✅ Token ada, biarkan backend yang verify
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
