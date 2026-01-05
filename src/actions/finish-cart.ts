'use server'


import { CartItem } from "@/types/cart-item"

export const finishCart = async (token: string, addressId: number, cart: CartItem[]) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/finish`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            addressId,
            cart
        })
    })
        .then(res => res.json())
        .then(data => {
            return data.sessionUrl as string
        })
        .catch(err => {
            console.log(err)
            return null
        })

}