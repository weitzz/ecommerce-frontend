"use server"

import { apiFetch } from "@/libs/api"
import { HttpError } from "@/libs/Errors"
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
        const response = await apiFetch('/auth/register', {
            method: "POST",
            body: JSON.stringify({ name: data.name, email: data.email, password: data.password })
        })

        if (!response?.success) {
            return {
                success: false,
                errors: {
                    formError: "Erro ao registrar usuário"
                }
            };
        }
        return { success: true }

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        if (error instanceof HttpError) {
            if (error.status === 409) {
                return {
                    success: false,
                    errors: {
                        fieldErrors: {
                            email: "Email já está em uso"
                        }
                    }
                }
            }

            return {
                success: false,
                errors: {
                    formError: error.message
                }
            }

        }

        return {
            success: false,
            errors: {
                formError: "Erro inesperado"
            }
        }
    }
}