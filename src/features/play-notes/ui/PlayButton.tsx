import { useCallback, useEffect, useRef, useState } from 'react';
import { useAudio } from '@shared/lib/useAudio';
import { usePlaybackStore } from '../model/usePlaybackStore';
import styles from './PlayButton.module.css';

interface Props {
  notes: string[];
  mode: 'chord' | 'scale';
}

const CHORD_DURATION_SEC = 1.5;
const SCALE_STEP_MS = 350;
const SCALE_NOTE_DURATION_SEC = 0.45;

export function PlayButton({ notes, mode }: Props) {
  const { playNote, playNotes } = useAudio();
  const setActiveNotes = usePlaybackStore((s) => s.setActiveNotes);
  const [isPlaying, setIsPlaying] = useState(false);
  const cancelRef = useRef(false);

  useEffect(
    () => () => {
      cancelRef.current = true;
      setActiveNotes([]);
    },
    [setActiveNotes]
  );

  const handlePlay = useCallback(async () => {
    if (isPlaying || notes.length === 0) return;
    setIsPlaying(true);
    cancelRef.current = false;

    if (mode === 'chord') {
      setActiveNotes(notes);
      playNotes(notes, CHORD_DURATION_SEC);
      await new Promise((r) => setTimeout(r, CHORD_DURATION_SEC * 1000));
      setActiveNotes([]);
      setIsPlaying(false);
      return;
    }

    for (const note of notes) {
      if (cancelRef.current) break;
      setActiveNotes([note]);
      playNote(note, SCALE_NOTE_DURATION_SEC);
      await new Promise((r) => setTimeout(r, SCALE_STEP_MS));
    }
    setActiveNotes([]);
    setIsPlaying(false);
  }, [isPlaying, mode, notes, playNote, playNotes, setActiveNotes]);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handlePlay}
      disabled={isPlaying || notes.length === 0}
      aria-label="Play"
    >
      {isPlaying ? '■ Playing…' : '▶ Play'}
    </button>
  );
}
