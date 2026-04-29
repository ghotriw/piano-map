import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteName, Accidental } from '@entities/note';
import type { ChordType } from '@entities/chord';
import type { ScaleType } from '@entities/scale';
import type { Hand } from '@entities/chord';

export type Mode = 'chord' | 'scale';
export type KeyboardSize = 25 | 37 | 49 | 61 | 88;
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'ru' | 'uk';

interface StoreState {
  mode: Mode;
  root: NoteName;
  hand: Hand;
  accidental: Accidental;
  showNoteLabels: boolean;
  keyboardSize: KeyboardSize;
  chordType: ChordType;
  inversion: number;
  scaleType: ScaleType;
  language: Language;
  theme: Theme;
  activeNote: string | null;
  set: (patch: Partial<Omit<StoreState, 'set'>>) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      mode: 'chord',
      root: 'C',
      hand: 'right',
      accidental: 'sharp',
      showNoteLabels: false,
      keyboardSize: 49,
      chordType: 'major',
      inversion: 0,
      scaleType: 'major',
      language: 'en',
      theme: 'system',
      activeNote: null,
      set: (patch) => set(patch),
    }),
    {
      name: 'piano-map-settings',
      partialize: (state) => {
        const copy: Partial<StoreState> = { ...state };
        delete copy.activeNote;
        return copy;
      },
    }
  )
);
