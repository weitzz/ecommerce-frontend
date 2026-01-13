export type Product = {
    id: number
    name: string
    image: string
    price: number
    liked?: boolean
}

export type ProductComplete = {
    id: number
    name: string
    images: string[]
    price: number
    liked?: boolean
    description: string
}