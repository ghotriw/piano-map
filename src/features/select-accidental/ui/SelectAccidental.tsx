import { useStore } from '@shared/store/useStore';
import type { Accidental } from '@entities/note';
import { MultiSelect } from '@shared/ui/MultiSelect';
import { Field } from '@shared/ui/Field';

const OPTIONS: { value: Accidental; label: string }[] = [
  { value: 'sharp', label: '\u266F' },
  { value: 'flat', label: '\u266D' },
];

export function SelectAccidental() {
  const accidental = useStore((s) => s.accidental);
  const set = useStore((s) => s.set);
  return (
    <Field label="Spelling">
      <MultiSelect
        options={OPTIONS}
        value={accidental}
        onChange={(value) => set({ accidental: value })}
        ariaLabel="Accidental spelling"
      />
    </Field>
  );
}
