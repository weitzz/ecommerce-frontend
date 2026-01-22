import { cookies } from "next/headers";
import { HttpError } from "./Errors";

const API_URL = process.env.NEXT_PUBLIC_API_BASE!;



export const apiFetch = async (
    path: string,
    options: RequestInit = {}
) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    const headers = new Headers(options.headers);

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
        cache: "no-store"
    });

    const data = await response.json().catch(() => null)

    if (!response.ok) {
        throw new HttpError(
            response.status,
            data?.message || "Erro na API",
            data
        )
    }

    return data
};
