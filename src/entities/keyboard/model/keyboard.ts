export type KeyboardSize = 25 | 37 | 49 | 61 | 88;

// Octave of the lowest physical key on the keyboard (used by the layout).
export const KEYBOARD_START_OCTAVE: Record<KeyboardSize, number> = {
  25: 3, // C3
  37: 2, // C2
  49: 2, // C2
  61: 1, // C1
  88: 0, // A0
};

// Allowed root-octave range — root note must fit + leave one octave of headroom
// for the highest chord/scale note (e.g. inversions ending at C of the next octave).
const ROOT_OCTAVE_RANGE: Record<KeyboardSize, { min: number; max: number }> = {
  25: { min: 3, max: 4 },
  37: { min: 2, max: 4 },
  49: { min: 2, max: 5 },
  61: { min: 1, max: 5 },
  88: { min: 1, max: 7 },
};

export function getRootOctaveRange(size: KeyboardSize): { min: number; max: number } {
  return ROOT_OCTAVE_RANGE[size];
}

export function clampRootOctave(octave: number, size: KeyboardSize): number {
  const { min, max } = ROOT_OCTAVE_RANGE[size];
  return Math.min(Math.max(octave, min), max);
}
