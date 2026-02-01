/**
 * No-op translation hook (English-only).
 */
export function useT() {
  return (key: string) => key;
}
