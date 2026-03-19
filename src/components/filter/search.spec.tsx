import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import Search from "./search"

const { pushMock } = vi.hoisted(() => ({
    pushMock: vi.fn()
}))

vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock
    })
}))

describe("Search", () => {
    beforeEach(() => {
        pushMock.mockReset()
    })

    it("nao navega quando o termo esta vazio", () => {
        render(<Search />)

        const form = screen.getByRole("searchbox").closest("form")
        expect(form).not.toBeNull()

        fireEvent.submit(form!)

        expect(pushMock).not.toHaveBeenCalled()
    })

    it("navega para a pagina de busca com o termo codificado", async () => {
        const user = userEvent.setup()

        render(<Search />)

        const input = screen.getByRole("searchbox")
        await user.type(input, "camisa azul")
        fireEvent.submit(input.closest("form")!)

        expect(pushMock).toHaveBeenCalledWith("/search?query=camisa%20azul")
    })
})
