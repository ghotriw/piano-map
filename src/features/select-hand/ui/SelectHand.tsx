import { useStore } from '@shared/store/useStore';
import type { Hand } from '@entities/hand';
import { MultiSelect } from '@shared/ui/MultiSelect';
import { Field } from '@shared/ui/Field';

const OPTIONS: { value: Hand; label: string }[] = [
  { value: 'right', label: 'Right' },
  { value: 'left', label: 'Left' },
];

export function SelectHand() {
  const hand = useStore((s) => s.hand);
  const set = useStore((s) => s.set);
  return (
    <Field label="Hand">
      <MultiSelect options={OPTIONS} value={hand} onChange={(value) => set({ hand: value })} ariaLabel="Hand" edgeLabels />
    </Field>
  );
}
