import { useId } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import styles from './MultiSelect.module.css';

export type MultiSelectOption<T extends string | number> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

type MultiSelectProps<T extends string | number> = {
  options: MultiSelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
  width?: string;
  step?: string;
  edgeLabels?: boolean;
};

export function MultiSelect<T extends string | number>({
  options,
  value,
  onChange,
  ariaLabel,
  width,
  step,
  edgeLabels,
}: MultiSelectProps<T>) {
  const name = useId();
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  const containerStyle = {
    '--n': options.length,
    '--i': selectedIndex,
    ...(width ? { '--width': width } : null),
    ...(step ? { '--step-size': step } : null),
  } as CSSProperties;

  const containerClass = `${styles.container} ${edgeLabels ? styles.edgeLabels : ''}`;

  return (
    <div className={containerClass} role="radiogroup" aria-label={ariaLabel} style={containerStyle}>
      {options.map((opt, idx) => {
        const id = `${name}-${idx}`;
        const checked = idx === selectedIndex;
        return (
          <input
            key={`input-${id}`}
            id={id}
            type="radio"
            name={name}
            className={styles.input}
            checked={checked}
            disabled={opt.disabled}
            onChange={() => onChange(opt.value)}
          />
        );
      })}

      <div className={styles.labels}>
        {options.map((opt, idx) => {
          const id = `${name}-${idx}`;
          const active = idx === selectedIndex;
          return (
            <label
              key={`label-${id}`}
              htmlFor={id}
              data-idx-active={active}
              className={`${styles.label} ${active ? styles.labelActive : ''} ${
                opt.disabled ? styles.labelDisabled : ''
              }`}
              style={{ '--idx': idx } as CSSProperties}
            >
              {opt.label}
            </label>
          );
        })}
      </div>

      <div className={styles.trackWrapper}>
        <div className={styles.track}>
          <div className={styles.handle} aria-hidden="true" />
          {options.map((opt, idx) => {
            const id = `${name}-${idx}`;
            return (
              <label
                key={`dot-${id}`}
                htmlFor={id}
                aria-hidden="true"
                className={`${styles.dot} ${opt.disabled ? styles.dotDisabled : ''}`}
                style={{ '--idx': idx } as CSSProperties}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
