import { create } from 'zustand';

interface PlaybackState {
  activeNotes: string[];
  setActiveNotes: (notes: string[]) => void;
}

export const usePlaybackStore = create<PlaybackState>((set) => ({
  activeNotes: [],
  setActiveNotes: (activeNotes) => set({ activeNotes }),
}));
