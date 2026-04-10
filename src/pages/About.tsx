import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { Shield, Target, Zap, Award, CheckCircle, Heart, Users, Building2 } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col">
      {/* 1. Who we are */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold uppercase tracking-widest mb-6 block">Про нас</span>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter uppercase">МИ — ВАШ <br /> <span className="text-primary">DIGITAL-ДВИГУН</span></h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-10">
                Digitalize — це команда експертів, які живуть даними та креативом. Ми не просто виконуємо замовлення, ми стаємо частиною вашого бізнесу, щоб разом досягати неймовірних результатів.
              </p>
              <div className="flex space-x-8">
                <div>
                  <p className="text-4xl font-bold text-primary">8+</p>
                  <p className="text-sm text-gray-500 uppercase">Років на ринку</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">50+</p>
                  <p className="text-sm text-gray-500 uppercase">Експертів у команді</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">150M+</p>
                  <p className="text-sm text-gray-500 uppercase">Ліди згенеровано</p>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/office1/800/1000" 
                alt="Office" 
                className="rounded-sm shadow-2xl grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-primary p-10 text-white hidden md:block">
                <p className="text-2xl font-bold italic">"Результат — це єдина метрика, яка має значення."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission/Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 uppercase tracking-tight">НАША МІСІЯ ТА ЦІННОСТІ</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Ми будуємо прозорий та ефективний маркетинг майбутнього.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Shield className="w-10 h-10 text-primary" />, title: "Чесність", desc: "Ми завжди говоримо правду про результати, навіть якщо вони не ідеальні. Прозорість — наш пріоритет." },
              { icon: <Target className="w-10 h-10 text-primary" />, title: "Фокус на ціль", desc: "Кожна дія має наближати нас до вашої бізнес-цілі. Ми не робимо маркетинг заради маркетингу." },
              { icon: <Zap className="w-10 h-10 text-primary" />, title: "Інноваційність", desc: "Ми постійно тестуємо нові інструменти та підходи, щоб ви були на крок попереду конкурентів." }
            ].map((value, i) => (
              <div key={i} className="p-10 border border-gray-100 hover:border-primary transition-colors group">
                <div className="mb-6 group-hover:scale-110 transition-transform">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight">ЛЮДИ, ЯКІ СТВОРЮЮТЬ УСПІХ</h2>
              <p className="text-xl text-gray-600">Наша команда — це поєднання досвіду, креативності та аналітичного складу розуму.</p>
            </div>
            <Button variant="outline" className="border-brand-black text-brand-black hover:bg-brand-black hover:text-white rounded-none px-8 py-6">
              Приєднатися до нас
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Артем Волков", role: "CEO & Founder", img: "https://i.pravatar.cc/400?img=11" },
              { name: "Олена Кравченко", role: "Head of Strategy", img: "https://i.pravatar.cc/400?img=5" },
              { name: "Максим Данилюк", role: "Lead Media Buyer", img: "https://i.pravatar.cc/400?img=12" },
              { name: "Анна Соколова", role: "Creative Director", img: "https://i.pravatar.cc/400?img=9" }
            ].map((member, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-500 uppercase text-xs tracking-widest mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Achievements */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Проєктів", value: "300+" },
              { label: "Нагород", value: "15" },
              { label: "Країн", value: "12" },
              { label: "ROI (avg)", value: "350%" }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-5xl md:text-7xl font-bold text-primary mb-2 tracking-tighter">{stat.value}</p>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Certificates */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center uppercase tracking-widest">ПІДТВЕРДЖЕНА ЕКСПЕРТНІСТЬ</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center space-x-2">
                <Award className="w-12 h-12" />
                <span className="font-bold text-xl uppercase">Google Partner</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Partners */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center uppercase tracking-widest">НАМ ДОВІРЯЮТЬ</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 items-center opacity-30 grayscale">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex justify-center">
                <Building2 className="w-16 h-16" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Photos/Office */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 aspect-video overflow-hidden">
              <img src="https://picsum.photos/seed/office2/1200/800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square overflow-hidden">
              <img src="https://picsum.photos/seed/office3/600/600" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square overflow-hidden">
              <img src="https://picsum.photos/seed/office4/600/600" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="md:col-span-2 aspect-video overflow-hidden">
              <img src="https://picsum.photos/seed/office5/1200/800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter uppercase">СТАНЬТЕ ЧАСТИНОЮ НАШОЇ ІСТОРІЇ УСПІХУ</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Ми шукаємо амбітних партнерів, які готові до великих змін та масштабних результатів.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-xl px-12 py-8 rounded-none font-bold uppercase tracking-widest">
            Почати співпрацю
          </Button>
        </div>
      </section>
    </div>
  );
}
