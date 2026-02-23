"use server"

import { cookies } from "next/headers"

export const getAuthState = async () => {
    const cookieStore = await cookies()
    const isAuthenticated = cookieStore.has("accessToken")
    console.log(isAuthenticated)

    return { isAuthenticated }
}
