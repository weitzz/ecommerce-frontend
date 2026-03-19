import { clearAuthCookies, setAuthCookies } from "@/libs/auth-cookies"
import { refreshAuthToken } from "@/libs/auth-refresh"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get("refreshToken")?.value

    if (!refreshToken) {
        const response = NextResponse.json(
            { success: false, error: "Refresh token ausente" },
            { status: 401 }
        )
        clearAuthCookies(response.cookies)
        return response
    }

    const tokenData = await refreshAuthToken(refreshToken)

    if (!tokenData?.accessToken) {
        const response = NextResponse.json(
            { success: false, error: "Sessão expirada" },
            { status: 401 }
        )
        clearAuthCookies(response.cookies)
        return response
    }

    const response = NextResponse.json({
        success: true,
        data: {
            accessToken: tokenData.accessToken
        }
    })

    setAuthCookies(response.cookies, tokenData)

    return response
}
