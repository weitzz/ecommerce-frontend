"use server"

import { api } from "@/libs/axios"
import { AxiosError } from "axios"
import { RegisterSchema } from "@/schemas/register"

type RegisterData = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

type RegisterResponse = {
    success: boolean
    errors?: {
        fieldErrors?: {
            name?: string
            email?: string
            password?: string
            confirmPassword?: string
        }
        formError?: string
    }
}

export async function registerAction(data: RegisterData): Promise<RegisterResponse> {
    const parsed = RegisterSchema.safeParse(data)
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
        const response = await api.post('/user/register', { name: data.name, email: data.email, password: data.password })
        return { success: true }

    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 409) {
                return {
                    success: false,
                    errors: {
                        fieldErrors: {
                            email: 'Email já está em uso'
                        }
                    }
                }
            }
            return {
                success: false,
                errors: {
                    formError: error.response?.data?.message ?? "Erro ao registrar usuário"
                }
            }
        }
        return {
            success: false,
            errors: {
                formError: 'Erro inesperado no servidor. Tente novamente mais tarde.'
            }
        }

    }
}