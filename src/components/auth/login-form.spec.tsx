import { render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import LoginForm from "./login-form"

const mocks = vi.hoisted(() => ({
    actionState: { current: { success: false, errors: {} } },
    formActionMock: vi.fn(),
    replaceMock: vi.fn(),
    refreshMock: vi.fn(),
    setAuthenticatedMock: vi.fn(),
    setHydratedMock: vi.fn()
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
        replace: mocks.replaceMock,
        refresh: mocks.refreshMock
    })
}))

vi.mock("next/link", () => ({
    default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
        <a href={href} {...props}>
            {children}
        </a>
    )
}))

vi.mock("@/store/auth", () => ({
    useAuthStore: (selector: (state: {
        setAuthenticated: (value: boolean) => void
        setHydrated: () => void
    }) => unknown) => selector({
        setAuthenticated: mocks.setAuthenticatedMock,
        setHydrated: mocks.setHydratedMock
    })
}))

describe("LoginForm", () => {
    beforeEach(() => {
        mocks.actionState.current = { success: false, errors: {} }
        mocks.formActionMock.mockReset()
        mocks.replaceMock.mockReset()
        mocks.refreshMock.mockReset()
        mocks.setAuthenticatedMock.mockReset()
        mocks.setHydratedMock.mockReset()
    })

    it("renderiza erros de campo e de formulario retornados pela action", () => {
        mocks.actionState.current = {
            success: false,
            errors: {
                fieldErrors: {
                    email: "Email invalido",
                    password: "Senha obrigatoria"
                },
                formError: "Falha no login"
            }
        }

        render(<LoginForm />)

        expect(screen.getByText("Email invalido")).toBeInTheDocument()
        expect(screen.getByText("Senha obrigatoria")).toBeInTheDocument()
        expect(screen.getByText("Falha no login")).toBeInTheDocument()
    })

    it("atualiza a store e redireciona quando o login tem sucesso", async () => {
        mocks.actionState.current = {
            success: true,
            errors: {}
        }

        render(<LoginForm />)

        await waitFor(() => {
            expect(mocks.setAuthenticatedMock).toHaveBeenCalledWith(true)
            expect(mocks.setHydratedMock).toHaveBeenCalled()
            expect(mocks.replaceMock).toHaveBeenCalledWith("/")
            expect(mocks.refreshMock).toHaveBeenCalled()
        })
    })
})
