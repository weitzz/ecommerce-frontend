import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore } from './cartStore'

describe('useCartStore', () => {
    beforeEach(() => {
        useCartStore.setState({
            cart: [],
            shippingZipcode: '',
            shippingCost: 0,
            shippingDays: 0,
            selectedAddressId: null
        })
    })

    it('adiciona um novo item ao carrinho', () => {
        useCartStore.getState().addItem({ productId: 1, quantity: 2 })

        expect(useCartStore.getState().cart).toEqual([
            { productId: 1, quantity: 2 }
        ])
    })

    it('soma a quantidade quando o produto ja existe', () => {
        useCartStore.setState({
            cart: [{ productId: 1, quantity: 1 }]
        })

        useCartStore.getState().addItem({ productId: 1, quantity: 3 })

        expect(useCartStore.getState().cart).toEqual([
            { productId: 1, quantity: 4 }
        ])
    })

    it('remove o item quando a quantidade e atualizada para zero ou menos', () => {
        useCartStore.setState({
            cart: [{ productId: 1, quantity: 2 }]
        })

        useCartStore.getState().updateQuantity(1, 0)

        expect(useCartStore.getState().cart).toEqual([])
    })

    it('limpa todo o estado do carrinho e do frete', () => {
        useCartStore.setState({
            cart: [{ productId: 1, quantity: 2 }],
            shippingZipcode: '01001000',
            shippingCost: 25,
            shippingDays: 4,
            selectedAddressId: 10
        })

        useCartStore.getState().clearCart()

        expect(useCartStore.getState()).toMatchObject({
            cart: [],
            shippingZipcode: '',
            shippingCost: 0,
            shippingDays: 0,
            selectedAddressId: null
        })
    })

    it('limpa a selecao de frete mas mantem o endereco selecionado', () => {
        useCartStore.setState({
            shippingZipcode: '01001000',
            shippingCost: 20,
            shippingDays: 3,
            selectedAddressId: 7
        })

        useCartStore.getState().clearShippingSelection()

        expect(useCartStore.getState()).toMatchObject({
            shippingZipcode: '',
            shippingCost: 0,
            shippingDays: 0,
            selectedAddressId: 7
        })
    })
})
