import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import Header from "./header"
import { useAuthStore } from "@/store/auth"
import { useMenuStore } from "@/store/menuStore"

vi.mock("next/link", () => ({
    default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
        <a href={href} {...props}>
            {children}
        </a>
    )
}))

vi.mock("next/image", () => ({
    default: ({ alt = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <img alt={alt} {...props} />
    )
}))

vi.mock("../filter/search", () => ({
    default: () => <div data-testid="search" />
}))

vi.mock("./header-icon", () => ({
    default: ({ alt }: { alt: string }) => <span>{alt}</span>
}))

describe("Header logout", () => {
    beforeEach(() => {
        useMenuStore.setState({
            isOpen: false,
            groups: {}
        })

        useAuthStore.setState({
            isAuthenticated: true,
            hydrated: true
        })
    })

    it("dispara o submit do formulario ao clicar em sair", async () => {
        const user = userEvent.setup()
        const { container } = render(<Header isAuthenticated />)

        const form = container.querySelector("form")
        expect(form).not.toBeNull()
        expect(form).toHaveAttribute("action", "/api/auth/logout")
        expect(form).toHaveAttribute("method", "post")

        const submitHandler = vi.fn((event: Event) => {
            event.preventDefault()
        })

        form?.addEventListener("submit", submitHandler)

        await user.click(screen.getByRole("button", { name: "Sair" }))

        expect(submitHandler).toHaveBeenCalledTimes(1)
    })
})
