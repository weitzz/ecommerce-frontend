"use client"
import React from 'react'
import Image from 'next/image'
import { ProductComplete } from '@/types/products'
import { ButtonLiked } from '../ui/button-liked'
import { useCartStore } from '@/store/cartStore'
import { setCartState } from '@/actions/set-cart-state'
import { useRouter } from 'next/navigation'
type Props = {
    product: ProductComplete
}

export const ProductDetails = ({ product }: Props) => {
    const router = useRouter()
    const cartStore = useCartStore()

    const addToCart = async () => {
        cartStore.addItem({ productId: product.id, quantity: 1 })

        const updatedCart = useCartStore.getState().cart

        const result = await setCartState(updatedCart)

        console.log(result)

        router.push("/cart")
    }
    return (
        <section className='flex-1'>
            <span className='text-gray-400 text-xs mb-2'>Cod: {product.id}</span>
            <h3 className='text-3xl font-bold mb-6'>{product.name}</h3>
            <p className='text-2xl text-blue-600 font-bold mb-2'>R$ {product.price.toFixed(2)}</p>
            <p className='text-gray-400 text-sm mb-6'>Em até 12x sem juros</p>
            <div className='flex gap-4'>
                <button onClick={addToCart}
                    className='flex-1 cursor-pointer max-w-xs  px-8 py-4 bg-blue-600 text-white border-0 rounded-sm hover:opacity-90'>Adicionar ao carrinho</button>
                <ButtonLiked productId={product.id} />
                <div className="cursor-pointer size-12 border border-gray-200 rounded-sm flex justify-center items-center">
                    <Image
                        src={`/ui/share-line.png`}
                        width={24}
                        height={24}
                        alt="share"
                    />
                </div>
            </div>
        </section>
    )
}
