import { apiFetchServer } from "@/libs/api-server"
import { HttpError } from "@/libs/errors/http"
import type { ReadResult } from "@/libs/actions/types"
import { Category, CategoryMetadata } from "@/types/category"

type CategoryWithMetadata = {
    category: Category
    metadata: CategoryMetadata[]
}



export const getCategoryWithMetadata = async (slug: string): Promise<ReadResult<CategoryWithMetadata>> => {
    try {
        const data = await apiFetchServer<CategoryWithMetadata>(`/categories/${slug}/metadata`, {}, false)
        console.log(data.category.name)
        return {
            success: true,
            data
        }

    } catch (error) {
        if (error instanceof HttpError) {
            return {
                success: false,
                error
            }
        }

        return {
            success: false,
            error: new HttpError(500, "Erro inesperado")
        }
    }


}