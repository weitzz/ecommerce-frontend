"use server"

import { apiFetchServer } from "@/libs/api-server"
import { Product } from "@/types/products"
import { HttpError } from "@/libs/errors/http"

export const getProductsFromList = async (ids: (string | number)[]): Promise<Product[]> => {

    const data = await apiFetchServer<Product[]>('/cart/mount', {
        method: "POST",
        body: JSON.stringify({ ids }),
    })

    if (!Array.isArray(data)) {
        throw new HttpError(
            500,
            "Resposta inválida ao montar carrinho"
        )
    }

    return data

}