import { BookMarked, FileWarning, Lock, Ban, HeartHandshake, CaseUpper, Contrast, Smartphone, Keyboard, Accessibility } from "lucide-react";
import { Reveal, SectionHead } from "./ui";

const PRINCIPLES = [
  {
    icon: BookMarked,
    title: "Только доказательная медицина",
    text: "Материалы опираются на клинические рекомендации по заболеваниям щитовидной железы и консенсусы профильных ассоциаций (ATA, ETA). Никаких «народных методов» и неймоверных обещаний.",
  },
  {
    icon: FileWarning,
    title: "Мы не ставим диагнозы",
    text: "Скрининг — это инструмент осознанности, а не медицинское заключение. Каждый результат завершается одной мыслью: диагноз и лечение — за врачом-эндокринологом.",
  },
  {
    icon: Lock,
    title: "Конфиденциальность ответов",
    text: "Рост, вес, возраст и ответы о симптомах обрабатываются исключительно в вашем браузере. Они не передаются на серверы, не сохраняются и не попадают к третьим лицам.",
  },
  {
    icon: Ban,
    title: "Никакой скрытой рекламы",
    text: "На сайте нет продвижения БАДов, «тирео-комплексов» или платных панелей анализов «на всякий случай». Рекомендуется только то, что действительно нужно.",
  },
  {
    icon: HeartHandshake,
    title: "Эмпатия вместо запугивания",
    text: "Мы пишем спокойно и бережно: без «вы точно больны» и без «это всё ваша вина». Цель — вернуть контроль и план действий, а не посеять тревогу.",
  },
];

const A11Y = [
  { icon: CaseUpper, title: "Крупный шрифт", text: "Переключатель в шапке увеличивает весь текст сайта — удобно после 60 и при слабом зрении." },
  { icon: Contrast, title: "Контраст и читаемость", text: "Пары цветов подобраны с запасом контраста; важный текст не мельче 14 пунктов." },
  { icon: Smartphone, title: "Удобно на телефоне", text: "Ползунки и кнопки имеют крупные зоны нажатия, таблицы прокручиваются горизонтально." },
  { icon: Keyboard, title: "Управление с клавиатуры", text: "Все элементы теста доступны по Tab, фокус всегда заметен." },
  { icon: Accessibility, title: "Простой язык", text: "Тексты написаны без медицинского жаргона; каждый термин объясняется по месту." },
];

export default function Ethics() {
  return (
    <section id="ethics" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Прозрачность проекта"
          title={
            <>
              Принципы, на которых <em className="font-medium italic text-pine">всё построено</em>
            </>
          }
          sub="Доверие в медицинской теме начинается с честности о границах и возможностях."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h3 className="mb-6 font-display text-2xl font-bold text-terra-deep">Редакционная этика</h3>
            </Reveal>
            <div className="space-y-4">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="flex items-start gap-4 rounded-3xl border border-line bg-white p-5 transition-shadow duration-400 hover:shadow-[0_12px_36px_rgba(27,42,37,0.08)]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-terra-soft text-terra-deep">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-bold">{p.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <h3 className="mb-6 font-display text-2xl font-bold text-pine-deep">Доступность для каждого</h3>
            </Reveal>
            <div className="space-y-4">
              {A11Y.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="flex items-start gap-4 rounded-3xl border border-line bg-white p-5 transition-shadow duration-400 hover:shadow-[0_12px_36px_rgba(27,42,37,0.08)]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pine-soft text-pine-deep">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-bold">{p.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
