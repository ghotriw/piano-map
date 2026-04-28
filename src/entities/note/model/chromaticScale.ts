export const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;
export const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'] as const;

export type NoteName = (typeof NOTES_SHARP)[number] | (typeof NOTES_FLAT)[number];

export type Accidental = 'sharp' | 'flat';

export function getNoteIndex(note: NoteName): number {
  const idx = NOTES_SHARP.indexOf(note as (typeof NOTES_SHARP)[number]);
  if (idx !== -1) return idx;
  return NOTES_FLAT.indexOf(note as (typeof NOTES_FLAT)[number]);
}

export function getNoteByIndex(index: number, accidental: Accidental = 'sharp'): NoteName {
  const i = ((index % 12) + 12) % 12;
  return accidental === 'sharp' ? NOTES_SHARP[i] : NOTES_FLAT[i];
}
