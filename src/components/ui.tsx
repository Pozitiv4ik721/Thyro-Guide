import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

/* ---------- Логотип-бабочка (две доли щитовидной железы) ---------- */
export function ButterflyMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        className="text-pine"
        d="M15 4C10.4 1.8 5.6 3.9 5.9 8.6c.2 3.1 2.2 4.9 5 5.3-3.2.9-5 3.2-4.3 6.3.8 3.6 5 4.7 7.4 1.9.9-1 1.1-2.4 1.1-4z"
      />
      <path
        fill="currentColor"
        className="text-terra"
        d="M17 4c4.6-2.2 9.4-.1 9.1 4.6-.2 3.1-2.2 4.9-5 5.3 3.2.9 5 3.2 4.3 6.3-.8 3.6-5 4.7-7.4 1.9-.9-1-1.1-2.4-1.1-4z"
      />
    </svg>
  );
}

/* ---------- Появление при скролле ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Заголовок секции ---------- */
export function SectionHead({
  eyebrow,
  title,
  sub,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      <Reveal>
        <span
          className={cn(
            "mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]",
            dark
              ? "border-white/20 bg-white/5 text-white/70"
              : "border-pine/20 bg-pine-soft/60 text-pine"
          )}
        >
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "font-display text-4xl leading-[1.08] font-semibold text-balance md:text-5xl lg:text-[3.4rem]",
            dark ? "text-paper" : "text-ink"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mx-auto mt-5 max-w-2xl text-lg leading-relaxed",
              dark ? "text-white/70" : "text-muted"
            )}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Плашка-дисклеймер ---------- */
export function DisclaimerChip({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-amber/40 bg-amber-soft/70 px-5 py-4 text-sm leading-relaxed text-ink/80",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-amber" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v.01M12 12v4" strokeLinecap="round" />
      </svg>
      <p>{text}</p>
    </div>
  );
}
