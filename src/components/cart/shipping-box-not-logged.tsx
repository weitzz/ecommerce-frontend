"use client"
import React from 'react'
import { useCartStore } from '@/store/cartStore'
import { updateShippingByZipcode } from '@/domain/shipping/update-shipping'

export const ShippingBoxNotLogged = () => {
    const cartStore = useCartStore(state => state)

    return (
        <div className='flex gap-4'>
            <input type="text"
                value={cartStore.shippingZipcode}
                onChange={e => cartStore.setShippingZipcode(e.target.value)}
                className='flex-1 border  px-6 py-5 border-gray-200  rounded-sm bg-white'
                placeholder='Digite seu CEP' />
            <button
                disabled={!cartStore.setShippingZipcode}
                className='cursor-pointer px-6 py-5 bg-blue-600 text-white border-0 rounded-sm disabled:opacity-50'
                onClick={() => updateShippingByZipcode(cartStore.shippingZipcode)}>Calcular</button>
        </div>
    )
}
