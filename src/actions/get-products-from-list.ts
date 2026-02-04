"use server"

import { apiFetch } from "@/libs/api"
import { Product } from "@/types/products"

type GetProductsFromListApiResponse = {
    success: boolean
    data: Product[]

}

export const getProductsFromList = async (ids: (string | number)[]): Promise<Product[]> => {

    const response = await apiFetch<GetProductsFromListApiResponse>('/cart/mount', {
        method: "POST",
        body: JSON.stringify({ ids })
    })

    if (!response.success) {
        console.error("[getProductsFromList]", response.error)
        throw response.error
    }

    const products = response.data.data

    if (!Array.isArray(products)) {
        console.error("[getProductsFromList] resposta inválida:", response.data)
        throw new Error("Resposta inválida ao montar carrinho")
    }

    return products

}