"use server"

import { api } from "@/libs/axios"
import { Product } from "@/types/products"
import { AxiosError } from "axios"

export const getProductsFromList = async (ids: (string | number)[]) => {

    try {
        const response = await api.post('/cart/mount', { ids })
        return response.data.products as Product[]
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Erro Axios:', {
                status: error.response?.status,
                data: error.response?.data,
            })
        } else {
            console.error('Erro inesperado:', error)
        }

        throw new Error('Erro ao montar carrinho')
    }
}