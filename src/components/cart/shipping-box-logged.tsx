"use client"
import { getUserAddresses } from '@/actions/get-user-addresses'
import { useCartStore } from '@/store/cartStore'
import { Address } from '@/types/address'
import { useEffect, useState, useTransition } from 'react'
import { AddressModal } from './address-modal'
import { updateShippingByZipcode } from '@/domain/shipping/update-shipping'

export const ShippingBoxLogged = () => {
    const shippingZipcode = useCartStore(state => state.shippingZipcode)
    const selectedAddressId = useCartStore(state => state.selectedAddressId)
    const clearShipping = useCartStore(state => state.clearShipping)
    const setSelectedAddressId = useCartStore(state => state.setSelectedAddressId)
    const setShippingZipcode = useCartStore(state => state.setShippingZipcode)
    const [addresses, setAddresses] = useState<Address[]>([])
    const [isPeding, startTransition] = useTransition()
    const [modalOpen, setModalOpen] = useState(false)
    const [authInvalid, setAuthInvalid] = useState(false)

    useEffect(() => {
        startTransition(() => {
            getUserAddresses().then(result => {
                setAddresses(result)
                setAuthInvalid(false)

            }).catch(() => {
                setAuthInvalid(true)
            })
        })
    }, [])

    useEffect(() => {
        if (authInvalid) {
            clearShipping()
        }
    }, [authInvalid])

    useEffect(() => {
        if (!shippingZipcode) return
        updateShippingByZipcode(shippingZipcode)
    }, [shippingZipcode])

    const handleSelectAddress = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = Number(e.target.value)
        clearShipping()

        if (!id) return

        const address = addresses.find(a => a.id === id)
        if (!address) return

        setSelectedAddressId(id)
        setShippingZipcode(address.zipcode)

    }
    if (authInvalid) {
        return (
            <div className="text-sm text-gray-500">
                Sua sessão expirou. Faça login novamente para adicionar endereço.
            </div>
        )
    }
    return (
        <div className='flex flex-col gap-4'>
            <select
                value={selectedAddressId ?? ""}
                onChange={handleSelectAddress}
                className='flex-1 border  px-6 py-5 border-gray-200  rounded-sm bg-white'>
                <option value="">
                    {addresses.length === 0 ? 'Você ainda não cadastrou um endereço' : 'Selecione um endereço'}
                </option>
                {addresses.map(address => (
                    <option key={address.id} value={address.id}>
                        {address.street}, {address.number} - {address.city} ({address.zipcode})
                    </option>
                ))}
            </select>
            <button
                disabled={authInvalid}
                onClick={() => setModalOpen(true)}
                className='cursor-pointer px-6 py-5 bg-blue-600 text-white border-0 rounded-sm disabled:opacity-50' >
                Adicionar um novo endereço</button>
            <AddressModal key={modalOpen ? 'open' : 'closed'} open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={setAddresses} />
        </div>
    )
}
