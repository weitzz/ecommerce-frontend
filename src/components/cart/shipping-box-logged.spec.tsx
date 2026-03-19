import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ShippingBoxLogged } from "./shipping-box-logged"
import { useCartStore } from "@/store/cartStore"
import type { Address } from "@/types/address"

const mocks = vi.hoisted(() => ({
    getUserAddressesMock: vi.fn(),
    updateShippingByZipcodeMock: vi.fn(),
    clearShippingMock: vi.fn(),
    setSelectedAddressIdMock: vi.fn(),
    setShippingZipcodeMock: vi.fn()
}))

vi.mock("@/actions/get-user-addresses", () => ({
    getUserAddresses: mocks.getUserAddressesMock
}))

vi.mock("@/domain/shipping/update-shipping", () => ({
    updateShippingByZipcode: mocks.updateShippingByZipcodeMock
}))

vi.mock("./address-modal", () => ({
    AddressModal: ({
        open,
        onClose
    }: {
        open: boolean
        onClose: () => void
        onSuccess: (addresses: Address[]) => void
    }) => (
        <div>
            <span>{open ? "address-modal-open" : "address-modal-closed"}</span>
            <button type="button" onClick={onClose}>
                Fechar modal mock
            </button>
        </div>
    )
}))

const addresses: Address[] = [
    {
        id: 1,
        zipcode: "01001000",
        street: "Rua A",
        number: "10",
        city: "Sao Paulo",
        state: "SP",
        country: "Brasil"
    },
    {
        id: 2,
        zipcode: "22222222",
        street: "Rua B",
        number: "20",
        city: "Rio de Janeiro",
        state: "RJ",
        country: "Brasil"
    }
]

describe("ShippingBoxLogged", () => {
    beforeEach(() => {
        mocks.getUserAddressesMock.mockReset()
        mocks.updateShippingByZipcodeMock.mockReset()
        mocks.clearShippingMock.mockReset()
        mocks.setSelectedAddressIdMock.mockReset()
        mocks.setShippingZipcodeMock.mockReset()

        useCartStore.setState({
            shippingZipcode: "",
            shippingCost: 0,
            shippingDays: 0,
            selectedAddressId: null,
            clearShipping: mocks.clearShippingMock,
            setSelectedAddressId: mocks.setSelectedAddressIdMock,
            setShippingZipcode: mocks.setShippingZipcodeMock
        })
    })

    it("carrega e renderiza os enderecos do usuario", async () => {
        mocks.getUserAddressesMock.mockResolvedValue(addresses)

        render(<ShippingBoxLogged />)

        expect(await screen.findByRole("option", { name: "Selecione um endereço" })).toBeInTheDocument()
        expect(screen.getByRole("option", { name: "Rua A, 10 - Sao Paulo (01001000)" })).toBeInTheDocument()
        expect(screen.getByRole("option", { name: "Rua B, 20 - Rio de Janeiro (22222222)" })).toBeInTheDocument()
    })

    it("limpa o frete e seleciona o endereco escolhido", async () => {
        const user = userEvent.setup()
        mocks.getUserAddressesMock.mockResolvedValue(addresses)

        render(<ShippingBoxLogged />)

        const select = await screen.findByRole("combobox")
        await user.selectOptions(select, "2")

        expect(mocks.clearShippingMock).toHaveBeenCalled()
        expect(mocks.setSelectedAddressIdMock).toHaveBeenCalledWith(2)
        expect(mocks.setShippingZipcodeMock).toHaveBeenCalledWith("22222222")
    })

    it("abre o modal ao clicar em adicionar um novo endereco", async () => {
        const user = userEvent.setup()
        mocks.getUserAddressesMock.mockResolvedValue(addresses)

        render(<ShippingBoxLogged />)

        expect(await screen.findByText("address-modal-closed")).toBeInTheDocument()

        await user.click(screen.getByRole("button", { name: "Adicionar um novo endereço" }))

        expect(screen.getByText("address-modal-open")).toBeInTheDocument()
    })

    it("recalcula o frete quando ja existe um CEP selecionado", async () => {
        const logSpy = vi.spyOn(console, "log").mockImplementation(() => {})
        mocks.getUserAddressesMock.mockResolvedValue(addresses)
        useCartStore.setState({
            shippingZipcode: "01001000"
        })

        render(<ShippingBoxLogged />)

        await waitFor(() => {
            expect(mocks.updateShippingByZipcodeMock).toHaveBeenCalledWith("01001000")
        })

        logSpy.mockRestore()
    })

    it("mostra mensagem de sessao expirada e limpa frete quando falha ao carregar enderecos", async () => {
        mocks.getUserAddressesMock.mockRejectedValue(new Error("Sessao expirada"))

        render(<ShippingBoxLogged />)

        await waitFor(() => {
            expect(screen.getByText("Sua sessão expirou. Faça login novamente para adicionar endereço.")).toBeInTheDocument()
        })

        expect(mocks.clearShippingMock).toHaveBeenCalled()
        expect(screen.queryByRole("combobox")).not.toBeInTheDocument()
    })
})
