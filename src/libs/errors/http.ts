export type FieldErrors<T> = Partial<Record<keyof T, string>>

export type ApiErrorCode =
    | "AUTH_TOKEN_EXPIRED"
    | "AUTH_TOKEN_INVALID"
    | "AUTH_TOKEN_MISSING"
    | "VALIDATION_ERROR"
    | "UNKNOWN_ERROR"
    | "SESSION_EXPIRED"
    | "SESSION_INVALID"

export type ApiError<T = any> = {
    message: string
    fieldErrors?: FieldErrors<T>
}


export class HttpError<T = any> extends Error {
    readonly status: number
    readonly code: ApiErrorCode
    readonly data?: ApiError<T>

    constructor(
        status: number,
        message: string,
        code: ApiErrorCode = "UNKNOWN_ERROR",
        data?: ApiError<T>
    ) {
        super(message)
        this.name = 'HttpError'
        this.status = status
        this.code = code
        this.data = data
    }
}