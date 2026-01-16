"use server"

import { api } from "@/libs/axios"
import { AxiosError } from "axios"
import { LoginSchema } from "@/schemas/login"



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
            errors: {
                fieldErrors
            }
        }
    }
    try {
        const response = await api.post('/user/login', data)

        return { success: true, token: response.data.token }
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                success: false,
                errors: {
                    formError: error.response?.data?.errors || 'Credenciais inválidas'
                }
            }
        }

        return {
            success: false,
            errors: {
                formError: 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
            }
        }
    }
}