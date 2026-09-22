import { create } from "zustand";
import type { CartItem, Dessert } from "../types";

type CartState = {
    items: CartItem[],
    addItem: (dessert: Dessert) => void,
    incrementItem: (name: string) => void,
    decrementItem: (name: string) => void,
    removeItem: (name: string) => void,
    clearCart: () => void
}

export const useCartStore = create<CartState>((set)=>({
    items: [],
    addItem: (dessert) => set((state)=>({
        items: [...state.items, {...dessert, quantity: 1}]
    })),
    incrementItem: (name) => set((state)=>({})),
    decrementItem: (name) => set((state)=>({})),
    removeItem: (name) => set((state)=>({})),
    clearCart: () => set((state)=>({})),
}))