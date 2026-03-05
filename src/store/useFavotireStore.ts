import { create } from "zustand"
import { getFavoriteIds } from "@/actions/get-favorite-ids"
import { toggleFavorite as toggleFavoriteAction } from "@/actions/toggle-favorite"

type FavoriteStore = {
    favorites: Set<number>
    isLoading: boolean
    isHydrated: boolean
    hydrate: (ids: number[]) => void
    loadFavorites: () => Promise<void>
    toggleFavorite: (productId: number, currentlyLiked?: boolean) => Promise<void>
    isFavorited: (productId: number) => boolean
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
            const result = await getFavoriteIds()
            if (!result.success) {
                throw new Error(result.error.message)
            }

            set({
                favorites: new Set(result.data),
                isHydrated: true,
                isLoading: false
            })

        } catch (error) {
            set({ isLoading: false })
        }
    },

    toggleFavorite: async (productId, currentlyLiked) => {
        const current = new Set(get().favorites)
        const alreadyFavorited =
            get().isHydrated ? current.has(productId) : !!currentlyLiked
        if (alreadyFavorited) {
            current.delete(productId)
        } else {
            current.add(productId)
        }

        set({
            favorites: new Set(current),
            isHydrated: true
        })

        try {
            const result = await toggleFavoriteAction(productId)
            if (!result.success) {
                throw new Error(result.error.message)
            }
            const updated = new Set(get().favorites)
            if (result.data) {
                updated.add(productId)
            } else {
                updated.delete(productId)
            }

            set({
                favorites: updated,
                isHydrated: true
            })

        } catch {
            const rollback = new Set(get().favorites)

            if (alreadyFavorited) {
                rollback.add(productId)
            } else {
                rollback.delete(productId)
            }
            set({
                favorites: rollback,
                isHydrated: true
            })
        }
    }

}))
