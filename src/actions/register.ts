"use server"


type RegisterData = {
    name: string
    email: string
    password: string
}

export async function registerAction({ name, email, password }: RegisterData): Promise<{ error: string | null }> {
    return { error: null }
}