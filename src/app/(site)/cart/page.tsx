import { getCartState } from '@/actions/get-cart-state'
import { getProductsFromList } from '@/actions/get-products-from-list'
import { CartContainer } from '@/components/cart/cart-container'
import { getServerAuthToken } from '@/libs/server-cookies'
import { CartListItem } from '@/types/cart-list-item'
import { redirect } from 'next/navigation'


const Page = async () => {
    const token = await getServerAuthToken();
    if (!token) {
        redirect("/login");
    }
    const { cart } = await getCartState()
    console.log(cart)
    if (cart.length === 0) {
        redirect('/')
    }

    const ids = cart.map(item => item.productId)
    const products = await getProductsFromList(ids)

    let cartProducts: CartListItem[] = []
    let subtotal: number = 0

    const productMap = new Map(
        products.map(p => [p.id, p])
    )

    for (const cartItem of cart) {
        const product = productMap.get(cartItem.productId)
        if (!product) continue

        cartProducts.push({
            product,
            quantity: cartItem.quantity
        })
        subtotal += product.price * cartItem.quantity

    }


    return (
        <CartContainer initialCartProducts={cartProducts} initialSubtotal={subtotal} />
    )
}

export default Page