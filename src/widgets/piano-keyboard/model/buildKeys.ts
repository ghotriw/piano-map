import type { NoteName } from '@entities/note';

export type KeyColor = 'white' | 'black';

export interface PianoKeyData {
  note: NoteName;
  octave: number;
  color: KeyColor;
  whiteIndex: number; // position among white keys (for layout)
}

// Notes that are black keys
const BLACK_NOTES = new Set(['C#', 'Db', 'D#', 'Eb', 'F#', 'Gb', 'G#', 'Ab', 'A#', 'Bb']);

// Full chromatic sequence within one octave, starting from C
const OCTAVE_NOTES: NoteName[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Keyboard sizes always start from a C note
const START_OCTAVE: Record<number, number> = {
  25: 3, // C3–C5
  37: 2, // C2–C5
  49: 2, // C2–C6
  61: 1, // C1–C6
  88: 0, // A0–C8
};

export function buildKeys(keyboardSize: number): PianoKeyData[] {
  const keys: PianoKeyData[] = [];
  let whiteIndex = 0;
  let count = 0;

  // 88-key starts at A0, others start at C
  const startOctave = START_OCTAVE[keyboardSize] ?? 2;
  let startNoteIndex = keyboardSize === 88 ? OCTAVE_NOTES.indexOf('A') : 0;
  let octave = startOctave;

  while (count < keyboardSize) {
    for (let i = startNoteIndex; i < OCTAVE_NOTES.length && count < keyboardSize; i++) {
      const note = OCTAVE_NOTES[i];
      const color: KeyColor = BLACK_NOTES.has(note) ? 'black' : 'white';
      keys.push({
        note,
        octave,
        color,
        whiteIndex: color === 'white' ? whiteIndex : whiteIndex - 1,
      });
      if (color === 'white') whiteIndex++;
      count++;
    }
    startNoteIndex = 0;
    octave++;
  }

  return keys;
}
