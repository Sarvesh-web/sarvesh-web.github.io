import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TopBar } from './components/hud/TopBar';
import { BottomBar } from './components/hud/BottomBar';
import { ScanlineFX } from './components/hud/ScanlineFX';
import { BootScreen } from './components/screens/BootScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ArsenalScreen } from './components/screens/ArsenalScreen';
import { MissionsScreen } from './components/screens/MissionsScreen';
import { UpgradesScreen } from './components/screens/UpgradesScreen';
import { CommsScreen } from './components/screens/CommsScreen';
import { AchievementToasts, type AchievementPayload } from './components/hud/AchievementToast';
import { HelpOverlay } from './components/hud/HelpOverlay';
import { useKonami } from './hooks/useKonami';

type ScreenId = 'profile' | 'arsenal' | 'missions' | 'upgrades' | 'comms';

const ORDER: ScreenId[] = ['profile', 'arsenal', 'missions', 'upgrades', 'comms'];

const VISIT_ACHIEVEMENT: Record<ScreenId, AchievementPayload> = {
  profile: {
    id: 'visit-profile',
    title: 'OPERATOR ACQUIRED',
    detail: 'Identified the asset. Profile reviewed.',
    rarity: 'common',
  },
  arsenal: {
    id: 'visit-arsenal',
    title: 'LOADOUT REVIEWED',
    detail: 'Inspected the arsenal. All weapons accounted for.',
    rarity: 'rare',
  },
  missions: {
    id: 'visit-missions',
    title: 'OPSEC BREACH',
    detail: 'You read the mission log. Hope you have clearance.',
    rarity: 'epic',
  },
  upgrades: {
    id: 'visit-upgrades',
    title: 'TECH TREE EXPOSED',
    detail: 'You found the upgrade tree. Spend XP wisely.',
    rarity: 'gold',
  },
  comms: {
    id: 'visit-comms',
    title: 'CHANNEL OPEN',
    detail: 'Comms terminal active. Awaiting transmission.',
    rarity: 'rare',
  },
};

export default function App() {
  const [booting, setBooting] = useState(true);
  const [screen, setScreen] = useState<ScreenId>('profile');
  const [visited, setVisited] = useState<Set<ScreenId>>(new Set());
  const [queue, setQueue] = useState<AchievementPayload[]>([]);
  const [helpOpen, setHelpOpen] = useState(false);

  const pushAchievement = useCallback((a: AchievementPayload) => {
    setQueue((q) => (q.find((x) => x.id === a.id) ? q : [...q, a]));
  }, []);

  const dismissAchievement = useCallback((id: string) => {
    setQueue((q) => q.filter((a) => a.id !== id));
  }, []);

  // Award per-section first visit
  useEffect(() => {
    if (booting) return;
    if (visited.has(screen)) return;
    setVisited((v) => new Set(v).add(screen));
    const a = VISIT_ACHIEVEMENT[screen];
    if (a) pushAchievement(a);
  }, [screen, booting, visited, pushAchievement]);

  // Konami easter egg
  useKonami(() => {
    pushAchievement({
      id: 'konami',
      title: 'CHEAT CODE · DEV MODE',
      detail:
        'You know the old codes. +30 XP, infinite lives, and the recruiter sees this as a green flag.',
      rarity: 'classified',
    });
  });

  // Global keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Don't hijack typing in inputs
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (booting) {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
          setBooting(false);
        }
        return;
      }

      if (helpOpen && e.key === 'Escape') {
        setHelpOpen(false);
        return;
      }

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setHelpOpen((v) => !v);
        return;
      }

      if (e.key === 'Escape') {
        setScreen('profile');
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        setScreen((s) => {
          const idx = ORDER.indexOf(s);
          const next = e.shiftKey
            ? (idx - 1 + ORDER.length) % ORDER.length
            : (idx + 1) % ORDER.length;
          return ORDER[next];
        });
        return;
      }

      const mapping: Record<string, ScreenId> = {
        '1': 'profile',
        '2': 'arsenal',
        '3': 'missions',
        '4': 'upgrades',
        '5': 'comms',
      };
      if (mapping[e.key]) {
        setScreen(mapping[e.key]);
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [booting, helpOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>{booting && <BootScreen onComplete={() => setBooting(false)} />}</AnimatePresence>

      <ScanlineFX />

      <TopBar active={screen} onSelect={(id) => setScreen(id)} />

      <main className="relative z-10 flex-1 mx-auto w-full max-w-[1600px] px-4 sm:px-6 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {screen === 'profile' && <ProfileScreen />}
            {screen === 'arsenal' && <ArsenalScreen />}
            {screen === 'missions' && <MissionsScreen />}
            {screen === 'upgrades' && <UpgradesScreen />}
            {screen === 'comms' && <CommsScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomBar />

      <AchievementToasts queue={queue} onDismiss={dismissAchievement} />
      <HelpOverlay open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
