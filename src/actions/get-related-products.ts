"use server"

import { ReadResult } from "@/libs/actions/types"
import { apiFetch } from "@/libs/api"
import { Product } from "@/types/products"


type GetProductsRelatedApiResponse = {
    success: boolean
    data: {
        products: Product[]
    }
}

const params = new URLSearchParams({
    limit: "4"
})

export const getRelatedProducts = async (id: number): Promise<Product[]> => {
    const response = await apiFetch<GetProductsRelatedApiResponse>(`/products/${id}/related?${params.toString()}`)

    if (!response.success) {
        console.error("[getRelatedProducts]", response.error)
        throw response.error // 🔥 ponto-chave
    }

    return response.data.data.products


}