"use server"

import { apiFetchServer } from "@/libs/api-server"
import { Product } from "@/types/products"

type RelatedProductsResponse = {
    products: Product[]
}

export const getRelatedProducts = async (
    id: number
): Promise<Product[]> => {

    const params = new URLSearchParams({
        limit: "4"
    })

    const path = `/products/${id}/related?${params.toString()}`

    const data = await apiFetchServer<RelatedProductsResponse>(path, {}, false)

    return data.products
}