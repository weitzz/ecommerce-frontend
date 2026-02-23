

const API_URL = process.env.NEXT_PUBLIC_API_BASE!

export async function baseFetch(path: string, options?: RequestInit) {
    const headers = new Headers(options?.headers)
    if (!headers.has("Content-Type")) {
        headers.set("Content-type", "application/json")
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
        cache: "no-store"
    })

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    return {
        response,
        data
    }
}
