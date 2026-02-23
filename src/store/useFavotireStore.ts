import { create } from "zustand"
import { apiFetchClient } from "@/libs/api-client"

type FavoriteStore = {
    favorites: Set<number>
    isLoading: boolean
    isHydrated: boolean
    hydrate: (ids: number[]) => void
    loadFavorites: () => Promise<void>
    toggleFavorite: (productId: number) => Promise<void>
    isFavorited: (productId: number) => boolean
}

type FavoriteResponse = {
    favorited: boolean
    productId: number
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({

    favorites: new Set(),
    isLoading: false,
    isHydrated: false,

    hydrate: (ids) => {
        set({
            favorites: new Set(ids),
            isHydrated: true
        })
    },

    isFavorited: (productId) => {
        return get().favorites.has(productId)
    },

    loadFavorites: async () => {
        if (get().isHydrated) return
        set({ isLoading: true })
        try {
            const products = await apiFetchClient<{ id: number }[]>(
                "/me/favorites"
            )

            set({
                favorites: new Set(products.map(p => p.id)),
                isHydrated: true,
                isLoading: false
            })

        } catch (error) {
            set({ isLoading: false })
        }
    },

    toggleFavorite: async (productId) => {
        const current = new Set(get().favorites)
        const alreadyFavorited = current.has(productId)
        if (alreadyFavorited) {
            current.delete(productId)
        } else {
            current.add(productId)
        }

        set({ favorites: new Set(current) })

        try {

            const data = await apiFetchClient<FavoriteResponse>(
                "/me/favorites",
                {
                    method: "POST",
                    body: JSON.stringify({ productId })
                }
            )
            const updated = new Set(get().favorites)
            if (data.favorited) {
                updated.add(productId)
            } else {
                updated.delete(productId)
            }

            set({ favorites: updated })

        } catch {
            const rollback = new Set(get().favorites)

            if (alreadyFavorited) {
                rollback.add(productId)
            } else {
                rollback.delete(productId)
            }
            set({ favorites: rollback })
        }
    }

}))
