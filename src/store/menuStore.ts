import { create } from 'zustand'
interface MenuStore {
    isOpen: boolean;
    toggleMenu: () => void;
    openMenu: () => void;
    closeMenu: () => void;

    groups: Record<string, boolean>;
    toggleGroup: (id: string) => void;
    openGroup: (id: string) => void;
    closeGroup: (id: string) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
    isOpen: false,
    toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
    openMenu: () => set({ isOpen: true }),
    closeMenu: () => set({ isOpen: false }),
    groups: {},
    toggleGroup: (id) =>
        set((state) => ({
            groups: { ...state.groups, [id]: !state.groups[id] },
        })),
    openGroup: (id) =>
        set((state) => ({
            groups: { ...state.groups, [id]: true },
        })),
    closeGroup: (id) =>
        set((state) => ({
            groups: { ...state.groups, [id]: false },
        })),
}));