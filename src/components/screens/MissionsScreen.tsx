import { motion } from 'framer-motion';
import { Briefcase, MapPin, Radio } from 'lucide-react';
import { HUDPanel } from '../hud/HUDPanel';
import { Bracket } from '../hud/Bracket';
import { missions } from '@/data/profile';

export function MissionsScreen() {
  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-5">
      <div className="col-span-12">
        <HUDPanel label="MISSION LOG" serial={`${missions.length} CAMPAIGNS`}>
          <div className="font-mono text-[11px] uppercase tracking-hud text-hud-dim mb-4">
            Operational history — chronologically reversed. ACTIVE deployments emit telemetry.
          </div>

          <ol className="relative">
            {/* timeline rail */}
            <span
              aria-hidden
              className="absolute left-[14px] top-2 bottom-2 w-px bg-gradient-to-b from-hud-accent/60 via-hud-ink to-transparent"
            />

            {missions.map((m, idx) => {
              const active = m.status === 'ACTIVE';
              return (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                  className="relative pl-10 pb-8 last:pb-0"
                >
                  {/* node */}
                  <span
                    className={`absolute left-[7px] top-3 w-[15px] h-[15px] border ${
                      active ? 'border-hud-accent bg-hud-accent/20' : 'border-hud-dim bg-hud-bg'
                    }`}
                  >
                    {active && (
                      <span className="absolute inset-[3px] bg-hud-accent animate-pulse-dot" />
                    )}
                  </span>

                  <div
                    className={`relative p-4 sm:p-5 bg-hud-bg/60 border ${
                      active ? 'border-hud-accent/60' : 'border-hud-ink'
                    }`}
                  >
                    {active && <Bracket size={10} className="border-hud-accent" />}

                    <div className="flex flex-wrap items-baseline gap-3">
                      <span
                        className={`hud-tag ${
                          active
                            ? 'border-hud-accent/60 text-hud-accent'
                            : 'border-hud-ink text-hud-dim'
                        }`}
                      >
                        {active ? (
                          <span className="inline-block w-1.5 h-1.5 bg-hud-accent rounded-full animate-pulse-dot" />
                        ) : (
                          <span className="inline-block w-1.5 h-1.5 bg-hud-dim rounded-full" />
                        )}
                        {m.status}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-hud text-hud-dim">
                        {m.window}
                      </span>
                    </div>

                    <div className="mt-2 flex items-start gap-3">
                      <Briefcase size={16} className="text-hud-accent mt-1 shrink-0" />
                      <div className="min-w-0">
                        <div className="font-display text-lg sm:text-xl tracking-hud uppercase text-hud-text leading-tight">
                          {m.role} <span className="text-hud-dim font-mono text-sm">@</span>{' '}
                          <span className="text-hud-accent">{m.org}</span>
                        </div>
                        {m.location && (
                          <div className="font-mono text-[10px] uppercase tracking-hud text-hud-dim flex items-center gap-1.5 mt-1">
                            <MapPin size={11} />
                            {m.location}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="mt-3 text-[13.5px] leading-relaxed text-hud-text/95">
                      {m.briefing}
                    </p>

                    <div className="mt-4 font-mono text-[10px] uppercase tracking-hud text-hud-accent flex items-center gap-2">
                      <Radio size={12} />
                      OBJECTIVES
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {m.objectives.map((o, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-[13px] text-hud-text/95"
                        >
                          <span className="font-mono text-[11px] text-hud-dim w-6 shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </HUDPanel>
      </div>
    </div>
  );
}
