"use server"

import { apiFetchServer } from "@/libs/api-server"
import { HttpError } from "@/libs/errors/http"
import type { ReadResult } from "@/libs/actions/types"
import { getImageUrl } from "@/libs/get-image-url"

export type FavoriteProduct = {
    id: number
    name: string
    price: number
    image?: string | null
    liked: boolean
}


export const getFavorites = async (): Promise<
    ReadResult<FavoriteProduct[]>
> => {

    try {
        const products = await apiFetchServer<FavoriteProduct[]>("/me/favorites")
        console.log(products)
        const normalized = products.map(product => ({
            ...product,
            image: getImageUrl(product.image)
        }))

        return {
            success: true,
            data: normalized
        }


    } catch (error) {
        if (error instanceof HttpError) {
            return {
                success: false,
                error
            }
        }

        return {
            success: false,
            error: new HttpError(500, "Erro inesperado")
        }
    }

}
