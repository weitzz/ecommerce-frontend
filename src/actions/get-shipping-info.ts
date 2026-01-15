"use server"

import { api } from "@/libs/axios"
import { AxiosError } from "axios"


type ShippingInfoResponse = {
    zipcode: string
    cost: number
    days: number
}

export const getShippingInfo = async (zipcode: string): Promise<ShippingInfoResponse | false> => {
    try {
        const response = await api.get('/cart/shipping', { params: { zipcode } })
        return response.data as ShippingInfoResponse
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

        throw new Error('Erro ao calcular frete')
    }
}