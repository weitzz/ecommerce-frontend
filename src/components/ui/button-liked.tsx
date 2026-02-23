"use client"
import Image from "next/image"
import { useFavoriteStore } from "@/store/useFavotireStore"


export const ButtonLiked = ({ productId }: { productId: number }) => {
    const { toggleFavorite, isFavorited } = useFavoriteStore()

    const liked = isFavorited(productId)


    const heartIcon = liked ? "heart-3-fill.png" : "heart-3-line.png"
    return (
        <button
            onClick={() => toggleFavorite(productId)}
            className="cursor-pointer size-12 border border-gray-200 rounded-sm flex justify-center items-center">
            <Image
                src={`/ui/${heartIcon}`}
                width={24}
                height={24}
                alt={liked ? "liked" : "not liked"}
            />
        </button>
    )
}
