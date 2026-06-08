import BrandLogo from "../BrandLogo";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import PageHeroBackground from "@/src/components/PageHeroBackground";
import { buildContactUrl } from "@/src/lib/contact";

const fallbackFooterLinks = [
  { name: "Головна",  href: "/" },
  { name: "Кейси",    href: "/cases/" },
  { name: "Послуги",  href: "/services/" },
  { name: "Про нас",  href: "/about/" },
  { name: "Блог",     href: "/blog/" },
];

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
    <footer className="relative overflow-hidden bg-brand-black text-white border-t border-white/10">
      <PageHeroBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 border-b border-white/10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">Digital growth partner</p>
              <h2 className="font-heading text-4xl font-bold tracking-tight md:text-6xl">
                Готові масштабувати маркетинг без хаосу?
              </h2>
            </div>
            <a
              href={footerContactUrl}
              className="inline-flex h-14 w-fit items-center justify-center gap-3 bg-primary px-7 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-primary/90"
            >
              Обговорити проєкт <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-12 md:py-16">
          <div className="md:col-span-5">
            <a href="/" className="mb-7 flex items-center">
              <BrandLogo variant="light" />
            </a>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed">
              {f('footer_desc', 'Ми створюємо цифрові стратегії, які трансформують бізнес. Топова агенція з фокусом на результат та ROI.')}
            </p>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-5 border-t border-white/10 pt-6">
              {[
                ['8+', 'років'],
                ['300%+', 'ROI'],
                ['50+', 'експертів'],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-heading text-2xl font-bold text-white">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-white/55">{f('footer_nav_label', 'Навігація')}</h4>
            <ul className="space-y-3 text-gray-400">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`inline-flex items-center gap-2 text-base transition-colors ${currentPath === link.href ? 'text-primary font-semibold' : 'hover:text-white'}`}
                  >
                    <span className="h-px w-4 bg-current opacity-40" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-white/55">{f('footer_cnt_label', 'Контакти')}</h4>
            <ul className="space-y-5 text-gray-400">
              <li className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>{footerAddress}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <a href={`tel:${footerPhoneHref}`} className="hover:text-white transition-colors">
                  {footerPhone}
                </a>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <a href={`mailto:${footerEmail}`} className="hover:text-white transition-colors">
                  {footerEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-7 flex flex-col gap-5 md:flex-row md:justify-between md:items-center text-gray-500 text-sm">
          <p>{f('footer_copyright', '© 2026 Digitalize Agency. Всі права захищені.')}</p>
          <div className="flex flex-wrap gap-3">
            {socials.map(({ label, key }) => {
              const url = f(key, '#');
              return (
                <a
                  key={key}
                  href={url}
                  className="border border-white/10 px-4 py-2 text-white/60 transition hover:border-primary hover:text-white"
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
