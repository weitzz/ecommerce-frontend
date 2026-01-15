
import { Product } from '@/types/products';
import { create } from 'zustand'
type Store = {
    products: Product[];
    setProducts: (products: Product[]) => void;
}

export const useProducstStore = create<Store>((set) => ({
    products: [],
    setProducts: (products: Product[]) => set({ products }),
}))