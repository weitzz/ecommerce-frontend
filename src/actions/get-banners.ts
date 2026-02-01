"use server"
import { apiFetch } from "@/libs/api"
import { Banner } from "@/types/banner"
import type { ReadResult } from "@/libs/actions/types"


type GetBannersApiResponse = {
    data: Banner[]
}

export const getBanners = async (): Promise<ReadResult<Banner[]>> => {

    const response = await apiFetch<GetBannersApiResponse>("/banners")

    if (!response.ok) {
        console.error('getBanners', response.error)
        return {
            ok: false,
            error: response.error
        }
    }
    return {
        ok: true,
        data: response.data.data
    }
}