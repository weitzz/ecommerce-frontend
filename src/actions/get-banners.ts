"use server"
import { api } from "@/libs/axios"
import { Banner } from "@/types/banner"


export const getBanners = async () => {
    try {
        const response = await api.get('/banners')
        if (response.status === 200) {

            return response.data.banners as Banner[]

        }
        return []
    } catch (error) {
        console.log(error)
    }
    return []
}