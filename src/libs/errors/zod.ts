import { ZodError } from "zod"
import type { FieldErrors } from "./http"


export function zodToFieldErrors<T>(
    error: ZodError<T>
): FieldErrors<T> {
    const fieldErrors: FieldErrors<T> = {}

    error.issues.forEach(issue => {
        const field = issue.path[0] as keyof T
        if (!field) return
        fieldErrors[field] = issue.message
    })

    return fieldErrors
}
