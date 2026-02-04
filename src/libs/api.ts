import { cookies } from "next/headers";
import { HttpError } from "@/libs/errors/http";

const API_URL = process.env.NEXT_PUBLIC_API_BASE!;

export type ApiResult<T> =
    | { success: true; data: T }
    | { success: false; error: HttpError & { code: ApiErrorCode } }


export type ApiErrorCode =
    | "AUTH_TOKEN_EXPIRED"
    | "AUTH_TOKEN_INVALID"
    | "AUTH_TOKEN_MISSING"
    | "UNKNOWN_ERROR"


function mapAuthError(error: HttpError): ApiErrorCode {
    if (error.status === 401) {
        if (error.message === "Token expirado") {
            return "AUTH_TOKEN_EXPIRED"
        }

        if (error.message === "Token inválido") {
            return "AUTH_TOKEN_INVALID"
        }

        if (error.message === "Token não fornecido") {
            return "AUTH_TOKEN_MISSING"
        }
    }

    return "UNKNOWN_ERROR"
}


export async function apiFetch<T>(
    path: string,
    options: RequestInit & { skipAuth?: boolean } = {}
): Promise<ApiResult<T>> {

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    const headers = new Headers(options.headers);

    if (token && !options.skipAuth) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json")
    }

    let response: Response

    try {
        response = await fetch(`${API_URL}${path}`, {
            ...options,
            headers,
            cache: "no-store",


        });

    } catch {
        const httpError = new HttpError(
            0,
            "Erro de conexão com a API",
            { message: "Erro de conexão com a API" }
        )

        return {
            success: false,
            error: {
                ...httpError,
                code: "UNKNOWN_ERROR"
            }
        }
    }
    const data = await response.json().catch(() => null)

    if (!response.ok) {
        const httpError = new HttpError(
            response.status,
            data?.error?.message || data?.message || "Erro na API",
            {
                message: data?.error?.message || "Erro na API",
                fieldErrors: data?.error?.fieldErrors
            }
        )

        return {
            success: false,
            error: {
                ...httpError,
                code: mapAuthError(httpError)
            }
        }
    }


    return {
        success: true,
        data
    }
};
