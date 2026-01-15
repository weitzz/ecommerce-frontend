import { getCartState } from '@/actions/get-cart-state'
import { getProductsFromList } from '@/actions/get-products-from-list'
import { CartContainer } from '@/components/cart/cart-container'
import { CartListItem } from '@/types/cart-list-item'
import { redirect } from 'next/navigation'


const Page = async () => {
    const { cart: initialCart } = await getCartState()

    if (initialCart.length === 0) {
        redirect('/')
        return null
    }

    let cartProducts: CartListItem[] = []
    let subtotal: number = 0
    const ids = initialCart.map(item => item.productId)
    const products = await getProductsFromList(ids)

    for (let cartItem of initialCart) {
        let prodIndex = products.findIndex(item => item.id === cartItem.productId)
        if (prodIndex > -1) {
            cartProducts.push({
                product: products[prodIndex],
                quantity: cartItem.quantity
            })
            subtotal += products[prodIndex].price * cartItem.quantity
        }
    }


    return (
        <CartContainer initialCartProducts={cartProducts} initialSubtotal={subtotal} />
    )
}

export default Page