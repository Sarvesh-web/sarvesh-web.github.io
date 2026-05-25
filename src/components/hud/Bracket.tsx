import { type CSSProperties } from 'react';

/**
 * Corner brackets — the signature frame of the Operator HUD.
 * Renders 4 thin L-shaped corners around any container.
 */
interface BracketProps {
  /** Length of each corner arm in px */
  size?: number;
  /** Thickness of each corner arm in px */
  thickness?: number;
  /** Inset (negative = outside the edge) */
  inset?: number;
  /** Tailwind color class for the bracket lines */
  className?: string;
  /** Animate in on mount */
  animate?: boolean;
}

export function Bracket({
  size = 14,
  thickness = 1,
  inset = -1,
  className = 'border-hud-accent',
  animate = true,
}: BracketProps) {
  const common: CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
  };
  const animClass = animate ? 'animate-bracket-in' : '';
  const t = `${thickness}px`;
  return (
    <>
      <span
        aria-hidden
        className={`${className} ${animClass}`}
        style={{ ...common, top: inset, left: inset, borderTop: `${t} solid`, borderLeft: `${t} solid` }}
      />
      <span
        aria-hidden
        className={`${className} ${animClass}`}
        style={{ ...common, top: inset, right: inset, borderTop: `${t} solid`, borderRight: `${t} solid` }}
      />
      <span
        aria-hidden
        className={`${className} ${animClass}`}
        style={{ ...common, bottom: inset, left: inset, borderBottom: `${t} solid`, borderLeft: `${t} solid` }}
      />
      <span
        aria-hidden
        className={`${className} ${animClass}`}
        style={{ ...common, bottom: inset, right: inset, borderBottom: `${t} solid`, borderRight: `${t} solid` }}
      />
    </>
  );
}
