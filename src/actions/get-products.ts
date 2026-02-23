"use server"

import type { Product } from "@/types/products"
import { apiFetchServer } from "@/libs/api-server"



type ProductFilter = {
    metadata?: Record<string, string[]>
    orderBy?: 'views' | 'selling' | 'price'
    limit?: number
    search?: string
    page?: number
}


export const getProducts = async (
    filters: ProductFilter = {}
): Promise<Product[]> => {
    const params = new URLSearchParams()

    if (filters.metadata) {
        params.set("metadata", JSON.stringify(filters.metadata))
    }

    if (filters.orderBy) {
        params.set("orderBy", filters.orderBy)
    }

    if (typeof filters.limit === "number") {
        params.set("limit", String(filters.limit))
    }

    if (filters.search) {
        params.set("search", filters.search)
    }

    if (typeof filters.page === "number") {
        params.set("page", String(filters.page))
    }

    const query = params.toString()
    const path = query ? `/products?${query}` : "/products"

    const products = await apiFetchServer<Product[]>(path, {}, false)

    return products
}
