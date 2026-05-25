/**
 * Decorative reticle — used in the loadout / arsenal screen and the boot logo.
 * Pure SVG, no runtime cost.
 */
interface ReticleProps {
  size?: number;
  className?: string;
  spin?: boolean;
}

export function Reticle({ size = 240, className = '', spin = true }: ReticleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label="reticle"
    >
      {/* outer dashed ring */}
      <g className={spin ? 'origin-center animate-sweep' : ''} style={{ transformOrigin: 'center' }}>
        <circle
          cx="120"
          cy="120"
          r="110"
          fill="none"
          stroke="rgba(255,106,53,0.35)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      </g>

      {/* middle ring with tick marks */}
      <circle
        cx="120"
        cy="120"
        r="92"
        fill="none"
        stroke="rgba(255,106,53,0.55)"
        strokeWidth="1"
      />
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 360) / 36;
        const long = i % 3 === 0;
        return (
          <line
            key={i}
            x1="120"
            y1={120 - 92}
            x2="120"
            y2={120 - (long ? 84 : 88)}
            stroke="rgba(255,106,53,0.65)"
            strokeWidth={long ? 1.4 : 0.8}
            transform={`rotate(${angle} 120 120)`}
          />
        );
      })}

      {/* inner crosshair */}
      <g stroke="rgba(255,106,53,0.85)" strokeWidth="1">
        <line x1="120" y1="40" x2="120" y2="64" />
        <line x1="120" y1="176" x2="120" y2="200" />
        <line x1="40" y1="120" x2="64" y2="120" />
        <line x1="176" y1="120" x2="200" y2="120" />
      </g>

      {/* inner ring */}
      <circle
        cx="120"
        cy="120"
        r="36"
        fill="none"
        stroke="rgba(255,106,53,0.7)"
        strokeWidth="1"
      />
      <circle cx="120" cy="120" r="2.5" fill="rgb(255,106,53)" />
    </svg>
  );
}
