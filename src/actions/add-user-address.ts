"use server"

import { apiFetchServer } from "@/libs/api-server"
import { HttpError } from "@/libs/errors/http"
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

    try {
        await apiFetchServer<void>('/me/addresses', {
            method: "POST",
            body: JSON.stringify(parsed.data),
        })
        const updatedAddresses = await getUserAddresses()

        return {
            success: true,
            data: updatedAddresses
        }

    } catch (error) {
        if (error instanceof HttpError) {
            return {
                success: false,
                errors: {
                    formError:
                        error.data?.message ??
                        "Erro ao cadastrar endereço"
                }
            }
        }

        return {
            success: false,
            errors: {
                formError: "Erro inesperado"
            }
        }
    }





}


