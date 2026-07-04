import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { buildContactUrl } from "@/src/lib/contact";

const fallbackFooterLinks = [
  { name: "Головна",  href: "/" },
  { name: "Сайти",    href: "/websites/" },
  { name: "Кейси",    href: "/cases/" },
  { name: "Послуги",  href: "/services/" },
  { name: "Про нас",  href: "/about/" },
  { name: "Блог",     href: "/blog/" },
];

// Тепла палітра футера (узгоджена з дизайн-системою сайту)
const BG = "#F3ECE1";
const INK = "#1A1613";
const RED = "#E31E24";
const BODY = "#6E655B";
const MUTED = "#9C9184";
const LINE = "#DCD2C4";

export default function Footer() {
  const opt = typeof window !== 'undefined' ? (window.wpFooter ?? {}) : {};
  const f = (key: string, fb: string) => { const v = opt[key]; return (v !== undefined && v !== null && v !== '') ? v : fb; };

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const footerPhone = f('footer_phone', '+38 (044) 123-45-67');
  const footerPhoneHref = footerPhone.replace(/[^\d+]/g, '');
  const footerEmail = f('footer_email', 'hello@digitalize.ua');
  const footerAddress = f('footer_address', 'Київ, вул. Велика Васильківська, 100');
  const socials = [
    { label: 'LinkedIn',  key: 'social_linkedin' },
    { label: 'Instagram', key: 'social_instagram' },
    { label: 'Facebook',  key: 'social_facebook' },
  ];

  const footerLinks =
    typeof window !== 'undefined' && window.wpFooterMenu?.length
      ? window.wpFooterMenu.map(({ name, href }) => ({
          name,
          href: href.startsWith('/contact/') ? buildContactUrl(href, { topic: 'Запит з футера' }) : href,
        }))
      : fallbackFooterLinks;
  const footerContactUrl = buildContactUrl('/contact/', { topic: 'Запит з футера' });

  return (
    <footer style={{ background: BG, color: INK, borderTop: `1px solid ${LINE}`, fontFamily: "'Sofia Sans', sans-serif" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Верхній блок */}
        <div
          className="flex flex-col gap-8 py-16 lg:flex-row lg:items-end lg:justify-between"
          style={{ borderBottom: `1px solid ${LINE}` }}
        >
          <div className="max-w-[640px]">
            <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.28em]" style={{ color: RED }}>Digital growth partner</p>
            <h2 className="font-heading font-extrabold uppercase leading-[0.98] tracking-tight text-[clamp(34px,5vw,56px)]" style={{ color: INK }}>
              Готові масштабувати маркетинг без хаосу?
            </h2>
          </div>
          <a
            href={footerContactUrl}
            className="inline-flex w-fit items-center gap-3 rounded-xl px-7 py-[18px] text-[15px] font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
            style={{ background: RED, boxShadow: '0 14px 30px -10px rgba(227,30,36,0.5)' }}
          >
            Обговорити проєкт <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Компактні колонки */}
        <div className="grid grid-cols-1 gap-10 py-11 md:grid-cols-2 md:gap-16">
          <div>
            <h4 className="mb-6 text-[13px] font-bold uppercase tracking-[0.22em]" style={{ color: MUTED }}>{f('footer_nav_label', 'Навігація')}</h4>
            <ul className="grid grid-cols-2 gap-x-9 gap-y-[14px]">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-base transition-colors hover:text-[#1A1613]"
                    style={{ color: currentPath === link.href ? RED : BODY }}
                  >
                    <span className="h-px w-4" style={{ background: 'currentColor', opacity: 0.5 }} />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[13px] font-bold uppercase tracking-[0.22em]" style={{ color: MUTED }}>{f('footer_cnt_label', 'Контакти')}</h4>
            <ul className="flex flex-col gap-5" style={{ color: BODY }}>
              <li className="flex gap-[14px]">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" style={{ color: RED }} />
                <span className="text-base">{footerAddress}</span>
              </li>
              <li className="flex gap-[14px]">
                <Phone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: RED }} />
                <a href={`tel:${footerPhoneHref}`} className="text-base transition-colors hover:text-[#1A1613]">
                  {footerPhone}
                </a>
              </li>
              <li className="flex gap-[14px]">
                <Mail className="mt-0.5 h-5 w-5 shrink-0" style={{ color: RED }} />
                <a href={`mailto:${footerEmail}`} className="text-base transition-colors hover:text-[#1A1613]">
                  {footerEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижня смуга */}
        <div
          className="flex flex-col gap-5 py-7 text-[15px] md:flex-row md:items-center md:justify-between"
          style={{ borderTop: `1px solid ${LINE}` }}
        >
          <p style={{ color: MUTED }}>{f('footer_copyright', '© 2026 Digitalize Agency. Всі права захищені.')}</p>
          <div className="flex flex-wrap gap-3">
            {socials.map(({ label, key }) => {
              const url = f(key, '#');
              return (
                <a
                  key={key}
                  href={url}
                  className="rounded-[9px] px-[18px] py-[9px] text-[15px] transition-colors hover:text-[#1A1613]"
                  style={{ border: `1px solid ${LINE}`, color: BODY, background: '#fff' }}
                  target={url !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
