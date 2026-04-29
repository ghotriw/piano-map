import type { NoteName } from '@entities/note';
import type { ScaleType } from './scaleFormulas';

export type ScaleFingering = {
  right: number[];
  left: number[];
  // index of notes where thumb tucks under (0-based, relative to scale notes array)
  thumbUnderRight?: number[];
  thumbUnderLeft?: number[];
};

// Standard fingering for major/natural_minor scales per root note.
// Only the most common keys are listed; others fall back to a default pattern.
const MAJOR_FINGERING: Partial<Record<NoteName, ScaleFingering>> = {
  C: {
    right: [1, 2, 3, 1, 2, 3, 4, 5],
    left: [5, 4, 3, 2, 1, 3, 2, 1],
    thumbUnderRight: [2],
    thumbUnderLeft: [4],
  },
  D: {
    right: [1, 2, 3, 1, 2, 3, 4, 5],
    left: [5, 4, 3, 2, 1, 3, 2, 1],
    thumbUnderRight: [2],
    thumbUnderLeft: [4],
  },
  E: {
    right: [1, 2, 3, 1, 2, 3, 4, 5],
    left: [5, 4, 3, 2, 1, 3, 2, 1],
    thumbUnderRight: [2],
    thumbUnderLeft: [4],
  },
  F: {
    right: [1, 2, 3, 4, 1, 2, 3, 4],
    left: [5, 4, 3, 2, 1, 3, 2, 1],
    thumbUnderRight: [3],
    thumbUnderLeft: [4],
  },
  G: {
    right: [1, 2, 3, 1, 2, 3, 4, 5],
    left: [5, 4, 3, 2, 1, 3, 2, 1],
    thumbUnderRight: [2],
    thumbUnderLeft: [4],
  },
  A: {
    right: [1, 2, 3, 1, 2, 3, 4, 5],
    left: [5, 4, 3, 2, 1, 3, 2, 1],
    thumbUnderRight: [2],
    thumbUnderLeft: [4],
  },
  B: {
    right: [1, 2, 3, 1, 2, 3, 4, 5],
    left: [4, 3, 2, 1, 4, 3, 2, 1],
    thumbUnderRight: [2],
    thumbUnderLeft: [3],
  },
  'F#': {
    right: [2, 3, 4, 1, 2, 3, 4, 5],
    left: [4, 3, 2, 1, 3, 2, 1, 4],
    thumbUnderRight: [3],
    thumbUnderLeft: [3],
  },
  Gb: {
    right: [2, 3, 4, 1, 2, 3, 4, 5],
    left: [4, 3, 2, 1, 3, 2, 1, 4],
    thumbUnderRight: [3],
    thumbUnderLeft: [3],
  },
  'C#': {
    right: [2, 3, 1, 2, 3, 4, 1, 2],
    left: [3, 2, 1, 4, 3, 2, 1, 3],
    thumbUnderRight: [2],
    thumbUnderLeft: [2],
  },
  Db: {
    right: [2, 3, 1, 2, 3, 4, 1, 2],
    left: [3, 2, 1, 4, 3, 2, 1, 3],
    thumbUnderRight: [2],
    thumbUnderLeft: [2],
  },
  Ab: {
    right: [3, 4, 1, 2, 3, 1, 2, 3],
    left: [3, 2, 1, 4, 3, 2, 1, 3],
    thumbUnderRight: [2],
    thumbUnderLeft: [2],
  },
  Eb: {
    right: [3, 1, 2, 3, 4, 1, 2, 3],
    left: [3, 2, 1, 4, 3, 2, 1, 3],
    thumbUnderRight: [1],
    thumbUnderLeft: [2],
  },
  Bb: {
    right: [4, 1, 2, 3, 1, 2, 3, 4],
    left: [3, 2, 1, 4, 3, 2, 1, 3],
    thumbUnderRight: [1],
    thumbUnderLeft: [2],
  },
};

const DEFAULT_FINGERING: ScaleFingering = {
  right: [1, 2, 3, 1, 2, 3, 4, 5],
  left: [5, 4, 3, 2, 1, 3, 2, 1],
  thumbUnderRight: [2],
  thumbUnderLeft: [4],
};

const PENTATONIC_FINGERING: ScaleFingering = {
  right: [1, 2, 3, 1, 2],
  left: [5, 4, 2, 1, 3],
};

const BLUES_FINGERING: ScaleFingering = {
  right: [1, 2, 3, 4, 1, 2],
  left: [5, 4, 3, 2, 1, 3],
};

export function getScaleFingering(root: NoteName, type: ScaleType): ScaleFingering {
  if (type === 'pentatonic_maj' || type === 'pentatonic_min') return PENTATONIC_FINGERING;
  if (type === 'blues') return BLUES_FINGERING;
  return MAJOR_FINGERING[root] ?? DEFAULT_FINGERING;
}
