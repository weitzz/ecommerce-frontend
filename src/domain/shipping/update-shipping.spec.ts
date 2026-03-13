import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getShippingInfoMock } = vi.hoisted(() => ({
    getShippingInfoMock: vi.fn()
}))

vi.mock('@/actions/get-shipping-info', () => ({
    getShippingInfo: getShippingInfoMock
}))

vi.mock('@/libs/debounce', () => ({
    debounce: <T extends (...args: any[]) => any>(fn: T) => fn
}))

import { useCartStore } from '@/store/cartStore'
import { updateShippingByZipcode } from './update-shipping'

describe('updateShippingByZipcode', () => {
    beforeEach(() => {
        getShippingInfoMock.mockReset()
        useCartStore.setState({
            cart: [],
            shippingZipcode: '',
            shippingCost: 0,
            shippingDays: 0,
            selectedAddressId: null
        })
    })

    it('limpa o frete quando o CEP e invalido apos a sanitizacao', async () => {
        useCartStore.setState({
            shippingCost: 15,
            shippingDays: 2
        })

        await updateShippingByZipcode('12.345-6')

        expect(getShippingInfoMock).not.toHaveBeenCalled()
        expect(useCartStore.getState()).toMatchObject({
            shippingCost: 0,
            shippingDays: 0
        })
    })

    it('usa o CEP sanitizado e salva os dados de frete no sucesso', async () => {
        useCartStore.setState({
            shippingZipcode: '12345-678'
        })

        getShippingInfoMock.mockResolvedValue({
            success: true,
            data: {
                zipcode: '12345678',
                shippingCost: 19.9,
                shippingDays: 5
            }
        })

        await updateShippingByZipcode('12345-678')

        expect(getShippingInfoMock).toHaveBeenCalledWith('12345678')
        expect(useCartStore.getState()).toMatchObject({
            shippingCost: 19.9,
            shippingDays: 5
        })
    })

    it('limpa o frete quando a API retorna erro', async () => {
        useCartStore.setState({
            shippingZipcode: '12345678',
            shippingCost: 15,
            shippingDays: 2
        })

        getShippingInfoMock.mockResolvedValue({
            success: false,
            error: { message: 'Erro' }
        })

        await updateShippingByZipcode('12345-678')

        expect(useCartStore.getState()).toMatchObject({
            shippingCost: 0,
            shippingDays: 0
        })
    })

    it('nao sobrescreve o frete quando o CEP muda durante a requisicao', async () => {
        useCartStore.setState({
            shippingZipcode: '12345678'
        })

        getShippingInfoMock.mockImplementation(async () => {
            useCartStore.getState().setShippingZipcode('87654321')
            return {
                success: true,
                data: {
                    zipcode: '12345678',
                    shippingCost: 30,
                    shippingDays: 7
                }
            }
        })

        await updateShippingByZipcode('12345-678')

        expect(useCartStore.getState()).toMatchObject({
            shippingZipcode: '87654321',
            shippingCost: 0,
            shippingDays: 0
        })
    })
})
