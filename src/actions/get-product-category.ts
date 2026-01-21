"use server"

import { api } from "@/libs/axios"
import { Category } from "@/types/category"
import { ProductComplete } from "@/types/products"

export const getProductCategory = async (id: number) => {

    try {
        const response = await api.get(`/product/${id}`)
        return {
            product: response.data.product as ProductComplete,
            category: response.data.category as Category,
        }
    } catch (error) {
        console.log(error)
    }


}   