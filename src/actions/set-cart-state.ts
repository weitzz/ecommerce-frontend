"use server"

import { setServerCart } from "@/libs/action-cookies"
import { CartItem } from "@/types/cart-item"

export const setCartState = async (cart: CartItem[]) => {
    await setServerCart(cart)

}