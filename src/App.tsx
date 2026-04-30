import { useMemo } from 'react';
import { useStore } from '@shared/store/useStore';
import { PianoKeyboard } from '@widgets/piano-keyboard';
import { getChordNotes, getChordFingering } from '@entities/chord';
import { getScalePlayback } from '@entities/scale';
import { withOctave } from '@entities/note';
import { SelectMode } from '@features/select-mode';
import { SelectRoot } from '@features/select-root';
import { SelectRootOctave } from '@features/select-root-octave';
import { SelectChordType } from '@features/select-chord-type';
import { SelectScaleType } from '@features/select-scale-type';
import { SelectInversion } from '@features/select-inversion';
import { SelectHand } from '@features/select-hand';
import { SelectAccidental } from '@features/select-accidental';
import { SelectKeyboardSize } from '@features/select-keyboard-size';
import { PlayButton, usePlaybackStore } from '@features/play-notes';
import './App.css';

function buildFingerMap(notes: string[], fingers: number[]): Record<string, number> {
  const map: Record<string, number> = {};
  notes.forEach((note, i) => {
    map[note] = fingers[i];
  });
  return map;
}

function App() {
  const mode = useStore((s) => s.mode);
  const root = useStore((s) => s.root);
  const rootOctave = useStore((s) => s.rootOctave);
  const accidental = useStore((s) => s.accidental);
  const hand = useStore((s) => s.hand);
  const chordType = useStore((s) => s.chordType);
  const inversion = useStore((s) => s.inversion);
  const scaleType = useStore((s) => s.scaleType);
  const keyboardSize = useStore((s) => s.keyboardSize);
  const showNoteLabels = useStore((s) => s.showNoteLabels);
  const highlightKeys = useStore((s) => s.highlightKeys);
  const set = useStore((s) => s.set);
  const activeNotes = usePlaybackStore((s) => s.activeNotes);

  const { notes, playbackNotes, fingerNumbers } = useMemo(() => {
    if (mode === 'chord') {
      const noteNames = getChordNotes(root, chordType, inversion, accidental);
      const notes = withOctave(noteNames, rootOctave);
      const fingering = getChordFingering(chordType, inversion);
      return { notes, playbackNotes: notes, fingerNumbers: buildFingerMap(notes, fingering[hand]) };
    }
    const { ascending, sequence, fingers } = getScalePlayback(root, scaleType, accidental, rootOctave, hand);
    return {
      notes: ascending,
      playbackNotes: sequence,
      fingerNumbers: buildFingerMap(sequence, fingers),
    };
  }, [mode, root, rootOctave, accidental, hand, chordType, inversion, scaleType]);

  return (
    <div className="app">
      <h1 className="app__title">🎹 Piano Map</h1>

      <div className="app__controls">
        <div className="app__row">
          <SelectMode />
          <SelectAccidental />
          <SelectHand />
        </div>

        <SelectRoot />
        <SelectRootOctave />

        {mode === 'chord' ? (
          <>
            <SelectChordType />
            <SelectInversion />
          </>
        ) : (
          <SelectScaleType />
        )}

        <SelectKeyboardSize />

        <div className="app__row">
          <PlayButton notes={playbackNotes} mode={mode} />
          <label className="app__toggle">
            <input
              type="checkbox"
              checked={showNoteLabels}
              onChange={(e) => set({ showNoteLabels: e.target.checked })}
            />
            Note labels
          </label>
          <label className="app__toggle">
            <input
              type="checkbox"
              checked={highlightKeys}
              onChange={(e) => set({ highlightKeys: e.target.checked })}
            />
            Highlight keys
          </label>
        </div>
      </div>

      <div className="app__keyboard">
        <PianoKeyboard
          keyboardSize={keyboardSize}
          highlightedNotes={notes}
          activeNotes={activeNotes}
          fingerNumbers={fingerNumbers}
          showNoteLabels={showNoteLabels}
          highlightKeys={highlightKeys}
        />
      </div>

      <div className="app__notes">Notes: {notes.join(', ')}</div>
    </div>
  );
}

export default App;
