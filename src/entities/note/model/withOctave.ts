import { getNoteIndex } from './chromaticScale';
import type { NoteName } from './chromaticScale';

// Assigns octave numbers to a sequence of notes starting from rootOctave.
// Increments octave whenever the chromatic index wraps downward (e.g. G→C).
export function withOctave(notes: NoteName[], rootOctave: number): string[] {
  let octave = rootOctave;
  let prevIndex = -1;
  return notes.map((note) => {
    const idx = getNoteIndex(note);
    if (prevIndex !== -1 && idx <= prevIndex) octave++;
    prevIndex = idx;
    return `${note}${octave}`;
  });
}
