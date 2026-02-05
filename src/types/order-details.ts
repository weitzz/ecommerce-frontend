
export type OrderDetail = {
    id: number
    status: string
    totalPrice: number
    shippingCost: number
    shippingDays: number
    createdAt: string
    address: {
        street: string
        number: string
        city: string
        state: string
        zipcode: string
    }
    items: {
        productId: number
        name: string
        quantity: number
        price: number
        image?: string | null
    }[]
}