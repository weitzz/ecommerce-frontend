"use server"

import { api } from "@/libs/axios"
import { AxiosError } from "axios"


type RegisterData = {
    name: string
    email: string
    password: string
}

export async function registerAction({ name, email, password }: RegisterData): Promise<{ error: string | null }> {

    try {
        const response = await api.post('/user/register', { name, email, password })
        return { error: null }
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Erro Axios:', {
                status: error.response?.status,
                data: error.response?.data,
            })
        }
        else {
            console.error('Erro inesperado:', error)
        }

        return { error: 'Erro ao registrar usuário' }
    }
}