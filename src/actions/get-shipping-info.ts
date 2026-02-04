"use server"

import { apiFetch } from "@/libs/api"
import type { ReadResult } from "@/libs/actions/types"


type ShippingInfoResponse = {
    zipcode: string
    shippingCost: number
    shippingDays: number
}

type GetShippingInfoApiResponse = {
    success: boolean
    data: ShippingInfoResponse
}


export const getShippingInfo = async (zipcode: string): Promise<ReadResult<ShippingInfoResponse>> => {
    const params = new URLSearchParams({ zipcode })

    const response = await apiFetch<GetShippingInfoApiResponse>(`/cart/shipping?${params.toString()}`)
    if (!response.success) {
        console.error("[getShippingInfo]", response.error)
        return {
            success: false,
            error: response.error
        }
    }

    return {
        success: true,
        data: response.data.data
    }

}
