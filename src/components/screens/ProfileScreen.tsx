import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Linkedin, FileText, ChevronRight } from 'lucide-react';
import { HUDPanel } from '../hud/HUDPanel';
import { StatBar } from '../hud/StatBar';
import { Reticle } from '../hud/Reticle';
import { Bracket } from '../hud/Bracket';
import { TypeOn } from '../hud/TypeOn';
import { operator, trophies } from '@/data/profile';

const rarityRing: Record<string, string> = {
  common: 'border-hud-dim text-hud-dim',
  rare: 'border-hud-rare text-hud-rare',
  epic: 'border-hud-accent text-hud-accent',
  gold: 'border-hud-gold text-hud-gold',
  classified: 'border-hud-danger text-hud-danger',
};

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
};

export function ProfileScreen() {
  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-5">
      {/* Identity card */}
      <motion.div {...fadeUp} className="col-span-12 lg:col-span-7">
        <HUDPanel label="OPERATOR PROFILE" serial={`LV.${operator.level} · CLEARED`}>
          <div className="grid grid-cols-[auto_1fr] gap-5 sm:gap-7 items-start">
            <div className="relative shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 grid place-items-center bg-hud-bg/60 border border-hud-ink relative overflow-hidden">
                <Bracket size={10} className="border-hud-accent/70" />
                <Reticle size={140} />
                <span className="absolute inset-0 hud-hatch opacity-30" />
              </div>
              <div className="mt-2 text-center font-mono text-[10px] uppercase tracking-hud text-hud-dim">
                ID · {operator.callsign}
              </div>
            </div>

            <div className="min-w-0">
              <div className="font-mono text-[11px] uppercase tracking-hud text-hud-accent mb-1">
                {operator.classTitle}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-hud text-hud-text uppercase leading-tight">
                <TypeOn text={operator.fullName} speed={28} caret={false} />
              </h1>

              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[12px]">
                <div className="flex items-center gap-2 text-hud-text/90">
                  <MapPin size={13} className="text-hud-dim" />
                  <span className="truncate">{operator.location}</span>
                </div>
                <div className="flex items-center gap-2 text-hud-text/90">
                  <Mail size={13} className="text-hud-dim" />
                  <a
                    href={`mailto:${operator.contact.email}`}
                    className="truncate hover:text-hud-accent"
                  >
                    {operator.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-hud-text/90">
                  <Phone size={13} className="text-hud-dim" />
                  <span>{operator.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-hud-text/90">
                  <Linkedin size={13} className="text-hud-dim" />
                  <a
                    href={operator.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate hover:text-hud-accent"
                  >
                    sarvesh-yenarkar
                  </a>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <StatBar label="XP TO LV.29" value={operator.xp} tone="accent" showValue />
                <StatBar label="HP" value={92} tone="good" showValue />
                <StatBar label="FOCUS" value={88} tone="rare" showValue />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={operator.resumeHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 border border-hud-accent/60 text-hud-accent text-[11px] font-mono uppercase tracking-hud hover:bg-hud-accent/10"
                >
                  <FileText size={13} />
                  DOSSIER · RESUME.PDF
                  <ChevronRight size={13} />
                </a>
                <a
                  href={operator.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 border border-hud-ink text-hud-text text-[11px] font-mono uppercase tracking-hud hover:border-hud-dim"
                >
                  <Linkedin size={13} />
                  LINKED-IN
                </a>
              </div>
            </div>
          </div>
        </HUDPanel>
      </motion.div>

      {/* Bio / dossier */}
      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} className="col-span-12 lg:col-span-5">
        <HUDPanel label="DOSSIER" serial="EYES ONLY">
          <div className="font-mono text-[10px] uppercase tracking-hud text-hud-accent mb-2">
            ▎ BIOGRAPHY
          </div>
          <div className="space-y-3 text-[13.5px] leading-relaxed text-hud-text/95">
            {operator.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-6 font-mono text-[10px] uppercase tracking-hud text-hud-accent mb-2">
            ▎ TRAINING / EDUCATION
          </div>
          <ul className="space-y-3">
            {operator.education.map((e, i) => (
              <li key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                <span className="font-display text-[13px] tracking-hud uppercase text-hud-text">
                  {e.institution}
                </span>
                <span className="font-mono text-[11px] text-hud-dim uppercase tracking-hud sm:ml-auto">
                  {e.window}
                </span>
                <span className="font-mono text-[11px] text-hud-dim sm:basis-full">
                  {e.degree}
                </span>
              </li>
            ))}
          </ul>
        </HUDPanel>
      </motion.div>

      {/* Trophies */}
      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="col-span-12">
        <HUDPanel label="TROPHIES & MEDALS" serial={`${trophies.length} EARNED`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {trophies.map((t) => (
              <div
                key={t.title}
                className={`relative p-4 border bg-hud-bg/60 ${rarityRing[t.rarity]}`}
              >
                <Bracket size={8} className="border-current opacity-70" animate={false} />
                <div className="font-mono text-[10px] uppercase tracking-hud opacity-80">
                  {t.rarity}
                </div>
                <div className="font-display text-[13px] tracking-hud uppercase text-hud-text mt-1">
                  {t.title}
                </div>
                <p className="text-[12px] text-hud-dim mt-2 leading-snug">{t.detail}</p>
              </div>
            ))}
          </div>
        </HUDPanel>
      </motion.div>
    </div>
  );
}
