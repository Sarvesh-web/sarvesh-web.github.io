import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { HUDPanel } from '../hud/HUDPanel';
import { StatBar } from '../hud/StatBar';
import { Bracket } from '../hud/Bracket';
import { skills, type Skill } from '@/data/profile';

const categoryMeta: Record<Skill['category'], { label: string; tone: 'accent' | 'good' | 'rare' | 'gold' }> = {
  core: { label: 'CORE SYSTEMS', tone: 'accent' },
  engine: { label: 'ENGINE LAYER', tone: 'rare' },
  graphics: { label: 'GRAPHICS', tone: 'gold' },
  tooling: { label: 'TOOLING', tone: 'good' },
  soft: { label: 'OPERATOR TRAITS', tone: 'accent' },
};

const orderedCats: Array<Skill['category']> = ['core', 'engine', 'graphics', 'tooling', 'soft'];

export function UpgradesScreen() {
  const grouped = orderedCats.map((cat) => ({
    cat,
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-5">
      <div className="col-span-12">
        <HUDPanel label="UPGRADE TREE · PROFICIENCIES" serial={`${skills.length} NODES`}>
          <div className="font-mono text-[11px] uppercase tracking-hud text-hud-dim mb-5">
            Signature nodes are starred and emit a glow. Higher bars = more time in the trenches.
          </div>

          <div className="space-y-6">
            {grouped.map(({ cat, items }, gi) => {
              const meta = categoryMeta[cat];
              return (
                <motion.section
                  key={cat}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: gi * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="hud-tag border-hud-accent/40 text-hud-accent">
                      <span className="inline-block w-1.5 h-1.5 bg-hud-accent" />
                      {meta.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-hud text-hud-dim">
                      {items.length} unlocked
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {items.map((s) => {
                      const signature = !!s.signature;
                      return (
                        <div
                          key={s.name}
                          className={[
                            'relative p-3 bg-hud-bg/60 border',
                            signature ? 'border-hud-accent/60' : 'border-hud-ink',
                          ].join(' ')}
                        >
                          {signature && (
                            <>
                              <Bracket size={8} className="border-hud-accent" />
                              <span className="absolute -top-2 -right-2 grid place-items-center w-5 h-5 bg-hud-bg border border-hud-accent text-hud-accent">
                                <Star size={11} fill="currentColor" />
                              </span>
                            </>
                          )}

                          <div className="flex items-baseline justify-between mb-2">
                            <span className="font-display text-[13px] tracking-hud uppercase text-hud-text">
                              {s.name}
                            </span>
                            <span className="font-mono text-[11px] text-hud-dim">
                              LV {Math.max(1, Math.round(s.level / 10))}
                            </span>
                          </div>

                          <StatBar
                            label="MASTERY"
                            value={s.level}
                            tone={signature ? 'accent' : meta.tone}
                            showValue
                          />

                          {s.blurb && (
                            <p className="mt-2 text-[12px] text-hud-dim leading-snug">
                              {s.blurb}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.section>
              );
            })}
          </div>
        </HUDPanel>
      </div>
    </div>
  );
}
