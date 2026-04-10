import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-heading font-bold tracking-tighter">DIGITALIZE</span>
            </Link>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed">
              Ми створюємо цифрові стратегії, які трансформують бізнес. 
              Топова агенція з фокусом на результат та ROI.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Навігація</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/" className="hover:text-primary transition-colors">Головна</Link></li>
              <li><Link to="/cases" className="hover:text-primary transition-colors">Кейси</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Послуги</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Про нас</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Блог</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Контакти</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Київ, вул. Велика Васильківська, 100</li>
              <li>+38 (044) 123-45-67</li>
              <li>hello@digitalize.ua</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 Digitalize Agency. Всі права захищені.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
