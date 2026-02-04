"use server"
import { apiFetch } from "@/libs/api"
import type { ReadResult } from "@/libs/actions/types"
import type { Category } from "@/types/category"
import type { ProductComplete } from "@/types/products"


type GetProductCategoryApiResponse = {
    success: boolean
    data: {
        product: ProductComplete
        category: Category
    }
}

type ProductCategoryData = {
    product: ProductComplete
    category: Category
}

export const getProductCategory = async (id: number): Promise<ProductCategoryData> => {

    const response = await apiFetch<GetProductCategoryApiResponse>(`/products/${id}`)

    if (!response.success) {
        // 🔥 regra de ouro do App Router
        throw response.error
    }

    // aqui o response.data é o retorno cru da API
    return {
        product: response.data.data.product,
        category: response.data.data.category,
    }



}   