"use client"
import { useCartStore } from '@/store/cartStore'
import { CartListItem } from '@/types/cart-list-item'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { CartProductItem } from './cart-product-item'
type Props = {
    initialList: CartListItem[]
}

export const CartProductList = ({ initialList }: Props) => {
    // const cartStore = useCartStore(state => state)

    // useEffect(() => {
    //     cartStore.clearShipping()
    // }, [])
    return (
        <div className='bg-white border md:border-b-0 rounded border-gray-200'>
            {initialList.map(item => (
                <CartProductItem key={item.product.id} item={item} />
            ))}
        </div >
    )
}
