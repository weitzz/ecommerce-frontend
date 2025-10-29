import { CartItem } from "@/types/cart-item"
import { create } from 'zustand'
type CartState = {
    cart: CartItem[]
    shippingZipcode: string
    shippingCost: number
    shippingDays: number
    selectedAddressId: number | null
    addItem: (cartItem: CartItem) => void
    removeItem: (productId: number | string) => void
    updateQuantity: (productId: number | string, quantity: number) => void
    setShippingZipcode: (zipcode: string) => void
    setShippingCost: (cost: number) => void
    setShippingDays: (days: number) => void
    setSelectedAddressId: (addressId: number | null) => void
    clearCart: () => void
    clearShipping: () => void
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    shippingZipcode: '',
    shippingCost: 0,
    shippingDays: 0,
    selectedAddressId: null,


    addItem: ({ productId, quantity }) => set(state => {
        const existing = state.cart.find(item => item.productId === productId);
        let newCart
        if (existing) {
            newCart = state.cart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + quantity } : item
            );
        } else {
            newCart = [...state.cart, { productId, quantity }]
        }
        return { cart: newCart };
    }),


    removeItem: (productId) => set(state => {
        const newCart = state.cart.filter(item => item.productId !== productId)
        return { cart: newCart }
    }),
    updateQuantity: (productId, quantity) => set(state => {
        const newCart = state.cart.map(item =>
            item.productId === productId
                ? { ...item, quantity }
                : item
        );
        return { cart: newCart };
    }),
    setShippingZipcode: (zipcode: string) => set({ shippingZipcode: zipcode }),
    setShippingCost: (cost: number) => set({ shippingCost: cost }),
    setShippingDays: (days: number) => set({ shippingDays: days }),
    clearCart: () => set({
        cart: [], shippingZipcode: '',
        shippingCost: 0,
        shippingDays: 0,
        selectedAddressId: null
    }),
    clearShipping: () => set({
        shippingZipcode: '',
        shippingCost: 0,
        shippingDays: 0,
        selectedAddressId: null
    }),
    setSelectedAddressId: (addressId) => set({ selectedAddressId: addressId }),
}))