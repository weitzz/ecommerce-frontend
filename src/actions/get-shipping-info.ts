"use server"

import { apiFetchServer } from "@/libs/api-server"
import type { ReadResult } from "@/libs/actions/types"
import { HttpError } from "@/libs/errors/http"


type ShippingInfoResponse = {
    zipcode: string
    shippingCost: number
    shippingDays: number
}



export const getShippingInfo = async (zipcode: string): Promise<ReadResult<ShippingInfoResponse>> => {
    const params = new URLSearchParams({ zipcode })
    const path = `/cart/shipping?${params.toString()}`
    try {
        const data = await apiFetchServer<ShippingInfoResponse>(path)
        return {
            success: true,
            data
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
