import { useMemo } from 'react';
import { useStore } from '@shared/store/useStore';
import { getRootOctaveRange } from '@entities/keyboard';
import { Chips } from '@shared/ui/Chips';
import type { ChipOption } from '@shared/ui/Chips';
import { Field } from '@shared/ui/Field';

export function SelectRootOctave() {
  const rootOctave = useStore((s) => s.rootOctave);
  const keyboardSize = useStore((s) => s.keyboardSize);
  const set = useStore((s) => s.set);

  const options = useMemo<ChipOption<number>[]>(() => {
    const { min, max } = getRootOctaveRange(keyboardSize);
    const opts: ChipOption<number>[] = [];
    for (let o = min; o <= max; o++) {
      opts.push({ value: o, label: String(o) });
    }
    return opts;
  }, [keyboardSize]);

  return (
    <Field label="Octave">
      <Chips
        options={options}
        value={rootOctave}
        onChange={(value) => set({ rootOctave: value })}
        ariaLabel="Root octave"
      />
    </Field>
  );
}
