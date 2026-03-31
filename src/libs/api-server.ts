"use server"

import { baseFetch } from "./api-core"
import { HttpError } from "./errors/http"
import { cookies } from "next/headers";

export async function apiFetchServer<T>(
    path: string,
    options?: RequestInit,
    requireAuth: boolean = true
): Promise<T> {
    const cookieStore = await cookies();

    const makeRequest = async (token?: string) => {
        const headers = new Headers(options?.headers ?? {})

        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        if (!headers.has("Content-Type")) {
            headers.set("Content-Type", "application/json")
        }

        return baseFetch(path, {
            ...options,
            headers,
        })
    }

    const accessToken = cookieStore.get("accessToken")?.value

    if (requireAuth && !accessToken) {
        throw new HttpError(
            401,
            "Sessão inválida",
            "SESSION_INVALID"
        )
    }

    const { response, data } = await makeRequest(accessToken)

    if (!response.ok) {
        throw new HttpError(
            response.status,
            data?.error?.message ?? "Erro na API",
            data?.error?.code ?? "UNKNOWN_ERROR",
            {
                message: data?.error?.message,
                fieldErrors: data?.error?.fieldErrors
            }
        )
    }

    return data.data as T
}
