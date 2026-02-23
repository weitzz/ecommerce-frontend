export function getImageUrl(
    image?: string | null
): string | null {
    if (!image) return null

    const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_BASE

    if (!IMAGE_BASE_URL) {
        throw new Error("NEXT_PUBLIC_API_BASE não definido")
    }

    if (image.startsWith("/")) {
        return `${IMAGE_BASE_URL}${image}`
    }

    return `${IMAGE_BASE_URL}/${image}`
}
