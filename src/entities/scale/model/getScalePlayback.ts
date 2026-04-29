import type { Accidental, NoteName } from '@entities/note';
import { withOctave } from '@entities/note';
import type { Hand } from '@entities/hand';
import type { ScaleType } from './scaleFormulas';
import { getScaleNotes } from './getScaleNotes';
import { getScaleFingering } from './scaleFingering';

export interface ScalePlayback {
  ascending: string[];
  sequence: string[];
  fingers: number[];
}

// Builds the canonical up-and-down scale sequence: ascend to the octave,
// then descend back to the tonic without repeating the top note.
// One-octave major scale → 15 notes; pentatonic → 11.
export function getScalePlayback(
  root: NoteName,
  type: ScaleType,
  accidental: Accidental,
  rootOctave: number,
  hand: Hand
): ScalePlayback {
  const noteNames = getScaleNotes(root, type, accidental);
  const ascending = withOctave(noteNames, rootOctave);
  const sequence = [...ascending, ...ascending.slice(0, -1).reverse()];
  const ascFingers = getScaleFingering(root, type)[hand];
  const fingers = [...ascFingers, ...ascFingers.slice(0, -1).reverse()];
  return { ascending, sequence, fingers };
}
