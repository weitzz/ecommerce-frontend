"use server"

import { apiFetch } from "@/libs/api"
import { LoginSchema } from "@/schemas/login"
import { setServerAuthToken } from "@/libs/server-cookies"
import { zodToFieldErrors } from "@/libs/errors/zod"
import { ActionResult } from "@/libs/actions/types"


type LoginData = {
    email: string
    password: string
}

type LoginApiResponse = {
    token: string
}

export type LoginResponse = ActionResult<void, LoginData>


export async function loginAction(prevState: LoginResponse,
    formData: FormData): Promise<LoginResponse> {

    const parsed = LoginSchema.safeParse({
        email: formData.get("email") as string,
        password: formData.get("password") as string
    })


    if (!parsed.success) {
        return {
            success: false,
            errors: { fieldErrors: zodToFieldErrors(parsed.error) }
        }
    }

    const response = await apiFetch<LoginApiResponse>('/auth/login', {
        method: "POST",
        skipAuth: true,
        body: JSON.stringify(parsed.data)
    })

    if (!response.ok) {
        return {
            success: false,
            errors: {
                formError: response.error.data?.message ?? "Email ou senha inválidos"
            }
        }
    }

    await setServerAuthToken(response.data.token)

    return { success: true }


}
