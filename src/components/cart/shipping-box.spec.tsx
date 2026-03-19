import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ShippingBox } from "./shipping-box"
import { useAuthStore } from "@/store/auth"
import { useCartStore } from "@/store/cartStore"

vi.mock("./shipping-box-not-logged", () => ({
    ShippingBoxNotLogged: () => <div>shipping-box-not-logged</div>
}))

vi.mock("./shipping-box-logged", () => ({
    ShippingBoxLogged: () => <div>shipping-box-logged</div>
}))

describe("ShippingBox", () => {
    beforeEach(() => {
        useAuthStore.setState({
            isAuthenticated: false,
            hydrated: true
        })

        useCartStore.setState({
            shippingZipcode: "",
            shippingCost: 0,
            shippingDays: 0,
            selectedAddressId: null
        })
    })

    it("nao renderiza enquanto a store de autenticacao nao esta hidratada", () => {
        useAuthStore.setState({ hydrated: false })

        const { container } = render(<ShippingBox />)

        expect(container).toBeEmptyDOMElement()
    })

    it("renderiza a versao para usuario deslogado", () => {
        render(<ShippingBox />)

        expect(screen.getByText("shipping-box-not-logged")).toBeInTheDocument()
        expect(screen.queryByText("shipping-box-logged")).not.toBeInTheDocument()
    })

    it("renderiza a versao para usuario autenticado", () => {
        useAuthStore.setState({ isAuthenticated: true })

        render(<ShippingBox />)

        expect(screen.getByText("shipping-box-logged")).toBeInTheDocument()
        expect(screen.queryByText("shipping-box-not-logged")).not.toBeInTheDocument()
    })

    it("mostra prazo e frete quando ha calculo disponivel", () => {
        useCartStore.setState({
            shippingCost: 19.9,
            shippingDays: 2
        })

        render(<ShippingBox />)

        expect(screen.getByText("Receba em até 2 dias úteis.")).toBeInTheDocument()
        expect(screen.getByText("R$ 19.90")).toBeInTheDocument()
    })
})
