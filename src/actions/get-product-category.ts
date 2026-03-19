"use server"
import { apiFetchServer } from "@/libs/api-server"
import type { Category } from "@/types/category"
import type { ProductComplete } from "@/types/products"



type ProductCategoryData = {
    product: ProductComplete
    category: Category
}

export const getProductCategory = async (id: number): Promise<ProductCategoryData> => {

    const response = await apiFetchServer<ProductCategoryData>(`/products/${id}`, {}, false)

    return response
}   
