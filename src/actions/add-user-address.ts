"use server"


import { api } from "@/libs/axios"
import { Address } from "@/types/address"
import { AxiosError } from "axios"
import { getUserAddresses } from "./get-user-addresses"


export const addUserAddress = async (token: string, address: Address): Promise<Address[]> => {
    try {
        const response = await api.post('/me/addresses', { ...address }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return getUserAddresses(token)
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

        throw new Error('Erro ao cadastrar endereços do usuário')
    }
}