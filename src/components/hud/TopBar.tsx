import { useEffect, useState } from 'react';
import { operator } from '@/data/profile';

type ScreenId = 'profile' | 'arsenal' | 'missions' | 'upgrades' | 'comms';

interface TopBarProps {
  active: ScreenId;
  onSelect: (id: ScreenId) => void;
}

const NAV: Array<{ id: ScreenId; label: string; hint: string }> = [
  { id: 'profile', label: 'PROFILE', hint: '1' },
  { id: 'arsenal', label: 'ARSENAL', hint: '2' },
  { id: 'missions', label: 'MISSIONS', hint: '3' },
  { id: 'upgrades', label: 'UPGRADES', hint: '4' },
  { id: 'comms', label: 'COMMS', hint: '5' },
];

function useClock() {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function TopBar({ active, onSelect }: TopBarProps) {
  const now = useClock();
  const time = now.toLocaleTimeString('en-GB', { hour12: false });
  const date = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="relative z-30 border-b border-hud-ink bg-hud-bg/70 backdrop-blur-sm">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 h-14 flex items-center gap-4">
        {/* identity */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-8 h-8 grid place-items-center border border-hud-accent/60">
            <span className="absolute inset-1 bg-hud-accent/10" />
            <span className="relative font-display text-hud-accent text-sm tracking-hud">S</span>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-[11px] tracking-hud text-hud-text">
              {operator.callsign}
            </span>
            <span className="font-mono text-[10px] text-hud-dim uppercase tracking-hud">
              {operator.classTitle}
            </span>
          </div>
        </div>

        {/* breadcrumb */}
        <div className="hidden md:flex items-center gap-2 ml-2 font-mono text-[10px] uppercase tracking-hud text-hud-dim">
          <span>SYS</span>
          <span className="text-hud-muted">/</span>
          <span className="text-hud-accent">{active.toUpperCase()}</span>
        </div>

        {/* nav */}
        <nav className="ml-auto flex items-center gap-1 overflow-x-auto hud-scroll">
          {NAV.map((n) => {
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => onSelect(n.id)}
                className={[
                  'relative px-3 sm:px-4 h-14 inline-flex items-center gap-2',
                  'font-display text-[12px] tracking-hud uppercase',
                  'transition-colors',
                  isActive ? 'text-hud-accent' : 'text-hud-dim hover:text-hud-text',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 -bottom-px h-[2px] bg-hud-accent shadow-hud-glow"
                  />
                )}
                <span>{n.label}</span>
                <span className="hidden lg:inline-block px-1 py-0.5 border border-hud-ink text-[9px] text-hud-muted">
                  {n.hint}
                </span>
              </button>
            );
          })}
        </nav>

        {/* clock / telemetry */}
        <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-hud-ink">
          <div className="flex flex-col leading-none">
            <span className="font-mono text-[11px] text-hud-text">{time}</span>
            <span className="font-mono text-[9px] text-hud-dim uppercase tracking-hud">{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-hud-good animate-pulse-dot" />
            <span className="font-mono text-[10px] text-hud-good uppercase tracking-hud">ONLINE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
