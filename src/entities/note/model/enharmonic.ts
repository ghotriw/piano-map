import type { NoteName } from './chromaticScale';

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

export function toEnharmonic(note: NoteName): NoteName {
  return ENHARMONIC[note] ?? note;
}
