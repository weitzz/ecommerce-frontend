'use server'
import type { CartItem } from "@/types/cart-item"
import type { ReadResult } from "@/libs/actions/types"
import { apiFetchServer } from "@/libs/api-server"
import { HttpError } from "@/libs/errors/http"

type FinishCartResponse = {
    url: string
}

export const finishCart = async (
    addressId: number,
    cart: CartItem[]
): Promise<ReadResult<string>> => {

    if (!Array.isArray(cart) || cart.length === 0) {
        return {
            success: false,
            error: new HttpError(400, "Carrinho inválido")
        }
    }

    const payloadCart = cart.map(item => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
    }))

    try {
        const data = await apiFetchServer<FinishCartResponse>('/cart/finish', {
            method: 'POST',
            body: JSON.stringify({
                addressId,
                cart: payloadCart
            })
        })

        return {
            success: true,
            data: data.url
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
            error: new HttpError(500, "Erro inesperado ao finalizar compra")
        }
    }



}
