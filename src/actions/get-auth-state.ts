"use server"

import { apiFetchServer } from "@/libs/api-server"

export const getAuthState = async () => {
    try {
        await apiFetchServer("/me")
        return { isAuthenticated: true }
    } catch {
        return { isAuthenticated: false }
    }

}
