"use server"

import { apiFetch } from "@/libs/api"
import { Address } from "@/types/address"

type GetUserAddressesApiResponse = {
    success: boolean
    data: Address[]
}


export const getUserAddresses = async (): Promise<Address[]> => {

    const response = await apiFetch<GetUserAddressesApiResponse>('/me/addresses')
    if (!response.success) {
        if (
            response.error.code === "AUTH_TOKEN_MISSING" ||
            response.error.code === "AUTH_TOKEN_EXPIRED" ||
            response.error.code === "AUTH_TOKEN_INVALID"
        ) {
            return []
        }

        throw response.error
    }

    return response.data.data


}
