import { clearAuthCookies } from "@/libs/auth-cookies"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const response = NextResponse.redirect(new URL("/", request.url))

    clearAuthCookies(response.cookies)
    response.cookies.delete("cart")

    return response
}
