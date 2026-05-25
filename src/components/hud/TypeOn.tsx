import { useEffect, useRef, useState } from 'react';

interface TypeOnProps {
  text: string;
  /** ms per char */
  speed?: number;
  /** ms before the first character */
  delay?: number;
  /** Show blinking caret while typing (and after if persistCaret) */
  caret?: boolean;
  /** Keep caret blinking after the text is complete */
  persistCaret?: boolean;
  className?: string;
  onDone?: () => void;
}

/**
 * Type-on terminal effect — respects prefers-reduced-motion.
 * Used for boot screen and section headers.
 */
export function TypeOn({
  text,
  speed = 22,
  delay = 0,
  caret = true,
  persistCaret = false,
  className = '',
  onDone,
}: TypeOnProps) {
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setShown(text);
      setDone(true);
      onDoneRef.current?.();
      return;
    }

    setShown('');
    setDone(false);

    let i = 0;
    let raf: number | undefined;
    let interval: number | undefined;

    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(interval);
          setDone(true);
          onDoneRef.current?.();
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text, speed, delay]);

  const showCaret = caret && (!done || persistCaret);
  return (
    <span className={`${showCaret ? 'caret' : ''} ${className}`}>{shown}</span>
  );
}
