'use client'

import { clearCartCookie } from "@/actions/clear-cart-cookie"
import { finishCart } from "@/actions/finish-cart"
import { useAuthStore } from "@/store/auth"
import { useCartStore } from "@/store/cartStore"
import Link from "next/link"
import { redirect } from "next/navigation"

function ButtonFinish() {
    const { token, hydrated } = useAuthStore(state => state)
    const cartStore = useCartStore(state => state)

    const handleFinishButton = async () => {
        if (!token || !cartStore.selectedAddressId) return

        const sessionUrl = await finishCart(token, cartStore.selectedAddressId, cartStore.cart)

        if (sessionUrl) {
            await clearCartCookie()
            cartStore.clearCart()
            redirect(sessionUrl)
        } else {
            alert("Erro ao finalizar compra, tente novamente.")
        }
    }

    if (!hydrated) return null
    if (!token) {
        return (
            <Link href="/login" className='w-full text-center px-6 py-5 bg-blue-600 text-white border-0 rounded-sm block'>Faça login para finalizar compra</Link>
        )
    }
    return (
        <button
            onClick={handleFinishButton}
            disabled={!cartStore.selectedAddressId ? true : false}
            className='cursor-pointer w-full text-center px-6 py-5 bg-blue-600 text-white border-0 rounded-sm disabled:opacity-20'>Finalizar Compra</button>
    )
}

export default ButtonFinish