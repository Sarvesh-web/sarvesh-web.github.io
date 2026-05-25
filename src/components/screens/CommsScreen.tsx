import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Copy, Check, Send } from 'lucide-react';
import { HUDPanel } from '../hud/HUDPanel';
import { TypeOn } from '../hud/TypeOn';
import { operator } from '@/data/profile';

interface CopyButtonProps {
  value: string;
  label: string;
}

function CopyRow({ value, label, icon }: CopyButtonProps & { icon: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <div className="flex items-center gap-3 p-3 border border-hud-ink bg-hud-bg/60">
      <span className="text-hud-accent">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] uppercase tracking-hud text-hud-dim">{label}</div>
        <div className="font-mono text-[13px] text-hud-text truncate">{value}</div>
      </div>
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
          } catch {
            /* clipboard may be unavailable on http or older browsers */
          }
        }}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-hud-ink text-[10px] font-mono uppercase tracking-hud text-hud-dim hover:text-hud-accent hover:border-hud-accent/60"
        aria-label={`copy ${label}`}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? 'COPIED' : 'COPY'}
      </button>
    </div>
  );
}

export function CommsScreen() {
  const subject = encodeURIComponent('[OPERATOR HUD] inbound transmission');
  const body = encodeURIComponent(
    `Callsign: \nOrg: \nMessage:\n\n---\nReceived via Operator HUD at ${new Date().toISOString()}`,
  );
  const mailto = `mailto:${operator.contact.email}?subject=${subject}&body=${body}`;

  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-5">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        className="col-span-12 lg:col-span-7"
      >
        <HUDPanel label="COMMS · TERMINAL" serial="OUTBOUND">
          <div className="font-mono text-[12px] sm:text-[13px] leading-7 text-hud-text/95 bg-hud-bg/70 border border-hud-ink p-4 min-h-[260px]">
            <div>
              <span className="text-hud-accent">[NET]</span> uplink established · 86ms
            </div>
            <div>
              <span className="text-hud-accent">[AUTH]</span> operator key verified
            </div>
            <div className="mt-2">
              <TypeOn
                text={`> hailing operator-sarvesh on encrypted line...`}
                speed={18}
                caret={false}
              />
            </div>
            <div className="mt-1 text-hud-dim">
              <TypeOn
                text={`> channel ready. dispatch your transmission below.`}
                speed={16}
                delay={1100}
                persistCaret
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={mailto}
              className="inline-flex items-center gap-2 px-3 py-2 border border-hud-accent/60 text-hud-accent text-[11px] font-mono uppercase tracking-hud hover:bg-hud-accent/10"
            >
              <Send size={13} />
              SEND TRANSMISSION · EMAIL
            </a>
            <a
              href={operator.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 border border-hud-ink text-hud-text text-[11px] font-mono uppercase tracking-hud hover:border-hud-dim"
            >
              <Linkedin size={13} />
              OPEN CHANNEL · LINKEDIN
            </a>
          </div>
        </HUDPanel>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
        className="col-span-12 lg:col-span-5"
      >
        <HUDPanel label="HANDSHAKE · DETAILS" serial="VERIFIED">
          <div className="space-y-3">
            <CopyRow icon={<Mail size={16} />} label="EMAIL" value={operator.contact.email} />
            <CopyRow icon={<Phone size={16} />} label="VOICE" value={operator.contact.phone} />
            <CopyRow
              icon={<Linkedin size={16} />}
              label="LINKEDIN"
              value={operator.contact.linkedin}
            />
          </div>

          <div className="mt-5 p-3 border border-hud-ink bg-hud-bg/40">
            <div className="font-mono text-[10px] uppercase tracking-hud text-hud-accent mb-1">
              ▎ AVAILABILITY
            </div>
            <p className="text-[13px] text-hud-text/95">
              Open to talking simulation, native C++ tooling, Unreal Engine systems work, and AI
              for games. Replies within 24h on most days.
            </p>
          </div>
        </HUDPanel>
      </motion.div>
    </div>
  );
}
