import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Printer,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Info,
  Ruler,
  Weight,
  User,
  TrendingDown,
  TrendingUp,
  Stethoscope,
  FlaskConical,
  Lock,
  Timer,
} from "lucide-react";
import { cn } from "../utils/cn";
import {
  HYPO_SYMPTOMS,
  HYPER_SYMPTOMS,
  RED_FLAGS,
  FACTORS,
  FREQ_OPTIONS,
  LEVELS,
  DISCLAIMER_SHORT,
  type Level,
} from "../data/content";

const ease = [0.22, 1, 0.36, 1] as const;

/* ================= вспомогательные элементы ================= */

function SliderField({
  icon: Icon,
  label,
  value,
  min,
  max,
  unit,
  onChange,
  terra = false,
}: {
  icon: typeof Ruler;
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
  terra?: boolean;
}) {
  const pct = Math.round(((value - min) / (max - min)) * 100);
  return (
    <div className="rounded-3xl border border-line bg-cream/50 p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 font-bold">
          <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl text-white", terra ? "bg-terra" : "bg-pine")}>
            <Icon className="h-4.5 w-4.5" />
          </span>
          {label}
        </span>
        <label className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-1.5 shadow-sm">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (!Number.isNaN(n)) onChange(Math.max(min - 10, Math.min(max + 10, n)));
            }}
            onBlur={(e) => {
              const n = Number(e.target.value);
              onChange(Math.max(min, Math.min(max, Number.isNaN(n) ? min : n)));
            }}
            className="w-16 bg-transparent text-right text-xl font-bold text-pine-deep outline-none"
            aria-label={`${label}: ручной ввод`}
          />
          <span className="text-sm font-semibold text-muted">{unit}</span>
        </label>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn("thy-slider", terra && "thy-slider-terra")}
        style={{ "--fill": `${pct}%` } as React.CSSProperties}
        aria-label={`${label}: ползунок`}
      />
      <div className="mt-2 flex justify-between text-xs font-semibold text-muted/80">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  );
}

function FreqRow({
  label,
  hint,
  value,
  onChange,
  missed,
}: {
  label: string;
  hint: string;
  value: number | undefined;
  onChange: (v: number) => void;
  missed: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-colors md:p-5",
        missed ? "border-crimson/60 bg-crimson/5" : value !== undefined ? "border-pine/30 bg-pine-soft/30" : "border-line bg-white"
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md">
          <p className="font-semibold leading-snug">{label}</p>
          <p className="mt-0.5 text-sm text-muted">{hint}</p>
          {missed && (
            <p className="mt-1.5 text-xs font-semibold text-crimson">Выберите один из вариантов</p>
          )}
        </div>
        <div className="grid flex-shrink-0 grid-cols-4 gap-1 rounded-full border border-line bg-cream p-1" role="group" aria-label={label}>
          {FREQ_OPTIONS.map((o) => (
            <button
              key={o.v}
              type="button"
              aria-pressed={value === o.v}
              onClick={() => onChange(o.v)}
              className={cn(
                "rounded-full px-3 py-2 text-[13px] font-semibold whitespace-nowrap transition-all sm:px-4",
                value === o.v ? "bg-pine text-white shadow" : "text-ink/60 hover:text-pine-deep"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckCard({
  checked,
  onToggle,
  label,
  hint,
  danger = false,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  hint?: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={onToggle}
      className={cn(
        "flex w-full items-start gap-3.5 rounded-2xl border-2 p-4 text-left transition-all md:p-5",
        checked
          ? danger
            ? "border-crimson bg-crimson/8 shadow-[0_8px_24px_rgba(166,43,29,0.15)]"
            : "border-pine bg-pine-soft/60 shadow-[0_8px_24px_rgba(14,93,77,0.14)]"
          : danger
            ? "border-crimson/25 bg-white hover:border-crimson/50"
            : "border-line bg-white hover:border-pine/40"
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors",
          checked ? (danger ? "border-crimson bg-crimson text-white" : "border-pine bg-pine text-white") : "border-line bg-cream"
        )}
      >
        {checked && <CheckCircle2 className="h-4 w-4" />}
      </span>
      <span>
        <span className="block font-semibold leading-snug">{label}</span>
        {hint && <span className="mt-1 block text-sm leading-snug text-muted">{hint}</span>}
      </span>
    </button>
  );
}

/* ================= категории ИМТ ================= */

function bmiInfo(bmi: number): { label: string; desc: string; cls: string; pct: number } {
  if (bmi < 18.5)
    return {
      label: "Недостаток массы тела",
      desc: "ИМТ ниже 18,5. Низкий вес бывает при ускоренном обмене — в том числе при гипертиреозе.",
      cls: "text-amber",
      pct: Math.max(4, (bmi / 40) * 100),
    };
  if (bmi < 25)
    return {
      label: "Вес в норме",
      desc: "ИМТ 18,5–24,9. Сам по себе вес не исключает проблем с щитовидной железой — важнее симптомы.",
      cls: "text-pine",
      pct: (bmi / 40) * 100,
    };
  if (bmi < 30)
    return {
      label: "Избыточная масса тела",
      desc: "ИМТ 25–29,9. Лёгкий фактор настороженности: при гипотиреозе обмен замедляется, вес растёт.",
      cls: "text-amber",
      pct: (bmi / 40) * 100,
    };
  return {
    label: "Ожирение",
    desc: "ИМТ 30 и выше. Частый спутник гипотиреоза — но только анализы покажут причину.",
    cls: "text-crimson",
    pct: Math.min(100, (bmi / 40) * 100),
  };
}

/* ================= шкала-спидометр ================= */

function Gauge({ score, level }: { score: number; level: Level }) {
  const cx = 110;
  const cy = 112;
  const r = 88;
  const pct = Math.min(score / 24, 1);

  const polar = (p: number, rad = r) => {
    const t = Math.PI * (1 - p);
    return [cx + rad * Math.cos(t), cy - rad * Math.sin(t)] as const;
  };
  const arc = (from: number, to: number, rad = r) => {
    const [x1, y1] = polar(from, rad);
    const [x2, y2] = polar(to, rad);
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${rad} ${rad} 0 ${to - from > 0.5 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };

  const deg = -90 + pct * 180;
  const stroke = level === "low" ? "var(--color-pine)" : level === "medium" ? "var(--color-amber)" : "var(--color-crimson)";

  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <svg viewBox="0 0 220 128" className="w-full" role="img" aria-label={`Шкала риска: ${score} баллов`}>
        {/* фоновые зоны: низкий до ~4 баллов, средний до ~10 */}
        <path d={arc(0, 0.167)} fill="none" stroke="var(--color-pine)" strokeOpacity="0.28" strokeWidth="16" strokeLinecap="round" />
        <path d={arc(0.175, 0.417)} fill="none" stroke="var(--color-amber)" strokeOpacity="0.35" strokeWidth="16" />
        <path d={arc(0.425, 0.985)} fill="none" stroke="var(--color-crimson)" strokeOpacity="0.28" strokeWidth="16" strokeLinecap="round" />
        {/* активная дуга */}
        <motion.path
          d={arc(0, Math.max(0.012, pct))}
          fill="none"
          stroke={stroke}
          strokeWidth="16"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease }}
        />
        {/* стрелка */}
        <motion.g
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          initial={{ rotate: -90 }}
          animate={{ rotate: deg }}
          transition={{ duration: 1.4, ease }}
        >
          <line x1={cx} y1={cy} x2={cx} y2={cy - r + 24} stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" />
          <circle cx={cx} cy={cy} r="8" fill="var(--color-ink)" />
          <circle cx={cx} cy={cy} r="3" fill="var(--color-paper)" />
        </motion.g>
        {/* подписи зон */}
        <text x="26" y="126" fontSize="10" fontWeight="700" fill="var(--color-pine)">низкий</text>
        <text x="95" y="18" fontSize="10" fontWeight="700" fill="var(--color-amber)">средний</text>
        <text x="168" y="126" fontSize="10" fontWeight="700" fill="var(--color-crimson)">высокий</text>
      </svg>
    </div>
  );
}

/* ================= основной компонент ================= */

const STEP_TITLES = ["Начало", "Рост и вес", "Симптомы · замедление", "Симптомы · ускорение", "Факторы риска", "Результат"];

export default function Screener() {
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [height, setHeight] = useState(168);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(40);
  const [symp, setSymp] = useState<Record<string, number>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [factors, setFactors] = useState<Record<string, boolean>>({});
  const [attempted, setAttempted] = useState<Record<number, boolean>>({});

  const bmi = weight / Math.pow(height / 100, 2);
  const bmiCat = bmiInfo(bmi);

  const answeredHypo = HYPO_SYMPTOMS.filter((s) => symp[s.id] !== undefined).length;
  const answeredHyper = HYPER_SYMPTOMS.filter((s) => symp[s.id] !== undefined).length;

  /* ---------- подсчёт ---------- */
  const calc = useMemo(() => {
    const hypoSympScore = HYPO_SYMPTOMS.reduce((s, x) => s + (symp[x.id] ?? 0), 0);
    const hyperSympScore = HYPER_SYMPTOMS.reduce((s, x) => s + (symp[x.id] ?? 0), 0);

    let hypoFlag = 0;
    let hyperFlag = 0;
    let emergency = false;
    let anyFlag = false;
    RED_FLAGS.forEach((f) => {
      if (!flags[f.id]) return;
      anyFlag = true;
      if (f.emergency) emergency = true;
      if (f.track === "hypo") hypoFlag += 4;
      else if (f.track === "hyper") hyperFlag += 4;
      else {
        hypoFlag += 4;
        hyperFlag += 4;
      }
    });

    let hypoFactor = 0;
    let hyperFactor = 0;
    FACTORS.forEach((f) => {
      if (!factors[f.id]) return;
      hypoFactor += f.hypo;
      hyperFactor += f.hyper;
    });

    const bmiHypo = bmi >= 30 ? 2 : bmi >= 25 ? 1 : 0;
    const bmiHyper = bmi < 16.5 ? 2 : bmi < 18.5 ? 1 : 0;
    const agePts = age >= 60 ? 1 : 0;

    const hypoScore = hypoSympScore + hypoFlag + hypoFactor + bmiHypo + agePts;
    const hyperScore = hyperSympScore + hyperFlag + hyperFactor + bmiHyper + agePts;

    const rank = (s: number): Level => (s <= 4 ? "low" : s <= 10 ? "medium" : "high");
    const order: Record<Level, number> = { low: 0, medium: 1, high: 2 };
    const hypoLevel = rank(hypoScore);
    const hyperLevel = rank(hyperScore);
    let overall: Level = order[hypoLevel] >= order[hyperLevel] ? hypoLevel : hyperLevel;
    if (anyFlag && overall === "low") overall = "medium";
    if (emergency) overall = "high";

    return {
      hypoScore,
      hyperScore,
      hypoLevel,
      hyperLevel,
      overall,
      emergency,
      anyFlag,
      parts: [
        { label: "ИМТ (рост и вес)", hypo: bmiHypo, hyper: bmiHyper },
        { label: "Симптомы «замедления»", hypo: hypoSympScore, hyper: 0 },
        { label: "Симптомы «ускорения»", hypo: 0, hyper: hyperSympScore },
        { label: "Красные флаги", hypo: hypoFlag, hyper: hyperFlag },
        { label: "Факторы риска", hypo: hypoFactor, hyper: hyperFactor },
        { label: "Возраст 60+", hypo: agePts, hyper: agePts },
      ],
    };
  }, [symp, flags, factors, bmi, age]);

  const goNext = () => {
    if (step === 2 && answeredHypo < HYPO_SYMPTOMS.length) {
      setAttempted((a) => ({ ...a, 2: true }));
      return;
    }
    if (step === 3 && answeredHyper < HYPER_SYMPTOMS.length) {
      setAttempted((a) => ({ ...a, 3: true }));
      return;
    }
    setStep((s) => Math.min(5, s + 1));
  };

  const restart = () => {
    setStep(0);
    setConsent(false);
    setSymp({});
    setFlags({});
    setFactors({});
    setAttempted({});
    setHeight(168);
    setWeight(70);
    setAge(40);
  };

  const trackBar = (score: number, level: Level, icon: "up" | "down", title: string) => (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-bold">
          {icon === "down" ? <TrendingDown className="h-4 w-4 text-pine" /> : <TrendingUp className="h-4 w-4 text-terra" />}
          {title}
        </span>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold",
            level === "low" && "bg-pine-soft text-pine-deep",
            level === "medium" && "bg-amber-soft text-amber",
            level === "high" && "bg-crimson/10 text-crimson"
          )}
        >
          {LEVELS[level].title.toLowerCase()}
        </span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-sand">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, (score / 24) * 100)}%` }}
          transition={{ duration: 1.1, ease }}
          className={cn("h-full rounded-full", level === "low" ? "bg-pine" : level === "medium" ? "bg-amber" : "bg-crimson")}
        />
      </div>
      <p className="mt-2 text-sm text-muted">
        {score} {plural(score, "балл", "балла", "баллов")} из шкалы
      </p>
    </div>
  );

  const lvl = LEVELS[calc.overall];

  return (
    <section id="screen" className="relative scroll-mt-20 overflow-hidden bg-cream py-20 md:py-28">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-terra-soft/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-pine-soft/60 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 md:px-8">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-terra/30 bg-terra-soft/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-terra-deep">
            <Timer className="h-3.5 w-3.5" /> Интерактивный скрининг · 5–7 минут
          </span>
          <h2 className="font-display text-4xl font-semibold text-balance md:text-5xl">
            Проверьте свои риски <em className="font-medium italic text-pine">прямо сейчас</em>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Три коротких блока: рост и вес, симптомы, факторы риска. В конце — прозрачный результат
            и понятный план действий.
          </p>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-line bg-white shadow-[0_30px_80px_rgba(27,42,37,0.12)]">
          {/* прогресс */}
          <div className="border-b border-line bg-paper/60 px-6 pt-6 pb-5 md:px-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-pine-deep">
                Шаг {Math.min(step + 1, 5) < 6 ? step + 1 : 5} из 5 · {STEP_TITLES[step]}
              </p>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                <Lock className="h-3.5 w-3.5" /> данные не покидают браузер
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-sand">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-pine via-sage to-terra"
                animate={{ width: `${(step / 5) * 100}%` }}
                transition={{ duration: 0.5, ease }}
              />
            </div>
          </div>

          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              {/* ---------- ШАГ 0: вступление ---------- */}
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45, ease }}>
                  <h3 className="font-display text-3xl font-semibold">Прежде чем начать</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                      { n: "1", t: "Рост и вес", d: "Посчитаем ИМТ и объясним, что он значит для щитовидной железы" },
                      { n: "2", t: "Симптомы", d: "20 вопросов о самочувствии + красные флаги, требующие внимания" },
                      { n: "3", t: "Факторы риска", d: "Наследственность, лекарства, беременность и другие обстоятельства" },
                    ].map((c) => (
                      <div key={c.n} className="rounded-2xl border border-line bg-cream/60 p-5">
                        <span className="font-display text-3xl font-bold text-terra">{c.n}</span>
                        <p className="mt-2 font-bold">{c.t}</p>
                        <p className="mt-1 text-sm leading-snug text-muted">{c.d}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-pine/25 bg-pine-soft/50 p-5">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
                    <p className="text-sm leading-relaxed text-ink/80">
                      Тест не ставит диагнозы и не заменяет врача. Он честно показывает, похожи ли ваши
                      ощущения на типичные признаки дисфункции щитовидной железы, и предлагает следующий
                      шаг. Диагноз ставит только врач по результатам осмотра и анализов.
                    </p>
                  </div>

                  <label className="mt-6 flex cursor-pointer items-start gap-3.5 rounded-2xl border-2 border-line p-5 transition-colors hover:border-pine/40 has-checked:border-pine has-checked:bg-pine-soft/40">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer rounded-md accent-[#0e5d4d]"
                    />
                    <span className="text-[15px] font-medium leading-snug">
                      Я понимаю, что результат скрининга — не диагноз, а ориентир для разговора с врачом,
                      и что мои ответы обрабатываются только на этом устройстве.
                    </span>
                  </label>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => consent && setStep(1)}
                      disabled={!consent}
                      className={cn(
                        "inline-flex h-13 items-center gap-2.5 rounded-full px-8 py-3.5 font-bold text-white transition-all",
                        consent ? "bg-pine shadow-[0_12px_30px_rgba(14,93,77,0.35)] hover:-translate-y-0.5 hover:bg-pine-deep" : "cursor-not-allowed bg-muted/40"
                      )}
                    >
                      Начать скрининг <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ---------- ШАГ 1: антропометрия ---------- */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45, ease }}>
                  <h3 className="font-display text-3xl font-semibold">Рост и вес</h3>
                  <p className="mt-2 text-muted">
                    Двигайте ползунки или вводите цифры вручную — индекс массы тела посчитается сам.
                  </p>

                  <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-5">
                      <SliderField icon={Ruler} label="Рост" value={height} min={130} max={210} unit="см" onChange={setHeight} />
                      <SliderField icon={Weight} label="Вес" value={weight} min={35} max={180} unit="кг" onChange={setWeight} terra />
                      <div className="rounded-3xl border border-line bg-cream/50 p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="flex items-center gap-2.5 font-bold">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage text-white">
                              <User className="h-4 w-4" />
                            </span>
                            Возраст
                          </span>
                          <span className="rounded-xl border border-line bg-white px-4 py-1.5 text-xl font-bold text-pine-deep shadow-sm">
                            {age} <span className="text-sm font-semibold text-muted">лет</span>
                          </span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={age}
                          onChange={(e) => setAge(Number(e.target.value))}
                          className="thy-slider"
                          style={{ "--fill": `${((age - 10) / 90) * 100}%` } as React.CSSProperties}
                          aria-label="Возраст: ползунок"
                        />
                        <div className="mt-2 flex justify-between text-xs font-semibold text-muted/80">
                          <span>10 лет</span>
                          <span>100 лет</span>
                        </div>
                        <p className="mt-3 text-sm text-muted">
                          После 60 лет симптомы щитовидной железы проявляются незаметнее — возраст добавляет 1 балл к оценке риска.
                        </p>
                      </div>
                    </div>

                    {/* карточка ИМТ */}
                    <div className="flex flex-col rounded-3xl border border-pine/25 bg-gradient-to-b from-pine-soft/60 to-white p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-pine-deep">Ваш ИМТ</p>
                      <div className="mt-2 flex items-end gap-3">
                        <motion.span
                          key={bmi.toFixed(1)}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="font-display text-6xl font-bold leading-none text-pine-deep"
                        >
                          {bmi.toFixed(1)}
                        </motion.span>
                        <span className="pb-1 text-sm font-semibold text-muted">кг/м²</span>
                      </div>
                      <p className={cn("mt-2 font-bold", bmiCat.cls)}>{bmiCat.label}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{bmiCat.desc}</p>

                      <div className="mt-5">
                        <div className="relative h-3 rounded-full bg-gradient-to-r from-amber/60 via-pine to-crimson/60">
                          <motion.span
                            animate={{ left: `${Math.min(97, Math.max(2, bmiCat.pct))}%` }}
                            transition={{ type: "spring", stiffness: 120, damping: 18 }}
                            className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-ink bg-white shadow-md"
                          />
                        </div>
                        <div className="mt-2 grid grid-cols-4 text-center text-[11px] font-bold text-muted">
                          <span>&lt;18,5</span>
                          <span className="text-pine">18,5–24,9</span>
                          <span>25–29,9</span>
                          <span>≥30</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-5">
                        <div className="rounded-2xl bg-cream/80 p-4 text-sm leading-relaxed text-ink/75">
                          <p className="font-bold text-ink">Как ИМТ связан с щитовидной железой?</p>
                          <p className="mt-1">
                            При гипотиреозе обмен веществ замедляется — нередок набор веса. При гипертиреозе он
                            разгоняется — вес уходит при хорошем аппетите. ИМТ = вес / рост(м)² — это не диагноз,
                            а фактор настороженности: он добавляет к риску лишь 1–2 балла.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <NavRow onBack={() => setStep(0)} onNext={goNext} nextLabel="К симптомам" />
                </motion.div>
              )}

              {/* ---------- ШАГ 2: симптомы «замедления» ---------- */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45, ease }}>
                  <SymptomHead
                    title="Группа А · «организм замедлился»"
                    desc="Признаки, характерные для гипотиреоза — снижения функции железы. Отметьте, как часто вы замечаете каждое состояние за последние 2–3 месяца."
                    answered={answeredHypo}
                    total={HYPO_SYMPTOMS.length}
                    pine
                  />
                  <div className="mt-6 space-y-3">
                    {HYPO_SYMPTOMS.map((s) => (
                      <FreqRow
                        key={s.id}
                        label={s.label}
                        hint={s.hint}
                        value={symp[s.id]}
                        onChange={(v) => setSymp((p) => ({ ...p, [s.id]: v }))}
                        missed={!!attempted[2] && symp[s.id] === undefined}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted">
                    Иногда — 1 балл, часто — 2, постоянно — 3. Ответьте честно: переоценка и недооценка одинаково мешают.
                  </p>
                  <NavRow onBack={() => setStep(1)} onNext={goNext} nextLabel={answeredHypo < HYPO_SYMPTOMS.length ? `Осталось вопросов: ${HYPO_SYMPTOMS.length - answeredHypo}` : "Дальше"} />
                </motion.div>
              )}

              {/* ---------- ШАГ 3: симптомы «ускорения» + красные флаги ---------- */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45, ease }}>
                  <SymptomHead
                    title="Группа Б · «организм разогнался»"
                    desc="Признаки, характерные для гипертиреоза (тиреотоксикоза) — избытка гормонов. Тот же принцип: честно оцените частоту."
                    answered={answeredHyper}
                    total={HYPER_SYMPTOMS.length}
                  />
                  <div className="mt-6 space-y-3">
                    {HYPER_SYMPTOMS.map((s) => (
                      <FreqRow
                        key={s.id}
                        label={s.label}
                        hint={s.hint}
                        value={symp[s.id]}
                        onChange={(v) => setSymp((p) => ({ ...p, [s.id]: v }))}
                        missed={!!attempted[3] && symp[s.id] === undefined}
                      />
                    ))}
                  </div>

                  {/* красные флаги */}
                  <div className="mt-9 rounded-3xl border-2 border-crimson/30 bg-crimson/[0.04] p-6 md:p-7">
                    <div className="flex items-start gap-3.5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-crimson text-white">
                        <AlertTriangle className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="font-display text-2xl font-bold text-crimson-deep">Красные флаги</h4>
                        <p className="mt-1 text-sm leading-relaxed text-ink/70">
                          Отметьте, если что-то из этого было у вас за последние недели. Эти состояния требуют
                          внимания врача независимо от суммы баллов.
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-3">
                      {RED_FLAGS.map((f) => (
                        <CheckCard
                          key={f.id}
                          danger
                          checked={!!flags[f.id]}
                          onToggle={() => setFlags((p) => ({ ...p, [f.id]: !p[f.id] }))}
                          label={f.label}
                        />
                      ))}
                    </div>
                  </div>

                  <NavRow
                    onBack={() => setStep(2)}
                    onNext={goNext}
                    nextLabel={answeredHyper < HYPER_SYMPTOMS.length ? `Осталось вопросов: ${HYPER_SYMPTOMS.length - answeredHyper}` : "К факторам риска"}
                  />
                </motion.div>
              )}

              {/* ---------- ШАГ 4: факторы риска ---------- */}
              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45, ease }}>
                  <h3 className="font-display text-3xl font-semibold">Факторы риска</h3>
                  <p className="mt-2 max-w-2xl text-muted">
                    Отметьте всё, что относится к вам. Факторы сами по себе не значат болезнь — они лишь
                    повышают ценность обследования.
                  </p>
                  <div className="mt-7 grid gap-3.5 sm:grid-cols-2">
                    {FACTORS.map((f) => (
                      <CheckCard
                        key={f.id}
                        checked={!!factors[f.id]}
                        onToggle={() => setFactors((p) => ({ ...p, [f.id]: !p[f.id] }))}
                        label={f.label}
                        hint={f.hint}
                      />
                    ))}
                    {age >= 60 && (
                      <div className="rounded-2xl border-2 border-pine/40 bg-pine-soft/50 p-4 sm:col-span-2 md:p-5">
                        <p className="flex items-center gap-2 font-semibold text-pine-deep">
                          <CheckCircle2 className="h-5 w-5" /> Учтено автоматически: возраст 60+ (+1 балл к обеим оценкам)
                        </p>
                      </div>
                    )}
                  </div>
                  <NavRow onBack={() => setStep(3)} onNext={() => setStep(5)} nextLabel="Показать результат" accent />
                </motion.div>
              )}

              {/* ---------- ШАГ 5: результат ---------- */}
              {step === 5 && (
                <motion.div key="s5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                  {/* срочный баннер */}
                  {calc.emergency && (
                    <div className="mb-6 rounded-3xl border-2 border-crimson bg-crimson/[0.06] p-6">
                      <p className="flex items-center gap-2.5 font-display text-xl font-bold text-crimson-deep">
                        <AlertTriangle className="h-6 w-6 text-crimson" /> Требуется неотложная оценка
                      </p>
                      <p className="mt-2 leading-relaxed text-ink/80">
                        Вы отметили состояние, которое может требовать срочной медицинской помощи (возможны
                        признаки тиреотоксического криза или выраженной декомпенсации гипотиреоза). При резком
                        сердцебиении с потерей сознания, высокой температуре с сильной потливостью или выраженной
                        заторможенности — позвоните <strong>103 / 112</strong> или обратитесь в приёмный покой.
                      </p>
                    </div>
                  )}
                  {calc.anyFlag && !calc.emergency && (
                    <div className="mb-6 rounded-3xl border-2 border-crimson/50 bg-crimson/[0.05] p-6">
                      <p className="flex items-center gap-2.5 font-bold text-crimson-deep">
                        <AlertTriangle className="h-5 w-5 text-crimson" /> Красные флаги отмечены
                      </p>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
                        Некоторые ваши ответы — из списка «красных флагов». Каким бы ни был итоговый балл,
                        покажитесь врачу в ближайшие дни, а при ухудшении состояния — за неотложной помощью.
                      </p>
                    </div>
                  )}

                  {/* вердикт */}
                  <div
                    className={cn(
                      "rounded-[28px] border-2 p-6 md:p-9",
                      calc.overall === "low" && "border-pine/40 bg-pine-soft/40",
                      calc.overall === "medium" && "border-amber/50 bg-amber-soft/50",
                      calc.overall === "high" && "border-crimson/40 bg-crimson/[0.05]"
                    )}
                  >
                    <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
                      <Gauge score={Math.max(calc.hypoScore, calc.hyperScore)} level={calc.overall} />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">Итоговый уровень риска</p>
                        <h3
                          className={cn(
                            "mt-1 font-display text-4xl font-bold md:text-5xl",
                            calc.overall === "low" && "text-pine-deep",
                            calc.overall === "medium" && "text-amber",
                            calc.overall === "high" && "text-crimson"
                          )}
                        >
                          {lvl.title}
                        </h3>
                        <p className="mt-1 font-semibold text-ink/70">{lvl.badge}</p>
                        <p className="mt-4 leading-relaxed text-ink/80">{lvl.summary}</p>
                      </div>
                    </div>

                    <div className="mt-7 grid gap-4 md:grid-cols-2">
                      {trackBar(calc.hypoScore, calc.hypoLevel, "down", "Склонность к гипотиреозу")}
                      {trackBar(calc.hyperScore, calc.hyperLevel, "up", "Склонность к гипертиреозу")}
                    </div>
                  </div>

                  {/* рекомендации */}
                  <div className="mt-6 rounded-[28px] border border-line bg-cream/60 p-6 md:p-8">
                    <p className="flex items-center gap-2.5 font-display text-2xl font-bold">
                      <Stethoscope className="h-6 w-6 text-pine" /> Что делать дальше
                    </p>
                    <ul className="mt-4 space-y-3">
                      {lvl.recs.map((r) => (
                        <li key={r} className="flex items-start gap-3 leading-relaxed">
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-pine" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-line pt-5">
                      <span className="flex items-center gap-2 text-sm font-bold text-muted">
                        <FlaskConical className="h-4 w-4" /> Что обычно назначает врач:
                      </span>
                      {["ТТГ", "Свободный Т4", "Свободный Т3", "АТ-ТПО", "УЗИ ЩЖ"].map((t) => (
                        <span key={t} className="rounded-full border border-pine/30 bg-white px-3.5 py-1.5 text-sm font-semibold text-pine-deep">
                          {t}
                        </span>
                      ))}
                      <a href="#labs" className="text-sm font-bold text-terra-deep underline underline-offset-4 hover:text-terra">
                        что значит каждый анализ →
                      </a>
                    </div>
                  </div>

                  {/* прозрачность подсчёта */}
                  <details className="group mt-6 rounded-[28px] border border-line bg-white">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-bold md:px-8">
                      <span className="flex items-center gap-2.5">
                        <ShieldCheck className="h-5 w-5 text-pine" /> Как посчитан этот результат
                      </span>
                      <ChevronDown className="h-5 w-5 text-muted transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-line px-6 py-5 md:px-8">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[480px] text-sm">
                          <thead>
                            <tr className="text-left text-muted">
                              <th className="pb-2 font-semibold">Составляющая</th>
                              <th className="pb-2 text-center font-semibold">Гипотиреоз</th>
                              <th className="pb-2 text-center font-semibold">Гипертиреоз</th>
                            </tr>
                          </thead>
                          <tbody>
                            {calc.parts.map((p) => (
                              <tr key={p.label} className="border-t border-line/60">
                                <td className="py-2.5 pr-4">{p.label}</td>
                                <td className="py-2.5 text-center font-bold text-pine-deep">+{p.hypo}</td>
                                <td className="py-2.5 text-center font-bold text-terra-deep">+{p.hyper}</td>
                              </tr>
                            ))}
                            <tr className="border-t-2 border-ink/10 font-bold">
                              <td className="py-3">Итого</td>
                              <td className="py-3 text-center text-pine-deep">{calc.hypoScore}</td>
                              <td className="py-3 text-center text-terra-deep">{calc.hyperScore}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted">
                        Пороги: 0–4 балла — низкий риск, 5–10 — средний, 11 и больше — высокий. Симптомы весят
                        «иногда» — 1, «часто» — 2, «постоянно» — 3; красный флаг добавляет 4; факторы риска — 1–2
                        балла, ИМТ — до 2 баллов. Это образовательная модель, а не клиническая шкала: точную
                        оценку даёт только врач по результатам осмотра и анализов.
                      </p>
                    </div>
                  </details>

                  {/* дисклеймер + действия */}
                  <div className="mt-6 rounded-[28px] border-2 border-dashed border-amber/60 bg-amber-soft/60 p-6 md:p-7">
                    <p className="flex items-start gap-3 font-semibold leading-relaxed text-ink">
                      <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber" />
                      {DISCLAIMER_SHORT} Если вас что-то беспокоит — запишитесь к терапевту или
                      врачу-эндокринологу: это быстрее и спокойнее, чем переживать в одиночку.
                    </p>
                  </div>

                  <div className="no-print mt-8 flex flex-wrap gap-4">
                    <button
                      onClick={restart}
                      className="inline-flex h-12 items-center gap-2.5 rounded-full border-2 border-line bg-white px-6 font-bold text-ink transition-all hover:border-pine/40 hover:text-pine-deep"
                    >
                      <RotateCcw className="h-4.5 w-4.5" /> Пройти заново
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="inline-flex h-12 items-center gap-2.5 rounded-full border-2 border-line bg-white px-6 font-bold text-ink transition-all hover:border-pine/40 hover:text-pine-deep"
                    >
                      <Printer className="h-4.5 w-4.5" /> Распечатать результат
                    </button>
                    <a
                      href="#redflags"
                      className="inline-flex h-12 items-center gap-2.5 rounded-full bg-pine px-6 font-bold text-white shadow-[0_10px_26px_rgba(14,93,77,0.3)] transition-all hover:-translate-y-0.5 hover:bg-pine-deep"
                    >
                      Красные флажки: когда срочно <ArrowRight className="h-4.5 w-4.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-6 flex items-start justify-center gap-2 text-center text-sm text-muted">
          <Lock className="mt-0.5 h-4 w-4 shrink-0" />
          Все ответы обрабатываются только в вашем браузере: ничего не отправляется на сервер и нигде не сохраняется.
        </p>
      </div>
    </section>
  );
}

/* ---------- подзаголовок симптомной группы ---------- */
function SymptomHead({
  title,
  desc,
  answered,
  total,
  pine = false,
}: {
  title: string;
  desc: string;
  answered: number;
  total: number;
  pine?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="max-w-xl">
        <h3 className="font-display text-3xl font-semibold">{title}</h3>
        <p className="mt-2 text-muted">{desc}</p>
      </div>
      <div
        className={cn(
          "rounded-2xl border px-5 py-3 text-center",
          pine ? "border-pine/30 bg-pine-soft/50" : "border-terra/30 bg-terra-soft/50"
        )}
      >
        <p className="font-display text-2xl font-bold leading-none">
          {answered}
          <span className="text-base text-muted">/{total}</span>
        </p>
        <p className="mt-1 text-xs font-semibold text-muted">отвечено</p>
      </div>
    </div>
  );
}

/* ---------- навигация шагов ---------- */
function NavRow({
  onBack,
  onNext,
  nextLabel,
  accent = false,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  accent?: boolean;
}) {
  return (
    <div className="mt-9 flex items-center justify-between gap-4 border-t border-line pt-6">
      <button
        onClick={onBack}
        className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-line bg-white px-6 font-bold text-ink/70 transition-all hover:border-pine/40 hover:text-pine-deep"
      >
        <ArrowLeft className="h-4 w-4" /> Назад
      </button>
      <button
        onClick={onNext}
        className={cn(
          "inline-flex h-12 items-center gap-2 rounded-full px-7 font-bold text-white transition-all hover:-translate-y-0.5",
          accent ? "bg-terra shadow-[0_12px_30px_rgba(209,96,61,0.35)] hover:bg-terra-deep" : "bg-pine shadow-[0_12px_30px_rgba(14,93,77,0.3)] hover:bg-pine-deep"
        )}
      >
        {nextLabel} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function plural(n: number, one: string, few: string, many: string) {
  const m = Math.abs(n) % 100;
  const d = m % 10;
  if (m > 10 && m < 20) return many;
  if (d > 1 && d < 5) return few;
  if (d === 1) return one;
  return many;
}
