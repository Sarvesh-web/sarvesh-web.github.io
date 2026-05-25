import { motion } from 'framer-motion';

interface StatBarProps {
  label: string;
  /** 0-100 */
  value: number;
  /** Tailwind text color for the fill (default = accent) */
  tone?: 'accent' | 'good' | 'rare' | 'gold' | 'warn' | 'danger';
  /** Animate the fill on mount */
  animate?: boolean;
  /** Show numeric value on the right */
  showValue?: boolean;
}

const toneToFill: Record<NonNullable<StatBarProps['tone']>, string> = {
  accent: 'bg-hud-accent shadow-hud-glow-soft',
  good: 'bg-hud-good',
  rare: 'bg-hud-rare',
  gold: 'bg-hud-gold',
  warn: 'bg-hud-warn',
  danger: 'bg-hud-danger',
};

export function StatBar({ label, value, tone = 'accent', animate = true, showValue = false }: StatBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="grid grid-cols-[7rem_1fr_auto] items-center gap-3">
      <span className="font-mono text-[11px] uppercase tracking-hud text-hud-dim">{label}</span>
      <div className="relative h-2 bg-hud-bg/80 border border-hud-ink overflow-hidden">
        {/* notch ticks */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0, transparent 9px, rgba(255,255,255,0.07) 9px, rgba(255,255,255,0.07) 10px)',
          }}
        />
        <motion.div
          className={`h-full ${toneToFill[tone]}`}
          initial={animate ? { width: 0 } : false}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </div>
      {showValue ? (
        <span className="font-mono text-[11px] text-hud-text/80 w-8 text-right">
          {clamped.toString().padStart(2, '0')}
        </span>
      ) : (
        <span className="w-0" />
      )}
    </div>
  );
}
