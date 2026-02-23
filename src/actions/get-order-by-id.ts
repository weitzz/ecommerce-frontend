"use server"

import { apiFetchServer } from "@/libs/api-server"
import { HttpError } from "@/libs/errors/http"
import type { ReadResult } from "@/libs/actions/types"
import { getImageUrl } from "@/libs/get-image-url"

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


export const getOrderById = async (
    id: number
): Promise<ReadResult<OrderDetail>> => {
    try {
        const order = await apiFetchServer<OrderApiResponse>(`/orders/${id}`)

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
                image: getImageUrl(item.product.image)
            })),
        }

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
