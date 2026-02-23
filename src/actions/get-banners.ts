"use server"
import { apiFetchServer } from "@/libs/api-server"
import { Banner } from "@/types/banner"
import type { ReadResult } from "@/libs/actions/types"
import { HttpError } from "@/libs/errors/http"



export const getBanners = async (): Promise<ReadResult<Banner[]>> => {
    try {
        const response = await apiFetchServer<Banner[]>("/banners", {}, false)
        return {
            success: true,
            data: response
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
            error: new HttpError(
                500,
                "Erro inesperado ao buscar banners"
            )
        }

    }

}