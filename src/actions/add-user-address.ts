"use server"

import { apiFetch } from "@/libs/api"
import { Address } from "@/types/address"
import { getUserAddresses } from "./get-user-addresses"
import { AddressSchema } from "@/schemas/address"
import { zodToFieldErrors } from "@/libs/errors/zod"
import type { ActionResult } from "@/libs/actions/types"


export type AddAddressResponse = ActionResult<Address[], Address>




export const addUserAddress = async (prevState: AddAddressResponse,
    formData: FormData): Promise<AddAddressResponse> => {

    const parsed = AddressSchema.safeParse({
        zipcode: formData.get("zipcode"),
        street: formData.get("street"),
        number: formData.get("number"),
        city: formData.get("city"),
        state: formData.get("state"),
        country: formData.get("country"),
        complement: formData.get("complement"),
    })
    if (!parsed.success) {
        return {
            success: false,
            errors: { fieldErrors: zodToFieldErrors(parsed.error) }
        }
    }


    const response = await apiFetch('/me/addresses', {
        method: "POST",
        body: JSON.stringify(parsed.data),
    })

    if (!response.success) {
        return {
            success: false,
            errors: {
                formError: response.error.data?.message ?? "Erro ao cadastrar endereço"
            }
        }
    }

    const addressesResult = await getUserAddresses()

    if (!addressesResult) {
        return {
            success: false,
            errors: {
                formError: "Erro ao buscar endereços atualizados"
            }
        }
    }

    return {
        success: true,
        data: addressesResult
    }


}


