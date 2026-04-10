import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "motion/react";
import { ArrowRight, Target, Search, Share2, LineChart, CheckCircle2, Cpu, BarChart } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "target",
      icon: <Target className="w-12 h-12" />,
      title: "Таргетована реклама",
      desc: "Facebook, Instagram, TikTok. Знаходимо ваших клієнтів там, де вони проводять найбільше часу.",
      details: [
        "Глибокий аналіз цільової аудиторії",
        "Створення креативів, що зупиняють скрол",
        "A/B тестування гіпотез",
        "Ретаргетинг на всіх етапах воронки"
      ]
    },
    {
      id: "context",
      icon: <Search className="w-12 h-12" />,
      title: "Контекстна реклама",
      desc: "Google Ads. Приводимо 'гарячий' трафік, який вже шукає ваш продукт або послугу.",
      details: [
        "Збір семантичного ядра",
        "Налаштування пошукових кампаній",
        "КМС та YouTube Ads",
        "Оптимізація вартості конверсії"
      ]
    },
    {
      id: "smm",
      icon: <Share2 className="w-12 h-12" />,
      title: "SMM Стратегія",
      desc: "Будуємо лояльне ком'юніті навколо вашого бренду та підвищуємо впізнаваність.",
      details: [
        "Розробка візуального стилю",
        "Контент-план та копірайтинг",
        "Робота з блогерами (Influencer Marketing)",
        "Ком'юніті-менеджмент"
      ]
    },
    {
      id: "seo",
      icon: <LineChart className="w-12 h-12" />,
      title: "SEO Оптимізація",
      desc: "Органічний ріст та вихід у ТОП пошукової видачі без постійних витрат на кліки.",
      details: [
        "Технічний аудит сайту",
        "Внутрішня та зовнішня оптимізація",
        "Побудова посилального профілю",
        "Контент-маркетинг"
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* 1. Header */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter uppercase">ПОСЛУГИ, ЩО <br /> <span className="text-primary">ГЕНЕРУЮТЬ ПРИБУТОК</span></h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Ми не просто налаштовуємо рекламу. Ми будуємо систему залучення клієнтів, яка працює на ваш бізнес 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Service List & 3. Detail */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, i) => (
              <div key={service.id} className={`flex flex-col lg:flex-row gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="text-primary mb-6">{service.icon}</div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight">{service.title}</h2>
                  <p className="text-xl text-gray-600 mb-10 leading-relaxed">{service.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {service.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                        <span className="font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="bg-brand-black text-white px-10 py-6 rounded-none hover:bg-primary transition-colors group">
                    Замовити {service.title} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute -inset-4 bg-primary/5 rounded-full blur-3xl" />
                  <img 
                    src={`https://picsum.photos/seed/service${i}/800/600`} 
                    alt={service.title} 
                    className="relative z-10 rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Results */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">ОЧІКУВАНІ РЕЗУЛЬТАТИ</h2>
            <p className="text-xl text-gray-600">На що ви можете розраховувати, працюючи з нами.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Зростання трафіку", value: "+150-300%", desc: "Протягом перших 3 місяців роботи." },
              { label: "Зниження CPA", value: "-25-50%", desc: "Завдяки глибокій оптимізації кампаній." },
              { label: "Підвищення LTV", value: "+20%", desc: "Через стратегії утримання клієнтів." }
            ].map((stat, i) => (
              <Card key={i} className="p-10 text-center border-none shadow-sm">
                <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">{stat.label}</p>
                <p className="text-6xl font-bold mb-4 tracking-tighter">{stat.value}</p>
                <p className="text-gray-500">{stat.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center">ЕТАПИ СПІВПРАЦІ</h2>
          <div className="space-y-12">
            {[
              { step: "01", title: "Брифінг та декомпозиція", desc: "Визначаємо цілі, KPI та розраховуємо необхідний бюджет для їх досягнення." },
              { step: "02", title: "Технічна підготовка", desc: "Налаштовуємо аналітику (GA4, Pixel), створюємо кабінети та креативи." },
              { step: "03", title: "Тестовий запуск", desc: "Перевіряємо гіпотези на невеликих бюджетах для пошуку кращих зв'язок." },
              { step: "04", title: "Масштабування та звітність", desc: "Збільшуємо бюджети на робочі кампанії та надаємо щотижневі звіти." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 pb-12 last:border-0">
                <span className="text-5xl font-bold text-primary opacity-20">{item.step}</span>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Tools */}
      <section className="py-24 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-6">ТЕХНОЛОГІЧНИЙ СТЕК</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Ми використовуємо передові інструменти для аналізу даних та автоматизації маркетингу.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { icon: <Cpu />, name: "AI Analytics" },
                { icon: <BarChart />, name: "GA4 / GTM" },
                { icon: <Target />, name: "Meta Ads" },
                { icon: <Search />, name: "Google Ads" }
              ].map((tool, i) => (
                <div key={i} className="flex flex-col items-center space-y-4 p-6 bg-white/5 rounded-sm border border-white/10">
                  <div className="text-primary w-8 h-8">{tool.icon}</div>
                  <span className="text-sm font-bold uppercase tracking-widest">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing/Packages */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">ПАКЕТИ ПОСЛУГ</h2>
            <p className="text-xl text-gray-600">Оберіть оптимальний варіант для вашого бізнесу.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Старт", price: "від $800", features: ["1 рекламний канал", "Налаштування аналітики", "Щотижневий звіт", "Підтримка 5/7"] },
              { name: "Бізнес", price: "від $1500", features: ["2 рекламні канали", "A/B тестування", "Креативи включено", "Підтримка 7/7"], popular: true },
              { name: "Експерт", price: "від $3000", features: ["Всі канали трафіку", "Комплексна стратегія", "Персональний стратег", "Пріоритетна підтримка"] }
            ].map((pkg, i) => (
              <Card key={i} className={`p-10 rounded-none border-2 transition-all ${pkg.popular ? 'border-primary shadow-2xl scale-105 relative z-10' : 'border-gray-100'}`}>
                {pkg.popular && <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 text-xs font-bold uppercase tracking-widest">Популярний</span>}
                <h3 className="text-2xl font-bold mb-2 text-center">{pkg.name}</h3>
                <p className="text-4xl font-bold text-primary text-center mb-8">{pkg.price}</p>
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-gray-600">
                      <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full py-8 rounded-none font-bold uppercase tracking-widest ${pkg.popular ? 'bg-primary text-white' : 'bg-brand-black text-white'}`}>
                  Обрати пакет
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tighter">НЕ ЗНАЄТЕ, ЯКУ ПОСЛУГУ ОБРАТИ?</h2>
          <p className="text-xl text-gray-600 mb-12">
            Замовте безкоштовну консультацію, і ми підберемо інструменти саме під ваші цілі.
          </p>
          <Button size="lg" className="bg-primary text-white px-12 py-8 rounded-none text-xl font-bold uppercase tracking-widest shadow-xl hover:shadow-primary/20">
            Отримати консультацію
          </Button>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">ПИТАННЯ ПО ПОСЛУГАХ</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Чи входить вартість рекламного бюджету в пакети?", a: "Ні, рекламний бюджет оплачується окремо безпосередньо в рекламні кабінети (Meta, Google). Наші пакети — це вартість роботи команди." },
              { q: "Чи можу я змінити пакет у процесі роботи?", a: "Так, ми можемо переглянути умови співпраці в будь-який момент залежно від ваших потреб та масштабів проєкту." },
              { q: "Ви працюєте з ПДВ?", a: "Так, ми працюємо офіційно з укладанням договору та можливістю оплати на розрахунковий рахунок ТОВ з ПДВ." }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-lg font-bold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600 text-lg">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
