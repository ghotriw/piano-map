import { useEffect, useMemo, useRef, useState } from 'react';
import { buildKeys } from '../model/buildKeys';
import { PianoKey } from './PianoKey';
import { useAudio } from '@shared/lib/useAudio';
import { normalizeNoteToSharp } from '@entities/note';
import type { KeyboardSize } from '@entities/keyboard';
import styles from './PianoKeyboard.module.css';

interface Props {
  keyboardSize: KeyboardSize;
  highlightedNotes: string[]; // 'C4', 'D#4', etc.
  activeNotes?: string[]; // currently playing notes during playback
  fingerNumbers: Record<string, number>; // keyed by 'C4', 'D#4', etc.
  showNoteLabels: boolean;
  highlightKeys: boolean;
}

export function PianoKeyboard({
  keyboardSize,
  highlightedNotes,
  activeNotes,
  fingerNumbers,
  showNoteLabels,
  highlightKeys,
}: Props) {
  const keys = useMemo(() => buildKeys(keyboardSize), [keyboardSize]);
  const highlighted = new Set(highlightedNotes.map(normalizeNoteToSharp));
  const active = useMemo(() => new Set((activeNotes ?? []).map(normalizeNoteToSharp)), [activeNotes]);
  const normalizedFingers = useMemo(() => {
    const result: Record<string, number> = {};
    for (const [key, val] of Object.entries(fingerNumbers)) {
      result[normalizeNoteToSharp(key)] = val;
    }
    return result;
  }, [fingerNumbers]);
  const { noteDown, noteUp } = useAudio();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  const whiteKeys = keys.filter((k) => k.color === 'white');
  const blackKeys = keys.filter((k) => k.color === 'black');

  const highlightedIds = useMemo(() => highlightedNotes.map(normalizeNoteToSharp).filter(Boolean), [highlightedNotes]);
  const highlightedKey = highlightedIds.join(',');

  // Center the midpoint between the lowest and highest highlighted notes
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const keyboard = keyboardRef.current;
    if (!wrapper || !keyboard || highlightedIds.length === 0) return;
    const wrapperRect = wrapper.getBoundingClientRect();
    let minLeft = Infinity;
    let maxRight = -Infinity;
    for (const id of highlightedIds) {
      const el = keyboard.querySelector<HTMLElement>(`[data-note="${CSS.escape(id)}"]`);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.left < minLeft) minLeft = rect.left;
      if (rect.right > maxRight) maxRight = rect.right;
    }
    if (minLeft === Infinity) return;
    const center = (minLeft + maxRight) / 2;
    const offset = wrapper.scrollLeft + (center - wrapperRect.left) - wrapper.clientWidth / 2;
    wrapper.scrollTo({ left: offset, behavior: 'smooth' });
  }, [highlightedKey, highlightedIds, keyboardSize]);

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
                highlighted={highlightKeys && highlighted.has(id)}
                active={active.has(id)}
                fingerNumber={normalizedFingers[id]}
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
                  highlighted={highlightKeys && highlighted.has(id)}
                  active={active.has(id)}
                  fingerNumber={normalizedFingers[id]}
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
