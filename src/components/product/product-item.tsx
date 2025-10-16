"use client"
import { Product } from "@/types/products"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ButtonLiked } from "../button-liked"

type Props = {
    data: Product
}

function ProductItem({ data }: Props) {
    const [liked, setLiked] = useState(data.liked)
    const link = `/product/${data.id}`

    const toggleLiked = () => {
        setLiked(!liked)
    }
    return (
        <div className="bg-white border border-gray-200 rounded-sm p-6">
            <div className="flex justify-end">
                {/* <div onClick={toggleLiked} className="cursor-pointer size-12 border border-gray-200 rounded-sm flex justify-center items-center">
                    {liked && <Image src={"/ui/heart-3-fill.png"} width={24} height={24} alt="liked" />}
                    {!liked && <Image src={"/ui/heart-3-line.png"} width={24} height={24} alt="liked" />}
                </div> */}
                <ButtonLiked data={data} />

            </div>
            <div className="flex justify-center">
                <Link href={link}>
                    <Image src={data.image} alt={data.label} width={200} height={200}
                        className="max-w-full h-48" />
                </Link>
            </div>
            <h3 className="mt-9 text-lg font-bold"><Link href={link}>{data.label}</Link></h3>
            <p className="text-2xl font-bold text-blue-600 mt-3">R$ {data.price.toFixed(2)}</p>
            <span className="mt-5 text-gray-400">Pagamento via PIX</span>


        </div>
    )
}

export default ProductItem