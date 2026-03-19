type CookieTarget = {
    set: (name: string, value: string, options?: Record<string, unknown>) => unknown
    delete: (name: string) => unknown
}

const isProd = process.env.NODE_ENV === "production"

export const accessTokenCookieOptions = {
    httpOnly: true,
    path: "/",
    sameSite: "lax" as const,
    secure: isProd,
    maxAge: 15 * 60
}

export const refreshTokenCookieOptions = {
    httpOnly: true,
    path: "/",
    sameSite: "lax" as const,
    secure: isProd,
    maxAge: 7 * 24 * 60 * 60
}

type AuthTokens = {
    accessToken: string
    refreshToken?: string | null
}

export const setAuthCookies = (
    cookieTarget: CookieTarget,
    tokens: AuthTokens
) => {
    cookieTarget.set("accessToken", tokens.accessToken, accessTokenCookieOptions)

    if (tokens.refreshToken) {
        cookieTarget.set("refreshToken", tokens.refreshToken, refreshTokenCookieOptions)
    }
}

export const clearAuthCookies = (cookieTarget: CookieTarget) => {
    cookieTarget.delete("accessToken")
    cookieTarget.delete("refreshToken")
}
