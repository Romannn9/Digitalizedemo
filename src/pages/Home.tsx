import React from "react";
import { BarChart3, Target, Zap, Users, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { buildContactUrl } from "@/src/lib/contact";
import { C, SANS, COND, wrap, eyebrowStyle, h2Style, Arrow, Check, ThemeStyles } from "@/src/lib/theme";

const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
const f = (key: string, fallback: any) => {
  const v = acf[key];
  return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fallback;
};
const rep = (key: string, fallback: any[]) => {
  const v = acf[key];
  return (Array.isArray(v) && v.length > 0) ? v : fallback;
};

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 style={{ width: 26, height: 26, color: C.red }} />,
  Target:    <Target    style={{ width: 26, height: 26, color: C.red }} />,
  Zap:       <Zap       style={{ width: 26, height: 26, color: C.red }} />,
  Users:     <Users     style={{ width: 26, height: 26, color: C.red }} />,
};

const clientAvatars = [
  "https://randomuser.me/api/portraits/men/46.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/22.jpg",
  "https://randomuser.me/api/portraits/women/79.jpg",
];

export default function Home() {
  // Hero
  const heroBadge     = f('hero_badge',        'Top Digital Agency 2026');
  const heroLine1     = f('hero_title_line1',  'Масштабуємо');
  const heroAccent    = f('hero_title_accent', 'ваш бізнес');
  const heroLine3     = f('hero_title_line3',  'через дані');
  const heroSubtitle  = f('hero_subtitle',     'Digitalize — це не просто реклама. Це стратегія, яка приносить ROI 300%+ та перетворює кліки на лояльних клієнтів.');
  const heroCta1Text  = f('hero_cta_primary',  'Отримати стратегію');
  const heroCta1Url   = buildContactUrl(f('hero_cta_primary_url', '/contact/'), { topic: 'Запит з головної' });
  const heroCta2Text  = f('hero_cta_secondary',    'Наші кейси');
  const heroCta2Url   = f('hero_cta_secondary_url','/cases/');

  const heroStats = rep('hero_stats', [
    { n: '300%+', l: 'середній ROI кампаній' },
    { n: '7', l: 'днів до перших лідів' },
    { n: '500+', l: 'задоволених клієнтів' },
  ]);

  // Benefits
  const benefits = rep('benefits', [
    { icon: 'BarChart3', title: 'Фокус на ROI',     desc: 'Ми не звітуємо про охоплення. Ми звітуємо про прибуток, який ви отримали від кожної гривні.' },
    { icon: 'Target',    title: 'Точний таргетинг', desc: 'Використовуємо AI-алгоритми для пошуку вашої ідеальної аудиторії з точністю до 98%.' },
    { icon: 'Zap',       title: 'Швидкий старт',    desc: 'Запускаємо перші кампанії за 7 днів та отримуємо перші ліди вже в день запуску.' },
  ]);

  // Services
  const servicesTitle    = f('services_title',    'Комплексні рішення для вашого росту');
  const servicesSubtitle = f('services_subtitle', 'Ми закриваємо всі потреби вашого маркетингу в одному місці.');
  const servicesLinkText = f('services_link_text','Всі послуги');
  const servicesLinkUrl  = f('services_link_url', '/services/');
  const services = rep('services', [
    { title: 'Targeted Ads',     desc: 'Facebook, Instagram, TikTok' },
    { title: 'Contextual Ads',   desc: 'Google Search, GDN, YouTube' },
    { title: 'SMM Strategy',     desc: 'Контент, який продає бренд' },
    { title: 'SEO Optimization', desc: 'Вихід у ТОП без реклами' },
  ]);

  // Cases
  const casesTitle = f('cases_title', 'Результати, які говорять самі за себе');
  const cases = rep('cases', [
    { client: 'E-commerce Brand', result: 'ROI 450%', desc: 'Збільшили продажі в 3 рази за 6 місяців через таргет та ретаргетинг.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&h=600&fit=crop' },
    { client: 'SaaS Platform',    result: 'CPA -40%', desc: 'Знизили вартість залучення клієнта завдяки оптимізації Google Ads.',   image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=600&fit=crop' },
  ]);

  // About
  const aboutImage = f('about_image', 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&h=800&fit=crop');
  const aboutYears = f('about_years', 8);
  const aboutTitle = f('about_title', 'Ми не просто агенція. Ми ваш партнер у рості.');
  const aboutText  = f('about_text',  "Digitalize народилася з ідеї, що маркетинг має бути прозорим та вимірюваним. Ми об'єднали кращих аналітиків та креативників, щоб створювати кампанії, які неможливо ігнорувати.");
  const aboutCheckpoints = rep('about_checkpoints', [
    { text: 'Власна методологія аналізу ринку' },
    { text: 'Сертифіковані Google та Meta партнери' },
    { text: 'Прозорі звіти в режимі реального часу' },
  ]);
  const aboutCta    = f('about_cta',     'Дізнатися більше про нас');
  const aboutCtaUrl = f('about_cta_url', '/about/');

  // Process
  const processTitle    = f('process_title',    'Як ми працюємо');
  const processSubtitle = f('process_subtitle', 'Чіткий алгоритм дій для досягнення ваших цілей.');
  const processSteps = rep('process_steps', [
    { step: '01', title: 'Аудит',       desc: 'Аналізуємо ваш поточний стан та конкурентів.' },
    { step: '02', title: 'Стратегія',   desc: 'Розробляємо покроковий план масштабування.' },
    { step: '03', title: 'Запуск',      desc: 'Налаштовуємо та запускаємо рекламні кампанії.' },
    { step: '04', title: 'Оптимізація', desc: 'Постійно покращуємо показники на основі даних.' },
  ]);

  // Testimonials
  const testimonialsTitle    = f('testimonials_title',    'Що про нас кажуть клієнти');
  const testimonialsSubtitle = f('testimonials_subtitle', 'Довіра — це фундамент нашої роботи. Ми пишаємося успіхами наших партнерів.');
  const testimonialsCount    = f('testimonials_count',    '500+');
  const testimonials = rep('testimonials', [
    { name: 'Олександр Коваленко', role: 'CEO TechStart',                  text: 'Digitalize допомогли нам вийти на ринок США. Результати перевершили очікування вдвічі.' },
    { name: 'Марія Іванова',       role: 'Marketing Director, FashionHub', text: 'Найкраща агенція з точки зору аналітики. Кожен цент під контролем.' },
  ]);

  // CTA
  const ctaTitle     = f('cta_title',      'Готові до вибухового росту?');
  const ctaSubtitle  = f('cta_subtitle',   'Залиште заявку сьогодні та отримайте безкоштовний аудит вашої рекламної стратегії вартістю $500.');
  const ctaButton    = f('cta_button',     'Хочу аудит');
  const ctaButtonUrl = buildContactUrl(f('cta_button_url', '/contact/'), { topic: 'Запит на аудит з головної' });

  // FAQ
  const faqTitle = f('faq_title', 'Часті запитання');
  const faqItems = rep('faq_items', [
    { q: 'Який мінімальний бюджет для старту?', a: 'Ми працюємо з бюджетами від $1000 на місяць, щоб забезпечити достатню кількість даних для оптимізації.' },
    { q: 'Коли я побачу перші результати?',     a: "Перші ліди зазвичай з'являються протягом 24-48 годин після запуску кампанії." },
    { q: 'Ви працюєте з нішею B2B?',            a: 'Так, у нас великий досвід у залученні клієнтів для складних B2B продуктів через LinkedIn та Google Search.' },
    { q: 'Чи надаєте ви гарантії?',             a: 'Ми гарантуємо виконання KPI по вартості ліда та об\'єму трафіку, зафіксованих у договорі.' },
  ]);

  // Contact
  const contactTitle    = f('contact_title',    'Обговоримо ваш проєкт?');
  const contactSubtitle = f('contact_subtitle', "Заповніть форму, і наш експерт зв'яжеться з вами протягом 30 хвилин.");
  const contactButton   = f('contact_button',   'Надіслати запит');

  const [openFaq, setOpenFaq] = React.useState(0);

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: SANS, overflowX: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
      <ThemeStyles />

      {/* HERO */}
      <header style={{ ...wrap, padding: '72px 24px 88px' }}>
        <div className="dz-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: C.redSoft, border: `1px solid ${C.redSoftBorder}`, padding: '8px 16px', borderRadius: 999, marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: C.red }} />
              <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: C.redDark }}>{heroBadge}</span>
            </div>
            <h1 style={{ fontFamily: COND, fontSize: 'clamp(46px, 8vw, 84px)', lineHeight: 0.9, fontWeight: 800, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: '0 0 24px', color: C.ink }}>
              {heroLine1} <span style={{ color: C.red }}>{heroAccent}</span> {heroLine3}
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.65, color: C.body, maxWidth: 540, margin: '0 0 36px' }}>{heroSubtitle}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
              <a href={heroCta1Url} className="dz-btn-red" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: C.red, color: '#fff', fontSize: 17, fontWeight: 600, padding: '17px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 14px 30px -10px rgba(227,30,36,0.5)' }}>
                {heroCta1Text} <Arrow />
              </a>
              <a href={heroCta2Url} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'transparent', color: C.ink, fontSize: 17, fontWeight: 600, padding: '17px 28px', borderRadius: 12, border: `1px solid ${C.border2}`, textDecoration: 'none' }}>
                {heroCta2Text}
              </a>
            </div>
            <div className="dz-stats" style={{ display: 'flex', gap: 40, marginTop: 52, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
              {heroStats.map((s: any, i: number) => (
                <div key={i}>
                  <div style={{ fontFamily: COND, fontSize: 32, fontWeight: 700, color: C.ink }}>{s.n}</div>
                  <div style={{ fontSize: 14, color: C.muted, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Візуал: аналітична панель */}
          <div className="dz-hero-visual" style={{ position: 'relative' }}>
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 20, boxShadow: '0 40px 80px -30px rgba(60,45,30,0.28)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '15px 18px', borderBottom: '1px solid #F0E9DE', background: '#FBF9F5' }}>
                <span style={{ width: 11, height: 11, borderRadius: 999, background: '#E7DDCF' }} />
                <span style={{ width: 11, height: 11, borderRadius: 999, background: '#E7DDCF' }} />
                <span style={{ width: 11, height: 11, borderRadius: 999, background: '#E7DDCF' }} />
                <span style={{ marginLeft: 14, flex: 1, height: 22, borderRadius: 6, background: '#F2ECE2' }} />
              </div>
              <div style={{ padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22 }}>
                  <div>
                    <div style={{ fontSize: 14, color: C.muted }}>Дохід за місяць</div>
                    <div style={{ fontFamily: COND, fontSize: 30, fontWeight: 800, color: C.ink }}>₴ 1.28M</div>
                  </div>
                  <div style={{ fontFamily: COND, fontSize: 18, fontWeight: 700, color: '#1B9C5A' }}>▲ 38%</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 120 }}>
                  {[38, 52, 46, 64, 58, 78, 92].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 6, background: i === 6 ? C.red : '#F0E6D8' }} />
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 26 }}>
                  {[['CTR', '6.4%'], ['CPL', '₴42'], ['ROAS', '4.2']].map(([k, v], i) => (
                    <div key={i} style={{ background: '#F7F1E8', borderRadius: 12, padding: '12px 14px' }}>
                      <div style={{ fontSize: 13, color: C.muted }}>{k}</div>
                      <div style={{ fontFamily: COND, fontSize: 20, fontWeight: 700, color: C.ink }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', top: -22, right: -14, background: C.ink, color: '#fff', padding: '12px 18px', borderRadius: 14, boxShadow: '0 20px 40px -14px rgba(0,0,0,0.4)', animation: 'dzFloaty 5s ease-in-out infinite' }}>
              <div style={{ fontFamily: COND, fontSize: 22, fontWeight: 700, color: '#fff' }}>+300%</div>
              <div style={{ fontSize: 12, color: '#B9AE9F', letterSpacing: '0.04em' }}>зростання ROI</div>
            </div>
          </div>
        </div>
      </header>

      {/* BENEFITS */}
      <section style={{ ...wrap, padding: '40px 24px 96px' }}>
        <div className="dz-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {benefits.map((item: any, i: number) => (
            <div key={i} className="dz-card dz-svc" style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, padding: 30 }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: C.redSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                {iconMap[item.icon] ?? iconMap.BarChart3}
              </div>
              <h3 style={{ fontFamily: COND, fontSize: 22, fontWeight: 700, margin: '0 0 10px', color: C.ink }}>{item.title}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: C.body, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: C.alt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ ...wrap, padding: '96px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={eyebrowStyle}>Що ми робимо</div>
              <h2 style={h2Style}>{servicesTitle}</h2>
            </div>
            <p style={{ fontSize: 16, color: C.body, maxWidth: 340, margin: 0 }}>{servicesSubtitle}</p>
          </div>
          <div className="dz-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
            {services.map((service: any, i: number) => (
              <div key={i} className="dz-card dz-svc" style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, padding: 30 }}>
                <div style={{ width: 44, height: 4, borderRadius: 999, background: C.red, marginBottom: 22 }} />
                <h3 style={{ fontFamily: COND, fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: C.ink }}>{service.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: C.body, margin: 0 }}>{service.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36 }}>
            <a href={servicesLinkUrl} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: C.red, textDecoration: 'none' }}>
              {servicesLinkText} <Arrow s={16} />
            </a>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section style={{ ...wrap, padding: '96px 24px' }}>
        <div style={eyebrowStyle}>Наші кейси</div>
        <h2 style={{ ...h2Style, marginBottom: 44 }}>{casesTitle}</h2>
        <div className="dz-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 30 }}>
          {cases.map((item: any, i: number) => (
            <div key={i} className="dz-card dz-work" style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 18px 40px -28px rgba(60,45,30,0.35)' }}>
              <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden' }}>
                <img src={item.image || `https://picsum.photos/seed/agency${i + 1}/800/600`} alt={item.client} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s' }} />
                <span style={{ position: 'absolute', top: 14, right: 14, background: C.red, color: '#fff', fontSize: 14, fontWeight: 700, padding: '6px 14px', borderRadius: 8 }}>{item.result}</span>
              </div>
              <div style={{ padding: 26 }}>
                <h3 style={{ fontFamily: COND, fontSize: 24, fontWeight: 700, margin: '0 0 10px', color: C.ink }}>{item.client}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: C.body, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ background: C.alt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ ...wrap, padding: '96px 24px' }}>
          <div className="dz-grid-2" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img src={aboutImage} alt="Команда" referrerPolicy="no-referrer" style={{ width: '100%', borderRadius: 20, display: 'block', boxShadow: '0 40px 70px -30px rgba(60,45,30,0.4)' }} />
              <div style={{ position: 'absolute', bottom: -22, right: -18, background: C.red, color: '#fff', padding: '20px 26px', borderRadius: 16, boxShadow: '0 20px 40px -14px rgba(227,30,36,0.5)' }}>
                <span style={{ fontFamily: COND, fontSize: 40, fontWeight: 800, display: 'block', lineHeight: 1 }}>{aboutYears}+</span>
                <span style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em' }}>років досвіду</span>
              </div>
            </div>
            <div>
              <div style={eyebrowStyle}>Про нас</div>
              <h2 style={{ ...h2Style, marginBottom: 24 }}>{aboutTitle}</h2>
              <p style={{ fontSize: 18, lineHeight: 1.65, color: C.body, margin: '0 0 28px' }}>{aboutText}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 34 }}>
                {aboutCheckpoints.map((item: any, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <Check /><span style={{ fontSize: 16, color: C.soft }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <a href={aboutCtaUrl} className="dz-btn-red" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: C.red, color: '#fff', fontSize: 16, fontWeight: 600, padding: '16px 30px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 14px 30px -10px rgba(227,30,36,0.5)' }}>
                {aboutCta} <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ ...wrap, padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={eyebrowStyle}>Як ми працюємо</div>
          <h2 style={h2Style}>{processTitle}</h2>
          <p style={{ fontSize: 17, color: C.body, maxWidth: 520, margin: '16px auto 0' }}>{processSubtitle}</p>
        </div>
        <div className="dz-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
          {processSteps.map((item: any, i: number) => (
            <div key={i} style={{ position: 'relative', background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, padding: '32px 28px', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 8, right: 14, fontFamily: COND, fontSize: 78, fontWeight: 700, color: C.alt, lineHeight: 1, zIndex: 0 }}>{item.step}</span>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontFamily: COND, fontSize: 20, fontWeight: 700, margin: '0 0 12px', color: C.ink }}>{item.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: C.body, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: C.alt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ ...wrap, padding: '96px 24px' }}>
          <div className="dz-grid-2" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={eyebrowStyle}>Відгуки</div>
              <h2 style={{ ...h2Style, marginBottom: 20 }}>{testimonialsTitle}</h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: C.body, margin: '0 0 28px' }}>{testimonialsSubtitle}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex' }}>
                  {clientAvatars.map((avatar, i) => (
                    <img key={avatar} src={avatar} alt={`Клієнт ${i + 1}`} referrerPolicy="no-referrer" style={{ width: 46, height: 46, borderRadius: 999, border: '2px solid #fff', objectFit: 'cover', marginLeft: i === 0 ? 0 : -12 }} />
                  ))}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>
                  <span style={{ display: 'block', color: C.ink }}>{testimonialsCount} задоволених</span>
                  <span style={{ color: C.red }}>клієнтів по всьому світу</span>
                </div>
              </div>
            </div>
            <div className="dz-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
              {testimonials.map((t: any, i: number) => (
                <div key={i} style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, padding: 30 }}>
                  <div style={{ fontFamily: COND, fontSize: 46, fontWeight: 800, color: C.redSoftBorder, lineHeight: 0.6, marginBottom: 10 }}>“</div>
                  <p style={{ fontSize: 16, lineHeight: 1.65, color: C.soft, margin: '0 0 20px' }}>{t.text}</p>
                  <div>
                    <p style={{ fontFamily: COND, fontSize: 17, fontWeight: 700, color: C.ink, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: 14, color: C.muted, margin: '2px 0 0' }}>{t.role}</p>
                  </div>
                </div>
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
            <a href={ctaButtonUrl} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#fff', color: C.red, fontSize: 17, fontWeight: 700, padding: '19px 40px', borderRadius: 13, textDecoration: 'none', boxShadow: '0 20px 40px -14px rgba(0,0,0,0.3)' }}>
              {ctaButton} <Arrow s={19} />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '20px 24px 96px' }}>
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
                  <span style={{ fontFamily: COND, fontSize: 19, fontWeight: 600, color: C.ink }}>{item.q}</span>
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

      {/* CONTACT */}
      <section style={{ background: C.alt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ ...wrap, padding: '96px 24px' }}>
          <div className="dz-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div>
              <div style={eyebrowStyle}>Контакти</div>
              <h2 style={{ ...h2Style, marginBottom: 20 }}>{contactTitle}</h2>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: C.body, margin: '0 0 40px' }}>{contactSubtitle}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { icon: <Users style={{ width: 22, height: 22, color: C.red }} />, title: 'Персональний менеджер', desc: "Завжди на зв'язку для вирішення ваших питань." },
                  { icon: <ShieldCheck style={{ width: 22, height: 22, color: C.red }} />, title: 'Гарантія конфіденційності', desc: 'Ваші дані та стратегії під надійним захистом NDA.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 50, height: 50, borderRadius: 14, background: C.redSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <p style={{ fontFamily: COND, fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 4px' }}>{item.title}</p>
                      <p style={{ fontSize: 15, color: C.body, margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ContactForm buttonLabel={contactButton} />
          </div>
        </div>
      </section>

    </div>
  );
}
