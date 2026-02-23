import { CartItem } from "@/types/cart-item"
import { cookies } from "next/headers"


export const clearAuthToken = async () => {
    (await cookies()).delete("auth-token")
}

export const setServerCart = async (cart: CartItem[]) => {
    const cookieStore = await cookies()

    cookieStore.set("cart", JSON.stringify(cart), {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
    })
}