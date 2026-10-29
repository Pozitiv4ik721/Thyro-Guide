import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircleQuestion, BookOpen, PenLine } from "lucide-react";
import { FAQS, ARTICLES } from "../data/content";
import { Reveal, SectionHead } from "./ui";
import { cn } from "../utils/cn";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Частые вопросы"
          title={
            <>
              То, что люди боятся <em className="font-medium italic text-pine">спросить у врача</em>
            </>
          }
          sub="Короткие честные ответы на вопросы, которые эндокринолог слышит каждый день."
        />

        <div className="mx-auto max-w-4xl space-y-3.5">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i * 0.05, 0.3)}>
                <div
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
                    <MessageCircleQuestion className={cn("h-5 w-5 shrink-0", isOpen ? "text-terra" : "text-muted/60")} />
                    <span className="text-base leading-snug font-bold md:text-lg">{f.q}</span>
                    <ChevronDown className={cn("ml-auto h-5 w-5 shrink-0 text-muted transition-transform duration-300", isOpen && "rotate-180 text-pine")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-6 pl-[52px] text-[15px] leading-relaxed text-muted md:px-7 md:pl-[60px]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Контент-план */}
        <div className="mt-20 md:mt-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <Reveal>
              <div className="max-w-xl">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-terra/30 bg-terra-soft/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-terra-deep">
                  <PenLine className="h-3.5 w-3.5" /> Редакционный план
                </span>
                <h3 className="font-display text-3xl font-semibold md:text-4xl">
                  12 статей, которые уже в работе
                </h3>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-muted">
                Каждый материал проходит проверку эндокринологом-консультантом проекта перед публикацией.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a, i) => (
              <Reveal key={a.title} delay={Math.min(i * 0.04, 0.35)}>
                <article className="group h-full rounded-3xl border border-line bg-white p-6 transition-all duration-400 hover:-translate-y-1 hover:border-terra/40 hover:shadow-[0_16px_44px_rgba(209,96,61,0.12)]">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-pine-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-pine-deep">
                      {a.tag}
                    </span>
                    <BookOpen className="h-5 w-5 text-line transition-colors group-hover:text-terra" />
                  </div>
                  <h4 className="text-lg leading-snug font-bold">{a.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
