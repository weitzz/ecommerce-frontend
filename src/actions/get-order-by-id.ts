"use server"

import { apiFetch } from "@/libs/api"
import type { ReadResult } from "@/libs/actions/types"

export type OrderDetail = {
    id: number
    status: "PENDING" | "PAID" | "CANCELED"
    totalPrice: number
    shippingCost: number
    shippingDays: number
    createdAt: string

    address: {
        street: string
        number: string
        city: string
        state: string
        zipcode: string
        country: string
        complement?: string | null
    }

    items: {
        productId: number
        name: string
        quantity: number
        price: number
        image?: string | null
    }[]
}

type OrderApiResponse = {
    id: number
    status: "PENDING" | "PAID" | "CANCELED"
    totalPrice: number
    shippingCost: number
    shippingDays: number
    createdAt: string

    shippingStreet: string
    shippingNumber: string
    shippingCity: string
    shippingState: string
    shippingZipcode: string
    shippingCountry: string
    shippingComplement?: string | null

    orderItems: {
        quantity: number
        price: number
        product: {
            id: number
            name: string
            image: string
        }
    }[]
}

type GetOrderByIdApiResponse = {
    success: boolean
    data: OrderApiResponse
}
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_BASE

export const getOrderById = async (
    id: number
): Promise<ReadResult<OrderDetail>> => {
    const response = await apiFetch<GetOrderByIdApiResponse>(`/orders/${id}`)
    console.log(response)
    if (!response.success) {
        console.error("[getOrderById]", response.error)
        return {
            success: false,
            error: response.error
        }
    }
    const order = response.data.data

    console.log("ORDER", order)

    const normalized: OrderDetail = {
        id: order.id,
        status: order.status,
        totalPrice: Number(order.totalPrice),
        shippingCost: Number(order.shippingCost),
        shippingDays: Number(order.shippingDays),
        createdAt: order.createdAt,

        address: {
            street: order.shippingStreet,
            number: order.shippingNumber,
            city: order.shippingCity,
            state: order.shippingState,
            zipcode: order.shippingZipcode,
            country: order.shippingCountry,
            complement: order.shippingComplement,
        },

        items: order.orderItems.map(item => ({
            productId: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: Number(item.price),
            image: item.product.image
                ? `${IMAGE_BASE_URL}/${item.product.image}`
                : null,
        })),
    }


    return {
        success: true,
        data: normalized
    }
}
