"use server"

import { apiFetchServer } from "@/libs/api-server"
import { HttpError } from "@/libs/errors/http"
import type { ReadResult } from "@/libs/actions/types"

type FavoriteItem = {
    id: number
}

export const getFavoriteIds = async (): Promise<ReadResult<number[]>> => {
    try {
        const favorites = await apiFetchServer<FavoriteItem[]>("/me/favorites")
        return {
            success: true,
            data: favorites.map(item => item.id)
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
