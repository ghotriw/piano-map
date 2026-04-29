import { useMemo } from 'react';
import { useStore } from '@shared/store/useStore';
import { NOTES_SHARP, NOTES_FLAT } from '@entities/note';
import type { NoteName } from '@entities/note';
import { Chips } from '@shared/ui/Chips';
import type { ChipOption } from '@shared/ui/Chips';
import { Field } from '@shared/ui/Field';

export function SelectRoot() {
  const root = useStore((s) => s.root);
  const accidental = useStore((s) => s.accidental);
  const set = useStore((s) => s.set);

  const options = useMemo<ChipOption<NoteName>[]>(() => {
    const names = accidental === 'sharp' ? NOTES_SHARP : NOTES_FLAT;
    return names.map((n) => ({ value: n, label: formatNote(n) }));
  }, [accidental]);

  return (
    <Field label="Root">
      <Chips options={options} value={root} onChange={(value) => set({ root: value })} ariaLabel="Root note" />
    </Field>
  );
}

function formatNote(note: string) {
  return note.replace('#', '\u266F').replace('b', '\u266D');
}
