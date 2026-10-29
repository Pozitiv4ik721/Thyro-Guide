import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, CaseUpper } from "lucide-react";
import { cn } from "../utils/cn";
import { ButterflyMark } from "./ui";

const LINKS = [
  { href: "#who", label: "Кому это важно" },
  { href: "#screen", label: "Скрининг" },
  { href: "#symptoms", label: "Симптомы" },
  { href: "#labs", label: "Диагностика" },
  { href: "#myths", label: "Мифы и факты" },
  { href: "#faq", label: "Вопросы" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [largeFont, setLargeFont] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.font = largeFont ? "large" : "normal";
  }, [largeFont]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line/70 bg-paper/90 shadow-[0_8px_30px_rgba(27,42,37,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="ТиреоГид — на главную">
          <ButterflyMark className="h-9 w-9 transition-transform duration-500 group-hover:-rotate-12" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight">
              Тирео<span className="text-terra">Гид</span>
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
              понятно о щитовидке
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-pine-soft hover:text-pine-deep"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setLargeFont((v) => !v)}
            className={cn(
              "flex h-10 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-all",
              largeFont
                ? "border-pine bg-pine text-white"
                : "border-line bg-white/60 text-ink/70 hover:border-pine/40 hover:text-pine-deep"
            )}
            aria-pressed={largeFont}
            title="Увеличить шрифт для удобства чтения"
          >
            <CaseUpper className="h-4 w-4" />
            <span className="hidden sm:inline">Крупный шрифт</span>
          </button>

          <a
            href="#screen"
            className="hidden h-10 items-center rounded-full bg-terra px-5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(209,96,61,0.35)] transition-all hover:-translate-y-0.5 hover:bg-terra-deep sm:flex"
          >
            Пройти скрининг
          </a>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/60 text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-line bg-paper/95 backdrop-blur-xl lg:hidden"
            aria-label="Мобильная навигация"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-pine-soft"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#screen"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-terra px-4 py-3.5 text-center text-base font-bold text-white"
              >
                Пройти скрининг за 5 минут
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
