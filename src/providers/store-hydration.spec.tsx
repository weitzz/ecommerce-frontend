import { render, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { StoreHydration } from "./store-hydration"
import { useAuthStore } from "@/store/auth"
import { useCartStore } from "@/store/cartStore"

const mocks = vi.hoisted(() => ({
    getAuthStateMock: vi.fn(),
    getCartStateMock: vi.fn()
}))

vi.mock("@/actions/get-auth-state", () => ({
    getAuthState: mocks.getAuthStateMock
}))

vi.mock("@/actions/get-cart-state", () => ({
    getCartState: mocks.getCartStateMock
}))

describe("StoreHydration", () => {
    beforeEach(() => {
        mocks.getAuthStateMock.mockReset()
        mocks.getCartStateMock.mockReset()

        useAuthStore.setState({
            isAuthenticated: false,
            hydrated: false
        })

        useCartStore.setState({
            cart: [],
            shippingZipcode: "",
            shippingCost: 0,
            shippingDays: 0,
            selectedAddressId: null
        })
    })

    it("hidrata a store de autenticacao e o carrinho quando existem dados", async () => {
        const cart = [{ productId: 9, quantity: 2 }]
        mocks.getAuthStateMock.mockResolvedValue({ isAuthenticated: true })
        mocks.getCartStateMock.mockResolvedValue({ cart })

        render(<StoreHydration />)

        await waitFor(() => {
            expect(useAuthStore.getState().isAuthenticated).toBe(true)
            expect(useAuthStore.getState().hydrated).toBe(true)
            expect(useCartStore.getState().cart).toEqual(cart)
        })
    })

    it("marca a autenticacao como hidratada e nao sobrescreve carrinho vazio", async () => {
        useCartStore.setState({
            cart: [{ productId: 5, quantity: 1 }]
        })

        mocks.getAuthStateMock.mockResolvedValue({ isAuthenticated: false })
        mocks.getCartStateMock.mockResolvedValue({ cart: [] })

        render(<StoreHydration />)

        await waitFor(() => {
            expect(useAuthStore.getState().isAuthenticated).toBe(false)
            expect(useAuthStore.getState().hydrated).toBe(true)
        })

        expect(useCartStore.getState().cart).toEqual([{ productId: 5, quantity: 1 }])
    })
})
