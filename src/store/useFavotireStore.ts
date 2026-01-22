import { create } from "zustand";

type FavoriteStore = {
    favorites: number[]; // productIds
    isLoading: boolean;

    loadFavorites: () => Promise<void>;
    toggleFavorite: (productId: number) => Promise<void>;
    isFavorited: (productId: number) => boolean;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
    favorites: [],
    isLoading: false,

    isFavorited: (productId) => {
        return get().favorites.includes(productId);
    },

    loadFavorites: async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:3333/favorites", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) return;

        const products = await res.json();
        set({ favorites: products.map((p: any) => p.id) });
    },

    toggleFavorite: async (productId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Faça login para favoritar");
            return;
        }

        const alreadyFavorited = get().favorites.includes(productId);

        // optimistic update
        set({
            favorites: alreadyFavorited
                ? get().favorites.filter(id => id !== productId)
                : [...get().favorites, productId],
        });

        try {
            const res = await fetch("http://localhost:4000/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });

            if (!res.ok) {
                // rollback
                set({
                    favorites: alreadyFavorited
                        ? [...get().favorites, productId]
                        : get().favorites.filter(id => id !== productId),
                });
            }
        } catch {
            // rollback
            set({
                favorites: alreadyFavorited
                    ? [...get().favorites, productId]
                    : get().favorites.filter(id => id !== productId),
            });
        }
    },
}));
