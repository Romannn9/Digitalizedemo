import React, { useState } from "react";
import { TrendingUp, DollarSign } from "lucide-react";
import { buildContactUrl } from "@/src/lib/contact";
import { C, SANS, COND, wrap, eyebrowStyle, h2Style, Arrow, Check, ThemeStyles } from "@/src/lib/theme";

const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
const f   = (key: string, fb: any) => { const v = acf[key]; return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fb; };
const rep = (key: string, fb: any[]) => { const v = acf[key]; return (Array.isArray(v) && v.length > 0) ? v : fb; };

type CaseCard = {
  id?: number; title: string; category: string;
  roi: string; cpa: string; roas: string; image: string; url: string;
};

export default function Cases() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  const h1Line1    = f('cases_h1_line1',    'Наші кейси:');
  const h1Accent   = f('cases_h1_accent',   'реальні цифри');
  const headerDesc = f('cases_header_desc', 'Ми не просто показуємо красиві картинки. Ми показуємо, як наші стратегії впливають на банківський рахунок клієнта.');

  const wpCases = typeof window !== 'undefined' ? window.wpCasesArchive : undefined;
  const casesItems: CaseCard[] = Array.isArray(wpCases)
    ? wpCases.map((c) => ({ id: c.id, title: c.title || '', category: c.category || '', roi: c.roi || '—', cpa: c.cpa || '—', roas: c.roas || '—', image: c.image || '', url: c.url || '' }))
    : [];

  const fcTitle    = f('fc_title',    'Як ми допомогли Fintech-стартапу залучити 10 000 користувачів за 3 місяці');
  const fcProblem  = f('fc_problem',  'Висока вартість інсталу ($4.5) та низька конверсія в реєстрацію.');
  const fcSolution = f('fc_solution', 'Повна перебудова воронки, впровадження AI-оптимізації ставок та нові креативи.');
  const fcStats = [
    [f('fc_stat1_val', '10k+'), f('fc_stat1_label', 'Користувачів')],
    [f('fc_stat2_val', '$1.2'), f('fc_stat2_label', 'CPI')],
    [f('fc_stat3_val', '25%'),  f('fc_stat3_label', 'CR в реєстрацію')],
  ];
  const fcImage = f('fc_image', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=800&fit=crop');

  const ctaTitle     = f('cases_cta_title',    'Хочете такі ж результати?');
  const ctaSubtitle  = f('cases_cta_subtitle', 'Ми готові розробити для вас індивідуальну стратегію росту. Перша консультація — безкоштовно.');
  const ctaButton    = f('cases_cta_button',   'Обговорити проєкт');
  const ctaButtonUrl = buildContactUrl(f('cases_cta_button_url', '/contact/'), { topic: 'Обговорення кейсу' });

  const whyTitle = f('why_title', 'Чому обирають Digitalize');
  const whyItems = rep('why_items', [
    { title: 'Прозорість',   desc: 'Ви бачите кожну витрачену гривню в реальному часі.' },
    { title: 'Експертність', desc: 'Команда з досвідом у 50+ різних нішах бізнесу.' },
    { title: 'Технології',   desc: 'Використовуємо власні AI-рішення для аналітики.' },
    { title: 'Швидкість',    desc: 'Реагуємо на зміни ринку миттєво.' },
  ]);
  const achieveTitle = f('achieve_title', 'Наші досягнення');
  const achievements = rep('achievements', [
    { value: '$50M+', label: 'Рекламного бюджету в управлінні' },
    { value: '300+',  label: 'Успішно реалізованих проєктів' },
    { value: '95%',   label: 'Клієнтів залишаються з нами назавжди' },
  ]);

  const processTitle = f('cases_process_title', 'Шлях до вашого успіху');
  const processSteps = rep('cases_process_steps', [
    { step: '01', title: 'Занурення',     desc: 'Вивчаємо ваш продукт, конкурентів та цільову аудиторію.' },
    { step: '02', title: 'Гіпотези',      desc: 'Формуємо список рекламних гіпотез та креативних підходів.' },
    { step: '03', title: 'Масштабування', desc: "Знаходимо робочі зв'язки та збільшуємо бюджет для максимізації прибутку." },
  ]);

  const faqTitle = f('cases_faq_title', 'Питання по кейсах');
  const faqItems = rep('cases_faq_items', [
    { q: 'Чи всі ваші кейси справжні?',                        a: 'Так, за кожним кейсом стоїть реальний бізнес та підтверджені дані з рекламних кабінетів.' },
    { q: 'Чому деякі назви компаній приховані?',               a: 'Деякі клієнти підписують NDA, що забороняє публічне розголошення назви бренду.' },
    { q: 'Чи можете ви повторити результат для мого бізнесу?', a: 'Кожен бізнес унікальний, але ми використовуємо перевірені методології, які працюють у більшості ніш.' },
  ]);

  const categories = ['all', ...Array.from(new Set(casesItems.map((c) => c.category).filter(Boolean)))];
  const filtered = activeFilter === 'all' ? casesItems : casesItems.filter((c) => c.category === activeFilter);

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: SANS, overflowX: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
      <ThemeStyles />

      {/* HERO */}
      <header style={{ ...wrap, padding: '72px 24px 72px' }}>
        <div style={{ maxWidth: 760 }}>
          <div style={eyebrowStyle}>Портфоліо</div>
          <h1 style={{ fontFamily: COND, fontSize: 'clamp(46px, 8vw, 82px)', lineHeight: 0.9, fontWeight: 800, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: '0 0 24px', color: C.ink }}>
            {h1Line1} <span style={{ color: C.red }}>{h1Accent}</span>
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.65, color: C.body, margin: 0 }}>{headerDesc}</p>
        </div>
      </header>

      {/* CASES GRID / EMPTY */}
      {casesItems.length === 0 ? (
        <section style={{ ...wrap, padding: '0 24px 80px' }}>
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', background: '#fff', border: `1px solid ${C.border}`, borderRadius: 20, padding: '48px 40px' }}>
            <p style={{ fontFamily: COND, fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 14px' }}>Наразі немає опублікованих кейсів.</p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: C.body, margin: 0 }}>
              У кабінеті WordPress відкрий меню <strong style={{ color: C.ink }}>Кейси</strong> → додай записи та опублікуй їх. Категорії — у блоці «Категорії кейсів» (Target, Context, SMM, SEO).
            </p>
          </div>
        </section>
      ) : (
        <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.alt }}>
          <div style={{ ...wrap, padding: '48px 24px 96px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
              {categories.map((cat) => {
                const active = activeFilter === cat;
                return (
                  <button key={cat} onClick={() => setActiveFilter(cat)} style={{ padding: '11px 22px', fontSize: 14, fontWeight: 600, borderRadius: 999, cursor: 'pointer', font: 'inherit', transition: 'all .15s', ...(active ? { background: C.red, color: '#fff', border: `1px solid ${C.red}`, boxShadow: '0 10px 22px -10px rgba(227,30,36,0.55)' } : { background: '#fff', color: C.soft, border: `1px solid ${C.border2}` }) }}>
                    {cat === 'all' ? 'Всі проєкти' : cat}
                  </button>
                );
              })}
            </div>
            {filtered.length === 0 ? (
              <p style={{ textAlign: 'center', color: C.muted, padding: '60px 0', fontSize: 18 }}>Немає кейсів у цій категорії.</p>
            ) : (
              <div className="dz-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 30 }}>
                {filtered.map((item, i) => {
                  const inner = (
                    <>
                      <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                        {item.image
                          ? <img src={item.image} alt={item.title} referrerPolicy="no-referrer" style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block', transition: 'transform .6s' }} />
                          : <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(135deg,#F5EFE5,#F5EFE5 12px,#F0E8DA 12px,#F0E8DA 24px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: COND, fontSize: 40, fontWeight: 700, color: C.border2 }}>D</div>}
                        {item.category ? <span style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.95)', color: C.ink, fontSize: 13, fontWeight: 700, padding: '6px 12px', borderRadius: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.category}</span> : null}
                      </div>
                      <div style={{ padding: 26 }}>
                        <h3 style={{ fontFamily: COND, fontSize: 26, fontWeight: 700, margin: '0 0 16px', color: C.ink, lineHeight: 1.15 }}>{item.title}</h3>
                        <div style={{ display: 'flex', gap: 24, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                          {[['ROI', item.roi], ['CPA', item.cpa], ['ROAS', item.roas]].map(([k, v]) => (
                            <div key={k}>
                              <div style={{ fontSize: 13, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k}</div>
                              <div style={{ fontFamily: COND, fontSize: 22, fontWeight: 700, color: C.red }}>{v}</div>
                            </div>
                          ))}
                        </div>
                        {item.url ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: C.red }}>
                            Дивитися деталі <Arrow s={16} />
                          </span>
                        ) : null}
                      </div>
                    </>
                  );
                  const cardStyle: React.CSSProperties = { display: 'block', background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 18px 40px -28px rgba(60,45,30,0.35)', textDecoration: 'none', color: 'inherit' };
                  const key = item.id != null ? `cpt-${item.id}` : `${item.title}-${i}`;
                  return item.url
                    ? <a key={key} href={item.url} className="dz-card dz-work" style={cardStyle}>{inner}</a>
                    : <div key={key} className="dz-card dz-work" style={cardStyle}>{inner}</div>;
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FEATURED CASE */}
      <section style={{ ...wrap, padding: '96px 24px' }}>
        <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 24, padding: 'clamp(28px, 5vw, 64px)', boxShadow: '0 30px 70px -40px rgba(60,45,30,0.4)' }}>
          <div className="dz-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={eyebrowStyle}>Головний кейс</div>
              <h2 style={{ fontFamily: COND, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.005em', lineHeight: 1.05, margin: '0 0 28px', color: C.ink }}>{fcTitle}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
                {[[<TrendingUp style={{ width: 20, height: 20, color: C.red }} />, 'Проблема', fcProblem], [<DollarSign style={{ width: 20, height: 20, color: C.red }} />, 'Рішення', fcSolution]].map(([icon, title, text], idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: C.redSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon as React.ReactNode}</div>
                    <div>
                      <p style={{ fontFamily: COND, fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 4px' }}>{title as string}</p>
                      <p style={{ fontSize: 16, lineHeight: 1.6, color: C.body, margin: 0 }}>{text as string}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, paddingTop: 28, borderTop: `1px solid ${C.border}` }}>
                {fcStats.map(([v, l], idx) => (
                  <div key={idx}>
                    <p style={{ fontFamily: COND, fontSize: 32, fontWeight: 800, color: C.red, margin: 0 }}>{v}</p>
                    <p style={{ fontSize: 14, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '2px 0 0' }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src={fcImage} alt="Головний кейс" referrerPolicy="no-referrer" style={{ width: '100%', borderRadius: 18, display: 'block', border: `1px solid ${C.border}`, boxShadow: '0 30px 60px -30px rgba(60,45,30,0.4)' }} />
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
            <p style={{ fontSize: 20, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', maxWidth: 640, margin: '0 auto 40px' }}>{ctaSubtitle}</p>
            <a href={ctaButtonUrl} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#fff', color: C.red, fontSize: 17, fontWeight: 700, padding: '19px 40px', borderRadius: 13, textDecoration: 'none', boxShadow: '0 20px 40px -14px rgba(0,0,0,0.3)' }}>
              {ctaButton} <Arrow s={19} />
            </a>
          </div>
        </div>
      </section>

      {/* WHY US + ACHIEVEMENTS */}
      <section style={{ background: C.alt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ ...wrap, padding: '96px 24px' }}>
          <div className="dz-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={eyebrowStyle}>Наші переваги</div>
              <h2 style={{ ...h2Style, marginBottom: 40 }}>{whyTitle}</h2>
              <div className="dz-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                {whyItems.map((item: any, i: number) => (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <Check s={20} /><h4 style={{ fontFamily: COND, fontSize: 20, fontWeight: 700, color: C.ink, margin: 0 }}>{item.title}</h4>
                    </div>
                    <p style={{ fontSize: 16, lineHeight: 1.6, color: C.body, margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 22, padding: '44px 40px', boxShadow: '0 30px 60px -34px rgba(60,45,30,0.4)' }}>
              <h3 style={{ fontFamily: COND, fontSize: 26, fontWeight: 700, color: C.ink, margin: '0 0 28px' }}>{achieveTitle}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
                {achievements.map((a: any, i: number) => (
                  <div key={i}>
                    <p style={{ fontFamily: COND, fontSize: 46, fontWeight: 800, color: C.red, margin: 0, lineHeight: 1 }}>{a.value}</p>
                    <p style={{ fontSize: 16, color: C.body, margin: '6px 0 0' }}>{a.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ ...wrap, padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={eyebrowStyle}>Процес</div>
          <h2 style={h2Style}>{processTitle}</h2>
        </div>
        <div className="dz-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {processSteps.map((item: any, i: number) => (
            <div key={i} style={{ position: 'relative', background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, padding: '32px 28px', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 8, right: 14, fontFamily: COND, fontSize: 84, fontWeight: 700, color: C.alt, lineHeight: 1, zIndex: 0 }}>{item.step}</span>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontFamily: COND, fontSize: 22, fontWeight: 700, margin: '0 0 12px', color: C.ink }}>{item.title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: C.body, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
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
                {open ? <p style={{ margin: 0, padding: '0 26px 26px', fontSize: 16, lineHeight: 1.7, color: C.body }}>{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
