import { DISCLAIMER_FULL } from "../data/content";
import { ButterflyMark } from "./ui";
import { ShieldAlert, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-pine-deep text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-18">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <ButterflyMark className="h-10 w-10" />
              <span className="font-display text-2xl font-bold">
                Тирео<span className="text-terra">Гид</span>
              </span>
            </a>
            <p className="mt-4 max-w-md leading-relaxed text-white/65">
              Независимый информационный проект о здоровье щитовидной железы: симптомы, скрининг
              рисков, анализы и мифы — понятным языком.
            </p>
            <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/80" aria-label="Навигация в подвале">
              <a href="#who" className="transition-colors hover:text-amber">Кому важно</a>
              <a href="#screen" className="transition-colors hover:text-amber">Скрининг</a>
              <a href="#symptoms" className="transition-colors hover:text-amber">Симптомы</a>
              <a href="#labs" className="transition-colors hover:text-amber">Диагностика</a>
              <a href="#myths" className="transition-colors hover:text-amber">Мифы</a>
              <a href="#faq" className="transition-colors hover:text-amber">Вопросы</a>
            </nav>
          </div>

          <div className="rounded-3xl border border-white/12 bg-white/[0.05] p-6">
            <p className="flex items-center gap-2.5 font-bold text-amber">
              <ShieldAlert className="h-5 w-5" /> Важное уведомление
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{DISCLAIMER_FULL}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-7 text-sm text-white/50">
          <p>© {new Date().getFullYear()} ТиреоГид · Информационный проект. Не является медицинской услугой.</p>
          <div className="flex items-center gap-5">
            <p>Иллюстрации и фотографии: Pexels, AI-графика</p>
            <a
              href="#top"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:border-amber hover:text-amber"
              aria-label="Наверх"
            >
              <ArrowUp className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
