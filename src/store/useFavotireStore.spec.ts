import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getFavoriteIdsMock, toggleFavoriteActionMock } = vi.hoisted(() => ({
    getFavoriteIdsMock: vi.fn(),
    toggleFavoriteActionMock: vi.fn()
}))

vi.mock('@/actions/get-favorite-ids', () => ({
    getFavoriteIds: getFavoriteIdsMock
}))

vi.mock('@/actions/toggle-favorite', () => ({
    toggleFavorite: toggleFavoriteActionMock
}))

import { useFavoriteStore } from './useFavotireStore'

describe('useFavoriteStore', () => {
    beforeEach(() => {
        getFavoriteIdsMock.mockReset()
        toggleFavoriteActionMock.mockReset()

        useFavoriteStore.setState({
            favorites: new Set(),
            isLoading: false,
            isHydrated: false
        })
    })

    it('hidrata os favoritos da API uma unica vez', async () => {
        getFavoriteIdsMock.mockResolvedValue({
            success: true,
            data: [1, 2, 3]
        })

        await useFavoriteStore.getState().loadFavorites()

        expect(getFavoriteIdsMock).toHaveBeenCalledTimes(1)
        expect([...useFavoriteStore.getState().favorites]).toEqual([1, 2, 3])
        expect(useFavoriteStore.getState().isHydrated).toBe(true)
        expect(useFavoriteStore.getState().isLoading).toBe(false)
    })

    it('nao chama a API novamente quando ja esta hidratada', async () => {
        useFavoriteStore.setState({
            favorites: new Set([5]),
            isHydrated: true
        })

        await useFavoriteStore.getState().loadFavorites()

        expect(getFavoriteIdsMock).not.toHaveBeenCalled()
    })

    it('aplica atualizacao otimista e mantem o estado confirmado pelo servidor', async () => {
        toggleFavoriteActionMock.mockResolvedValue({
            success: true,
            data: true
        })

        await useFavoriteStore.getState().toggleFavorite(10, false)

        expect(toggleFavoriteActionMock).toHaveBeenCalledWith(10)
        expect(useFavoriteStore.getState().isFavorited(10)).toBe(true)
        expect(useFavoriteStore.getState().isHydrated).toBe(true)
    })

    it('faz rollback da atualizacao otimista quando a action falha', async () => {
        useFavoriteStore.setState({
            favorites: new Set([10]),
            isHydrated: true
        })

        toggleFavoriteActionMock.mockResolvedValue({
            success: false,
            error: { message: 'Falha' }
        })

        await useFavoriteStore.getState().toggleFavorite(10)

        expect(useFavoriteStore.getState().isFavorited(10)).toBe(true)
    })
})
