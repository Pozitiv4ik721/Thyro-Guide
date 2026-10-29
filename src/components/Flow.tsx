import { Ear, Scale, Map, ArrowRight } from "lucide-react";
import { Reveal } from "./ui";

const STEPS = [
  {
    icon: Ear,
    num: "01",
    title: "Симптом",
    text: "Вы отмечаете, что беспокоит: от усталости до сердцебиения. Без медицинского жаргона — обычными словами.",
    color: "bg-pine",
  },
  {
    icon: Scale,
    num: "02",
    title: "Риск",
    text: "Система взвешивает ИМТ, частоту симптомов и факторы риска по открытой балльной шкале. Вся математика видна вам.",
    color: "bg-amber",
  },
  {
    icon: Map,
    num: "03",
    title: "План действий",
    text: "Низкий, средний или высокий риск — для каждого уровня понятный алгоритм: какие анализы, к какому врачу и в какие сроки.",
    color: "bg-terra",
  },
];

export default function Flow() {
  return (
    <section className="relative overflow-hidden bg-pine-deep py-20 text-paper md:py-24">
      <div className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-pine/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-terra/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Reveal>
            <span className="mb-5 inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
              Как устроен путь по сайту
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl font-semibold text-balance md:text-5xl">
              Три шага от тревоги <em className="font-medium italic text-amber">к ясности</em>
            </h2>
          </Reveal>
        </div>

        <div className="relative grid gap-6 md:grid-cols-3">
          {/* соединительная линия */}
          <div className="pointer-events-none absolute top-1/2 right-8 left-8 hidden h-px bg-gradient-to-r from-transparent via-white/25 to-transparent md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.12}>
              <div className="relative h-full rounded-[28px] border border-white/12 bg-white/[0.06] p-7 backdrop-blur transition-colors duration-500 hover:bg-white/[0.1] md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.color} shadow-lg`}>
                    <s.icon className="h-6 w-6 text-white" />
                  </span>
                  <span className="font-display text-5xl font-bold text-white/12">{s.num}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-white/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <a
              href="#screen"
              className="group inline-flex h-13 items-center gap-3 rounded-full bg-terra px-8 py-3.5 text-base font-bold text-white shadow-[0_14px_36px_rgba(209,96,61,0.4)] transition-all hover:-translate-y-1 hover:bg-terra-deep"
            >
              Начать скрининг
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
