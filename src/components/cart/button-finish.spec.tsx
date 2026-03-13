import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuthStore } from '@/store/auth'
import { useCartStore } from '@/store/cartStore'

const { finishCartMock, showToastMock, replaceMock } = vi.hoisted(() => ({
    finishCartMock: vi.fn(),
    showToastMock: vi.fn(),
    replaceMock: vi.fn()
}))

vi.mock('@/actions/finish-cart', () => ({
    finishCart: finishCartMock
}))

vi.mock('next/link', () => ({
    default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
        <a href={href} {...props}>
            {children}
        </a>
    )
}))

vi.mock('@/components/ui/toast/toast-context', () => ({
    useToast: () => ({
        showToast: showToastMock
    })
}))

import ButtonFinish from './button-finish'

describe('ButtonFinish', () => {
    beforeEach(() => {
        finishCartMock.mockReset()
        showToastMock.mockReset()
        replaceMock.mockReset()

        vi.stubGlobal('location', {
            ...window.location,
            replace: replaceMock
        })

        useAuthStore.setState({
            isAuthenticated: false,
            hydrated: true
        })

        useCartStore.setState({
            cart: [],
            shippingZipcode: '',
            shippingCost: 0,
            shippingDays: 0,
            selectedAddressId: null
        })
    })

    it('nao renderiza nada enquanto a store de autenticacao nao esta hidratada', () => {
        useAuthStore.setState({
            hydrated: false
        })

        const { container } = render(<ButtonFinish />)

        expect(container).toBeEmptyDOMElement()
    })

    it('renderiza o link de login quando o usuario nao esta autenticado', () => {
        render(<ButtonFinish />)

        expect(screen.getByRole('link', { name: 'Faça login para finalizar compra' })).toHaveAttribute('href', '/login')
    })

    it('desabilita o botao de finalizar quando nenhum endereco esta selecionado', () => {
        useAuthStore.setState({
            isAuthenticated: true
        })

        render(<ButtonFinish />)

        expect(screen.getByRole('button', { name: 'Finalizar Compra' })).toBeDisabled()
    })

    it('redireciona para a URL de checkout ao finalizar com sucesso', async () => {
        const user = userEvent.setup()

        useAuthStore.setState({
            isAuthenticated: true
        })
        useCartStore.setState({
            cart: [{ productId: 9, quantity: 2 }],
            selectedAddressId: 12
        })
        finishCartMock.mockResolvedValue({
            success: true,
            data: '/checkout/session'
        })

        render(<ButtonFinish />)

        await user.click(screen.getByRole('button', { name: 'Finalizar Compra' }))

        expect(finishCartMock).toHaveBeenCalledWith(12, [{ productId: 9, quantity: 2 }])
        expect(replaceMock).toHaveBeenCalledWith('/checkout/session')
    })

    it('mostra um toast de erro quando a finalizacao falha', async () => {
        const user = userEvent.setup()

        useAuthStore.setState({
            isAuthenticated: true
        })
        useCartStore.setState({
            cart: [{ productId: 3, quantity: 1 }],
            selectedAddressId: 5
        })
        finishCartMock.mockResolvedValue({
            success: false,
            error: { message: 'Falha' }
        })

        render(<ButtonFinish />)

        await user.click(screen.getByRole('button', { name: 'Finalizar Compra' }))

        expect(showToastMock).toHaveBeenCalledWith('Erro ao finalizar compra, tente novamente.', 'error')
        expect(replaceMock).not.toHaveBeenCalled()
    })
})
