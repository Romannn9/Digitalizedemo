import React from "react";
import { Target, Search, Share2, LineChart } from "lucide-react";
import { buildContactUrl } from "@/src/lib/contact";
import { C, SANS, COND, wrap, eyebrowStyle, h2Style, Arrow, Check, ThemeStyles } from "@/src/lib/theme";

const ICON_MAP: Record<string, React.ReactNode> = {
  Target:    <Target    style={{ width: 26, height: 26, color: C.red }} />,
  Search:    <Search    style={{ width: 26, height: 26, color: C.red }} />,
  Share2:    <Share2    style={{ width: 26, height: 26, color: C.red }} />,
  LineChart: <LineChart style={{ width: 26, height: 26, color: C.red }} />,
};

const SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1571677246347-5040e090d90c?q=80&w=800&h=600&fit=crop',
];

const FB_SERVICES = [
  { icon: "Target",    title: "Таргетована реклама", desc: "Facebook, Instagram, TikTok. Знаходимо ваших клієнтів там, де вони проводять найбільше часу.", details: "Глибокий аналіз цільової аудиторії\nСтворення креативів, що зупиняють скрол\nA/B тестування гіпотез\nРетаргетинг на всіх етапах воронки", btn: "Замовити", btn_url: "/contact/", image: "" },
  { icon: "Search",    title: "Контекстна реклама",  desc: "Google Ads. Приводимо 'гарячий' трафік, який вже шукає ваш продукт або послугу.", details: "Збір семантичного ядра\nНалаштування пошукових кампаній\nКМС та YouTube Ads\nОптимізація вартості конверсії", btn: "Замовити", btn_url: "/contact/", image: "" },
  { icon: "Share2",    title: "SMM Стратегія",        desc: "Будуємо лояльне ком'юніті навколо вашого бренду та підвищуємо впізнаваність.", details: "Розробка візуального стилю\nКонтент-план та копірайтинг\nРобота з блогерами (Influencer Marketing)\nКом'юніті-менеджмент", btn: "Замовити", btn_url: "/contact/", image: "" },
  { icon: "LineChart", title: "SEO Оптимізація",      desc: "Органічний ріст та вихід у ТОП пошукової видачі без постійних витрат на кліки.", details: "Технічний аудит сайту\nВнутрішня та зовнішня оптимізація\nПобудова посилального профілю\nКонтент-маркетинг", btn: "Замовити", btn_url: "/contact/", image: "" },
];

const FB_RESULTS = [
  { label: "Зростання трафіку", value: "+150-300%", desc: "Протягом перших 3 місяців роботи." },
  { label: "Зниження CPA",      value: "-25-50%",   desc: "Завдяки глибокій оптимізації кампаній." },
  { label: "Підвищення LTV",    value: "+20%",       desc: "Через стратегії утримання клієнтів." },
];

const FB_STEPS = [
  { step: "01", title: "Брифінг та декомпозиція",    desc: "Визначаємо цілі, KPI та розраховуємо необхідний бюджет для їх досягнення." },
  { step: "02", title: "Технічна підготовка",        desc: "Налаштовуємо аналітику (GA4, Pixel), створюємо кабінети та креативи." },
  { step: "03", title: "Тестовий запуск",            desc: "Перевіряємо гіпотези на невеликих бюджетах для пошуку кращих зв'язок." },
  { step: "04", title: "Масштабування та звітність", desc: "Збільшуємо бюджети на робочі кампанії та надаємо щотижневі звіти." },
];

const FB_PACKAGES = [
  { name: "Старт",   price: "від $800",  popular: false, features: "1 рекламний канал\nНалаштування аналітики\nЩотижневий звіт\nПідтримка 5/7", btn: "Обрати пакет", btn_url: "/contact/" },
  { name: "Бізнес",  price: "від $1500", popular: true,  features: "2 рекламні канали\nA/B тестування\nКреативи включено\nПідтримка 7/7", btn: "Обрати пакет", btn_url: "/contact/" },
  { name: "Експерт", price: "від $3000", popular: false, features: "Всі канали трафіку\nКомплексна стратегія\nПерсональний стратег\nПріоритетна підтримка", btn: "Обрати пакет", btn_url: "/contact/" },
];

const FB_FAQ = [
  { q: "Чи входить вартість рекламного бюджету в пакети?", a: "Ні, рекламний бюджет оплачується окремо безпосередньо в рекламні кабінети (Meta, Google). Наші пакети — це вартість роботи команди." },
  { q: "Чи можу я змінити пакет у процесі роботи?",       a: "Так, ми можемо переглянути умови співпраці в будь-який момент залежно від ваших потреб та масштабів проєкту." },
  { q: "Ви працюєте з ПДВ?",                               a: "Так, ми працюємо офіційно з укладанням договору та можливістю оплати на розрахунковий рахунок ТОВ з ПДВ." },
];

function contactUrlWithSelection(url: string, key: 'service' | 'package' | 'topic', value: string) {
  return buildContactUrl(url || '/contact/', { [key]: value });
}

export default function Services() {
  const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
  const f   = (key: string, fb: any) => { const v = acf[key]; return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fb; };
  const rep = (key: string, fb: any[]) => { const v = acf[key]; return (Array.isArray(v) && v.length > 0) ? v : fb; };

  const services = rep('srv_items',      FB_SERVICES);
  const results  = rep('srv_results',    FB_RESULTS);
  const steps    = rep('srv_proc_steps', FB_STEPS);
  const packages = rep('srv_packages',   FB_PACKAGES);
  const faqItems = rep('srv_faq_items',  FB_FAQ);

  const [openFaq, setOpenFaq] = React.useState(0);

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: SANS, overflowX: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
      <ThemeStyles />

      {/* HERO */}
      <header style={{ ...wrap, padding: '72px 24px 80px', textAlign: 'center' }}>
        <div style={{ ...eyebrowStyle, textAlign: 'center' }}>Наші послуги</div>
        <h1 style={{ fontFamily: COND, fontSize: 'clamp(46px, 8vw, 84px)', lineHeight: 0.92, fontWeight: 800, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: '0 0 24px', color: C.ink }}>
          {f('srv_h1_line1', 'Послуги, що')} <span style={{ color: C.red }}>{f('srv_h1_accent', 'генерують прибуток')}</span>
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.65, color: C.body, maxWidth: 640, margin: '0 auto' }}>
          {f('srv_header_desc', 'Ми не просто налаштовуємо рекламу. Ми будуємо систему залучення клієнтів, яка працює на ваш бізнес 24/7.')}
        </p>
      </header>

      {/* SERVICE LIST */}
      <section style={{ ...wrap, padding: '24px 24px 96px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {services.map((service: any, i: number) => {
            const details = typeof service.details === 'string' ? service.details.split('\n').filter(Boolean) : (service.details ?? []);
            const reverse = i % 2 !== 0;
            return (
              <div key={i} className="dz-grid-2" style={{ display: 'grid', gridTemplateColumns: reverse ? '1fr 1fr' : '1fr 1fr', gap: 56, alignItems: 'center' }}>
                <div style={{ order: reverse ? 2 : 1 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: C.redSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    {ICON_MAP[service.icon] ?? ICON_MAP.Target}
                  </div>
                  <h2 style={{ fontFamily: COND, fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.005em', margin: '0 0 18px', color: C.ink }}>{service.title}</h2>
                  <p style={{ fontSize: 18, lineHeight: 1.6, color: C.body, margin: '0 0 26px' }}>{service.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 30 }}>
                    {details.map((detail: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <Check s={18} /><span style={{ fontSize: 15, color: C.soft }}>{detail}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={contactUrlWithSelection(service.btn_url, 'service', service.title)}
                    className="dz-btn-red"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: C.red, color: '#fff', fontSize: 16, fontWeight: 600, padding: '16px 30px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 14px 30px -10px rgba(227,30,36,0.5)' }}
                  >
                    {service.btn || 'Замовити'} <Arrow />
                  </a>
                </div>
                <div style={{ order: reverse ? 1 : 2 }}>
                  <img
                    src={service.image || SERVICE_IMAGES[i % SERVICE_IMAGES.length]}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    style={{ width: '100%', borderRadius: 20, display: 'block', border: `1px solid ${C.border}`, boxShadow: '0 30px 60px -30px rgba(60,45,30,0.4)' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RESULTS */}
      <section style={{ background: C.alt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ ...wrap, padding: '96px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={eyebrowStyle}>Результати</div>
            <h2 style={h2Style}>{f('srv_res_title', 'Очікувані результати')}</h2>
            <p style={{ fontSize: 17, color: C.body, maxWidth: 520, margin: '16px auto 0' }}>{f('srv_res_subtitle', 'На що ви можете розраховувати, працюючи з нами.')}</p>
          </div>
          <div className="dz-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
            {results.map((stat: any, i: number) => (
              <div key={i} className="dz-card dz-svc" style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, padding: '40px 34px', textAlign: 'center' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: C.red, textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 14px' }}>{stat.label}</p>
                <p style={{ fontFamily: COND, fontSize: 'clamp(44px, 6vw, 60px)', fontWeight: 800, letterSpacing: '-0.01em', margin: '0 0 12px', color: C.ink }}>{stat.value}</p>
                <p style={{ fontSize: 16, color: C.body, margin: 0 }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ ...wrap, padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={eyebrowStyle}>Як ми працюємо</div>
          <h2 style={h2Style}>{f('srv_proc_title', 'Етапи співпраці')}</h2>
        </div>
        <div className="dz-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
          {steps.map((item: any, i: number) => (
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

      {/* PACKAGES */}
      <section style={{ background: C.alt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ ...wrap, padding: '96px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={eyebrowStyle}>Формати співпраці</div>
            <h2 style={h2Style}>{f('srv_pkg_title', 'Пакети послуг')}</h2>
            <p style={{ fontSize: 17, color: C.body, maxWidth: 520, margin: '16px auto 0' }}>{f('srv_pkg_subtitle', 'Оберіть оптимальний варіант для вашого бізнесу.')}</p>
          </div>
          <div className="dz-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 26, alignItems: 'start' }}>
            {packages.map((pkg: any, i: number) => {
              const isPopular = pkg.popular === true || pkg.popular === '1' || pkg.popular === 1;
              const features = typeof pkg.features === 'string' ? pkg.features.split('\n').filter(Boolean) : (pkg.features ?? []);
              return (
                <div key={i} style={{ background: '#fff', borderRadius: 20, padding: '38px 34px', position: 'relative', ...(isPopular ? { border: `2px solid ${C.red}`, boxShadow: '0 40px 70px -30px rgba(227,30,36,0.35)', transform: 'translateY(-14px)' } : { border: `1px solid ${C.border}` }) }}>
                  {isPopular && <span style={{ position: 'absolute', top: -15, left: 34, background: C.red, color: '#fff', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '7px 16px', borderRadius: 999 }}>Популярний</span>}
                  <h3 style={{ fontFamily: COND, fontSize: 24, fontWeight: 700, margin: isPopular ? '6px 0 6px' : '0 0 6px', color: C.ink }}>{pkg.name}</h3>
                  <p style={{ fontFamily: COND, fontSize: 34, fontWeight: 700, margin: '0 0 24px', color: C.red }}>{pkg.price}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 30 }}>
                    {features.map((feat: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <Check s={18} /><span style={{ fontSize: 16, color: C.soft }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={contactUrlWithSelection(pkg.btn_url, 'package', pkg.name)}
                    className={isPopular ? 'dz-btn-red' : ''}
                    style={{ display: 'block', textAlign: 'center', fontSize: 16, fontWeight: 700, padding: '16px', borderRadius: 12, textDecoration: 'none', ...(isPopular ? { background: C.red, color: '#fff', boxShadow: '0 14px 30px -10px rgba(227,30,36,0.5)' } : { background: '#FBF3EB', color: C.ink, border: `1px solid ${C.border2}` }) }}
                  >
                    {pkg.btn || 'Обрати пакет'}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...wrap, padding: '96px 24px' }}>
        <div style={{ background: C.red, borderRadius: 26, padding: '80px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 40px 80px -34px rgba(227,30,36,0.5)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.14), transparent 40%), radial-gradient(circle at 85% 85%, rgba(0,0,0,0.12), transparent 42%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: COND, fontSize: 'clamp(36px, 6vw, 62px)', fontWeight: 800, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: '0 0 20px', color: '#fff' }}>{f('srv_cta_title', 'Не знаєте, яку послугу обрати?')}</h2>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', maxWidth: 620, margin: '0 auto 40px' }}>{f('srv_cta_subtitle', 'Замовте безкоштовну консультацію, і ми підберемо інструменти саме під ваші цілі.')}</p>
            <a href={contactUrlWithSelection(f('srv_cta_button_url', '/contact/'), 'topic', 'Консультація щодо вибору послуги')} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#fff', color: C.red, fontSize: 17, fontWeight: 700, padding: '19px 40px', borderRadius: 13, textDecoration: 'none', boxShadow: '0 20px 40px -14px rgba(0,0,0,0.3)' }}>
              {f('srv_cta_button', 'Отримати консультацію')} <Arrow s={19} />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '20px 24px 96px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={eyebrowStyle}>Часті питання</div>
          <h2 style={h2Style}>{f('srv_faq_title', 'Питання по послугах')}</h2>
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
                {open ? <p style={{ margin: 0, padding: '0 26px 26px', fontSize: 16, lineHeight: 1.7, color: C.body }}>{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
