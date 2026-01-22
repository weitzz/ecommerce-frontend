import { create } from "zustand"

type AuthState = {
    hydrated: boolean
    token: string | null
    setToken: (token: string | null) => void
    clearToken: () => void
    setHydrated: () => void
}

export const useAuthStore = create<AuthState>(set => ({
    hydrated: false,
    token: null,
    setToken: (token) => set({ token }),
    clearToken: () => set({ token: null }),
    setHydrated: () => set({ hydrated: true }),
}))
