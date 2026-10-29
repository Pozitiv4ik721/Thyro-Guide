import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, XCircle, BadgeCheck } from "lucide-react";
import { MYTHS } from "../data/content";
import { SectionHead } from "./ui";
import { cn } from "../utils/cn";

export default function Myths() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="myths" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHead
          eyebrow="Мифы против фактов"
          title={
            <>
              Десять заблуждений, которые <em className="font-medium italic text-terra">мешают лечиться</em>
            </>
          }
          sub="О щитовидной железе ходит больше слухов, чем о любой другой железе. Разбираем самые стойкие — спокойно и по доказательствам."
        />

        <div className="space-y-3.5">
          {MYTHS.map((m, i) => {
            const isOpen = open === i;
            return (
              <div
                key={m.myth}
                className={cn(
                  "overflow-hidden rounded-3xl border transition-colors duration-300",
                  isOpen ? "border-pine/40 bg-white shadow-[0_14px_40px_rgba(27,42,37,0.1)]" : "border-line bg-white/70 hover:border-pine/25"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-7"
                >
                  <span
                    className={cn(
                      "font-display text-2xl font-bold transition-colors md:text-3xl",
                      isOpen ? "text-terra" : "text-line"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-start gap-2.5 text-base leading-snug font-bold md:text-lg">
                    <XCircle className={cn("mt-1 h-5 w-5 shrink-0", isOpen ? "text-terra" : "text-muted/50")} />
                    <span>{m.myth}</span>
                  </span>
                  <ChevronDown
                    className={cn("ml-auto h-5 w-5 shrink-0 text-muted transition-transform duration-300", isOpen && "rotate-180 text-pine")}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mx-5 mb-5 flex items-start gap-3 rounded-2xl bg-pine-soft/50 p-5 md:mx-7 md:mb-6">
                        <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
                        <p className="text-[15px] leading-relaxed text-ink/85">
                          <strong className="mr-1 text-pine-deep">Факт:</strong>
                          {m.fact}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
