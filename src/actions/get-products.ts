"use server"

import { api } from "@/libs/axios"
import { Product } from "@/types/products"

type ProductFilter = {
    metadata?: Record<string, string>
    orderBy?: 'views' | 'selling' | 'price'
    limit?: number
}

export const getProducts = async (
    filters: ProductFilter
): Promise<Product[]> => {
    const params: Record<string, string | number> = {}

    if (filters.metadata) {
        params.metadata = JSON.stringify(filters.metadata)
    }

    if (filters.orderBy) {
        params.orderBy = filters.orderBy
    }

    if (typeof filters.limit === "number") {
        params.limit = filters.limit
    }

    try {
        const { data } = await api.get<Product[]>("/products", { params })

        return data
    } catch (error) {
        console.error("[getProducts]", error)
        return []
    }
}
