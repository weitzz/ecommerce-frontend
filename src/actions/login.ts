"use server"



type LoginData = {
    email: string
    password: string
}

export async function loginAction({ email, password }: LoginData): Promise<{ error: string | null, token?: string }> {
    return { error: null, token: '123' }
}