"use client"
import Image from "next/image"
import { useFavoriteStore } from "@/store/useFavotireStore"


type ButtonLikedProps = {
    productId: number
    initialLiked?: boolean
}

export const ButtonLiked = ({ productId, initialLiked = false }: ButtonLikedProps) => {
    const { toggleFavorite, isFavorited, isHydrated } = useFavoriteStore()
    const normalizedProductId = Number(productId)

    if (!Number.isFinite(normalizedProductId) || normalizedProductId <= 0) {
        return null
    }

    const liked = isHydrated ? isFavorited(normalizedProductId) : initialLiked


    const heartIcon = liked ? "heart-3-fill.png" : "heart-3-line.png"
    return (
        <button
            onClick={() => toggleFavorite(normalizedProductId, liked)}
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
