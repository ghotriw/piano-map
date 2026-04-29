export type ScaleType = 'major' | 'natural_minor' | 'harmonic_minor' | 'pentatonic_maj' | 'pentatonic_min' | 'blues';

export const SCALE_FORMULAS: Record<ScaleType, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11, 12],
  natural_minor: [0, 2, 3, 5, 7, 8, 10, 12],
  harmonic_minor: [0, 2, 3, 5, 7, 8, 11, 12],
  pentatonic_maj: [0, 2, 4, 7, 9, 12],
  pentatonic_min: [0, 3, 5, 7, 10, 12],
  blues: [0, 3, 5, 6, 7, 10, 12],
};
