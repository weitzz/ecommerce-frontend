"use server"

import { apiFetchServer } from "@/libs/api-server"
import { Address } from "@/types/address"
import { HttpError } from "@/libs/errors/http"


export const getUserAddresses = async (): Promise<Address[]> => {

    try {
        const response = await apiFetchServer<Address[]>('/me/addresses')
        return response

    } catch (error) {
        if (error instanceof HttpError) {

            if (error.status === 401) {
                return []
            }

            throw error
        }

        throw error
    }



}
