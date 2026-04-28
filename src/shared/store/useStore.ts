import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type KeyboardSize = 25 | 37 | 49 | 61 | 88;

interface StoreState {
  keyboardSize: KeyboardSize;
  set: (patch: Partial<Omit<StoreState, 'set'>>) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      keyboardSize: 49,
      set: (patch) => set(patch),
    }),
    {
      name: 'piano-map-settings',
      partialize: (state) => {
        const copy: Partial<StoreState> = { ...state };
        return copy;
      },
    }
  )
);
