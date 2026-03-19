import { describe, expect, it } from "vitest"
import { POST } from "./route"

describe("POST /api/auth/logout", () => {
    it("redireciona para a home e expira os cookies de sessao", async () => {
        const request = new Request("http://localhost:3000/api/auth/logout", {
            method: "POST"
        })

        const response = await POST(request)

        expect(response.status).toBe(307)
        expect(response.headers.get("location")).toBe("http://localhost:3000/")
        expect(response.cookies.get("accessToken")?.value).toBe("")
        expect(response.cookies.get("refreshToken")?.value).toBe("")
        expect(response.cookies.get("cart")?.value).toBe("")
    })
})
