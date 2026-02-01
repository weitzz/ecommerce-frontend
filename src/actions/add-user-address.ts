"use server"

import { apiFetch } from "@/libs/api"
import { Address } from "@/types/address"
import { getUserAddresses } from "./get-user-addresses"
import { AddressSchema } from "@/schemas/address"
import { zodToFieldErrors } from "@/libs/errors/zod"
import { ActionResult } from "@/libs/actions/types"






export const addUserAddress = async (token: string, address: Address): Promise<ActionResult> => {
    const parsed = AddressSchema.safeParse(address)
    if (!parsed.success) {
        const fieldErrors: Partial<Record<keyof Address, string>> = {}

        parsed.error.issues.forEach(issue => {
            const field = issue.path[0] as keyof Address
            fieldErrors[field] = issue.message
        })

        return {
            success: false,
            errors: { fieldErrors }
        }
    }

    try {
        await apiFetch('/me/addresses', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsed.data),
        })


        console.log(JSON.stringify(parsed.data))

        const addresses = await getUserAddresses(token)

        console.log(addresses)

        return {
            success: true,
            data: addresses,
        }



    } catch (error) {
        console.error("ADD ADDRESS ERROR:", error)
        if (error instanceof HttpError) {

            return {
                success: false,
                errors: {
                    formError: error.message || "Erro ao cadastrar endereço"
                }
            };
        }

        return {
            success: false,
            errors: {
                formError: 'Erro interno ao cadastrar endereço'
            }
        }
    }

}


