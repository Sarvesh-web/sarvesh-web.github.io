import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleDot, Lock } from 'lucide-react';
import { HUDPanel } from '../hud/HUDPanel';
import { StatBar } from '../hud/StatBar';
import { Reticle } from '../hud/Reticle';
import { Bracket } from '../hud/Bracket';
import { projects, type Project } from '@/data/profile';

const rarityToken: Record<Project['rarity'], { ring: string; text: string; label: string }> = {
  common: { ring: 'border-hud-dim', text: 'text-hud-dim', label: 'COMMON' },
  rare: { ring: 'border-hud-rare', text: 'text-hud-rare', label: 'RARE' },
  epic: { ring: 'border-hud-accent', text: 'text-hud-accent', label: 'EPIC' },
  gold: { ring: 'border-hud-gold', text: 'text-hud-gold', label: 'GOLD' },
  classified: { ring: 'border-hud-danger', text: 'text-hud-danger', label: 'CLASSIFIED' },
};

export function ArsenalScreen() {
  const [activeId, setActiveId] = useState<string>(projects[0]?.id ?? '');
  const active = useMemo(() => projects.find((p) => p.id === activeId) ?? projects[0], [activeId]);
  const tok = rarityToken[active.rarity];

  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-5">
      {/* List rail */}
      <div className="col-span-12 lg:col-span-4 xl:col-span-3">
        <HUDPanel label="ARSENAL" serial={`${projects.length} ITEMS`}>
          <div className="space-y-2">
            {projects.map((p) => {
              const t = rarityToken[p.rarity];
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className={[
                    'group relative w-full text-left p-3 border bg-hud-bg/40 transition-all',
                    isActive ? `${t.ring} bg-hud-accent/[0.06]` : 'border-hud-ink hover:border-hud-dim',
                  ].join(' ')}
                  aria-pressed={isActive}
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0 bottom-0 w-[2px] ${
                      isActive ? 'bg-hud-accent' : 'bg-hud-ink group-hover:bg-hud-dim'
                    }`}
                  />
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${t.text}`}>
                      {p.active ? <CircleDot size={14} /> : <Lock size={14} className="opacity-60" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[10px] uppercase tracking-hud text-hud-dim">
                        {p.weaponClass}
                      </div>
                      <div className="font-display text-[13px] tracking-hud uppercase text-hud-text truncate">
                        {p.codename}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className={`font-mono text-[10px] uppercase tracking-hud ${t.text}`}>
                          {t.label}
                        </span>
                        <span className="font-mono text-[10px] text-hud-muted truncate">
                          · {p.serial}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </HUDPanel>
      </div>

      {/* Detail */}
      <div className="col-span-12 lg:col-span-8 xl:col-span-9">
        <HUDPanel
          label={tok.label + ' · ' + active.weaponClass}
          serial={active.serial}
          className={`${tok.ring} border`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className="grid grid-cols-12 gap-5"
            >
              {/* Codename + visual */}
              <div className="col-span-12 xl:col-span-7">
                <div className="font-mono text-[10px] uppercase tracking-hud text-hud-dim">
                  {active.unit ?? 'SELF · INDEPENDENT'} — {active.serviceWindow}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl tracking-hud uppercase text-hud-text leading-none mt-1">
                  {active.codename}
                </h2>

                <div className="relative mt-6 aspect-[16/9] bg-hud-bg/60 border border-hud-ink overflow-hidden grid place-items-center">
                  <Bracket size={12} className={`${tok.ring}`} />
                  <Reticle size={260} />
                  <div className="absolute inset-0 hud-hatch opacity-25" />
                  {/* faux callout */}
                  <div className="absolute left-4 top-4 hud-tag border-hud-accent/40 text-hud-accent">
                    <span className="inline-block w-1.5 h-1.5 bg-hud-accent animate-pulse-dot" />
                    SYSTEM TARGETED
                  </div>
                  <div className="absolute right-4 bottom-4 font-mono text-[10px] uppercase tracking-hud text-hud-dim">
                    DRAW · {active.serial}
                  </div>
                </div>

                <p className="mt-5 text-[13.5px] leading-relaxed text-hud-text/95 max-w-prose">
                  {active.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {active.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-[13px] text-hud-text/95">
                      <span className="text-hud-accent font-mono text-[12px] mt-[2px]">▎</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats column */}
              <div className="col-span-12 xl:col-span-5">
                <div className="font-mono text-[10px] uppercase tracking-hud text-hud-accent mb-3">
                  ▎ STAT BLOCK
                </div>
                <div className="space-y-2.5">
                  <StatBar label="COMPLEXITY" value={active.stats.complexity} showValue />
                  <StatBar label="IMPACT" value={active.stats.impact} showValue />
                  <StatBar label="SYSTEMS DEPTH" value={active.stats.systemsDepth} showValue />
                  <StatBar label="POLISH" value={active.stats.polish} showValue />
                </div>

                <div className="mt-6 font-mono text-[10px] uppercase tracking-hud text-hud-accent mb-2">
                  ▎ TECH LOADOUT
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="hud-tag border-hud-ink text-hud-text/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 border border-hud-ink bg-hud-bg/60">
                    <div className="font-mono text-[10px] uppercase tracking-hud text-hud-dim">RARITY</div>
                    <div className={`font-display text-sm tracking-hud uppercase ${tok.text}`}>
                      {tok.label}
                    </div>
                  </div>
                  <div className="p-2 border border-hud-ink bg-hud-bg/60">
                    <div className="font-mono text-[10px] uppercase tracking-hud text-hud-dim">SLOT</div>
                    <div className="font-display text-sm tracking-hud uppercase text-hud-text">
                      {active.weaponClass.split('·')[0]?.trim() ?? '—'}
                    </div>
                  </div>
                  <div className="p-2 border border-hud-ink bg-hud-bg/60">
                    <div className="font-mono text-[10px] uppercase tracking-hud text-hud-dim">STATUS</div>
                    <div className={`font-display text-sm tracking-hud uppercase ${active.active ? 'text-hud-good' : 'text-hud-dim'}`}>
                      {active.active ? 'EQUIPPED' : 'STORED'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </HUDPanel>
      </div>
    </div>
  );
}
