import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Reticle } from '../hud/Reticle';
import { operator } from '@/data/profile';

interface BootScreenProps {
  onComplete: () => void;
}

const SEQUENCE: Array<{ label: string; value: string; ms: number; tone?: 'good' | 'warn' }> = [
  { label: 'BIOS', value: 'LET-HIM-COOK HUD v0.1.0 ................ OK', ms: 240, tone: 'good' },
  { label: 'CHK', value: 'SHADER CACHE ........................... OK', ms: 220, tone: 'good' },
  { label: 'NET', value: 'UPLINK ESTABLISHED · 86 ms .............. OK', ms: 260, tone: 'good' },
  { label: 'SEC', value: 'AUTH HANDSHAKE ......................... OK', ms: 220, tone: 'good' },
  { label: 'AI', value: 'BEHAVIOR-TREE INTERPRETER WARMED ........ OK', ms: 320, tone: 'good' },
  { label: 'NAV', value: 'NAVMESH PARTITIONS LOADED ............... OK', ms: 220, tone: 'good' },
  { label: 'PHY', value: 'CHAOS PHYSICS BOOT ...................... OK', ms: 220, tone: 'good' },
  { label: 'OK', value: 'OPERATOR PROFILE LOADED', ms: 320, tone: 'good' },
];

export function BootScreen({ onComplete }: BootScreenProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setStep(SEQUENCE.length);
      const id = window.setTimeout(onComplete, 200);
      return () => window.clearTimeout(id);
    }

    if (step >= SEQUENCE.length) {
      const id = window.setTimeout(onComplete, 650);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setStep((s) => s + 1), SEQUENCE[step].ms);
    return () => window.clearTimeout(id);
  }, [step, onComplete]);

  return (
    <motion.div
      key="boot"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="fixed inset-0 z-[100] bg-hud-bg grid place-items-center"
    >
      <div className="relative w-full max-w-3xl px-6">
        <div className="flex items-center justify-center mb-6">
          <Reticle size={180} />
        </div>

        <div className="font-display text-2xl sm:text-3xl tracking-hud text-hud-text text-center mb-1">
          {operator.callsign} <span className="text-hud-accent">▎</span> BOOTING
        </div>
        <div className="font-mono text-[11px] uppercase tracking-hud text-hud-dim text-center mb-8">
          {operator.classTitle}
        </div>

        <div className="font-mono text-[12px] sm:text-[13px] leading-7 text-hud-text/90 bg-hud-panel/60 border border-hud-ink p-4 sm:p-6 min-h-[260px] max-w-2xl mx-auto">
          {SEQUENCE.slice(0, step).map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-hud-accent w-10">[{line.label}]</span>
              <span className="flex-1">{line.value}</span>
              <span className={line.tone === 'good' ? 'text-hud-good' : 'text-hud-warn'}>
                {line.tone === 'good' ? '✓' : '!'}
              </span>
            </div>
          ))}
          {step < SEQUENCE.length && (
            <div className="flex gap-3">
              <span className="text-hud-accent w-10">[...]</span>
              <span className="caret">loading {SEQUENCE[step]?.label?.toLowerCase()}</span>
            </div>
          )}
          {step >= SEQUENCE.length && (
            <div className="mt-2 text-hud-accent">PRESS ANY KEY TO ENGAGE</div>
          )}
        </div>

        <div className="mt-6 text-center font-mono text-[10px] uppercase tracking-hud text-hud-muted">
          (Press <span className="text-hud-text">SPACE</span> to skip)
        </div>
      </div>
    </motion.div>
  );
}
