import { type HTMLAttributes, type ReactNode } from 'react';
import { Bracket } from './Bracket';

interface HUDPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional small label rendered top-left, like a panel slug */
  label?: string;
  /** Optional small label rendered top-right, like a serial / status */
  serial?: string;
  /** Render corner brackets */
  brackets?: boolean;
  /** Show subtle internal hatch pattern */
  hatch?: boolean;
  /** Frosted highlight background */
  frosted?: boolean;
  children?: ReactNode;
}

export function HUDPanel({
  label,
  serial,
  brackets = true,
  hatch = false,
  frosted = false,
  className = '',
  children,
  ...rest
}: HUDPanelProps) {
  return (
    <div
      {...rest}
      className={[
        'hud-panel',
        frosted && 'hud-frosted',
        hatch && 'hud-hatch',
        'p-4 sm:p-5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {brackets && <Bracket />}

      {(label || serial) && (
        <div className="flex items-center justify-between mb-3">
          {label && (
            <span className="hud-tag border-hud-accent/40 text-hud-accent">
              <span className="inline-block w-1.5 h-1.5 bg-hud-accent rounded-full animate-pulse-dot" />
              {label}
            </span>
          )}
          {serial && (
            <span className="font-mono text-[10px] text-hud-dim uppercase tracking-hud">
              {serial}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
