import { useMemo } from 'react';
import { buildKeys } from '../model/buildKeys';
import { PianoKey } from './PianoKey';
import styles from './PianoKeyboard.module.css';

interface Props {
  keyboardSize: number;
}

export function PianoKeyboard({ keyboardSize }: Props) {
  const keys = useMemo(() => buildKeys(keyboardSize), [keyboardSize]);

  const whiteKeys = keys.filter((k) => k.color === 'white');
  const blackKeys = keys.filter((k) => k.color === 'black');

  const containerCls = [styles.container].filter(Boolean).join(' ');

  return (
    <div className={containerCls}>
      <div className={styles.wrapper}>
        <div className={styles.keyboard}>
          {whiteKeys.map((k, i) => {
            return <PianoKey key={i} keyData={k} />;
          })}

          {blackKeys.map((k, i) => {
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: `calc(${k.whiteIndex + 1} * var(--key-white-width) - var(--key-black-width) / 2)`,
                }}
              >
                <PianoKey keyData={k} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
