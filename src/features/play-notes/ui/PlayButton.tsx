import { useCallback, useEffect, useRef, useState } from 'react';
import { useAudio } from '@shared/lib/useAudio';
import { usePlaybackStore } from '../model/usePlaybackStore';
import styles from './PlayButton.module.css';

interface Props {
  notes: string[];
  mode: 'chord' | 'scale';
}

const CHORD_DURATION_SEC = 15;
const SCALE_STEP_MS = 350;
const SCALE_NOTE_DURATION_SEC = 0.45;
const CANCEL_POLL_MS = 50;

export function PlayButton({ notes, mode }: Props) {
  const { playNote, playNotes, stopAll } = useAudio();
  const setActiveNotes = usePlaybackStore((s) => s.setActiveNotes);
  const [isPlaying, setIsPlaying] = useState(false);
  const cancelRef = useRef(false);

  useEffect(
    () => () => {
      cancelRef.current = true;
      stopAll();
      setActiveNotes([]);
    },
    [setActiveNotes, stopAll]
  );

  const handleClick = useCallback(async () => {
    if (isPlaying) {
      cancelRef.current = true;
      stopAll();
      setActiveNotes([]);
      setIsPlaying(false);
      return;
    }
    if (notes.length === 0) return;

    setIsPlaying(true);
    cancelRef.current = false;

    if (mode === 'chord') {
      setActiveNotes(notes);
      playNotes(notes, CHORD_DURATION_SEC);
      const totalMs = CHORD_DURATION_SEC * 1000;
      let elapsed = 0;
      while (elapsed < totalMs) {
        if (cancelRef.current) return;
        await new Promise((r) => setTimeout(r, CANCEL_POLL_MS));
        elapsed += CANCEL_POLL_MS;
      }
      if (cancelRef.current) return;
      setActiveNotes([]);
      setIsPlaying(false);
      return;
    }

    for (const note of notes) {
      if (cancelRef.current) return;
      setActiveNotes([note]);
      playNote(note, SCALE_NOTE_DURATION_SEC);
      await new Promise((r) => setTimeout(r, SCALE_STEP_MS));
    }
    if (cancelRef.current) return;
    setActiveNotes([]);
    setIsPlaying(false);
  }, [isPlaying, mode, notes, playNote, playNotes, setActiveNotes, stopAll]);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      disabled={notes.length === 0}
      aria-label={isPlaying ? 'Stop' : 'Play'}
    >
      {isPlaying ? '■ Stop' : '▶ Play'}
    </button>
  );
}
