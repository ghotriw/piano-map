import { useStore } from '@shared/store/useStore';
import type { KeyboardSize } from '@entities/keyboard';
import { Chips } from '@shared/ui/Chips';
import { Field } from '@shared/ui/Field';

const OPTIONS: { value: KeyboardSize; label: string }[] = [
  { value: 25, label: '25' },
  { value: 37, label: '37' },
  { value: 49, label: '49' },
  { value: 61, label: '61' },
  { value: 88, label: '88' },
];

export function SelectKeyboardSize() {
  const keyboardSize = useStore((s) => s.keyboardSize);
  const set = useStore((s) => s.set);
  return (
    <Field label="Keyboard size">
      <Chips
        options={OPTIONS}
        value={keyboardSize}
        onChange={(value) => set({ keyboardSize: value })}
        ariaLabel="Keyboard size"
      />
    </Field>
  );
}
