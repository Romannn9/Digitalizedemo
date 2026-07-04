import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Gauge, Layers, Rocket, ShoppingCart, LayoutGrid, Building2, ExternalLink } from "lucide-react";
import PageHeroBackground from "@/src/components/PageHeroBackground";
import { buildContactUrl } from "@/src/lib/contact";

const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
const f   = (key: string, fb: any) => { const v = acf[key]; return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fb; };
const rep = (key: string, fb: any[]) => { const v = acf[key]; return (Array.isArray(v) && v.length > 0) ? v : fb; };

type WebProject = {
  title: string;
  type: string;     // ключ фільтра: landing | corporate | shop | catalog
  typeLabel: string;
  result: string;
  tags: string;     // "React, Tilda, 2 тижні"
  image: string;
  url: string;
};

const TYPE_META: Record<string, { label: string; Icon: any }> = {
  landing:   { label: 'Лендинги',        Icon: Rocket },
  corporate: { label: 'Корпоративні',    Icon: Building2 },
  shop:      { label: 'Магазини',        Icon: ShoppingCart },
  catalog:   { label: 'Каталоги',        Icon: LayoutGrid },
};

export default function Websites() {
  const [activeFilter, setActiveFilter] = useState('all');

  const h1Line1    = f('web_h1_line1',  'РОЗРОБКА САЙТІВ,');
  const h1Accent   = f('web_h1_accent', 'ЩО ПРОДАЮТЬ');
  const headerDesc = f('web_header_desc', 'Лендинги, корпоративні сайти, інтернет-магазини та каталоги. Швидко, під ключ і з фокусом на конверсію, а не на «красиву картинку».');
  const heroCta    = f('web_hero_cta', 'Порахувати вартість');
  const heroCtaUrl = buildContactUrl(f('web_hero_cta_url', '/contact/'), { topic: 'Розробка сайту' });

  // Типи послуг
  const typesTitle = f('web_types_title', 'ЩО МИ РОБИМО');
  const types = rep('web_types', [
    { key: 'landing',   title: 'Лендинги',          desc: 'Односторінковики під конкретну оферту чи рекламну кампанію. Максимум конверсії з трафіку.' },
    { key: 'corporate', title: 'Корпоративні сайти', desc: 'Багатосторінкові сайти для бізнесу: послуги, кейси, блог, форми захоплення лідів.' },
    { key: 'shop',      title: 'Інтернет-магазини',  desc: 'Каталог, кошик, оплата, інтеграції з CRM та службами доставки. WooCommerce або кастом.' },
    { key: 'catalog',   title: 'Каталоги та вітрини', desc: 'Товари чи послуги з фільтрами й пошуком, без онлайн-оплати — заявка чи дзвінок.' },
  ]);

  // Портфоліо
  const worksTitle = f('web_works_title', 'НАШІ РОБОТИ');
  const projects: WebProject[] = rep('web_projects', [
    { title: 'Edmarz Electric LLC', type: 'corporate', result: '', tags: 'Корпоративний сайт · США (PA/MD/DE)', image: `${import.meta.env.BASE_URL}portfolio/edmarz-electric.jpg`, url: 'https://edmarzelectric.com/' },
    { title: 'Сервіс Переїзд+', type: 'landing', result: '', tags: 'Лендинг · Дніпро', image: `${import.meta.env.BASE_URL}portfolio/servis-pereizd.jpg`, url: 'https://servispereezdplus.dp.ua/' },
    { title: 'Глобал Імпорт', type: 'landing', result: '', tags: 'Лендинг · Авто-імпорт США/ЄС', image: `${import.meta.env.BASE_URL}portfolio/global-import.jpg`, url: 'https://global-import.com.ua/' },
  ]).map((p: any) => ({
    ...p,
    typeLabel: p.typeLabel || TYPE_META[p.type]?.label || 'Проєкт',
  }));

  const filters = useMemo(() => {
    const present = Array.from(new Set(projects.map((p) => p.type).filter(Boolean)));
    return ['all', ...present];
  }, [projects]);
  const filtered = activeFilter === 'all' ? projects : projects.filter((p) => p.type === activeFilter);

  // Процес
  const processTitle = f('web_process_title', 'ЯК МИ ПРАЦЮЄМО');
  const processSteps = rep('web_process_steps', [
    { step: '01', title: 'Бриф і структура', desc: 'Розбираємо задачу, цільову аудиторію та збираємо прототип структури сторінок.' },
    { step: '02', title: 'Дизайн',           desc: 'Малюємо макет під ваш бренд. Погоджуємо до пікселя перед версткою.' },
    { step: '03', title: 'Розробка',         desc: 'Верстаємо адаптивно, підключаємо форми, аналітику та інтеграції.' },
    { step: '04', title: 'Запуск',           desc: 'Тестуємо, переносимо на ваш домен і навчаємо, як самостійно вносити правки.' },
  ]);

  // Пакети
  const pkgTitle = f('web_pkg_title', 'ФОРМАТИ СПІВПРАЦІ');
  const packages = rep('web_packages', [
    { name: 'Лендинг',   price: 'від 5 000 грн', term: '7–14 днів',  features: ['1 сторінка', 'Адаптив', 'Форма + аналітика', 'Публікація на домені'], featured: false },
    { name: 'Сайт бізнесу', price: 'від 35 000 грн', term: '3–5 тижнів', features: ['До 8 сторінок', 'CMS для правок', 'SEO-база', 'Інтеграція з CRM'], featured: true },
    { name: 'Магазин',   price: 'від 60 000 грн', term: 'від 5 тижнів', features: ['Каталог і кошик', 'Онлайн-оплата', 'Доставка', 'Панель керування'], featured: false },
  ]);

  // Технології
  const techTitle = f('web_tech_title', 'СТЕК, НА ЯКОМУ БУДУЄМО');
  const techItems: string[] = rep('web_tech_items', [
    { name: 'React' }, { name: 'WordPress' }, { name: 'WooCommerce' }, { name: 'Tailwind' }, { name: 'Vite' }, { name: 'Node.js' },
  ]).map((t: any) => (typeof t === 'string' ? t : t.name));

  const ctaTitle    = f('web_cta_title', 'ГОТОВІ ЗАПУСТИТИ САЙТ?');
  const ctaSubtitle = f('web_cta_subtitle', 'Розкажіть про проєкт — порахуємо вартість і терміни впродовж дня. Перша консультація безкоштовна.');
  const ctaButton   = f('web_cta_button', 'Обговорити проєкт');
  const ctaButtonUrl = buildContactUrl(f('web_cta_button_url', '/contact/'), { topic: 'Розробка сайту' });

  const faqTitle = f('web_faq_title', 'ЧАСТІ ПИТАННЯ');
  const faqItems = rep('web_faq_items', [
    { q: 'Скільки коштує сайт?', a: 'Залежить від типу й обсягу. Лендинг — від 5 000 грн, корпоративний сайт — від 35 000 грн, магазин — від 60 000 грн. Точну вилку даємо після брифу.' },
    { q: 'Скільки часу займає розробка?', a: 'Лендинг — 1–2 тижні, корпоративний сайт — 3–5 тижнів, магазин — від 5 тижнів. Терміни фіксуємо в договорі.' },
    { q: 'Чи зможу я сам редагувати сайт?', a: 'Так. Робимо на CMS і показуємо, як вносити тексти, товари та зображення без програміста.' },
    { q: 'Ви робите під ключ?', a: 'Так: дизайн, верстка, наповнення, домен, хостинг, аналітика та базове SEO — усе беремо на себе.' },
  ]);

  return (
    <div className="flex flex-col">
      {/* 1. Hero — тимчасово приховано, портфоліо піднято на верх
      <section className="py-24 digitalize-page-hero text-white relative overflow-hidden">
        <PageHeroBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest mb-6">
              <span className="w-8 h-0.5 bg-primary" /><span>Веброзробка</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
              {h1Line1} <br /> <span className="text-primary">{h1Accent}</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-10">{headerDesc}</p>
            <a href={heroCtaUrl}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-7 rounded-none font-bold uppercase tracking-wider">
                {heroCta} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
      */}

      {/* 2. Портфоліо з фільтром */}
      <section id="web-works" className="py-24 bg-gray-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-10 tracking-tighter">{worksTitle}</h2>
          <div className="flex flex-wrap gap-3 mb-14">
            {filters.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wider border transition-all ${
                  activeFilter === key
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-brand-black border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {key === 'all' ? 'Усі роботи' : (TYPE_META[key]?.label ?? key)}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-xl">Немає робіт у цій категорії.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {filtered.map((p: WebProject, i: number) => {
                  const inner = (
                    <>
                      <div className="relative overflow-hidden aspect-[4/3] mb-6">
                        {p.image ? (
                          <img src={p.image} alt={p.title} referrerPolicy="no-referrer" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 text-6xl font-bold">D</div>
                        )}
                        <span className="absolute top-4 left-4 bg-white/95 text-brand-black text-xs font-bold uppercase tracking-wider px-3 py-1.5">{p.typeLabel}</span>
                        {p.result ? (
                          <span className="absolute bottom-4 left-4 bg-primary text-white text-sm font-bold px-3 py-1.5">{p.result}</span>
                        ) : null}
                      </div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">{p.title}</h3>
                      {p.tags ? <p className="text-sm text-gray-500 uppercase tracking-wider">{p.tags}</p> : null}
                      {p.url ? (
                        <span className="inline-flex items-center gap-2 mt-4 text-sm font-bold uppercase tracking-wider text-primary group-hover:gap-3 transition-all">
                          Переглянути сайт <ExternalLink className="w-4 h-4" />
                        </span>
                      ) : null}
                    </>
                  );
                  const isExternal = /^https?:\/\//.test(p.url);
                  return (
                    <motion.div
                      key={`${p.title}-${i}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      {p.url ? (
                        <a
                          href={p.url}
                          className="group block cursor-pointer"
                          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >{inner}</a>
                      ) : (
                        <div className="group block">{inner}</div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* 3. Типи послуг */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 tracking-tighter">{typesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {types.map((t: any, i: number) => {
              const Icon = TYPE_META[t.key]?.Icon ?? Layers;
              return (
                <button
                  key={i}
                  onClick={() => { setActiveFilter(t.key); document.getElementById('web-works')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="group text-left p-8 border border-gray-200 hover:border-primary transition-all hover:shadow-xl"
                >
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{t.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{t.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Процес */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center uppercase tracking-tighter">{processTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item: any, i: number) => (
              <div key={i} className="relative p-8 bg-gray-50 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100 transition-all">
                <span className="text-7xl font-bold text-gray-100 absolute top-3 right-4 z-0 leading-none">{item.step}</span>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Пакети */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center uppercase tracking-tighter">{pkgTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg: any, i: number) => (
              <div
                key={i}
                className={`p-10 border transition-all ${
                  pkg.featured
                    ? 'bg-white text-brand-black border-2 border-primary shadow-2xl md:-translate-y-4'
                    : 'bg-white text-brand-black border-gray-200 hover:shadow-xl'
                }`}
              >
                {pkg.featured ? (
                  <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4">Найпопулярніше</span>
                ) : null}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className={`text-3xl font-bold mb-1 ${pkg.featured ? 'text-primary' : 'text-primary'}`}>{pkg.price}</p>
                <p className="text-sm uppercase tracking-wider mb-8 text-gray-500">{pkg.term}</p>
                <ul className="space-y-3 mb-10">
                  {(Array.isArray(pkg.features) ? pkg.features : String(pkg.features || '').split('\n')).map((feat: any, j: number) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700">{typeof feat === 'string' ? feat : feat.text}</span>
                    </li>
                  ))}
                </ul>
                <a href={ctaButtonUrl}>
                  <Button className={`w-full rounded-none font-bold uppercase tracking-wider ${
                    pkg.featured ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-brand-black hover:bg-brand-black/90 text-white'
                  }`}>
                    Замовити
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Технології */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10">
            <div className="flex items-center gap-3 text-brand-black shrink-0">
              <Gauge className="w-7 h-7 text-primary" />
              <h2 className="text-2xl font-bold uppercase tracking-tighter">{techTitle}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {techItems.map((t: string, i: number) => (
                <span key={i} className="px-5 py-2.5 border border-gray-200 text-brand-black font-semibold hover:border-primary hover:text-primary transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">{ctaTitle}</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">{ctaSubtitle}</p>
          <a href={ctaButtonUrl}>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-xl px-12 py-8 rounded-none font-bold uppercase tracking-widest">{ctaButton}</Button>
          </a>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">{faqTitle}</h2>
          <Accordion className="w-full">
            {faqItems.map((item: any, i: number) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-lg font-bold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600 text-lg">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
