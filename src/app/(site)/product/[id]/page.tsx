import { getProductCategory } from '@/actions/get-product-category'
import { ImageSlider } from '@/components/product/image-slider'
import { ProductDescription } from '@/components/product/product-description'
import { ProductDetails } from '@/components/product/product-details'
import RelatedProducts from '@/components/product/related-products'
import RelatedProductsSkeleton from '@/components/product/related-products-skeleton'
import Link from 'next/link'
import React, { Suspense } from 'react'


type Props = {
    params: { id: number }

}

const Page = async ({ params }: Props) => {
    const { id } = await params
    const { product, category } = await getProductCategory(id)


    return (
        <>
            <div className="text-gray-500 mb-4">
                <Link href="/">Home</Link> &gt;{" "}
                <Link href={`/categories/${category.slug}`}>
                    {category.name}
                </Link>{" "}
                &gt; {product.name}
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-32">
                <ImageSlider images={product.images} />
                <ProductDetails product={product} />
            </div>

            <ProductDescription text={product.description} />

            <Suspense fallback={<RelatedProductsSkeleton />}>
                <RelatedProducts id={product.id} />
            </Suspense>
        </>
    )
}

export default Page