export function buildFingerMap(notes: string[], fingers: number[]): Record<string, number> {
  const map: Record<string, number> = {};
  notes.forEach((note, i) => {
    map[note] = fingers[i];
  });
  return map;
}
