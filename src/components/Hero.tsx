import { motion } from "framer-motion";
import { ArrowDown, FlaskConical, ShieldCheck, HeartPulse, Lock, Timer, Scale } from "lucide-react";
import { TICKER } from "../data/content";
import { HERO_IMG } from "../data/heroImg";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden pt-[72px]">
      {/* мягкие цветовые пятна */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[560px] w-[560px] rounded-full bg-pine-soft/70 blur-3xl" />
      <div className="pointer-events-none absolute top-64 -left-52 h-[480px] w-[480px] rounded-full bg-terra-soft/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pt-12 pb-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20 lg:pb-24">
        {/* ------- текст ------- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-7 inline-flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-pine/25 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-pine-deep backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              Проект на принципах доказательной медицины
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease }}
            className="font-display text-[2.7rem] leading-[1.04] font-semibold text-balance sm:text-6xl lg:text-[4.4rem]"
          >
            Маленькая <em className="text-terra not-italic underline decoration-terra-soft decoration-[6px] underline-offset-8">бабочка</em> на шее, которая управляет{" "}
            <em className="font-medium italic text-pine">всем организмом</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
          >
            Щитовидная железа похожа на бабочку — и влияет на вес, настроение, сердце и энергию.
            За 5–7 минут наш скрининг поможет понять, есть ли у вас признаки риска
            <strong className="font-semibold text-ink"> гипотиреоза </strong>или
            <strong className="font-semibold text-ink"> гипертиреоза</strong>, — и подскажет понятный план дальнейших действий.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#screen"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-pine px-8 text-base font-bold text-white shadow-[0_14px_36px_rgba(14,93,77,0.35)] transition-all hover:-translate-y-1 hover:bg-pine-deep hover:shadow-[0_18px_44px_rgba(14,93,77,0.45)]"
            >
              <Timer className="h-5 w-5" />
              Пройти скрининг за 5 минут
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href="#symptoms"
              className="inline-flex h-14 items-center rounded-full border-2 border-ink/15 bg-white/60 px-7 text-base font-bold text-ink backdrop-blur transition-all hover:border-pine/50 hover:text-pine-deep"
            >
              Сравнить симптомы
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted"
          >
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-pine" /> Не ставит диагнозы — честно говорит об этом
            </li>
            <li className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-pine" /> Ответы остаются только в вашем браузере
            </li>
            <li className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-pine" /> Тексты проверены эндокринологом-консультантом
            </li>
          </motion.ul>
        </div>

        {/* ------- иллюстрация ------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-[480px]"
        >
          <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[36px] border-[10px] border-white shadow-[0_40px_90px_rgba(27,42,37,0.22)]">
            <img
              src={HERO_IMG}
              alt="Акварельная бабочка — метафора щитовидной железы: две доли и перешеек"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/25 via-transparent to-transparent" />
          </div>

          {/* парящие плашки */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-16 flex items-center gap-2.5 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-[0_14px_34px_rgba(27,42,37,0.16)] backdrop-blur sm:-left-10"
          >
            <FlaskConical className="h-5 w-5 text-pine" />
            <div className="leading-tight">
              <p className="text-sm font-bold">ТТГ</p>
              <p className="text-xs text-muted">главный анализ</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute -right-3 top-1/3 flex items-center gap-2.5 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-[0_14px_34px_rgba(27,42,37,0.16)] backdrop-blur sm:-right-8"
          >
            <Scale className="h-5 w-5 text-terra" />
            <div className="leading-tight">
              <p className="text-sm font-bold">ИМТ + симптомы</p>
              <p className="text-xs text-muted">прозрачный подсчёт баллов</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
            className="absolute -bottom-5 left-8 flex items-center gap-2.5 rounded-2xl border border-line bg-pine-deep px-4 py-3 text-white shadow-[0_14px_34px_rgba(9,61,51,0.35)]"
          >
            <Timer className="h-5 w-5 text-amber" />
            <div className="leading-tight">
              <p className="text-sm font-bold">5–7 минут</p>
              <p className="text-xs text-white/70">и понятный план действий</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ------- бегущая строка фактов ------- */}
      <div className="relative border-y border-line bg-cream/70 py-4" aria-hidden="true">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-3 pr-3">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-ink/60">
                <span className="h-1.5 w-1.5 rounded-full bg-terra" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
