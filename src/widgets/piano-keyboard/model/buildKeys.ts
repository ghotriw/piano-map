import { NOTES_SHARP, isBlackKey } from '@entities/note';
import type { NoteName } from '@entities/note';
import { KEYBOARD_START_OCTAVE } from '@entities/keyboard';
import type { KeyboardSize } from '@entities/keyboard';

export type KeyColor = 'white' | 'black';

export interface PianoKeyData {
  note: NoteName;
  octave: number;
  color: KeyColor;
  whiteIndex: number; // position among white keys (for layout)
}

export function buildKeys(keyboardSize: KeyboardSize): PianoKeyData[] {
  const keys: PianoKeyData[] = [];
  let whiteIndex = 0;
  let count = 0;

  const startOctave = KEYBOARD_START_OCTAVE[keyboardSize];
  let startNoteIndex = keyboardSize === 88 ? NOTES_SHARP.indexOf('A') : 0;
  let octave = startOctave;

  while (count < keyboardSize) {
    for (let i = startNoteIndex; i < NOTES_SHARP.length && count < keyboardSize; i++) {
      const note = NOTES_SHARP[i];
      const color: KeyColor = isBlackKey(note) ? 'black' : 'white';
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
