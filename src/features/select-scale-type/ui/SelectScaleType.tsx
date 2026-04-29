import { useStore } from '@shared/store/useStore';
import type { ScaleType } from '@entities/scale';
import { Chips } from '@shared/ui/Chips';
import { Field } from '@shared/ui/Field';

const OPTIONS: { value: ScaleType; label: string }[] = [
  { value: 'major', label: 'Major' },
  { value: 'natural_minor', label: 'Natural min' },
  { value: 'harmonic_minor', label: 'Harmonic min' },
  { value: 'pentatonic_maj', label: 'Pent. major' },
  { value: 'pentatonic_min', label: 'Pent. minor' },
  { value: 'blues', label: 'Blues' },
];

export function SelectScaleType() {
  const scaleType = useStore((s) => s.scaleType);
  const set = useStore((s) => s.set);
  return (
    <Field label="Scale type">
      <Chips
        options={OPTIONS}
        value={scaleType}
        onChange={(value) => set({ scaleType: value })}
        ariaLabel="Scale type"
      />
    </Field>
  );
}
