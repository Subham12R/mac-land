import { create } from 'zustand'

const useMackbookStore = create((set) => ({
    color: '#2e2c2e',
    scale: 0.08,
    setColor: (color) => set({ color }),
    setScale: (scale) => set({ scale }),
    

    reset: () => set({ color: '#2e2c2e', scale: 0.08 }),
}))

export default useMackbookStore