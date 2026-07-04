import React from "react";
import { Users, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { C, SANS, COND, wrap, eyebrowStyle, h2Style, ThemeStyles } from "@/src/lib/theme";

export default function Contact() {
  const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
  const f   = (key: string, fb: any) => { const v = acf[key]; return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fb; };

  const contacts = [
    { icon: <Phone  style={{ width: 22, height: 22, color: C.red }} />, label: "Телефон", value: f('cnt_phone',   '+38 (044) 123-45-67') },
    { icon: <Mail   style={{ width: 22, height: 22, color: C.red }} />, label: "Email",   value: f('cnt_email',   'hello@digitalize.ua') },
    { icon: <MapPin style={{ width: 22, height: 22, color: C.red }} />, label: "Адреса",  value: f('cnt_address', 'Київ, вул. Велика Васильківська, 100') },
  ];
  const guarantees = [
    { icon: <Users       style={{ width: 22, height: 22, color: C.red }} />, label: "Персональний менеджер",      desc: "Завжди на зв'язку для вирішення ваших питань." },
    { icon: <ShieldCheck style={{ width: 22, height: 22, color: C.red }} />, label: "Гарантія конфіденційності", desc: "Ваші дані та стратегії під надійним захистом NDA." },
  ];

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: SANS, overflowX: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
      <ThemeStyles />

      <header style={{ ...wrap, padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={eyebrowStyle}>Контакти</div>
        <h1 style={{ fontFamily: COND, fontSize: 'clamp(44px, 7vw, 74px)', lineHeight: 0.92, fontWeight: 800, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: '0 0 20px', color: C.ink }}>
          {f('cnt_h1_line1', 'Обговоримо')} <span style={{ color: C.red }}>{f('cnt_h1_accent', 'ваш проєкт')}</span>
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.65, color: C.body, maxWidth: 560, margin: '0 auto' }}>
          {f('cnt_subtitle', "Заповніть форму, і наш експерт зв'яжеться з вами протягом 30 хвилин.")}
        </p>
      </header>

      <section style={{ background: C.alt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ ...wrap, padding: '80px 24px 96px' }}>
          <div className="dz-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
                {contacts.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: '#fff', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <p style={{ fontFamily: COND, fontSize: 18, fontWeight: 700, color: C.ink, margin: 0 }}>{item.label}</p>
                      <p style={{ fontSize: 16, color: C.body, margin: '2px 0 0' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 32, borderTop: `1px solid ${C.border2}` }}>
                {guarantees.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: C.redSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <p style={{ fontFamily: COND, fontSize: 18, fontWeight: 700, color: C.ink, margin: 0 }}>{item.label}</p>
                      <p style={{ fontSize: 15, color: C.body, margin: '2px 0 0' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ContactForm buttonLabel={f('cnt_form_button', 'Надіслати запит')} />
          </div>
        </div>
      </section>
    </div>
  );
}
