import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { clearAuthCookies, setAuthCookies } from "./libs/auth-cookies"
import { refreshAuthToken } from "./libs/auth-refresh"
import { isJwtExpired } from "./libs/jwt"

function redirectToLogin(req: NextRequest) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("redirect", req.nextUrl.pathname)
    const response = NextResponse.redirect(loginUrl)
    clearAuthCookies(response.cookies)
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

    const shouldRefresh = !accessToken || isJwtExpired(accessToken)

    if (!shouldRefresh) {
        return NextResponse.next()
    }

    try {
        const tokenData = await refreshAuthToken(refreshToken)

        if (!tokenData?.accessToken) {
            return redirectToLogin(req)
        }

        const response = NextResponse.next()
        setAuthCookies(response.cookies, tokenData)

        return response
    } catch {
        return redirectToLogin(req)
    }
}

export const config = {
    matcher: ["/me/:path*", "/dashboard/:path*", "/cart/:path*"]
}
