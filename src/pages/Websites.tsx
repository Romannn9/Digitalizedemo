import React, { useMemo, useState } from "react";
import { buildContactUrl } from "@/src/lib/contact";

const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
const f   = (key: string, fb: any) => { const v = acf[key]; return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fb; };
const rep = (key: string, fb: any[]) => { const v = acf[key]; return (Array.isArray(v) && v.length > 0) ? v : fb; };

const BASE = import.meta.env.BASE_URL;

// ── Палітра ──────────────────────────────────────────────
const C = {
  bg: '#FAF7F2', alt: '#F3ECE1', card: '#FFFFFF',
  ink: '#1A1613', body: '#6E655B', muted: '#9C9184', soft: '#4A423A',
  border: '#EBE2D6', border2: '#DCD2C4',
  red: '#E31E24', redDark: '#C41A20', redSoft: '#FCEBEA', redSoftBorder: '#F5D2D0',
};
const SANS = "'Sofia Sans', sans-serif";
const COND = "'Sofia Sans Condensed', sans-serif";

type WebProject = {
  title: string; type: string; typeLabel: string;
  result: string; tags: string; image: string; url: string;
};

const TYPE_META: Record<string, { label: string }> = {
  landing:   { label: 'Лендинги' },
  corporate: { label: 'Корпоративні' },
  shop:      { label: 'Магазини' },
  catalog:   { label: 'Каталоги' },
};

const Arrow = ({ s = 18 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
const Check = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M20 6 9 17l-5-5" /></svg>
);

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  landing: <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />,
  corporate: <><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4M10 10h4M10 14h4M10 18h4" /></>,
  shop: <><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></>,
  catalog: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></>,
};

export default function Websites() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  const contactUrl = buildContactUrl(f('web_hero_cta_url', '/contact/'), { topic: 'Розробка сайту' });

  // Тексти
  const eyebrow    = 'Веброзробка';
  const h1Line1    = f('web_h1_line1',  'Розробка сайтів,');
  const h1Accent   = f('web_h1_accent', 'що продають');
  const headerDesc = f('web_header_desc', 'Лендинги, корпоративні сайти, інтернет-магазини та каталоги. Швидко, під ключ і з фокусом на конверсію, а не на «красиву картинку».');

  const typesTitle = f('web_types_title', 'Чотири формати — під будь-яку задачу');
  const types = rep('web_types', [
    { key: 'landing',   title: 'Лендинги',           desc: 'Односторінковики під конкретну оферту чи рекламну кампанію. Максимум конверсії з трафіку.' },
    { key: 'corporate', title: 'Корпоративні сайти', desc: 'Багатосторінкові сайти для бізнесу: послуги, кейси, блог, форми захоплення лідів.' },
    { key: 'shop',      title: 'Інтернет-магазини',  desc: 'Каталог, кошик, оплата, інтеграції з CRM та службами доставки. WooCommerce або кастом.' },
    { key: 'catalog',   title: 'Каталоги та вітрини', desc: 'Товари чи послуги з фільтрами й пошуком, без онлайн-оплати — заявка чи дзвінок.' },
  ]);

  const worksTitle = f('web_works_title', 'Проєкти, які приносять результат');
  const projects: WebProject[] = rep('web_projects', [
    { title: 'Edmarz Electric LLC', type: 'corporate', result: '', tags: 'Корпоративний сайт · США (PA/MD/DE)', image: `${BASE}portfolio/edmarz-electric.jpg`, url: 'https://edmarzelectric.com/' },
    { title: 'Сервіс Переїзд+', type: 'landing', result: '', tags: 'Лендинг · Дніпро', image: `${BASE}portfolio/servis-pereizd.jpg`, url: 'https://servispereezdplus.dp.ua/' },
    { title: 'Глобал Імпорт', type: 'landing', result: '', tags: 'Лендинг · Авто-імпорт США/ЄС', image: `${BASE}portfolio/global-import.jpg`, url: 'https://global-import.com.ua/' },
  ]).map((p: any) => ({ ...p, typeLabel: p.typeLabel || TYPE_META[p.type]?.label || 'Проєкт' }));

  const filters = useMemo(() => {
    const present = Array.from(new Set(projects.map((p) => p.type).filter(Boolean)));
    return ['all', ...present];
  }, [projects]);
  const filtered = activeFilter === 'all' ? projects : projects.filter((p) => p.type === activeFilter);

  const processTitle = f('web_process_title', 'Чотири кроки до запуску');
  const processSteps = rep('web_process_steps', [
    { step: '01', title: 'Бриф і структура', desc: 'Розбираємо задачу, цільову аудиторію та збираємо прототип структури сторінок.' },
    { step: '02', title: 'Дизайн',           desc: 'Малюємо макет під ваш бренд. Погоджуємо до пікселя перед версткою.' },
    { step: '03', title: 'Розробка',         desc: 'Верстаємо адаптивно, підключаємо форми, аналітику та інтеграції.' },
    { step: '04', title: 'Запуск',           desc: 'Тестуємо, переносимо на ваш домен і навчаємо, як самостійно вносити правки.' },
  ]);

  const pkgTitle = f('web_pkg_title', 'Прозорі пакети без прихованих доплат');
  const packages = rep('web_packages', [
    { name: 'Лендинг',      price: 'від 5 000 грн',  term: '7–14 днів',   features: ['1 сторінка', 'Адаптив', 'Форма + аналітика', 'Публікація на домені'], featured: false },
    { name: 'Сайт бізнесу', price: 'від 35 000 грн', term: '3–5 тижнів',  features: ['До 8 сторінок', 'CMS для правок', 'SEO-база', 'Інтеграція з CRM'], featured: true },
    { name: 'Магазин',      price: 'від 60 000 грн', term: 'від 5 тижнів', features: ['Каталог і кошик', 'Онлайн-оплата', 'Доставка', 'Панель керування'], featured: false },
  ]);

  const techItems: string[] = rep('web_tech_items', [
    { name: 'React' }, { name: 'WordPress' }, { name: 'WooCommerce' }, { name: 'Tailwind' }, { name: 'Vite' }, { name: 'Node.js' },
  ]).map((t: any) => (typeof t === 'string' ? t : t.name));

  const ctaTitle    = f('web_cta_title', 'Готові запустити сайт?');
  const ctaSubtitle = f('web_cta_subtitle', 'Розкажіть про проєкт — порахуємо вартість і терміни впродовж дня. Перша консультація безкоштовна.');
  const ctaButton   = f('web_cta_button', 'Обговорити проєкт');

  const faqTitle = f('web_faq_title', 'Питання, які виникають найчастіше');
  const faqItems = rep('web_faq_items', [
    { q: 'Скільки коштує сайт?', a: 'Залежить від типу й обсягу. Лендинг — від 5 000 грн, корпоративний сайт — від 35 000 грн, магазин — від 60 000 грн. Точну вилку даємо після брифу.' },
    { q: 'Скільки часу займає розробка?', a: 'Лендинг — 1–2 тижні, корпоративний сайт — 3–5 тижнів, магазин — від 5 тижнів. Терміни фіксуємо в договорі.' },
    { q: 'Чи зможу я сам редагувати сайт?', a: 'Так. Робимо на CMS і показуємо, як вносити тексти, товари та зображення без програміста.' },
    { q: 'Ви робите під ключ?', a: 'Так: дизайн, верстка, наповнення, домен, хостинг, аналітика та базове SEO — усе беремо на себе.' },
  ]);

  const goToWorks = (key: string) => {
    setActiveFilter(key);
    document.getElementById('web-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Спільні стилі
  const eyebrowStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.red, marginBottom: 12 };
  const h2Style: React.CSSProperties = { fontFamily: COND, fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 800, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: 0, color: C.ink, lineHeight: 1.02 };
  const wrap: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: SANS, overflowX: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
      <style>{`
        @keyframes dzFloaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .dz-card { transition: transform .2s, box-shadow .2s, border-color .2s; }
        .dz-svc:hover { border-color:${C.red}; box-shadow:0 24px 44px -22px rgba(60,45,30,0.28); transform:translateY(-4px); }
        .dz-work:hover { transform:translateY(-4px); box-shadow:0 26px 50px -26px rgba(60,45,30,0.4); }
        .dz-work:hover img { transform:scale(1.05); }
        @media (max-width: 960px) {
          .dz-hero-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
          .dz-hero-visual { display: none !important; }
          .dz-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .dz-grid-3 { grid-template-columns: 1fr !important; }
          .dz-foot-top { flex-direction: column; align-items: flex-start !important; }
        }
        @media (max-width: 560px) {
          .dz-grid-4 { grid-template-columns: 1fr !important; }
          .dz-stats { flex-wrap: wrap; gap: 22px !important; }
        }
      `}</style>

      {/* HERO */}
      <header id="web-top" style={{ ...wrap, padding: '72px 24px 88px' }}>
        <div className="dz-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: C.redSoft, border: `1px solid ${C.redSoftBorder}`, padding: '8px 16px', borderRadius: 999, marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: C.red }} />
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: C.redDark }}>{eyebrow}</span>
            </div>
            <h1 style={{ fontFamily: COND, fontSize: 'clamp(44px, 8vw, 82px)', lineHeight: 0.9, fontWeight: 800, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: '0 0 24px', color: C.ink }}>
              {h1Line1}<br /><span style={{ color: C.red }}>{h1Accent}</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.65, color: C.body, maxWidth: 520, margin: '0 0 36px' }}>{headerDesc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
              <a href="#web-pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: C.red, color: '#fff', fontSize: 16, fontWeight: 600, padding: '17px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 14px 30px -10px rgba(227,30,36,0.5)' }}>
                Порахувати вартість <Arrow />
              </a>
              <a href="#web-works" onClick={(e) => { e.preventDefault(); goToWorks('all'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'transparent', color: C.ink, fontSize: 16, fontWeight: 600, padding: '17px 28px', borderRadius: 12, border: `1px solid ${C.border2}`, textDecoration: 'none' }}>
                Наші роботи
              </a>
            </div>
            <div className="dz-stats" style={{ display: 'flex', gap: 40, marginTop: 52, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
              {[['120+', 'запущених сайтів'], ['7–14', 'днів на лендинг'], ['4.9★', 'оцінка клієнтів']].map(([n, l], i) => (
                <div key={i}>
                  <div style={{ fontFamily: COND, fontSize: 30, fontWeight: 700, color: C.ink }}>
                    {n.includes('★') ? <>{n.replace('★', '')}<span style={{ color: C.red }}>★</span></> : n}
                  </div>
                  <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Візуал: макет браузера */}
          <div className="dz-hero-visual" style={{ position: 'relative' }}>
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 20, boxShadow: '0 40px 80px -30px rgba(60,45,30,0.28)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '15px 18px', borderBottom: '1px solid #F0E9DE', background: '#FBF9F5' }}>
                <span style={{ width: 11, height: 11, borderRadius: 999, background: '#E7DDCF' }} />
                <span style={{ width: 11, height: 11, borderRadius: 999, background: '#E7DDCF' }} />
                <span style={{ width: 11, height: 11, borderRadius: 999, background: '#E7DDCF' }} />
                <span style={{ marginLeft: 14, flex: 1, height: 22, borderRadius: 6, background: '#F2ECE2' }} />
              </div>
              <div style={{ padding: 28 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: C.red, marginBottom: 20 }} />
                <div style={{ height: 16, width: '78%', borderRadius: 6, background: '#241E19', marginBottom: 12 }} />
                <div style={{ height: 16, width: '56%', borderRadius: 6, background: '#241E19', marginBottom: 22 }} />
                <div style={{ height: 9, width: '100%', borderRadius: 5, background: '#EDE6DA', marginBottom: 9 }} />
                <div style={{ height: 9, width: '92%', borderRadius: 5, background: '#EDE6DA', marginBottom: 9 }} />
                <div style={{ height: 9, width: '70%', borderRadius: 5, background: '#EDE6DA', marginBottom: 26 }} />
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ height: 40, width: 130, borderRadius: 9, background: C.red }} />
                  <div style={{ height: 40, width: 110, borderRadius: 9, border: `1px solid ${C.border2}` }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 26 }}>
                  <div style={{ height: 64, borderRadius: 12, background: '#F5EFE5' }} />
                  <div style={{ height: 64, borderRadius: 12, background: '#F5EFE5' }} />
                  <div style={{ height: 64, borderRadius: 12, background: '#F5EFE5' }} />
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', top: -22, right: -14, background: C.ink, color: '#fff', padding: '12px 18px', borderRadius: 14, boxShadow: '0 20px 40px -14px rgba(0,0,0,0.4)', animation: 'dzFloaty 5s ease-in-out infinite' }}>
              <div style={{ fontFamily: COND, fontSize: 22, fontWeight: 700, color: '#fff' }}>+38%</div>
              <div style={{ fontSize: 11, color: '#B9AE9F', letterSpacing: '0.04em' }}>конверсія заявки</div>
            </div>
            <div style={{ position: 'absolute', bottom: -20, left: -18, background: '#fff', border: `1px solid ${C.border}`, padding: '12px 18px', borderRadius: 14, boxShadow: '0 20px 40px -16px rgba(60,45,30,0.3)', animation: 'dzFloaty 6s ease-in-out infinite', animationDelay: '0.8s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B9C5A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                <div><div style={{ fontFamily: COND, fontSize: 15, fontWeight: 700, color: C.ink }}>ROAS 4.2</div><div style={{ fontSize: 11, color: C.muted }}>магазин косметики</div></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SERVICES */}
      <section id="web-services" style={{ ...wrap, padding: '40px 24px 96px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={eyebrowStyle}>Що ми робимо</div>
            <h2 style={h2Style}>{typesTitle}</h2>
          </div>
          <p style={{ fontSize: 16, color: C.body, maxWidth: 340, margin: 0 }}>Оберіть напрям — і ми покажемо релевантні роботи нижче.</p>
        </div>
        <div className="dz-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
          {types.map((t: any, i: number) => (
            <button key={i} onClick={() => goToWorks(t.key)} className="dz-card dz-svc" style={{ textAlign: 'left', cursor: 'pointer', background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, padding: 30, font: 'inherit', color: 'inherit' }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: C.redSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{SERVICE_ICONS[t.key] ?? SERVICE_ICONS.corporate}</svg>
              </div>
              <h3 style={{ fontFamily: COND, fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: C.ink }}>{t.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: C.body, margin: 0 }}>{t.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* WORKS */}
      <section id="web-works" style={{ background: C.alt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, scrollMarginTop: 76 }}>
        <div style={{ ...wrap, padding: '96px 24px' }}>
          <div style={eyebrowStyle}>Наші роботи</div>
          <h2 style={{ ...h2Style, marginBottom: 32 }}>{worksTitle}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 44 }}>
            {filters.map((key) => {
              const active = activeFilter === key;
              return (
                <button key={key} onClick={() => setActiveFilter(key)} style={{ padding: '11px 22px', fontSize: 14, fontWeight: 600, borderRadius: 999, cursor: 'pointer', font: 'inherit', transition: 'all .15s', ...(active ? { background: C.red, color: '#fff', border: `1px solid ${C.red}`, boxShadow: '0 10px 22px -10px rgba(227,30,36,0.55)' } : { background: '#fff', color: C.soft, border: `1px solid ${C.border2}` }) }}>
                  {key === 'all' ? 'Усі роботи' : (TYPE_META[key]?.label ?? key)}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center', color: C.muted, padding: '80px 0', fontSize: 20 }}>Немає робіт у цій категорії.</p>
          ) : (
            <div className="dz-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 30 }}>
              {filtered.map((p: WebProject, i: number) => {
                const isExternal = /^https?:\/\//.test(p.url);
                const card = (
                  <>
                    <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                      {p.image ? (
                        <img src={p.image} alt={p.title} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(135deg,#F5EFE5,#F5EFE5 12px,#F0E8DA 12px,#F0E8DA 24px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B4A794', fontFamily: COND, fontSize: 28, fontWeight: 700 }}>D</div>
                      )}
                      <span style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.95)', color: C.ink, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '6px 12px', borderRadius: 8 }}>{p.typeLabel}</span>
                      {p.result ? (
                        <span style={{ position: 'absolute', bottom: 14, left: 14, background: C.red, color: '#fff', fontSize: 13, fontWeight: 700, padding: '6px 12px', borderRadius: 8 }}>{p.result}</span>
                      ) : null}
                    </div>
                    <div style={{ padding: 24 }}>
                      <h3 style={{ fontFamily: COND, fontSize: 21, fontWeight: 700, margin: '0 0 8px', color: C.ink, lineHeight: 1.2 }}>{p.title}</h3>
                      <p style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: C.muted, margin: 0 }}>{p.tags}</p>
                      {p.url ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: C.red }}>
                          Переглянути сайт
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
                        </span>
                      ) : null}
                    </div>
                  </>
                );
                const cardStyle: React.CSSProperties = { display: 'block', background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 18px 40px -28px rgba(60,45,30,0.35)', textDecoration: 'none', color: 'inherit' };
                return p.url ? (
                  <a key={`${p.title}-${i}`} href={p.url} className="dz-card dz-work" style={cardStyle} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{card}</a>
                ) : (
                  <div key={`${p.title}-${i}`} className="dz-card dz-work" style={cardStyle}>{card}</div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ ...wrap, padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={eyebrowStyle}>Як ми працюємо</div>
          <h2 style={h2Style}>{processTitle}</h2>
        </div>
        <div className="dz-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
          {processSteps.map((item: any, i: number) => (
            <div key={i} style={{ position: 'relative', background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, padding: '32px 28px', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 8, right: 14, fontFamily: COND, fontSize: 78, fontWeight: 700, color: C.alt, lineHeight: 1, zIndex: 0 }}>{item.step}</span>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontFamily: COND, fontSize: 19, fontWeight: 700, margin: '0 0 12px', color: C.ink }}>{item.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: C.body, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="web-pricing" style={{ background: C.alt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, scrollMarginTop: 76 }}>
        <div style={{ ...wrap, padding: '96px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={eyebrowStyle}>Формати співпраці</div>
            <h2 style={h2Style}>{pkgTitle}</h2>
          </div>
          <div className="dz-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 26, alignItems: 'start' }}>
            {packages.map((pkg: any, i: number) => {
              const feats = Array.isArray(pkg.features) ? pkg.features : String(pkg.features || '').split('\n');
              return (
                <div key={i} style={{ background: '#fff', borderRadius: 20, padding: '38px 34px', position: 'relative', ...(pkg.featured ? { border: `2px solid ${C.red}`, boxShadow: '0 40px 70px -30px rgba(227,30,36,0.35)', transform: 'translateY(-14px)' } : { border: `1px solid ${C.border}` }) }}>
                  {pkg.featured ? (
                    <span style={{ position: 'absolute', top: -15, left: 34, background: C.red, color: '#fff', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '7px 16px', borderRadius: 999 }}>Найпопулярніше</span>
                  ) : null}
                  <h3 style={{ fontFamily: COND, fontSize: 22, fontWeight: 700, margin: pkg.featured ? '6px 0 6px' : '0 0 6px', color: C.ink }}>{pkg.name}</h3>
                  <p style={{ fontFamily: COND, fontSize: 32, fontWeight: 700, margin: '0 0 4px', color: C.red }}>{pkg.price}</p>
                  <p style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.muted, margin: '0 0 28px' }}>{pkg.term}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 34 }}>
                    {feats.map((feat: any, j: number) => (
                      <div key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <Check /><span style={{ fontSize: 15, color: C.soft }}>{typeof feat === 'string' ? feat : feat.text}</span>
                      </div>
                    ))}
                  </div>
                  <a href={contactUrl} style={{ display: 'block', textAlign: 'center', fontSize: 15, fontWeight: 600, padding: 15, borderRadius: 11, textDecoration: 'none', ...(pkg.featured ? { background: C.red, color: '#fff', boxShadow: '0 14px 26px -10px rgba(227,30,36,0.5)' } : { background: '#FBF3EB', color: C.ink, border: '1px solid #E7DDCF' }) }}>Замовити</a>
                </div>
              );
            })}
          </div>

          {/* Стек */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', marginTop: 56, paddingTop: 44, borderTop: '1px solid #E3D9CB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>
              <span style={{ fontFamily: COND, fontSize: 18, fontWeight: 700, color: C.ink }}>Стек, на якому будуємо</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {techItems.map((t: string, i: number) => (
                <span key={i} style={{ padding: '10px 20px', border: `1px solid ${C.border2}`, borderRadius: 999, fontWeight: 600, fontSize: 15, color: C.soft, background: '#fff' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...wrap, padding: '96px 24px' }}>
        <div style={{ background: C.red, borderRadius: 26, padding: '80px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 40px 80px -34px rgba(227,30,36,0.5)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.14), transparent 40%), radial-gradient(circle at 85% 85%, rgba(0,0,0,0.12), transparent 42%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: COND, fontSize: 'clamp(36px, 6vw, 62px)', fontWeight: 800, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: '0 0 20px', color: '#fff' }}>{ctaTitle}</h2>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', maxWidth: 620, margin: '0 auto 40px' }}>{ctaSubtitle}</p>
            <a href={contactUrl} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#fff', color: C.red, fontSize: 17, fontWeight: 700, padding: '19px 40px', borderRadius: 13, textDecoration: 'none', boxShadow: '0 20px 40px -14px rgba(0,0,0,0.3)' }}>
              {ctaButton} <Arrow s={19} />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="web-faq" style={{ maxWidth: 760, margin: '0 auto', padding: '20px 24px 110px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={eyebrowStyle}>Часті питання</div>
          <h2 style={h2Style}>{faqTitle}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {faqItems.map((item: any, i: number) => {
            const open = openFaq === i;
            return (
              <div key={i} style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(open ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '24px 26px', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', font: 'inherit' }}>
                  <span style={{ fontFamily: COND, fontSize: 18, fontWeight: 600, color: C.ink }}>{item.q}</span>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'transform .2s', transform: `rotate(${open ? 180 : 0}deg)` }}><path d="m6 9 6 6 6-6" /></svg>
                </button>
                {open ? (
                  <p style={{ margin: 0, padding: '0 26px 26px', fontSize: 16, lineHeight: 1.7, color: C.body }}>{item.a}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
