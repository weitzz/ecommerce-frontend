"use server"

import { cookies } from "next/headers"

export async function refreshAuthToken(refreshTokenValue: string) {
    try {

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE}/auth/refresh`,
            {
                method: "POST",
                headers: {
                    Cookie: `refreshToken=${refreshTokenValue};`,
                    "Content-Type": "application/json"
                },
                cache: "no-store"
            }
        )

        if (!response.ok) return null

        const result = await response.json()

        const setCookie = response.headers.get("set-cookie")

        const newRefreshToken =
            setCookie?.match(/refreshToken=([^;]+)/)?.[1]

        const accessToken = result.data.accessToken

        const cookieStore = await cookies()

        // salva novo access token
        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        })

        // se refresh token rotacionou
        if (newRefreshToken) {
            cookieStore.set("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/"
            })
        }

        return {
            accessToken,
            refreshToken: newRefreshToken
        }

    } catch (error) {

        console.error("RefreshAuthToken", error)

        return null
    }
}