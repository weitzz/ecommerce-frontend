'use server'
import type { CartItem } from "@/types/cart-item"
import type { ReadResult } from "@/libs/actions/types"
import { apiFetch } from "@/libs/api"

type FinishCartApiResponse = {
    success: boolean
    data: {
        url: string
    }
}

export const finishCart = async (
    addressId: number,
    cart: CartItem[]
): Promise<ReadResult<string>> => {

    if (!Array.isArray(cart) || cart.length === 0) {
        return {
            success: false,
            error: new Error("Carrinho inválido") as any
        }
    }

    const payloadCart = cart.map(item => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
    }))

    console.log("[finishCart] payload", {
        addressId,
        cart: payloadCart
    })

    const response = await apiFetch<FinishCartApiResponse>('/cart/finish', {
        method: 'POST',
        body: JSON.stringify({
            addressId,
            cart: payloadCart
        })
    })

    if (!response.success) {
        console.error("[finishCart]", response.error)
        return {
            success: false,
            error: response.error
        }
    }

    return {
        success: true,
        data: response.data.data.url
    }
}
