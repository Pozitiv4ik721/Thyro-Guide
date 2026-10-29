import { FlaskConical, Droplets, Waves, Shield, Scan, Sunrise, Coffee, FileSearch } from "lucide-react";
import { LABS } from "../data/content";
import { Reveal, SectionHead, DisclaimerChip } from "./ui";

const ICONS = [FlaskConical, Droplets, Waves, Shield, Scan];

export default function Labs() {
  return (
    <section id="labs" className="scroll-mt-20 bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Лабораторная диагностика"
          title={
            <>
              Пять исследований, которые <em className="font-medium italic text-pine">расставят всё по местам</em>
            </>
          }
          sub="Симптомы намекают — анализы отвечают. Вот что означает каждое исследование и почему не нужно бояться цифр: интерпретирует их врач, а не поисковик."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {LABS.map((lab, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={lab.id} delay={i * 0.07} className={i === 3 ? "md:col-span-1 lg:col-span-1" : ""}>
                <article className="group flex h-full flex-col rounded-[26px] border border-line bg-white p-7 shadow-[0_10px_36px_rgba(27,42,37,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(14,93,77,0.14)]">
                  <div className="mb-5 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pine-soft text-pine-deep transition-colors duration-500 group-hover:bg-pine group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-cream px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-terra-deep">
                      {lab.role}
                    </span>
                  </div>
                  <h3 className="font-display text-[1.45rem] leading-tight font-bold">{lab.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{lab.text}</p>
                </article>
              </Reveal>
            );
          })}

          {/* карточка подготовки */}
          <Reveal delay={0.3}>
            <article className="flex h-full flex-col rounded-[26px] bg-pine-deep p-7 text-white shadow-[0_16px_44px_rgba(9,61,51,0.3)]">
              <h3 className="font-display text-[1.45rem] font-bold">Как подготовиться к анализам</h3>
              <ul className="mt-5 space-y-4 text-[15px] leading-snug text-white/85">
                <li className="flex items-start gap-3">
                  <Sunrise className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                  Сдавать кровь утром натощак или через 3–4 часа после лёгкого завтрака
                </li>
                <li className="flex items-start gap-3">
                  <Coffee className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                  Если принимаете левотироксин — встаньте таблетку после сдачи крови, а не до
                </li>
                <li className="flex items-start gap-3">
                  <FileSearch className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                  Берите результаты прошлых анализов — динамика важнее одной цифры
                </li>
              </ul>
              <p className="mt-auto pt-5 text-sm leading-relaxed text-white/60">
                Референсные диапазоны («нормы») различаются между лабораториями — не сравнивайте
                результат с чужими бланками и таблицами из интернета.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <DisclaimerChip
            className="mt-10"
            text="Не занимайтесь самодиагностикой по анализам. Повышенные антитела при нормальном ТТГ — не болезнь, а повод для наблюдения; пограничный ТТГ — повод пересдать анализ, а не начать лечение. Все решения — только с врачом."
          />
        </Reveal>
      </div>
    </section>
  );
}
