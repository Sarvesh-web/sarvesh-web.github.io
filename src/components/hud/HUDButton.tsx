import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface HUDButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Optional small badge/key hint shown on the right (e.g. "[E]") */
  keyHint?: string;
  /** Visual emphasis */
  tone?: 'default' | 'accent' | 'ghost';
  /** Highlight as currently-selected/active */
  active?: boolean;
  /** Optional left-side icon */
  icon?: ReactNode;
  children?: ReactNode;
}

const toneClasses: Record<NonNullable<HUDButtonProps['tone']>, string> = {
  default:
    'border-hud-ink hover:border-hud-dim text-hud-text hover:text-white bg-hud-bg/60',
  accent:
    'border-hud-accent/60 text-hud-accent hover:bg-hud-accent/10 hover:text-white bg-hud-bg/40',
  ghost:
    'border-transparent text-hud-dim hover:text-hud-text bg-transparent',
};

export function HUDButton({
  keyHint,
  tone = 'default',
  active = false,
  icon,
  className = '',
  children,
  ...rest
}: HUDButtonProps) {
  return (
    <button
      {...rest}
      data-active={active || undefined}
      className={[
        'group relative inline-flex items-center gap-2 px-3 py-2',
        'font-mono text-[11px] uppercase tracking-hud',
        'border transition-all duration-150 ease-out',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-hud-accent',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        toneClasses[tone],
        active && 'border-hud-accent text-hud-accent bg-hud-accent/10 shadow-hud-glow-soft',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* leading vertical bar */}
      <span
        aria-hidden
        className={`absolute left-0 top-0 bottom-0 w-[2px] transition-colors ${
          active
            ? 'bg-hud-accent'
            : 'bg-hud-ink group-hover:bg-hud-dim'
        }`}
      />
      {icon && <span className="ml-1 grid place-items-center">{icon}</span>}
      <span>{children}</span>
      {keyHint && (
        <span className="ml-2 px-1.5 py-0.5 border border-hud-ink text-hud-dim text-[9px]">
          {keyHint}
        </span>
      )}
    </button>
  );
}
