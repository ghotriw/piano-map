import { useStore } from '@shared/store/useStore';
import type { ChordType } from '@entities/chord';
import { MultiSelect } from '@shared/ui/MultiSelect';
import { Field } from '@shared/ui/Field';

const OPTIONS: { value: ChordType; label: string }[] = [
  { value: 'major', label: 'Major' },
  { value: 'minor', label: 'Minor' },
  { value: 'diminished', label: 'Dim' },
  { value: 'augmented', label: 'Aug' },
  { value: 'dom7', label: '7' },
  { value: 'maj7', label: 'Maj7' },
  { value: 'min7', label: 'm7' },
];

export function SelectChordType() {
  const chordType = useStore((s) => s.chordType);
  const set = useStore((s) => s.set);
  return (
    <Field label="Chord type">
      <MultiSelect
        options={OPTIONS}
        value={chordType}
        onChange={(value) => set({ chordType: value, inversion: 0 })}
        ariaLabel="Chord type"
        // step="5.75rem"
        edgeLabels
      />
    </Field>
  );
}
