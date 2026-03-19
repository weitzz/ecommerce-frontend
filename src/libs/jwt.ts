type JwtPayload = {
    exp?: number
}

const decodeJwtPayload = (token: string): JwtPayload | null => {
    const [, payload] = token.split(".")

    if (!payload) return null

    try {
        const normalized = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            .padEnd(Math.ceil(payload.length / 4) * 4, "=")

        return JSON.parse(atob(normalized)) as JwtPayload
    } catch {
        return null
    }
}

export const isJwtExpired = (token: string, bufferInSeconds: number = 30) => {
    const payload = decodeJwtPayload(token)
    if (!payload?.exp) return false

    const nowInSeconds = Math.floor(Date.now() / 1000)
    return payload.exp <= nowInSeconds + bufferInSeconds
}
