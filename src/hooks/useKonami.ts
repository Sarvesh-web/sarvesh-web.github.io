import { useEffect, useRef } from 'react';

/**
 * Listens for the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) and fires the callback once.
 * Keeps a rolling buffer of the most recent keys.
 */
export function useKonami(onUnlock: () => void) {
  const sequence = useRef<string[]>([]);
  const triggered = useRef(false);

  useEffect(() => {
    const code = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];

    function handler(e: KeyboardEvent) {
      if (triggered.current) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      sequence.current = [...sequence.current.slice(-(code.length - 1)), key];
      if (
        sequence.current.length === code.length &&
        sequence.current.every((k, i) => k === code[i])
      ) {
        triggered.current = true;
        onUnlock();
      }
    }

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onUnlock]);
}
