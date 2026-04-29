import { useEffect, useMemo, useRef, useState } from 'react';
import { buildKeys } from '../model/buildKeys';
import { PianoKey } from './PianoKey';
import { useAudio } from '@shared/lib/useAudio';
import styles from './PianoKeyboard.module.css';

interface Props {
  keyboardSize: number;
  highlightedNotes: string[]; // 'C4', 'D#4', etc.
  activeNote?: string | null; // currently playing note during playback
  fingerNumbers: Record<string, number>; // keyed by 'C4', 'D#4', etc.
  showNoteLabels: boolean;
}

export function PianoKeyboard({ keyboardSize, highlightedNotes, activeNote, fingerNumbers, showNoteLabels }: Props) {
  const keys = useMemo(() => buildKeys(keyboardSize), [keyboardSize]);
  const highlighted = new Set(highlightedNotes);
  const { noteDown, noteUp } = useAudio();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  const whiteKeys = keys.filter((k) => k.color === 'white');
  const blackKeys = keys.filter((k) => k.color === 'black');

  const highlightedKey = highlightedNotes[0];

  // Center the first highlighted note in the viewport
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const keyboard = keyboardRef.current;
    if (!wrapper || !keyboard || !highlightedKey) return;
    const target = keyboard.querySelector<HTMLElement>(`[data-note="${CSS.escape(highlightedKey)}"]`);
    if (!target) return;
    const targetRect = target.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const offset =
      wrapper.scrollLeft + (targetRect.left - wrapperRect.left) + targetRect.width / 2 - wrapper.clientWidth / 2;
    wrapper.scrollTo({ left: offset, behavior: 'smooth' });
  }, [highlightedKey, keyboardSize]);

  // Track whether edge-fade indicators should be shown
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = wrapper;
      setFadeLeft(scrollLeft > 1);
      setFadeRight(scrollLeft + clientWidth < scrollWidth - 1);
    };
    update();
    wrapper.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(wrapper);
    return () => {
      wrapper.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [keyboardSize]);

  const containerCls = [styles.container, fadeLeft ? styles.fadeLeft : '', fadeRight ? styles.fadeRight : '']
    .filter(Boolean)
    .join(' ');

  const octaveMarkers = whiteKeys
    .filter((k) => k.note === 'C')
    .map((k) => ({ octave: k.octave, whiteIndex: k.whiteIndex }));

  return (
    <div className={containerCls}>
      <div className={styles.wrapper} ref={wrapperRef}>
        <div className={styles.octaveLabels} style={{ width: `calc(${whiteKeys.length} * var(--key-white-width))` }}>
          {octaveMarkers.map(({ octave, whiteIndex }) => (
            <span
              key={octave}
              className={styles.octaveLabel}
              style={{ left: `calc(${whiteIndex} * var(--key-white-width))` }}
            >
              C{octave}
            </span>
          ))}
        </div>
        <div className={styles.keyboard} ref={keyboardRef}>
          {whiteKeys.map((k, i) => {
            const id = `${k.note}${k.octave}`;
            return (
              <PianoKey
                key={i}
                keyData={k}
                highlighted={highlighted.has(id)}
                active={activeNote === id}
                fingerNumber={fingerNumbers[id]}
                showLabel={showNoteLabels}
                onNoteDown={noteDown}
                onNoteUp={noteUp}
              />
            );
          })}

          {blackKeys.map((k, i) => {
            const id = `${k.note}${k.octave}`;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: `calc(${k.whiteIndex + 1} * var(--key-white-width) - var(--key-black-width) / 2)`,
                }}
              >
                <PianoKey
                  keyData={k}
                  highlighted={highlighted.has(id)}
                  active={activeNote === id}
                  fingerNumber={fingerNumbers[id]}
                  showLabel={showNoteLabels}
                  onNoteDown={noteDown}
                  onNoteUp={noteUp}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
