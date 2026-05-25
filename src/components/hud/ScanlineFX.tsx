/**
 * Decorative CRT-style scanline that sweeps the viewport.
 * Pure visual fluff — never blocks pointer events.
 */
export function ScanlineFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <div className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-hud-accent/[0.04] to-transparent animate-scan" />
    </div>
  );
}
