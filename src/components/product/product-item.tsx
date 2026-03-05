"use client"
import { Product } from "@/types/products"
import Image from "next/image"
import Link from "next/link"
import { ButtonLiked } from "../ui/button-liked"

type Props = {
    data: Product
}

function ProductItem({ data }: Props) {
    const productId = Number(data.id)
    const link = `/product/${productId}`

    return (
        <div className="bg-white border border-gray-200 rounded-sm p-6">
            <div className="flex justify-end">
                <ButtonLiked
                    productId={productId}
                    initialLiked={data.liked ?? false}
                />

            </div>
            <div className="flex justify-center">
                <Link href={link}>
                    {data.image && (
                        <Image
                            src={data.image}
                            alt={data.name}
                            width={200}
                            height={200}
                            className="max-w-full h-48 w-auto hover:opacity-90"
                        />
                    )}
                </Link>
            </div>
            <h3 className="mt-9 text-lg font-bold">{data.name}</h3>
            <p className="text-2xl font-bold text-blue-600 mt-3">R$ {data.price.toFixed(2)}</p>
            <span className="mt-5 text-gray-400">Pagamento via PIX</span>
            <Link href={link}>
                <button className="bg-blue-600 text-white rounded-sm cursor-pointer py-2 px-3 w-full mt-2 border-0 hover:opacity-90">Ver produto</button>
            </Link>
        </div>
    )
}

export default ProductItem
