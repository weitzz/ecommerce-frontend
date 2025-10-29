"use client"
import { useCartStore } from '@/store/cartStore'
import { CartListItem } from '@/types/cart-list-item'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { CartProductList } from './cart-product-list'
import ButtonFinish from './button-finish'
import Link from 'next/link'
type Props = {
    initialCartProducts: CartListItem[]
    initialSubtotal: number
}

export const CartContainer = ({ initialCartProducts, initialSubtotal }: Props) => {
    const cartStore = useCartStore(state => state)

    useEffect(() => {
        cartStore.clearShipping()
    }, [])

    let total = initialSubtotal + cartStore.shippingCost

    return (
        <section>
            <div className='flex items-center gap-2'>
                <Image src={'/ui/shopping-bag-4-line-black.png'} width={24} height={24} alt='Icone carrinho de compras' />
                <h2 className='text-lg'>Seu carrinho de compras
                    <span className='text-gray-500'>({cartStore.cart.length} {cartStore.cart.length != 1 ? "itens" : "item"})</span></h2>
            </div>

            <div className='flex flex-col md:flex-row gap-8 mt-9'>
                <div className='flex-1'>
                    <CartProductList initialList={initialCartProducts} />
                </div>
                <div className='flex-1 md:max-w-sm flex flex-col gap-4'>
                    <div className='bg-white border border-gray-200 rounded-sm'>
                        {/* frete */}
                        frete.....
                    </div>
                    <div className='bg-white border border-gray-200 rounded-sm'>
                        <div className='border-b border-gray-200 p-6'>
                            <div className='flex justify-between items-center mb-5'>
                                <p>Subtotal</p>
                                <span className='font-bold'>R$ {initialSubtotal.toFixed(2)}</span>

                            </div>
                            <div className='flex justify-between items-center'>
                                <p>Frete</p>
                                <span className='font-bold'>R$ {cartStore.shippingCost.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className='p-6'>
                            <div className='flex justify-between items-center mb-3'>
                                <p>Total</p>
                                <span className='font-bold text-2xl text-blue-600'>R$ {total.toFixed(2)}</span>

                            </div>
                            <p className='text-right text-gray-500 text-xs mb-5'>Em até 12x no cartão</p>

                            <ButtonFinish />
                            <div className='text-center mt-6'>

                                <Link href={'/'} className='text-gray-500 text-xs mb-5'>Comprar outros produtos</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
