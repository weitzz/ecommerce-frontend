import { apiFetch } from "@/libs/api"
import type { ReadResult } from "@/libs/actions/types"
import { Category, CategoryMetadata } from "@/types/category"

type CategoryWithMetadata = {
    category: Category
    metadata: CategoryMetadata[]
}

type GetCategoryWithMetadataApiResponse = {
    success: boolean
    data: CategoryWithMetadata
}

export const getCategoryWithMetadata = async (slug: string): Promise<ReadResult<CategoryWithMetadata>> => {

    const response = await apiFetch<GetCategoryWithMetadataApiResponse>(`/categories/${slug}/metadata`)

    if (!response.success) {
        console.error(
            "[getCategoryWithMetadata]",
            response.error
        )
        return {
            success: false,
            error: response.error
        }

    }
    console.log("RESPONSE", response.data)
    return {
        success: true,
        data: response.data.data
    }


}