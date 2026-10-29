import { Baby, Briefcase, GraduationCap, Flower2, CircleAlert, ArrowRight } from "lucide-react";
import { PERSONAS } from "../data/content";
import { Reveal, SectionHead } from "./ui";

const ICONS = [Baby, Briefcase, GraduationCap, Flower2];

export default function Personas() {
  return (
    <section id="who" className="relative scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Кому это особенно важно"
          title={
            <>
              Узнаёте себя? <em className="font-medium italic text-pine">Вы не одиноки</em>
            </>
          }
          sub="Болезни щитовидной железы хорошо прячутся под «усталость», «возраст» и «переходный период». Вот четыре портрета людей, которым скрининг нужнее всего."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {PERSONAS.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={p.id} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_10px_40px_rgba(27,42,37,0.07)] transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(27,42,37,0.14)] sm:flex-row">
                  <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[42%]">
                    <img
                      src={p.photo}
                      alt={`${p.name} — ${p.tag}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/55 via-pine-deep/10 to-transparent" />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-pine-deep backdrop-blur">
                      <Icon className="h-3.5 w-3.5" />
                      {p.tag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                    <p className="mt-2 font-display text-[1.05rem] leading-snug text-terra-deep italic">
                      {p.quote}
                    </p>

                    <ul className="mt-4 space-y-2.5">
                      {p.pains.map((pain) => (
                        <li key={pain} className="flex items-start gap-2.5 text-sm leading-snug text-muted">
                          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-terra/70" />
                          {pain}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-5">
                      <div className="rounded-2xl bg-pine-soft/70 p-4 text-sm leading-relaxed text-pine-deep">
                        <span className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider">
                          <ArrowRight className="h-3.5 w-3.5" /> Что даст скрининг
                        </span>
                        {p.help}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
