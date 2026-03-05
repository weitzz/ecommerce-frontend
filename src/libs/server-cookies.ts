import { CartItem } from "@/types/cart-item";
import { cookies } from "next/headers";

export const getServerAuthToken = async () => {
    const cookieStore = await cookies()
    return cookieStore.get("accessToken")?.value ?? null
}


export const clearServerAuthToken = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
    cookieStore.delete('cart')
}


export const setServerCart = async (cart: CartItem[]) => {
    const cookieStore = await cookies()
    cookieStore.set('cart', JSON.stringify(cart), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30
    })
}

export const getServerCart = async (): Promise<CartItem[]> => {
    const cookieStore = await cookies()
    console.log(cookieStore)
    const value = cookieStore.get("cart")?.value

    if (!value) return []

    try {
        return JSON.parse(value)
    } catch {
        return []
    }
}



export const clearServerCart = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('cart')
}
