"use client"

import { useAuthStore } from "@/store/auth"
import { getCartState } from "@/actions/get-cart-state"
import { getAuthState } from "@/actions/get-auth-state"
import { useCartStore } from "@/store/cartStore"
import { useEffect } from "react"

export const StoreHydration = () => {
    const authStore = useAuthStore(state => state)
    useEffect(() => {
        getAuthState().then(({ token }) => {
            if (token != null) {
                authStore.setToken(token)
            }
            authStore.setHydrated(true)
        })
        getCartState().then(({ cart }) => {
            if (cart.length > 0) {
                useCartStore.setState({ cart })
            }
        })
    }, [])

    return null
}