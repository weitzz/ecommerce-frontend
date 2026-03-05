import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const isProd = process.env.NODE_ENV === "production"

function redirectToLogin(req: NextRequest) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("redirect", req.nextUrl.pathname)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete("accessToken")
    response.cookies.delete("refreshToken")
    return response
}

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get("accessToken")?.value
    const refreshToken = req.cookies.get("refreshToken")?.value

    const isPrivateRoute =
        req.nextUrl.pathname.startsWith("/me") ||
        req.nextUrl.pathname.startsWith("/dashboard") ||
        req.nextUrl.pathname.startsWith("/cart")

    if (!isPrivateRoute) {
        return NextResponse.next()
    }

    // rota privada sem sessão
    if (!refreshToken) {
        return redirectToLogin(req)
    }

    // sessão ativa
    if (accessToken) {
        return NextResponse.next()
    }

    // sem access token, tenta renovar com refresh token
    try {
        const refreshResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE}/auth/refresh`,
            {
                method: "POST",
                headers: {
                    Cookie: `refreshToken=${refreshToken};`,
                    "Content-Type": "application/json"
                },
                cache: "no-store"
            }
        )

        if (!refreshResponse.ok) {
            return redirectToLogin(req)
        }

        const result = await refreshResponse.json().catch(() => null)
        const newAccessToken = result?.data?.accessToken
        if (!newAccessToken) {
            return redirectToLogin(req)
        }

        const response = NextResponse.next()
        response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: isProd,
            maxAge: 15 * 60
        })

        const setCookie = refreshResponse.headers.get("set-cookie")
        const newRefreshToken = setCookie?.match(/refreshToken=([^;]+)/)?.[1]
        if (newRefreshToken) {
            response.cookies.set("refreshToken", newRefreshToken, {
                httpOnly: true,
                path: "/",
                sameSite: "lax",
                secure: isProd,
                maxAge: 7 * 24 * 60 * 60
            })
        }

        return response
    } catch {
        return redirectToLogin(req)
    }
}

export const config = {
    matcher: ["/me/:path*", "/dashboard/:path*", "/cart/:path*"]
}
