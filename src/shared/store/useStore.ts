import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteName, Accidental } from '@entities/note';
import type { ChordType } from '@entities/chord';
import type { ScaleType } from '@entities/scale';
import type { Hand } from '@entities/hand';
import { clampRootOctave } from '@entities/keyboard';
import type { KeyboardSize } from '@entities/keyboard';

export type Mode = 'chord' | 'scale';
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'ru' | 'uk';

interface StoreState {
  mode: Mode;
  root: NoteName;
  rootOctave: number;
  hand: Hand;
  accidental: Accidental;
  showNoteLabels: boolean;
  highlightKeys: boolean;
  keyboardSize: KeyboardSize;
  chordType: ChordType;
  inversion: number;
  scaleType: ScaleType;
  language: Language;
  theme: Theme;
  set: (patch: Partial<Omit<StoreState, 'set'>>) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      mode: 'chord',
      root: 'C',
      rootOctave: 4,
      hand: 'right',
      accidental: 'sharp',
      showNoteLabels: false,
      highlightKeys: true,
      keyboardSize: 49,
      chordType: 'major',
      inversion: 0,
      scaleType: 'major',
      language: 'en',
      theme: 'system',
      // Keep rootOctave inside the chosen keyboard's range whenever either changes.
      set: (patch) =>
        set((state) => {
          const nextSize = patch.keyboardSize ?? state.keyboardSize;
          const nextOctave = patch.rootOctave ?? state.rootOctave;
          return { ...patch, rootOctave: clampRootOctave(nextOctave, nextSize) };
        }),
    }),
    { name: 'piano-map-settings' }
  )
);
