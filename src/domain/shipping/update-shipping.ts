import { getShippingInfo } from "@/actions/get-shipping-info"
import { useCartStore } from "@/store/cartStore"
import { debounce } from "@/libs/debounce"

async function _updateShipping(zipcode: string) {
    const store = useCartStore.getState()
    const sanitizedZipcode = zipcode.replace(/\D/g, '')

    if (sanitizedZipcode.length !== 8) {
        store.clearShipping()
        return
    }

    const currentZipcode = store.shippingZipcode

    const result = await getShippingInfo(sanitizedZipcode)

    // evita race condition
    if (currentZipcode !== store.shippingZipcode) return

    if (!result.success) {
        store.clearShipping()
        return
    }

    store.setShippingCost(result.data.shippingCost)
    store.setShippingDays(result.data.shippingDays)
}

export const updateShippingByZipcode = debounce(_updateShipping, 500)
