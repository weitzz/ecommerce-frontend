import { baseFetch } from "./api-core"
import { refreshAuthToken } from "./auth-refresh"
import { HttpError } from "./errors/http"

export async function apiFetchClient<T>(
    path: string,
    options?: RequestInit
): Promise<T> {

    let { response, data } = await baseFetch(path, {
        ...options,
        credentials: "include"
    })

    if (response.status === 401) {
        console.log("Token expirado → tentando refresh API-CLIENT")
        const refreshed = await refreshAuthToken()

        if (refreshed) {
            const retry = await baseFetch(path, {
                ...options,
                credentials: "include"
            })

            response = retry.response
            data = retry.data
        }
    }

    if (!response.ok) {
        throw new HttpError(
            response.status,
            data?.error?.message ?? "Erro na API",
            data?.error?.code ?? "UNKNOWN_ERROR",
            data?.error
        )
    }

    return data
}
