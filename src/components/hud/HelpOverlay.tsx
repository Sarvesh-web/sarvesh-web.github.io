import { AnimatePresence, motion } from 'framer-motion';
import { HUDPanel } from './HUDPanel';

interface HelpOverlayProps {
  open: boolean;
  onClose: () => void;
}

const ROWS: Array<[string, string]> = [
  ['1 / 2 / 3 / 4 / 5', 'Jump to PROFILE / ARSENAL / MISSIONS / UPGRADES / COMMS'],
  ['TAB', 'Cycle to next section'],
  ['SHIFT + TAB', 'Cycle to previous section'],
  ['ESC', 'Return to PROFILE'],
  ['?', 'Toggle this help panel'],
  ['↑ ↑ ↓ ↓ ← → ← → B A', 'Unlock a classified bonus'],
];

export function HelpOverlay({ open, onClose }: HelpOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="help"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] bg-hud-bg/70 backdrop-blur-sm grid place-items-center p-4"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full max-w-xl"
          >
            <HUDPanel label="HELP · CONTROLS" serial="QUICKREF">
              <ul className="divide-y divide-hud-ink">
                {ROWS.map(([key, label]) => (
                  <li
                    key={key}
                    className="py-2.5 flex items-center justify-between gap-4 text-[13px]"
                  >
                    <span className="font-mono text-hud-accent">{key}</span>
                    <span className="text-hud-text/90 text-right">{label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right">
                <button
                  onClick={onClose}
                  className="px-3 py-2 border border-hud-accent/60 text-hud-accent text-[11px] font-mono uppercase tracking-hud hover:bg-hud-accent/10"
                >
                  CLOSE [ESC]
                </button>
              </div>
            </HUDPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
