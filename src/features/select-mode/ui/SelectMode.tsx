import { useStore } from '@shared/store/useStore';
import type { Mode } from '@shared/store/useStore';
import { Chips } from '@shared/ui/Chips';
import { Field } from '@shared/ui/Field';

const OPTIONS: { value: Mode; label: string }[] = [
  { value: 'chord', label: 'Chord' },
  { value: 'scale', label: 'Scale' },
];

export function SelectMode() {
  const mode = useStore((s) => s.mode);
  const set = useStore((s) => s.set);
  return (
    <Field label="Mode">
      <Chips options={OPTIONS} value={mode} onChange={(value) => set({ mode: value })} ariaLabel="Mode" />
    </Field>
  );
}
