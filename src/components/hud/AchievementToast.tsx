import { AnimatePresence, motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export interface AchievementPayload {
  id: string;
  title: string;
  detail?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'gold' | 'classified';
}

const rarityRing: Record<NonNullable<AchievementPayload['rarity']>, string> = {
  common: 'border-hud-dim',
  rare: 'border-hud-rare shadow-[0_0_24px_rgba(98,168,255,0.35)]',
  epic: 'border-hud-accent shadow-hud-glow',
  gold: 'border-hud-gold shadow-[0_0_24px_rgba(244,201,93,0.35)]',
  classified: 'border-hud-danger shadow-[0_0_24px_rgba(255,71,87,0.35)]',
};

const rarityText: Record<NonNullable<AchievementPayload['rarity']>, string> = {
  common: 'text-hud-dim',
  rare: 'text-hud-rare',
  epic: 'text-hud-accent',
  gold: 'text-hud-gold',
  classified: 'text-hud-danger',
};

interface Props {
  queue: AchievementPayload[];
  onDismiss: (id: string) => void;
}

export function AchievementToasts({ queue, onDismiss }: Props) {
  return (
    <div className="fixed z-[80] right-4 top-20 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence initial={false}>
        {queue.map((a) => {
          const rarity = a.rarity ?? 'rare';
          return (
            <motion.div
              key={a.id}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              onAnimationComplete={() => {
                window.setTimeout(() => onDismiss(a.id), 4200);
              }}
              className={[
                'pointer-events-auto',
                'relative bg-hud-panel/95 border px-4 py-3 min-w-[260px] max-w-[340px]',
                rarityRing[rarity],
              ].join(' ')}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${rarityText[rarity]}`}>
                  <Trophy size={18} strokeWidth={1.6} />
                </div>
                <div className="min-w-0">
                  <div className={`font-mono text-[10px] uppercase tracking-hud ${rarityText[rarity]}`}>
                    Achievement Unlocked · {rarity}
                  </div>
                  <div className="font-display text-sm tracking-hud uppercase text-hud-text mt-0.5 truncate">
                    {a.title}
                  </div>
                  {a.detail && (
                    <div className="text-[12px] text-hud-dim mt-1 leading-snug">{a.detail}</div>
                  )}
                </div>
                <button
                  onClick={() => onDismiss(a.id)}
                  className="ml-auto -mr-1 -mt-1 text-hud-muted hover:text-hud-text text-xs"
                  aria-label="dismiss"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
