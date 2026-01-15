"use server"

import { api } from "@/libs/axios"
import { AxiosError } from "axios"



type LoginData = {
    email: string
    password: string
}

export async function loginAction({ email, password }: LoginData): Promise<{ error: string | null, token?: string }> {
    try {
        const response = await api.post('/user/login', { email, password })
        return { error: null, token: response.data.token }
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                error: error.response?.data?.message ?? 'Acesso negado'
            }
        }
        else {
            console.error('Erro inesperado:', error)
        }

        return {
            error: 'Acesso negado'
        }
    }
}