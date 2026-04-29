import { getNoteIndex, getNoteByIndex } from '@entities/note';
import type { NoteName, Accidental } from '@entities/note';
import { CHORD_FORMULAS } from './chordFormulas';
import type { ChordType } from './chordFormulas';

export function getChordNotes(
  root: NoteName,
  type: ChordType,
  inversion: number = 0,
  accidental: Accidental = 'sharp'
): NoteName[] {
  const rootIdx = getNoteIndex(root);
  const formula = CHORD_FORMULAS[type];
  const notes = formula.map((interval) => getNoteByIndex(rootIdx + interval, accidental));

  // rotate for inversion
  const inv = ((inversion % notes.length) + notes.length) % notes.length;
  return [...notes.slice(inv), ...notes.slice(0, inv)];
}
