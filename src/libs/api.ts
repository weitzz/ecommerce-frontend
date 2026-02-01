import { cookies } from "next/headers";
import { HttpError } from "@/libs/errors/http";

const API_URL = process.env.NEXT_PUBLIC_API_BASE!;

export type ApiResult<T> =
    | { ok: true; data: T }
    | { ok: false; error: HttpError }




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

        return {
            ok: false,
            error: new HttpError(0, "Erro de conexão com a API", {
                message: "Erro de conexão com a API"
            })
        };
    }
    const data = await response.json().catch(() => null)

    if (!response.ok) {
        return {
            ok: false,
            error: new HttpError(
                response.status,
                data?.error?.message || data?.message || "Erro na API",
                {
                    message: data?.error?.message || "Erro na API",
                    fieldErrors: data?.error?.fieldErrors
                }
            )
        }
    }

    return {
        ok: true,
        data
    }
};
