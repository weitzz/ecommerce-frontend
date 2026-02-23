"use server"

import { baseFetch } from "./api-core"
import { HttpError } from "./errors/http"
import { refreshAuthToken } from "./auth-refresh"
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

        const refreshToken = cookieStore.get("refreshToken")?.value;
        if (refreshToken) {
            headers.set("Cookie", `refreshToken=${refreshToken}`);
        }


        return baseFetch(path, {
            ...options,
            headers,
        })
    }

    let accessToken = cookieStore.get("accessToken")?.value
    if (!requireAuth) {
        const { response, data } = await makeRequest(accessToken)
        if (!response.ok) throw new HttpError(
            response.status,
            data?.error?.message ?? "Erro na API",
            data?.error?.code ?? "UNKNOWN_ERROR",
            {
                message: data?.error?.message,
                fieldErrors: data?.error?.fieldErrors
            }
        )

        return data.data as T
    }

    if (!accessToken) {
        console.log("AccessToken ausente, tentando refresh inicial...");
        const refreshTokenValue = cookieStore.get("refreshToken")?.value
        if (refreshTokenValue) {
            const tokenData = await refreshAuthToken(refreshTokenValue)
            accessToken = tokenData?.accessToken

        }
    }

    if (!accessToken) {
        console.log("acessToken:", accessToken)
        throw new HttpError(
            401,
            "Sessão inválida",
            "SESSION_INVALID"
        )
    }

    let { response, data } = await makeRequest(accessToken)


    if (
        response.status === 401 &&
        data?.error?.code === "AUTH_TOKEN_EXPIRED"
    ) {
        console.log("Access expirou durante SSR → trocando novamente")
        const rfTokenValue = cookieStore.get("refreshToken")?.value;
        if (rfTokenValue) {
            // refreshAuthToken agora retorna apenas a string do token novo
            const tokenData = await refreshAuthToken(rfTokenValue);
            accessToken = tokenData?.accessToken
        }


        if (!accessToken) {
            try {
                cookieStore.delete("accessToken");
                cookieStore.delete("refreshToken");
            } catch (error) {
                throw new HttpError(
                    401,
                    "Sessão expirada",
                    "SESSION_EXPIRED"
                )

            }

        }

        const retry = await makeRequest(accessToken)
        response = retry.response
        data = retry.data
    }

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