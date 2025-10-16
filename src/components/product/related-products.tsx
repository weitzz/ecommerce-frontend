import React from 'react'
import ProductList from './product-list'
import { data } from '@/data'

type Props = {
    id: number
}

function RelatedProducts({ id }: Props) {
    return (
        <div className="mt-10">
            <h2 className=" text-2xl text-center md:text-left">Você também vai gostar </h2>
            <div className="mt-9">
                <ProductList list={data.products} />
            </div>
        </div>
    )
}

export default RelatedProducts