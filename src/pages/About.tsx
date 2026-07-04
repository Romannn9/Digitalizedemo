import React from "react";
import { Shield, Target, Zap } from "lucide-react";
import { buildContactUrl } from "@/src/lib/contact";
import { C, SANS, COND, wrap, eyebrowStyle, h2Style, Arrow, ThemeStyles } from "@/src/lib/theme";

const olenaPhoto = new URL("../assets/team/olena-kravchenko.jpg", import.meta.url).href;
const annaPhoto = new URL("../assets/team/anna-sokolova.jpg", import.meta.url).href;

const ICON_MAP: Record<string, React.ReactNode> = {
  Shield: <Shield style={{ width: 26, height: 26, color: C.red }} />,
  Target: <Target style={{ width: 26, height: 26, color: C.red }} />,
  Zap:    <Zap    style={{ width: 26, height: 26, color: C.red }} />,
};

const FB_STATS = [
  { value: "8+",    label: "Років на ринку" },
  { value: "50+",   label: "Експертів у команді" },
  { value: "150M+", label: "Ліди згенеровано" },
];

const FB_VALUES = [
  { icon: "Shield", title: "Чесність",       desc: "Ми завжди говоримо правду про результати, навіть якщо вони не ідеальні. Прозорість — наш пріоритет." },
  { icon: "Target", title: "Фокус на ціль",  desc: "Кожна дія має наближати нас до вашої бізнес-цілі. Ми не робимо маркетинг заради маркетингу." },
  { icon: "Zap",    title: "Інноваційність", desc: "Ми постійно тестуємо нові інструменти та підходи, щоб ви були на крок попереду конкурентів." },
];

const FB_TEAM = [
  { name: "Артем Волков",    role: "CEO & Founder",     image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&h=1200&q=85" },
  { name: "Олена Кравченко", role: "Head of Strategy",  image: olenaPhoto },
  { name: "Максим Данилюк",  role: "Lead Media Buyer",  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&h=1200&q=85" },
  { name: "Анна Соколова",   role: "Creative Director", image: annaPhoto },
];

const FB_ACHIEVE = [
  { value: "300+", label: "Проєктів" },
  { value: "15",   label: "Нагород" },
  { value: "12",   label: "Країн" },
  { value: "350%", label: "ROI (avg)" },
];

const HERO_IMAGE = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&h=1000&q=85";

export default function About() {
  const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
  const f   = (key: string, fb: any) => { const v = acf[key]; return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fb; };
  const rep = (key: string, fb: any[]) => { const v = acf[key]; return (Array.isArray(v) && v.length > 0) ? v : fb; };

  const heroStats    = rep('abt_hero_stats',    FB_STATS);
  const values       = rep('abt_values',        FB_VALUES);
  const team         = rep('abt_team',          FB_TEAM);
  const achievements = rep('abt_stats',         FB_ACHIEVE);
  const officePhotos = rep('abt_office_photos', []);
  const teamBtnUrl   = buildContactUrl(f('abt_team_btn_url', '/contact/'), { topic: 'Питання по команді' });
  const ctaButtonUrl = buildContactUrl(f('abt_cta_button_url', '/contact/'), { topic: 'Співпраця з командою' });
  const teamImage = (member: any, fallback: string) => {
    const name = String(member.name || '').toLowerCase();
    if (name.includes('олена') || name.includes('кравченко')) return olenaPhoto;
    if (name.includes('анна') || name.includes('соколова')) return annaPhoto;
    return member.image || fallback;
  };

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: SANS, overflowX: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
      <ThemeStyles />

      {/* HERO */}
      <header style={{ ...wrap, padding: '72px 24px 88px' }}>
        <div className="dz-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={eyebrowStyle}>{f('abt_badge', 'Про нас')}</div>
            <h1 style={{ fontFamily: COND, fontSize: 'clamp(46px, 8vw, 82px)', lineHeight: 0.9, fontWeight: 800, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: '0 0 24px', color: C.ink }}>
              {f('abt_h1_line1', 'Ми — ваш')} <span style={{ color: C.red }}>{f('abt_h1_accent', 'digital-двигун')}</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.65, color: C.body, maxWidth: 540, margin: '0 0 40px' }}>
              {f('abt_desc', 'Digitalize — це команда експертів, які живуть даними та креативом. Ми не просто виконуємо замовлення, ми стаємо частиною вашого бізнесу, щоб разом досягати неймовірних результатів.')}
            </p>
            <div className="dz-stats" style={{ display: 'flex', gap: 40, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
              {heroStats.map((stat: any, i: number) => (
                <div key={i}>
                  <div style={{ fontFamily: COND, fontSize: 34, fontWeight: 800, color: C.red }}>{stat.value}</div>
                  <div style={{ fontSize: 14, color: C.muted, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img src={f('abt_hero_image', HERO_IMAGE)} alt="Команда Digitalize" referrerPolicy="no-referrer" style={{ width: '100%', borderRadius: 20, display: 'block', boxShadow: '0 40px 80px -30px rgba(60,45,30,0.4)' }} />
            <div style={{ position: 'absolute', bottom: -22, left: -18, background: C.red, color: '#fff', padding: '22px 26px', borderRadius: 16, maxWidth: 260, boxShadow: '0 20px 40px -14px rgba(227,30,36,0.5)' }}>
              <p style={{ fontFamily: COND, fontSize: 20, fontWeight: 700, fontStyle: 'italic', margin: 0, lineHeight: 1.25 }}>«{f('abt_quote', 'Результат — це єдина метрика, яка має значення.')}»</p>
            </div>
          </div>
        </div>
      </header>

      {/* VALUES */}
      <section style={{ background: C.alt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ ...wrap, padding: '96px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={eyebrowStyle}>Наша місія</div>
            <h2 style={h2Style}>{f('abt_val_title', 'Місія та цінності')}</h2>
            <p style={{ fontSize: 17, color: C.body, maxWidth: 560, margin: '16px auto 0' }}>{f('abt_val_subtitle', 'Ми будуємо прозорий та ефективний маркетинг майбутнього.')}</p>
          </div>
          <div className="dz-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
            {values.map((value: any, i: number) => (
              <div key={i} className="dz-card dz-svc" style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, padding: 34 }}>
                <div style={{ width: 54, height: 54, borderRadius: 15, background: C.redSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                  {ICON_MAP[value.icon] ?? ICON_MAP.Shield}
                </div>
                <h3 style={{ fontFamily: COND, fontSize: 24, fontWeight: 700, margin: '0 0 12px', color: C.ink }}>{value.title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: C.body, margin: 0 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ ...wrap, padding: '96px 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div style={{ maxWidth: 620 }}>
            <div style={eyebrowStyle}>Команда</div>
            <h2 style={{ ...h2Style, marginBottom: 16 }}>{f('abt_team_title', 'Люди, які створюють успіх')}</h2>
            <p style={{ fontSize: 17, color: C.body, margin: 0 }}>{f('abt_team_subtitle', 'Наша команда — це поєднання досвіду, креативності та аналітичного складу розуму.')}</p>
          </div>
          <a href={teamBtnUrl} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'transparent', color: C.ink, fontSize: 16, fontWeight: 600, padding: '15px 26px', borderRadius: 12, border: `1px solid ${C.border2}`, textDecoration: 'none' }}>
            {f('abt_team_btn', 'Приєднатися до нас')} <Arrow s={16} />
          </a>
        </div>
        <div className="dz-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {team.map((member: any, i: number) => (
            <div key={i} className="dz-card dz-work" style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 18px 40px -28px rgba(60,45,30,0.35)' }}>
              <div style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden' }}>
                <img src={teamImage(member, `https://i.pravatar.cc/400?img=${i + 11}`)} alt={member.name} referrerPolicy="no-referrer" style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block', transition: 'transform .6s' }} />
              </div>
              <div style={{ padding: '20px 22px' }}>
                <h3 style={{ fontFamily: COND, fontSize: 20, fontWeight: 700, margin: 0, color: C.ink }}>{member.name}</h3>
                <p style={{ fontSize: 14, color: C.red, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '4px 0 0', fontWeight: 700 }}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section style={{ background: C.alt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ ...wrap, padding: '80px 24px' }}>
          <div className="dz-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, textAlign: 'center' }}>
            {achievements.map((stat: any, i: number) => (
              <div key={i}>
                <p style={{ fontFamily: COND, fontSize: 'clamp(48px, 7vw, 72px)', fontWeight: 800, letterSpacing: '-0.01em', color: C.red, margin: '0 0 8px', lineHeight: 1 }}>{stat.value}</p>
                <p style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: C.muted, margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICE PHOTOS */}
      {officePhotos.length > 0 && (
        <section style={{ ...wrap, padding: '96px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {officePhotos.map((photo: any, i: number) => (
              <div key={i} style={{ overflow: 'hidden', borderRadius: 16, gridColumn: i % 3 === 0 ? 'span 2' : 'span 1', aspectRatio: i % 3 === 0 ? '16 / 9' : '1 / 1' }}>
                <img src={photo.image} alt={`Офіс ${i + 1}`} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ ...wrap, padding: '96px 24px' }}>
        <div style={{ background: C.red, borderRadius: 26, padding: '80px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 40px 80px -34px rgba(227,30,36,0.5)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.14), transparent 40%), radial-gradient(circle at 85% 85%, rgba(0,0,0,0.12), transparent 42%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: COND, fontSize: 'clamp(36px, 6vw, 62px)', fontWeight: 800, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: '0 0 20px', color: '#fff' }}>{f('abt_cta_title', 'Станьте частиною нашої історії успіху')}</h2>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', maxWidth: 640, margin: '0 auto 40px' }}>{f('abt_cta_subtitle', 'Ми шукаємо амбітних партнерів, які готові до великих змін та масштабних результатів.')}</p>
            <a href={ctaButtonUrl} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#fff', color: C.red, fontSize: 17, fontWeight: 700, padding: '19px 40px', borderRadius: 13, textDecoration: 'none', boxShadow: '0 20px 40px -14px rgba(0,0,0,0.3)' }}>
              {f('abt_cta_button', 'Почати співпрацю')} <Arrow s={19} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
