"use server"

import { apiFetch } from "@/libs/api"
import { LoginSchema } from "@/schemas/login"
import { setServerAuthToken } from "@/libs/server-cookies"


type LoginData = {
    email: string
    password: string
}

type LoginResponse = {
    success: boolean
    token?: string
    errors?: {
        fieldErrors?: {
            email?: string
            password?: string
        }
        formError?: string
    }
}


export async function loginAction(data: LoginData): Promise<LoginResponse> {
    const parsed = LoginSchema.safeParse(data)

    if (!parsed.success) {
        const fieldErrors: Record<string, string> = {}
        parsed.error.issues.forEach(issue => {
            const field = issue.path[0] as string
            fieldErrors[field] = issue.message
        })
        return {
            success: false,
            errors: { fieldErrors }
        }
    }

    try {
        const response = await apiFetch('/auth/login', {
            method: "POST",
            body: JSON.stringify({
                email: parsed.data.email,
                password: parsed.data.password
            })
        })

        await setServerAuthToken(response.token)

        return { success: true }

    } catch (error) {
        return {
            success: false,
            errors: {
                formError: "Email ou senha inválidos"
            }
        }
    }
}