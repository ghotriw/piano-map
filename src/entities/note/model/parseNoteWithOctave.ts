import type { NoteName } from './chromaticScale';

const NOTE_WITH_OCTAVE_RE = /^([A-G][#b]?)(\d+)$/;

export function parseNoteWithOctave(s: string): { name: NoteName; octave: number } | null {
  const m = s.match(NOTE_WITH_OCTAVE_RE);
  if (!m) return null;
  return { name: m[1] as NoteName, octave: Number(m[2]) };
}
