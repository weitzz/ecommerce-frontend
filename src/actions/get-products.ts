"use server"

import type { Product } from "@/types/products"
import { apiFetch } from "@/libs/api"
import type { ReadResult } from "@/libs/actions/types"
type ProductFilter = {
    metadata?: Record<string, string[]>
    orderBy?: 'views' | 'selling' | 'price'
    limit?: number
    search?: string
    page?: number
}

type GetProductsResponse = {
    success: boolean
    data: Product[]
}



export const getProducts = async (
    filters: ProductFilter = {}
): Promise<ReadResult<Product[]>> => {
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

    const result = await apiFetch<GetProductsResponse>(
        `/products?${params.toString()}`
    )

    if (!result.ok) {
        console.error("[getProducts]", result.error)
        return {
            ok: false,
            error: result.error
        }
    }

    return {
        ok: true,
        data: result.data.data
    }
}
