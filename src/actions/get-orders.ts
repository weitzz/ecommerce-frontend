"use server"

import { apiFetch } from "@/libs/api"
import type { ReadResult } from "@/libs/actions/types"


type OrderListItem = {
    id: number
    status: "PENDING" | "PAID" | "CANCELED"
    totalPrice: number
    createdAt: string
}

type GetOrdersApiResponse = {
    success: boolean
    data: OrderListItem[]
}

export const getOrders = async (): Promise<ReadResult<OrderListItem[]>> => {
    const response = await apiFetch<GetOrdersApiResponse>("/orders")
    console.log(response)
    if (!response.success) {
        console.error("[getOrders]", response.error)
        return {
            success: false,
            error: response.error
        }
    }
    console.log(response.data.data)
    return {
        success: true,
        data: response.data.data
    }
}