import { create } from "zustand"

type AuthState = {
    isAuthenticated: boolean
    hydrated: boolean
    setAuthenticated: (value: boolean) => void
    setHydrated: () => void
    clear: () => void
}

export const useAuthStore = create<AuthState>(set => ({
    isAuthenticated: false,
    hydrated: false,

    setAuthenticated: (value) =>
        set({ isAuthenticated: value }),

    setHydrated: () =>
        set({ hydrated: true }),

    clear: () =>
        set({
            isAuthenticated: false,
            hydrated: true,
        }),
}))
