import { create } from 'zustand';

interface PlaybackState {
  activeNote: string | null;
  setActiveNote: (note: string | null) => void;
}

export const usePlaybackStore = create<PlaybackState>((set) => ({
  activeNote: null,
  setActiveNote: (activeNote) => set({ activeNote }),
}));
