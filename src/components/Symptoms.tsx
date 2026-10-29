import { Snowflake, Flame, AlertTriangle, PhoneCall, TrendingDown, TrendingUp } from "lucide-react";
import { SYMPTOM_ROWS } from "../data/content";
import { Reveal, SectionHead } from "./ui";
import { cn } from "../utils/cn";

const SPEC_STYLE: Record<string, string> = {
  "Очень характерно": "bg-pine-soft text-pine-deep",
  "Характерно": "bg-amber-soft text-[#8a6214]",
  "Мало специфично": "bg-sand text-muted",
};

export default function Symptoms() {
  return (
    <section id="symptoms" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Симптомы лицом к лицу"
          title={
            <>
              Одна железа — <em className="font-medium italic text-terra">два противоположных</em> сценария
            </>
          }
          sub="Гипотиреоз — это «торможение» обмена веществ, гипертиреоз — его «разгон». Многие симптомы зеркальны. Но помните: таблица помогает сориентироваться, а не поставить диагноз — это делает врач."
        />

        {/* легенда */}
        <Reveal>
          <div className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-center gap-4">
            <span className="flex items-center gap-2 rounded-full border border-pine/25 bg-pine-soft/60 px-5 py-2.5 text-sm font-bold text-pine-deep">
              <Snowflake className="h-4 w-4" /> Гипотиреоз — функция снижена
            </span>
            <span className="font-display text-2xl font-bold text-muted/50">vs</span>
            <span className="flex items-center gap-2 rounded-full border border-terra/30 bg-terra-soft/60 px-5 py-2.5 text-sm font-bold text-terra-deep">
              <Flame className="h-4 w-4" /> Гипертиреоз — функция повышена
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_16px_50px_rgba(27,42,37,0.08)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-left">
                <thead>
                  <tr className="bg-pine-deep text-white">
                    <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">Симптом</th>
                    <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4" /> При гипотиреозе
                      </span>
                    </th>
                    <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" /> При гипертиреозе
                      </span>
                    </th>
                    <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">Насколько специфично</th>
                  </tr>
                </thead>
                <tbody>
                  {SYMPTOM_ROWS.map((r, i) => (
                    <tr key={r.sign} className={cn("transition-colors hover:bg-cream/60", i % 2 === 1 && "bg-cream/30")}>
                      <td className="px-6 py-4 align-top font-bold">{r.sign}</td>
                      <td className="px-6 py-4 align-top text-[15px] leading-snug text-ink/80">{r.hypo}</td>
                      <td className="px-6 py-4 align-top text-[15px] leading-snug text-ink/80">{r.hyper}</td>
                      <td className="px-6 py-4 align-top">
                        <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap", SPEC_STYLE[r.spec])}>
                          {r.spec}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-line bg-cream/50 px-6 py-4 text-sm leading-relaxed text-muted">
              «Мало специфично» значит: такое бывает при десятке разных состояний — от недосыпа до тревожного
              расстройства. Поэтому по одному симптому выводов не делают никогда: смотрят на совокупность и анализы.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Красные флаги ================= */

export function RedFlags() {
  return (
    <section id="redflags" className="relative scroll-mt-20 overflow-hidden bg-crimson-deep py-20 text-white md:py-28">
      <div className="pointer-events-none absolute -top-32 right-10 h-96 w-96 rounded-full bg-crimson/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-terra/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]">
              <AlertTriangle className="h-4 w-4" /> Красные флаги — не ждите планового приёма
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl font-semibold text-balance md:text-5xl">
              Состояния, где счёт идёт <em className="font-medium italic text-amber">на часы</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              Они встречаются редко, но требуют срочной помощи. Знать их нужно так же, как номер скорой.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal>
            <article className="h-full rounded-[28px] border border-white/12 bg-white/[0.07] p-7 backdrop-blur md:p-8">
              <span className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-terra p-3 shadow-lg">
                <Flame className="h-6 w-6" />
              </span>
              <h3 className="font-display text-2xl font-bold">Тиреотоксический криз</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-amber">
                опасное осложнение гипертиреоза
              </p>
              <ul className="mt-4 space-y-2.5 text-[15px] leading-snug text-white/80">
                <li>• Температура выше 38–39 °C</li>
                <li>• Очень частый пульс (120–140+), перебои</li>
                <li>• Рвота, диарея, резкая слабость</li>
                <li>• Сильное возбуждение или спутанность</li>
              </ul>
              <p className="mt-5 rounded-2xl bg-black/25 p-4 text-sm leading-relaxed text-white/75">
                Часто провоцируется инфекцией, операцией или отменой лечения. Это неотложное состояние.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="h-full rounded-[28px] border border-white/12 bg-white/[0.07] p-7 backdrop-blur md:p-8">
              <span className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-pine p-3 shadow-lg">
                <Snowflake className="h-6 w-6" />
              </span>
              <h3 className="font-display text-2xl font-bold">Микседематозная кома</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-amber">
                крайняя степень гипотиреоза
              </p>
              <ul className="mt-4 space-y-2.5 text-[15px] leading-snug text-white/80">
                <li>• Резкая сонливость вплоть до трудности пробуждения</li>
                <li>• Температура тела ниже нормы, редкий пульс</li>
                <li>• Спутанность, заторможенность</li>
                <li>• Чаще у пожилых с нелеченным гипотиреозом, на холоде</li>
              </ul>
              <p className="mt-5 rounded-2xl bg-black/25 p-4 text-sm leading-relaxed text-white/75">
                Встречается редко, но служит напоминанием: «усталость у бабушки» — не всегда «просто возраст».
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.2}>
            <article className="h-full rounded-[28px] border-2 border-amber/50 bg-amber/10 p-7 backdrop-blur md:p-8">
              <span className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-amber p-3 text-ink shadow-lg">
                <PhoneCall className="h-6 w-6" />
              </span>
              <h3 className="font-display text-2xl font-bold">Когда звонить 103 / 112</h3>
              <ul className="mt-4 space-y-3 text-[15px] leading-snug text-white/85">
                <li className="flex gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                  Обморок или предобморочное состояние на фоне резкого сердцебиения
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                  Высокая температура вместе с сильным сердцебиением и потливостью
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                  Человека трудно разбудить, речь и мысли путаются
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                  Образование на шее быстро растёт, мешает дышать или глотать
                </li>
              </ul>
              <p className="mt-5 rounded-2xl bg-black/25 p-4 text-sm leading-relaxed text-white/75">
                Лучше «лишний» вызов, чем упущенные часы. Фельдшеру скажите просто: «подозреваем щитовидную железу».
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
