'use client'

import { clearCartCookie } from "@/actions/clear-cart-cookie"
import { finishCart } from "@/actions/finish-cart"
import { useAuthStore } from "@/store/auth"
import { useCartStore } from "@/store/cartStore"
import Link from "next/link"

function ButtonFinish() {
    const { token, hydrated } = useAuthStore(state => state)
    const cart = useCartStore(state => state.cart)
    const selectedAddressId = useCartStore(state => state.selectedAddressId)
    const clearCart = useCartStore(state => state.clearCart)

    const handleFinishButton = async () => {
        if (!token || !selectedAddressId) return

        const result = await finishCart(selectedAddressId, cart)

        if (result.success) {
            await clearCartCookie()
            clearCart()
            window.location.href = result.data
        } else {
            alert("Erro ao finalizar compra, tente novamente.")
        }
    }

    if (!hydrated) return null

    if (!token) {
        return (
            <Link
                href="/login"
                className="w-full text-center px-6 py-5 bg-blue-600 text-white rounded-sm block"
            >
                Faça login para finalizar compra
            </Link>
        )
    }

    return (
        <button
            onClick={handleFinishButton}
            disabled={!selectedAddressId ? true : false}
            className='cursor-pointer w-full text-center px-6 py-5 bg-blue-600 text-white border-0 rounded-sm disabled:opacity-20'>Finalizar Compra</button>
    )
}

export default ButtonFinish