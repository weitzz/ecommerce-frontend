import { getShippingInfo } from "@/actions/get-shipping-info"
import { useCartStore } from "@/store/cartStore"
import { debounce } from "@/libs/debounce"

async function _updateShipping(zipcode: string) {
    const sanitizedZipcode = zipcode.replace(/\D/g, '')

    if (sanitizedZipcode.length !== 8) {
        useCartStore.getState().clearShipping()
        return
    }

    const currentZipcode = useCartStore.getState().shippingZipcode

    const result = await getShippingInfo(sanitizedZipcode)

    // evita race condition
    if (currentZipcode !== useCartStore.getState().shippingZipcode) return

    if (!result.success) {
        useCartStore.getState().clearShipping()
        return
    }

    useCartStore.getState().setShippingCost(result.data.shippingCost)
    useCartStore.getState().setShippingDays(result.data.shippingDays)
}

export const updateShippingByZipcode = debounce(_updateShipping, 500)
