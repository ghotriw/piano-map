import { useStore } from '@shared/store/useStore';
import type { Hand } from '@entities/hand';
import { Chips } from '@shared/ui/Chips';
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
      <Chips options={OPTIONS} value={hand} onChange={(value) => set({ hand: value })} ariaLabel="Hand" />
    </Field>
  );
}
