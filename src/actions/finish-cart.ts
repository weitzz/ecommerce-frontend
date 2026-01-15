'use server'


import { api } from "@/libs/axios"
import { CartItem } from "@/types/cart-item"



export const finishCart = async (token: string, addressId: number, cart: CartItem[]) => {
    try {
        const response = await api.post('/cart/finish', {

            cart,
            addressId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data.url) {
            return response.data.url
        }
        console.log(response.data)
    } catch (error: any) {
        console.log('STATUS:', error.response?.status)
        console.log('DATA:', error.response?.data)
    }
    return null
}