"use server"

import { apiFetchServer } from "@/libs/api-server"
import type { ReadResult } from "@/libs/actions/types"
import { HttpError } from "@/libs/errors/http"
export type Profile = {
    id: number
    name?: string | null
    email: string
}


export const getMe = async (): Promise<ReadResult<Profile>> => {
    try {
        const profile = await apiFetchServer<Profile>("/me")
        console.log(profile)
        return {
            success: true,
            data: profile
        }

    } catch (error) {
        if (error instanceof HttpError) {
            return {
                success: false,
                error
            }
        }

        return {
            success: false,
            error: new HttpError(500, "Erro inesperado")
        }
    }


}
