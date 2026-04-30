import { useCallback, useEffect } from 'react';
import * as Tone from 'tone';

// Salamander Grand Piano samples via CDN (free, CC BY 3.0)
const SAMPLE_BASE = 'https://tonejs.github.io/audio/salamander/';
const EXT = 'mp3';

const SAMPLES: Record<string, string> = {
  A0: `A0.${EXT}`,
  C1: `C1.${EXT}`,
  'D#1': `Ds1.${EXT}`,
  'F#1': `Fs1.${EXT}`,
  A1: `A1.${EXT}`,
  C2: `C2.${EXT}`,
  'D#2': `Ds2.${EXT}`,
  'F#2': `Fs2.${EXT}`,
  A2: `A2.${EXT}`,
  C3: `C3.${EXT}`,
  'D#3': `Ds3.${EXT}`,
  'F#3': `Fs3.${EXT}`,
  A3: `A3.${EXT}`,
  C4: `C4.${EXT}`,
  'D#4': `Ds4.${EXT}`,
  'F#4': `Fs4.${EXT}`,
  A4: `A4.${EXT}`,
  C5: `C5.${EXT}`,
  'D#5': `Ds5.${EXT}`,
  'F#5': `Fs5.${EXT}`,
  A5: `A5.${EXT}`,
  C6: `C6.${EXT}`,
  'D#6': `Ds6.${EXT}`,
  'F#6': `Fs6.${EXT}`,
  A6: `A6.${EXT}`,
  C7: `C7.${EXT}`,
  'D#7': `Ds7.${EXT}`,
  'F#7': `Fs7.${EXT}`,
  A7: `A7.${EXT}`,
  C8: `C8.${EXT}`,
};

const urls = Object.fromEntries(Object.entries(SAMPLES).map(([note, file]) => [note, `${SAMPLE_BASE}${file}`]));

// Singleton sampler shared across all useAudio callers so samples load once.
let sampler: Tone.Sampler | null = null;
let ready = false;
const pendingReleases = new Set<ReturnType<typeof setTimeout>>();

function scheduleRelease(notes: string | string[], durationSec: number) {
  const s = sampler;
  if (!s) return;
  const id = setTimeout(() => {
    pendingReleases.delete(id);
    s.triggerRelease(notes);
  }, durationSec * 1000);
  pendingReleases.add(id);
}

function getSampler(): Tone.Sampler {
  if (!sampler) {
    Tone.getContext().lookAhead = 0;
    sampler = new Tone.Sampler({
      urls,
      onload: () => {
        ready = true;
      },
    }).toDestination();
  }
  return sampler;
}

export function useAudio() {
  useEffect(() => {
    getSampler();
  }, []);

  const noteDown = useCallback((noteWithOctave: string) => {
    const s = getSampler();
    if (!ready) return;
    if (Tone.getContext().state !== 'running') Tone.start();
    s.triggerAttack(noteWithOctave);
  }, []);

  const noteUp = useCallback((noteWithOctave: string) => {
    getSampler().triggerRelease(noteWithOctave);
  }, []);

  // Uses triggerAttack + delayed triggerRelease (instead of triggerAttackRelease)
  // so notes stay in the sampler's _activeSources until release. This lets
  // stopAll()'s releaseAll() actually cut them — triggerAttackRelease clears
  // _activeSources synchronously, leaving releaseAll with nothing to stop.
  // Pending releases are tracked so stopAll can cancel them; otherwise a stale
  // timeout from a previous play would fire and silence the next one.
  const playNote = useCallback((noteWithOctave: string, durationSec: number) => {
    const s = getSampler();
    if (!ready) return;
    if (Tone.getContext().state !== 'running') Tone.start();
    s.triggerAttack(noteWithOctave);
    scheduleRelease(noteWithOctave, durationSec);
  }, []);

  const playNotes = useCallback((notes: string[], durationSec: number) => {
    const s = getSampler();
    if (!ready) return;
    if (Tone.getContext().state !== 'running') Tone.start();
    s.triggerAttack(notes);
    scheduleRelease(notes, durationSec);
  }, []);

  const stopAll = useCallback(() => {
    pendingReleases.forEach(clearTimeout);
    pendingReleases.clear();
    if (!sampler) return;
    sampler.releaseAll();
  }, []);

  return { noteDown, noteUp, playNote, playNotes, stopAll };
}
