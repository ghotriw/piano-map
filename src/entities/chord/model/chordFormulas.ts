export type ChordType = 'major' | 'minor' | 'diminished' | 'augmented' | 'dom7' | 'maj7' | 'min7';

export const CHORD_FORMULAS: Record<ChordType, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
  dom7: [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
};
