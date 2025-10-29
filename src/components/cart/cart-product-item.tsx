"use client"
import { setCartState } from '@/actions/set-cart-state'
import { useCartStore } from '@/store/cartStore'
import { CartListItem } from '@/types/cart-list-item'
import Image from 'next/image'
import React, { useEffect } from 'react'
type Props = {
    item: CartListItem
}

export const CartProductItem = ({ item }: Props) => {
    const cartStore = useCartStore(state => state)

    const updateCookie = async () => {
        const updatedCart = useCartStore.getState().cart
        await setCartState(updatedCart)
    }

    const handleMinus = async () => {
        if (item.quantity > 1) {
            cartStore.updateQuantity(item.product.id, item.quantity - 1)
            await updateCookie()

        } else {
            await handleRemove()
        }
    }
    const handlePlus = async () => {
        cartStore.updateQuantity(item.product.id, item.quantity + 1)
        await updateCookie()
    }
    const handleRemove = async () => {
        cartStore.removeItem(item.product.id)
        await updateCookie()
    }
    return (
        <section className='flex items-center p-6 gap-4 md:gap-8 border-0 md:border-b border-gray-200'>
            <div className='border border-gray-200 p-1'>
                <Image
                    src={item.product.image}
                    alt={item.product.label}
                    width={96}
                    height={96} className='size-24 md:size-16' />
            </div>
            <div className='flex-1 flex flex-col md:flex-row justify-between md:items-center '>
                <div>
                    <h2 className='text-sm mb-2'>{item.product.label}</h2>
                    <span className='hidden md:block text-xs text-gray-500'>COD: {item.product.id}</span>
                </div>

                <div className='w-30 rounded-sm border border-gray-200 flex  text-center text-gray-500 '>
                    <button onClick={handleMinus} className='flex justify-center items-center text-2xl size-10 cursor-pointer '>-</button>
                    <p className='flex justify-center items-center size-10 text-lg border-x border-gray-200'>{item.quantity}</p>
                    <button onClick={handlePlus} className='flex justify-center items-center text-2xl size-10 cursor-pointer '>+</button>
                </div>
            </div>
            <div className='w-24 md:w-36 flex-1 flex flex-col md:flex-row justify-between items-end md:items-center'>
                <span className='text-lg  text-blue-600'>R$ {item.product.price.toFixed(2)}</span>

                <div>
                    <button onClick={handleRemove} className='cursor-pointer border border-gray-200 size-12 flex justify-center items-center rounded'>
                        <Image
                            src={'/ui/trash.png'}
                            alt={item.product.label}
                            width={24}
                            height={24} />
                    </button>
                </div>
            </div>
        </section>
    )
}
