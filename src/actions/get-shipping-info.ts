"use server"


type ShippingInfoResponse = {
    zipcode: string
    cost: number
    days: number
}

export const getShippingInfo = async (zipcode: string): Promise<ShippingInfoResponse | false> => {
    return {
        zipcode: "12345678",
        cost: 20.00,
        days: 5
    }
}