import { baseFetch } from "./api-core"
import { HttpError } from "./errors/http"

export async function apiFetchClient<T>(
    path: string,
    options?: RequestInit
): Promise<T> {

    let { response, data } = await baseFetch(path, {
        ...options,
        credentials: "include"
    })

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
