import { motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import BrandLogo from "../BrandLogo";
import { buildContactUrl } from "@/src/lib/contact";

const fallbackLinks = [
  { name: "Головна",  href: "/" },
  { name: "Сайти",    href: "/websites/" },
  { name: "Кейси",    href: "/cases/" },
  { name: "Послуги",  href: "/services/" },
  { name: "Про нас",  href: "/about/" },
  { name: "Блог",     href: "/blog/" },
];

const navLinks =
  typeof window !== 'undefined' && window.wpMenu?.length
    ? window.wpMenu.map(({ name, href }) => ({
        name,
        href: href.startsWith('/contact/') ? buildContactUrl(href, { topic: 'Запит з меню' }) : href,
      }))
    : fallbackLinks;

const currentPage = typeof document !== 'undefined'
  ? (document.getElementById('root')?.dataset.page ?? 'home')
  : 'home';

const slugToPath: Record<string, string> = {
  home: '/', websites: '/websites/', cases: '/cases/', case: '/cases/', services: '/services/', about: '/about/', blog: '/blog/', contact: '/contact/',
};

const phone = (typeof window !== 'undefined' ? window.wpFooter?.footer_phone : '') || '+38 (044) 123-45-67';
const phoneHref = phone.replace(/[^\d+]/g, '');

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activePath = slugToPath[currentPage] ?? '/';
  const contactUrl = buildContactUrl('/contact/', { topic: 'Загальний запит' });

  return (
    <nav
      className="digitalize-site-nav fixed top-0 left-0 right-0 z-50 backdrop-blur-[14px]"
      style={{ background: 'rgba(250,247,242,0.85)', borderBottom: '1px solid #EBE2D6' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex items-center">
            <BrandLogo />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = activePath === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-sm transition-colors"
                  style={{ color: active ? '#E31E24' : '#6E655B', fontWeight: active ? 600 : 500 }}
                >
                  {link.name}
                  {active && (
                    <span className="absolute left-0 right-0 -bottom-1.5 h-0.5 rounded-full" style={{ background: '#E31E24' }} />
                  )}
                </a>
              );
            })}
            <a
              href={`tel:${phoneHref}`}
              className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
              style={{ color: '#1A1613' }}
            >
              <Phone className="h-4 w-4" style={{ color: '#E31E24' }} />
              {phone}
            </a>
            <a
              href={contactUrl}
              className="inline-flex items-center rounded-[10px] px-6 py-3 text-sm font-semibold text-white transition-colors"
              style={{ background: '#E31E24', boxShadow: '0 8px 20px -8px rgba(227,30,36,0.55)' }}
            >
              Зв'язатися
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2" style={{ color: '#1A1613' }}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-4 pt-2 pb-6 space-y-4"
          style={{ background: '#FAF7F2', borderBottom: '1px solid #EBE2D6' }}
        >
          {navLinks.map((link) => {
            const active = activePath === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                className="block text-lg font-medium border-l-2 pl-3"
                style={{ color: active ? '#E31E24' : '#6E655B', borderColor: active ? '#E31E24' : 'transparent' }}
              >
                {link.name}
              </a>
            );
          })}
          <a
            href={`tel:${phoneHref}`}
            className="flex items-center gap-2 text-lg font-semibold"
            style={{ color: '#1A1613' }}
          >
            <Phone className="h-5 w-5" style={{ color: '#E31E24' }} />
            {phone}
          </a>
          <a
            href={contactUrl}
            className="block text-center rounded-[10px] px-6 py-3 text-base font-semibold text-white"
            style={{ background: '#E31E24' }}
          >
            Зв'язатися
          </a>
        </motion.div>
      )}
    </nav>
  );
}
