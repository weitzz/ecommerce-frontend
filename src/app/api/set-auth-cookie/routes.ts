import { cookies } from "next/headers"

export async function POST(req: Request) {
    const { token } = await req.json()

    const cookieStore = await cookies()

    cookieStore.set("auth-token", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    })

    return Response.json({ success: true })
}
