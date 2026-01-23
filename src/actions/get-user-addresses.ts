"use server"

import { apiFetch } from "@/libs/api"
import { Address } from "@/types/address"


export const getUserAddresses = async (token: string): Promise<Address[]> => {
    try {
        const result = await apiFetch('/me/addresses', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (Array.isArray(result)) {
            return result
        }

        if (result?.addresses && Array.isArray(result.addresses)) {
            return result.addresses
        }

        if (result?.data && Array.isArray(result.data)) {
            return result.data
        }


        return []

    } catch (error) {
        console.error('Erro ao buscar endereços:', error)
        return []
    }
}
