"use server"

import { LoginSchema } from "@/schemas/login"
import { zodToFieldErrors } from "@/libs/errors/zod"
import { ActionResult } from "@/libs/actions/types"
import { cookies } from "next/headers"


type LoginData = {
    email: string
    password: string
}


export type LoginResponse = ActionResult<void, LoginData>


export async function loginAction(prevState: LoginResponse,
    formData: FormData): Promise<LoginResponse> {

    const parsed = LoginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })


    if (!parsed.success) {
        return {
            success: false,
            errors: { fieldErrors: zodToFieldErrors(parsed.error) }
        }
    }
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.data),
            cache: "no-store"
        })

        const data = await response.json().catch(() => null)
        if (!response.ok || !data?.data?.accessToken) {
            return {
                success: false,
                errors: {
                    formError:
                        data?.error?.message ??
                        data?.message ??
                        "Email ou senha inválidos"
                }
            }
        }
        const cookieStore = await cookies()
        const isProd = process.env.NODE_ENV === "production"

        cookieStore.set("accessToken", data.data.accessToken, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: isProd,
            maxAge: 15 * 60
        })

        const setCookie = response.headers.get("set-cookie")
        if (setCookie) {
            const refreshToken = setCookie.match(/refreshToken=([^;]+)/)?.[1]
            if (refreshToken) {
                cookieStore.set("refreshToken", refreshToken, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "lax",
                    secure: isProd,
                    maxAge: 7 * 24 * 60 * 60
                })
            }
        }

        return { success: true }

    } catch (error) {
        console.error("[loginAction]", error)
        return {
            success: false,
            errors: {
                formError: "Erro inesperado. Tente novamente."
            }
        }

    }


}
