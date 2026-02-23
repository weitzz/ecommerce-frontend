"use client"

import { useEffect } from "react"
import { useFavoriteStore } from "@/store/useFavotireStore"

type Props = {
    initialFavorites: number[]
}

export function FavoritesHydrator({ initialFavorites }: Props) {
    const hydrate = useFavoriteStore(state => state.hydrate)
    const isHydrated = useFavoriteStore(state => state.isHydrated)

    useEffect(() => {
        if (!isHydrated) {
            hydrate(initialFavorites)
        }
    }, [initialFavorites, hydrate, isHydrated])

    return null
}