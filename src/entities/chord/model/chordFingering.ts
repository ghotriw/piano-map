import type { ChordType } from './chordFormulas';

export type Hand = 'right' | 'left';

// fingering[chordType][inversion] → { right, left }
// fingers: 1=thumb, 2=index, 3=middle, 4=ring, 5=pinky
export const CHORD_FINGERING: Record<ChordType, { right: number[]; left: number[] }[]> = {
  major: [
    { right: [1, 3, 5], left: [5, 3, 1] }, // root position
    { right: [1, 2, 5], left: [5, 3, 1] }, // 1st inversion
    { right: [1, 3, 5], left: [4, 2, 1] }, // 2nd inversion
  ],
  minor: [
    { right: [1, 3, 5], left: [5, 3, 1] },
    { right: [1, 2, 5], left: [5, 3, 1] },
    { right: [1, 3, 5], left: [4, 2, 1] },
  ],
  diminished: [
    { right: [1, 3, 5], left: [5, 3, 1] },
    { right: [1, 2, 5], left: [5, 3, 1] },
    { right: [1, 3, 5], left: [4, 2, 1] },
  ],
  augmented: [
    { right: [1, 3, 5], left: [5, 3, 1] },
    { right: [1, 2, 5], left: [5, 3, 1] },
    { right: [1, 3, 5], left: [4, 2, 1] },
  ],
  dom7: [
    { right: [1, 2, 3, 5], left: [5, 4, 2, 1] },
    { right: [1, 2, 4, 5], left: [5, 3, 2, 1] },
    { right: [1, 2, 3, 5], left: [5, 3, 2, 1] },
    { right: [1, 2, 4, 5], left: [5, 4, 2, 1] },
  ],
  maj7: [
    { right: [1, 2, 3, 5], left: [5, 4, 2, 1] },
    { right: [1, 2, 4, 5], left: [5, 3, 2, 1] },
    { right: [1, 2, 3, 5], left: [5, 3, 2, 1] },
    { right: [1, 2, 4, 5], left: [5, 4, 2, 1] },
  ],
  min7: [
    { right: [1, 2, 3, 5], left: [5, 4, 2, 1] },
    { right: [1, 2, 4, 5], left: [5, 3, 2, 1] },
    { right: [1, 2, 3, 5], left: [5, 3, 2, 1] },
    { right: [1, 2, 4, 5], left: [5, 4, 2, 1] },
  ],
};

export function getChordFingering(type: ChordType, inversion: number): { right: number[]; left: number[] } {
  const fingerings = CHORD_FINGERING[type];
  const idx = ((inversion % fingerings.length) + fingerings.length) % fingerings.length;
  return fingerings[idx];
}
