import { render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import RegisterForm from "./register-form"

const mocks = vi.hoisted(() => ({
    actionState: { current: { success: false, errors: {} } },
    formActionMock: vi.fn(),
    pushMock: vi.fn()
}))

vi.mock("react", async () => {
    const actual = await vi.importActual<typeof import("react")>("react")

    return {
        ...actual,
        useActionState: () => [mocks.actionState.current, mocks.formActionMock] as const
    }
})

vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mocks.pushMock
    })
}))

vi.mock("next/link", () => ({
    default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
        <a href={href} {...props}>
            {children}
        </a>
    )
}))

describe("RegisterForm", () => {
    beforeEach(() => {
        mocks.actionState.current = { success: false, errors: {} }
        mocks.formActionMock.mockReset()
        mocks.pushMock.mockReset()
    })

    it("renderiza erros de campo e erro geral retornados pela action", () => {
        mocks.actionState.current = {
            success: false,
            errors: {
                fieldErrors: {
                    name: "Nome obrigatorio",
                    email: "Email invalido",
                    password: "Senha curta",
                    confirmPassword: "Senhas diferentes"
                },
                formError: "Falha ao cadastrar"
            }
        }

        render(<RegisterForm />)

        expect(screen.getByText("Nome obrigatorio")).toBeInTheDocument()
        expect(screen.getByText("Email invalido")).toBeInTheDocument()
        expect(screen.getByText("Senha curta")).toBeInTheDocument()
        expect(screen.getByText("Senhas diferentes")).toBeInTheDocument()
        expect(screen.getByText("Falha ao cadastrar")).toBeInTheDocument()
    })

    it("redireciona para login quando o cadastro tem sucesso", async () => {
        mocks.actionState.current = {
            success: true,
            errors: {}
        }

        render(<RegisterForm />)

        await waitFor(() => {
            expect(mocks.pushMock).toHaveBeenCalledWith("/login")
        })
    })
})
