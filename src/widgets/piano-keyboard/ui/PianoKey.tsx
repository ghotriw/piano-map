import type { PianoKeyData } from '@entities/keyboard';
import styles from './PianoKey.module.css';

interface Props {
  keyData: PianoKeyData;
  highlighted: boolean;
  active?: boolean;
  fingerNumber?: number;
  showLabel: boolean;
  onNoteDown?: (noteWithOctave: string) => void;
  onNoteUp?: (noteWithOctave: string) => void;
}

export function PianoKey({ keyData, highlighted, active, fingerNumber, showLabel, onNoteDown, onNoteUp }: Props) {
  const { note, octave, color } = keyData;
  const id = `${note}${octave}`;
  const cls = [styles[color], highlighted ? styles.highlighted : '', active ? styles.active : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={cls}
      title={id}
      data-note={id}
      onPointerDown={() => onNoteDown?.(id)}
      onPointerUp={() => onNoteUp?.(id)}
      onPointerLeave={() => onNoteUp?.(id)}
    >
      {fingerNumber != null && (
        <span className={styles.fingerBadge} data-finger={fingerNumber}>
          {fingerNumber}
        </span>
      )}
      {showLabel && <span className={styles.label}>{note}</span>}
    </div>
  );
}
