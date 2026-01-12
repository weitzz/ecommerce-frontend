"use client"
import { getShippingInfo } from '@/actions/get-shipping-info'
import { getUserAddresses } from '@/actions/get-user-addresses'
import { useAuthStore } from '@/store/auth'
import { useCartStore } from '@/store/cartStore'
import { Address } from '@/types/address'
import { stat } from 'fs'
import React, { useEffect, useState, useTransition } from 'react'

export const ShippingBoxLogged = () => {
    const { token, hydrated } = useAuthStore(state => state)
    const cartStore = useCartStore(state => state)
    const [addresses, setAddresses] = useState<Address[]>([])
    const [peding, startTransition] = useTransition()

    useEffect(() => {
        if (hydrated && token) {
            startTransition(() => {
                getUserAddresses(token).then(setAddresses)
            })
        }

    }, [hydrated, token])

    useEffect(() => {
        if (cartStore.selectedAddressId) {
            updateShippingInfo()
        }
    }, [cartStore.selectedAddressId])

    const updateShippingInfo = async () => {
        if (cartStore.shippingZipcode.length > 4) {
            const shippingInfo = await getShippingInfo(cartStore.shippingZipcode)
            if (shippingInfo) {
                cartStore.setShippingCost(shippingInfo.cost)
                cartStore.setShippingDays(shippingInfo.days)
            }
        }
    }

    const handleSelectAddress = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        cartStore.clearShipping()
        const id = parseInt(e.target.value)
        if (id) {
            const address = addresses.find(address => address.id === id)
            if (address) {
                cartStore.setShippingZipcode(address.zipcode)
                cartStore.setSelectedAddressId(id)
            }
        }

    }

    return (
        <div className='flex flex-col gap-4'>
            <select
                value={cartStore.selectedAddressId ?? ""}
                onChange={handleSelectAddress}
                className='flex-1 border  px-6 py-5 border-gray-200  rounded-sm bg-white'>
                <option value="">
                    {addresses.length === 0 ? 'Nenhum endereço cadastrado' : 'Selecione um endereço'}
                </option>
                {addresses.map(address => (
                    <option key={address.id} value={address.id}>
                        {address.street}, {address.number} - {address.city} ({address.zipcode})
                    </option>
                ))}
            </select>
            <button className='cursor-pointer px-6 py-5 bg-blue-600 text-white border-0 rounded-sm' >Adicionar um novo endereço</button>
        </div>
    )
}
