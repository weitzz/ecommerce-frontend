"use server"

import { api } from "@/libs/axios"
import { Product } from "@/types/products"

export const getRelatedProducts = async (id: number) => {
    try {
        const response = await api.get(`/product/${id}/related`, { params: { limit: 4 } })
        console.log(response.data.products)
        return response.data.products as Product[]
    } catch (error) {

    }
    return []
}