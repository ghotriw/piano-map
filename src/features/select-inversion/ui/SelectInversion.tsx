import { useMemo } from 'react';
import { useStore } from '@shared/store/useStore';
import { CHORD_FORMULAS } from '@entities/chord';
import { Chips } from '@shared/ui/Chips';
import type { ChipOption } from '@shared/ui/Chips';
import { Field } from '@shared/ui/Field';

const LABELS = ['Root', '1st', '2nd', '3rd'];

export function SelectInversion() {
  const inversion = useStore((s) => s.inversion);
  const chordType = useStore((s) => s.chordType);
  const set = useStore((s) => s.set);

  const options = useMemo<ChipOption<number>[]>(() => {
    const max = CHORD_FORMULAS[chordType].length - 1;
    return LABELS.map((label, i) => ({
      value: i,
      label,
      disabled: i > max,
    }));
  }, [chordType]);

  return (
    <Field label="Inversion">
      <Chips
        options={options}
        value={inversion}
        onChange={(value) => set({ inversion: value })}
        ariaLabel="Inversion"
      />
    </Field>
  );
}
