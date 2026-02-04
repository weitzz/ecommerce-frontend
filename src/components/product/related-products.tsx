import React from 'react'
import ProductList from './product-list'
import { getRelatedProducts } from '@/actions/get-related-products'

type Props = {
    id: number
}

async function RelatedProducts({ id }: Props) {
    const products = await getRelatedProducts(id)

    return (
        <div className="mt-10">
            <h2 className=" text-2xl text-center md:text-left">Você também vai gostar </h2>
            <div className="mt-9">
                <ProductList list={products} />
            </div>
        </div>
    )
}

export default RelatedProducts