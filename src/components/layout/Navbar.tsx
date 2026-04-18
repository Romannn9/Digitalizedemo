import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Головна",  href: "/" },
  { name: "Кейси",    href: "/cases/" },
  { name: "Послуги",  href: "/services/" },
  { name: "Про нас",  href: "/about/" },
  { name: "Блог",     href: "/blog/" },
];

const currentPage = typeof document !== 'undefined'
  ? (document.getElementById('root')?.dataset.page ?? 'home')
  : 'home';

const slugToPath: Record<string, string> = {
  home: '/', cases: '/cases/', services: '/services/', about: '/about/', blog: '/blog/', contact: '/contact/',
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activePath = slugToPath[currentPage] ?? '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-heading font-bold tracking-tighter">DIGITALIZE</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  activePath === link.href ? 'text-primary' : 'hover:text-primary'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a href="/contact/">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-none px-8">
                Зв'язатися
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
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
          className="md:hidden bg-background border-b border-border px-4 pt-2 pb-6 space-y-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`block text-lg font-medium ${
                activePath === link.href ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a href="/contact/">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-none">
              Зв'язатися
            </Button>
          </a>
        </motion.div>
      )}
    </nav>
  );
}
