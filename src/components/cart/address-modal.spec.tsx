import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { AddressModal } from "./address-modal"

const mocks = vi.hoisted(() => ({
    actionState: { current: { success: false, errors: {} } },
    formActionMock: vi.fn()
}))

vi.mock("react", async () => {
    const actual = await vi.importActual<typeof import("react")>("react")

    return {
        ...actual,
        useActionState: () => [mocks.actionState.current, mocks.formActionMock] as const
    }
})

describe("AddressModal", () => {
    beforeEach(() => {
        mocks.actionState.current = { success: false, errors: {} }
        mocks.formActionMock.mockReset()
    })

    it("nao renderiza quando open for falso", () => {
        const { container } = render(
            <AddressModal open={false} onClose={vi.fn()} onSuccess={vi.fn()} />
        )

        expect(container).toBeEmptyDOMElement()
    })

    it("chama onClose ao clicar em fechar e voltar", async () => {
        const user = userEvent.setup()
        const onClose = vi.fn()

        render(
            <AddressModal open onClose={onClose} onSuccess={vi.fn()} />
        )

        await user.click(screen.getByRole("button", { name: "Fechar" }))
        await user.click(screen.getByRole("button", { name: "Voltar" }))

        expect(onClose).toHaveBeenCalledTimes(2)
    })

    it("chama onSuccess e onClose quando a action retorna sucesso", async () => {
        const onClose = vi.fn()
        const onSuccess = vi.fn()
        const addresses = [
            {
                id: 1,
                zipcode: "01001-000",
                street: "Rua A",
                number: "10",
                city: "Sao Paulo",
                state: "SP",
                country: "Brasil",
                complement: "Casa"
            }
        ]

        mocks.actionState.current = {
            success: true,
            data: addresses,
            errors: {}
        }

        render(
            <AddressModal open onClose={onClose} onSuccess={onSuccess} />
        )

        await waitFor(() => {
            expect(onSuccess).toHaveBeenCalledWith(addresses)
            expect(onClose).toHaveBeenCalled()
        })
    })

    it("fecha o modal quando recebe erro de sessao expirada", async () => {
        const onClose = vi.fn()

        mocks.actionState.current = {
            success: false,
            errors: {
                formError: "Faça login para adicionar um endereço"
            }
        }

        render(
            <AddressModal open onClose={onClose} onSuccess={vi.fn()} />
        )

        await waitFor(() => {
            expect(onClose).toHaveBeenCalled()
        })
    })
})
