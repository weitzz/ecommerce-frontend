"use server"

import { apiFetch } from "@/libs/api"
import { RegisterSchema } from "@/schemas/register"
import { zodToFieldErrors } from "@/libs/errors/zod"
import { ActionResult } from "@/libs/actions/types"


type RegisterData = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export type RegisterResponse = ActionResult<void, RegisterData>


export async function registerAction(prevState: RegisterResponse, formData: FormData): Promise<RegisterResponse> {

    const parsed = RegisterSchema.safeParse({
        name: formData.get('name') as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get('confirmPassword') as string
    })

    if (!parsed.success) {
        return {
            success: false,
            errors: { fieldErrors: zodToFieldErrors(parsed.error) }
        }
    }


    const response = await apiFetch<RegisterResponse>('/auth/register', {
        method: "POST",
        body: JSON.stringify(parsed.data)
    })

    if (!response?.ok) {
        return {
            success: false,
            errors: {
                formError: response.error.data?.message ?? "Erro ao registrar usuário"
            }
        };
    }
    return { success: true }


}