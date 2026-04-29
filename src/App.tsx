import { useMemo } from 'react';
import { useStore } from '@shared/store/useStore';
import { PianoKeyboard } from '@widgets/piano-keyboard';
import { getChordNotes, getChordFingering } from '@entities/chord';
import { getScaleNotes, getScaleFingering } from '@entities/scale';
import { withOctave } from '@entities/note';
import './App.css';

const ROOT_OCTAVE = 4;

function App() {
  const mode = useStore((s) => s.mode);
  const root = useStore((s) => s.root);
  const accidental = useStore((s) => s.accidental);
  const hand = useStore((s) => s.hand);
  const chordType = useStore((s) => s.chordType);
  const inversion = useStore((s) => s.inversion);
  const scaleType = useStore((s) => s.scaleType);
  const keyboardSize = useStore((s) => s.keyboardSize);
  const showNoteLabels = useStore((s) => s.showNoteLabels);
  const activeNote = useStore((s) => s.activeNote);

  const { notes, fingerNumbers } = useMemo(() => {
    if (mode === 'chord') {
      const noteNames = getChordNotes(root, chordType, inversion, accidental);
      const notes = withOctave(noteNames, ROOT_OCTAVE);
      const fingering = getChordFingering(chordType, inversion);
      const fingers = fingering[hand === 'left' ? 'left' : 'right'];
      const fingerNumbers: Record<string, number> = {};
      notes.forEach((note, i) => {
        fingerNumbers[note] = fingers[i];
      });
      return { notes, fingerNumbers };
    }
    const noteNames = getScaleNotes(root, scaleType, accidental);
    const notes = withOctave(noteNames, ROOT_OCTAVE);
    const fingering = getScaleFingering(root, scaleType);
    const fingers = fingering[hand === 'left' ? 'left' : 'right'];
    const fingerNumbers: Record<string, number> = {};
    notes.forEach((note, i) => {
      fingerNumbers[note] = fingers[i];
    });
    return { notes, fingerNumbers };
  }, [mode, root, accidental, hand, chordType, inversion, scaleType]);

  return (
    <div className="app">
      <h1 className="app__title">🎹 Piano Map</h1>

      <div className="app__keyboard">
        <PianoKeyboard
          keyboardSize={keyboardSize}
          highlightedNotes={notes}
          activeNote={activeNote}
          fingerNumbers={fingerNumbers}
          showNoteLabels={showNoteLabels}
        />
      </div>

      <div className="app__notes">Notes: {notes.join(', ')}</div>
    </div>
  );
}

export default App;
