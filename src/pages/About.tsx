import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Shield, Target, Zap } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-10 h-10 text-primary" />,
  Target: <Target className="w-10 h-10 text-primary" />,
  Zap:    <Zap className="w-10 h-10 text-primary" />,
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
  { name: "Артем Волков",    role: "CEO & Founder",     image: "" },
  { name: "Олена Кравченко", role: "Head of Strategy",  image: "" },
  { name: "Максим Данилюк",  role: "Lead Media Buyer",  image: "" },
  { name: "Анна Соколова",   role: "Creative Director", image: "" },
];

const FB_ACHIEVE = [
  { value: "300+", label: "Проєктів" },
  { value: "15",   label: "Нагород" },
  { value: "12",   label: "Країн" },
  { value: "350%", label: "ROI (avg)" },
];

export default function About() {
  const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
  const f   = (key: string, fb: any) => { const v = acf[key]; return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fb; };
  const rep = (key: string, fb: any[]) => { const v = acf[key]; return (Array.isArray(v) && v.length > 0) ? v : fb; };

  const heroStats    = rep('abt_hero_stats',    FB_STATS);
  const values       = rep('abt_values',        FB_VALUES);
  const team         = rep('abt_team',          FB_TEAM);
  const achievements = rep('abt_stats',         FB_ACHIEVE);
  const officePhotos = rep('abt_office_photos', []);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-primary font-bold uppercase tracking-widest mb-6 block">{f('abt_badge', 'Про нас')}</span>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter uppercase">
                {f('abt_h1_line1', 'МИ — ВАШ')} <br />
                <span className="text-primary">{f('abt_h1_accent', 'DIGITAL-ДВИГУН')}</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-10">
                {f('abt_desc', 'Digitalize — це команда експертів, які живуть даними та креативом. Ми не просто виконуємо замовлення, ми стаємо частиною вашого бізнесу, щоб разом досягати неймовірних результатів.')}
              </p>
              <div className="flex space-x-8">
                {heroStats.map((stat: any, i: number) => (
                  <div key={i}>
                    <p className="text-4xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-gray-500 uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              {f('abt_hero_image', '')
                ? <img src={f('abt_hero_image', '')} alt="Office" className="rounded-sm shadow-2xl grayscale" />
                : <img src="https://picsum.photos/seed/office1/800/1000" alt="Office" className="rounded-sm shadow-2xl grayscale" referrerPolicy="no-referrer" />
              }
              <div className="absolute -bottom-10 -left-10 bg-primary p-10 text-white hidden md:block">
                <p className="text-2xl font-bold italic">"{f('abt_quote', 'Результат — це єдина метрика, яка має значення.')}"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 uppercase tracking-tight">{f('abt_val_title', 'НАША МІСІЯ ТА ЦІННОСТІ')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{f('abt_val_subtitle', 'Ми будуємо прозорий та ефективний маркетинг майбутнього.')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value: any, i: number) => (
              <div key={i} className="p-10 border border-gray-100 hover:border-primary transition-colors group">
                <div className="mb-6 group-hover:scale-110 transition-transform">{ICON_MAP[value.icon] ?? <Shield className="w-10 h-10 text-primary" />}</div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight">{f('abt_team_title', 'ЛЮДИ, ЯКІ СТВОРЮЮТЬ УСПІХ')}</h2>
              <p className="text-xl text-gray-600">{f('abt_team_subtitle', 'Наша команда — це поєднання досвіду, креативності та аналітичного складу розуму.')}</p>
            </div>
            <Button
              variant="outline"
              className="border-brand-black text-brand-black hover:bg-brand-black hover:text-white rounded-none px-8 py-6"
              onClick={() => { window.location.href = f('abt_team_btn_url', '/contact/'); }}
            >
              {f('abt_team_btn', 'Приєднатися до нас')}
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member: any, i: number) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                  {member.image
                    ? <img src={member.image} alt={member.name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                    : <img src={`https://i.pravatar.cc/400?img=${i + 11}`} alt={member.name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                  }
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-500 uppercase text-xs tracking-widest mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {achievements.map((stat: any, i: number) => (
              <div key={i}>
                <p className="text-5xl md:text-7xl font-bold text-primary mb-2 tracking-tighter">{stat.value}</p>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Photos */}
      {officePhotos.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {officePhotos.map((photo: any, i: number) => (
                <div key={i} className={`overflow-hidden ${i % 3 === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}>
                  <img src={photo.image} alt={`Office ${i + 1}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter uppercase">
            {f('abt_cta_title', 'СТАНЬТЕ ЧАСТИНОЮ НАШОЇ ІСТОРІЇ УСПІХУ')}
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            {f('abt_cta_subtitle', 'Ми шукаємо амбітних партнерів, які готові до великих змін та масштабних результатів.')}
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 text-xl px-12 py-8 rounded-none font-bold uppercase tracking-widest"
            onClick={() => { window.location.href = f('abt_cta_button_url', '/contact/'); }}
          >
            {f('abt_cta_button', 'Почати співпрацю')}
          </Button>
        </div>
      </section>
    </div>
  );
}
