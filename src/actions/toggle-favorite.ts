// "use server"

// import { apiFetch } from "@/libs/api-core"
// import type { ReadResult } from "@/libs/actions/types"

// type ToggleFavoriteApiResponse = {
//     success: boolean
//     data: {
//         favorited: boolean
//         productId: number
//     }
// }

// export const toggleFavorite = async (
//     productId: number
// ): Promise<ReadResult<boolean>> => {
//     const response = await apiFetch<ToggleFavoriteApiResponse>(
//         "/me/favorites",
//         {
//             method: "POST",
//             body: JSON.stringify({ productId }),
//         }
//     )

//     if (!response.success) {
//         console.error("[toggleFavorite]", response.error)
//         return { success: false, error: response.error }
//     }

//     return {
//         success: true,
//         data: response.data.data.favorited,
//     }
// }
