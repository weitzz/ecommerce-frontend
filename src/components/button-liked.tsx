"use client"

import { useCallback, useState } from "react"

import Image from "next/image"


type Props = {
    data: {
        id: string | number
        liked: boolean
    }
}

export const ButtonLiked = ({ data }: Props) => {
    const [liked, setLiked] = useState(data.liked)
    const link = `/product/${data.id}`

    const toggleLiked = useCallback(() => {
        setLiked(prev => !prev)
    }, [])

    const heartIcon = liked ? "heart-3-fill.png" : "heart-3-line.png"
    return (
        <div onClick={toggleLiked} className="cursor-pointer size-12 border border-gray-200 rounded-sm flex justify-center items-center">
            <Image
                src={`/ui/${heartIcon}`}
                width={24}
                height={24}
                alt={liked ? "liked" : "not liked"}
            />
        </div>
    )
}
