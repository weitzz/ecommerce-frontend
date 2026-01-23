export type FieldErrors<T> = Partial<Record<keyof T, string>>

export type ApiError<T = any> = {
    message: string
    fieldErrors?: FieldErrors<T>
}


export class HttpError<T = any> extends Error {
    readonly status: number
    readonly data?: ApiError<T>

    constructor(
        status: number,
        message: string,
        data?: ApiError<T>
    ) {
        super(message)
        this.name = 'HttpError'
        this.status = status
        this.data = data
    }
}