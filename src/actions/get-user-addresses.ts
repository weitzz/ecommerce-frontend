"use server"

import { api } from "@/libs/axios"
import { Address } from "@/types/address"
import { AxiosError } from "axios"




export const getUserAddresses = async (token: string): Promise<Address[]> => {
    try {
        const response = await api.get('/me/addresses', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data.addresses as Address[]
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

        throw new Error('Erro ao buscar endereços do usuário')
    }
}