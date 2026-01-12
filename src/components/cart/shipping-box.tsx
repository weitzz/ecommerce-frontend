"use client"
import { useAuthStore } from '@/store/auth'
import { useCartStore } from '@/store/cartStore'
import React from 'react'
import { ShippingBoxNotLogged } from './shipping-box-not-logged'
import { ShippingBoxLogged } from './shipping-box-logged'

export const ShippingBox = () => {
    const { token, hydrated } = useAuthStore(state => state)
    const cartStore = useCartStore(state => state)

    if (!hydrated) return null

    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-gray-500'>Calcular frete e prazo</h2>
            <div >
                {!token && <ShippingBoxNotLogged />}
                {token && <ShippingBoxLogged />}
            </div>

            {cartStore.shippingDays > 0 &&
                <div className='flex items-center bg-white border border-gray-200 rounded-sm p-6'>
                    <p className='flex-1'>Receba em até {cartStore.shippingDays} {cartStore.shippingDays != 1 ? "dias úteis" : "dia útil"}.</p>
                    <p className='text-green-600 font-bold'>R$ {cartStore.shippingCost.toFixed(2)}</p>
                </div>
            }
        </div>
    )
}
