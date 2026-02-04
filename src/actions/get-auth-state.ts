"use server"

import { getServerAuthToken } from "@/libs/server-cookies"

export const getAuthState = async () => {
    const token = await getServerAuthToken()
    console.log(token)
    return { token }

}