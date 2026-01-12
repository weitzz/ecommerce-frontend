"use client"
import React from 'react'
import { useCartStore } from '@/store/cartStore'
import { getShippingInfo } from '@/actions/get-shipping-info'

export const ShippingBoxNotLogged = () => {
    const cartStore = useCartStore(state => state)
    const handleUpdateShipping = async () => {
        if (cartStore.shippingZipcode.length > 4) {
            const shippingInfo = await getShippingInfo(cartStore.shippingZipcode)

            if (shippingInfo) {
                cartStore.setShippingCost(shippingInfo.cost)
                cartStore.setShippingDays(shippingInfo.days)
            }
        }
    }

    return (
        <div className='flex gap-4'>
            <input type="text" value={cartStore.shippingZipcode}
                onChange={e => cartStore.setShippingZipcode(e.target.value)}
                className='flex-1 border  px-6 py-5 border-gray-200  rounded-sm bg-white'
                placeholder='Digite seu CEP' />
            <button className='cursor-pointer px-6 py-5 bg-blue-600 text-white border-0 rounded-sm' onClick={handleUpdateShipping}>Calcular</button>
        </div>
    )
}
