interface Hint {
  key: string;
  label: string;
}

interface BottomBarProps {
  /** Contextual hints, leftmost is most important */
  hints?: Hint[];
  /** Right-side telemetry text */
  status?: string;
}

const DEFAULT_HINTS: Hint[] = [
  { key: '1-5', label: 'SECTIONS' },
  { key: 'TAB', label: 'NEXT' },
  { key: 'ESC', label: 'PROFILE' },
  { key: '?', label: 'HELP' },
];

export function BottomBar({ hints = DEFAULT_HINTS, status = 'ALL SYSTEMS NOMINAL' }: BottomBarProps) {
  return (
    <footer className="relative z-30 border-t border-hud-ink bg-hud-bg/70 backdrop-blur-sm">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 h-10 flex items-center gap-4 text-[10px] font-mono uppercase tracking-hud">
        {/* hint cluster */}
        <ul className="flex items-center gap-2 sm:gap-3 overflow-x-auto hud-scroll">
          {hints.map((h) => (
            <li key={h.key} className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="px-1.5 py-0.5 border border-hud-ink text-hud-text">{h.key}</span>
              <span className="text-hud-dim">{h.label}</span>
            </li>
          ))}
        </ul>

        {/* status */}
        <div className="ml-auto flex items-center gap-2 whitespace-nowrap">
          <span className="w-1.5 h-1.5 bg-hud-accent animate-pulse-dot" />
          <span className="text-hud-text">{status}</span>
          <span className="hidden sm:inline text-hud-muted">·</span>
          <span className="hidden sm:inline text-hud-dim">v0.1.0</span>
        </div>
      </div>
    </footer>
  );
}
