"use server"

import { api } from "@/libs/axios"
import { Category, CategoryMetadata } from "@/types/category"

type CategoryWithMetadata = {
    category: Category
    metadata: CategoryMetadata[]
}

export const getCategoryWithMetadata = async (slug: string) => {
    try {
        const response = await api.get(`/category/${slug}/metadata`)
        console.log(response.data)
        return response.data as CategoryWithMetadata
    } catch (error) {
        console.error(
            "[getCategoryWithMetadata] Error fetching category metadata:",
            error
        )
        return null
    }
}