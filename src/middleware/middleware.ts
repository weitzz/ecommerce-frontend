import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { refreshAuthToken } from "@/libs/auth-refresh"

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const isPrivateRoute = req.nextUrl.pathname.startsWith("/me")

    if (!refreshToken && !isPrivateRoute) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    if (!accessToken && refreshToken && isPrivateRoute) {
        const tokens = await refreshAuthToken(refreshToken);

        if (tokens) {
            res.cookies.set("accessToken", tokens.accessToken, { httpOnly: true, path: "/", maxAge: 900 }); // 15min
            if (tokens.refreshToken) {
                res.cookies.set("refreshToken", tokens.refreshToken, { httpOnly: true, path: "/", maxAge: 604800 }); // 7d
            }
            return res;
        } else {
            const loginRes = NextResponse.redirect(new URL("/login", req.url));
            loginRes.cookies.delete("accessToken");
            loginRes.cookies.delete("refreshToken");
            return loginRes;
        }
    }

    return res;
}

export const config = {
    matcher: ["/me/:path*", "/dashboard/:path*", "/login"]
}