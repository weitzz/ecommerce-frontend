"use server"

import { clearServerAuthToken } from "@/libs/server-cookies"
import { redirect } from "next/navigation"

export const clearAuthCookie = async () => {
    await clearServerAuthToken()
    redirect("/")
}