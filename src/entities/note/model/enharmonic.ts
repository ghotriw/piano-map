import type { NoteName } from './chromaticScale';
import { parseNoteWithOctave } from './parseNoteWithOctave';

const ENHARMONIC: Partial<Record<NoteName, NoteName>> = {
  'C#': 'Db',
  Db: 'C#',
  'D#': 'Eb',
  Eb: 'D#',
  'F#': 'Gb',
  Gb: 'F#',
  'G#': 'Ab',
  Ab: 'G#',
  'A#': 'Bb',
  Bb: 'A#',
};

const FLAT_TO_SHARP: Partial<Record<NoteName, NoteName>> = {
  Db: 'C#',
  Eb: 'D#',
  Gb: 'F#',
  Ab: 'G#',
  Bb: 'A#',
};

export function toEnharmonic(note: NoteName): NoteName {
  return ENHARMONIC[note] ?? note;
}

export function toSharp(note: NoteName): NoteName {
  return FLAT_TO_SHARP[note] ?? note;
}

// Converts e.g. 'Bb4' → 'A#4'. Used by the keyboard, which renders only sharp positions.
export function normalizeNoteToSharp(noteWithOctave: string): string {
  const parsed = parseNoteWithOctave(noteWithOctave);
  if (!parsed) return noteWithOctave;
  return `${toSharp(parsed.name)}${parsed.octave}`;
}
