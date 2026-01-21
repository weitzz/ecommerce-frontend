"use server"

import { api } from "@/libs/axios"
import { Product } from "@/types/products"

type ProductFilter = {
    metadata?: Record<string, string[]>
    orderBy?: 'views' | 'selling' | 'price'
    limit?: number
    search?: string
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
    } else {
        params.orderBy
    }

    if (typeof filters.limit === "number") {
        params.limit = filters.limit
    }
    if (filters.search) {
        params.search = filters.search
    }

    try {
        const response = await api.get("/products", { params })
        return response.data.products as Product[]
    } catch (error) {
        console.error("[getProducts]", error)
        return []
    }
}
