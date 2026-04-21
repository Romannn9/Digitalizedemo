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

const footerLinks =
    typeof window !== 'undefined' && window.wpFooterMenu?.length
      ? window.wpFooterMenu.map(({ name, href }) => ({ name, href }))
      : fallbackFooterLinks;

  return (
    <footer className="bg-brand-black text-white py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-heading font-bold tracking-tighter">DIGITALIZE</span>
            </a>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed">
              {f('footer_desc', 'Ми створюємо цифрові стратегії, які трансформують бізнес. Топова агенція з фокусом на результат та ROI.')}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{f('footer_nav_label', 'Навігація')}</h4>
            <ul className="space-y-4 text-gray-400">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`transition-colors ${currentPath === link.href ? 'text-primary font-semibold' : 'hover:text-primary'}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{f('footer_cnt_label', 'Контакти')}</h4>
            <ul className="space-y-4 text-gray-400">
              <li>{f('footer_address', 'Київ, вул. Велика Васильківська, 100')}</li>
              <li>
                <a href={`tel:${f('footer_phone', '+380441234567')}`} className="hover:text-primary transition-colors">
                  {f('footer_phone', '+38 (044) 123-45-67')}
                </a>
              </li>
              <li>
                <a href={`mailto:${f('footer_email', 'hello@digitalize.ua')}`} className="hover:text-primary transition-colors">
                  {f('footer_email', 'hello@digitalize.ua')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>{f('footer_copyright', '© 2026 Digitalize Agency. Всі права захищені.')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              { label: 'LinkedIn',  key: 'social_linkedin' },
              { label: 'Instagram', key: 'social_instagram' },
              { label: 'Facebook',  key: 'social_facebook' },
            ].map(({ label, key }) => {
              const url = f(key, '#');
              return (
                <a key={key} href={url} className="hover:text-white transition-colors" target={url !== '#' ? '_blank' : undefined} rel="noopener noreferrer">
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
