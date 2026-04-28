import type { PianoKeyData } from '../model/buildKeys';
import styles from './PianoKey.module.css';

interface Props {
  keyData: PianoKeyData;
}

export function PianoKey({ keyData }: Props) {
  const { note, octave, color } = keyData;
  const id = `${note}${octave}`;
  const cls = [styles[color]].filter(Boolean).join(' ');

  return <div className={cls} title={id} data-note={id}></div>;
}
