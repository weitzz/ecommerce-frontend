import type { FieldErrors, HttpError } from "@/libs/errors/http"

export type ActionResult<T = void, F = any> =
    | { success: true; data?: T }
    | {
        success: false
        errors: {
            fieldErrors?: FieldErrors<F>
            formError?: string
        }
    }


export type ReadResult<T> =
    | { success: true; data: T }
    | { success: false; error: HttpError }