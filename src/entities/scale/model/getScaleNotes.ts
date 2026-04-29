import type { ScaleType } from './scaleFormulas';
import type { NoteName, Accidental } from '@entities/note';
import { getNoteIndex, getNoteByIndex } from '@entities/note';
import { SCALE_FORMULAS } from './scaleFormulas';

export function getScaleNotes(root: NoteName, type: ScaleType, accidental: Accidental = 'sharp'): NoteName[] {
  const rootIdx = getNoteIndex(root);
  return SCALE_FORMULAS[type].map((interval) => getNoteByIndex(rootIdx + interval, accidental));
}
