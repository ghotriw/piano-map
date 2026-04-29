import type { ReactNode } from 'react';
import styles from './Chips.module.css';

export type ChipOption<T extends string | number> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

type ChipsProps<T extends string | number> = {
  options: ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
};

export function Chips<T extends string | number>({ options, value, onChange, ariaLabel }: ChipsProps<T>) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={styles.group}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={opt.disabled}
            onClick={() => onChange(opt.value)}
            className={`${styles.chip} ${active ? styles.active : ''}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
