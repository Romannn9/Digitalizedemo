import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "motion/react";
import { ArrowRight, Target, Search, Share2, LineChart, CheckCircle2 } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Target:    <Target className="w-12 h-12" />,
  Search:    <Search className="w-12 h-12" />,
  Share2:    <Share2 className="w-12 h-12" />,
  LineChart: <LineChart className="w-12 h-12" />,
};

const FB_SERVICES = [
  { icon: "Target",    title: "Таргетована реклама", desc: "Facebook, Instagram, TikTok. Знаходимо ваших клієнтів там, де вони проводять найбільше часу.", details: "Глибокий аналіз цільової аудиторії\nСтворення креативів, що зупиняють скрол\nA/B тестування гіпотез\nРетаргетинг на всіх етапах воронки", btn: "Замовити", btn_url: "/contact/", image: "" },
  { icon: "Search",    title: "Контекстна реклама",  desc: "Google Ads. Приводимо 'гарячий' трафік, який вже шукає ваш продукт або послугу.", details: "Збір семантичного ядра\nНалаштування пошукових кампаній\nКМС та YouTube Ads\nОптимізація вартості конверсії", btn: "Замовити", btn_url: "/contact/", image: "" },
  { icon: "Share2",    title: "SMM Стратегія",        desc: "Будуємо лояльне ком'юніті навколо вашого бренду та підвищуємо впізнаваність.", details: "Розробка візуального стилю\nКонтент-план та копірайтинг\nРобота з блогерами (Influencer Marketing)\nКом'юніті-менеджмент", btn: "Замовити", btn_url: "/contact/", image: "" },
  { icon: "LineChart", title: "SEO Оптимізація",      desc: "Органічний ріст та вихід у ТОП пошукової видачі без постійних витрат на кліки.", details: "Технічний аудит сайту\nВнутрішня та зовнішня оптимізація\nПобудова посилального профілю\nКонтент-маркетинг", btn: "Замовити", btn_url: "/contact/", image: "" },
];

const FB_RESULTS = [
  { label: "Зростання трафіку", value: "+150-300%", desc: "Протягом перших 3 місяців роботи." },
  { label: "Зниження CPA",      value: "-25-50%",   desc: "Завдяки глибокій оптимізації кампаній." },
  { label: "Підвищення LTV",    value: "+20%",       desc: "Через стратегії утримання клієнтів." },
];

const FB_STEPS = [
  { step: "01", title: "Брифінг та декомпозиція",    desc: "Визначаємо цілі, KPI та розраховуємо необхідний бюджет для їх досягнення." },
  { step: "02", title: "Технічна підготовка",        desc: "Налаштовуємо аналітику (GA4, Pixel), створюємо кабінети та креативи." },
  { step: "03", title: "Тестовий запуск",            desc: "Перевіряємо гіпотези на невеликих бюджетах для пошуку кращих зв'язок." },
  { step: "04", title: "Масштабування та звітність", desc: "Збільшуємо бюджети на робочі кампанії та надаємо щотижневі звіти." },
];

const FB_PACKAGES = [
  { name: "Старт",   price: "від $800",  popular: false, features: "1 рекламний канал\nНалаштування аналітики\nЩотижневий звіт\nПідтримка 5/7", btn: "Обрати пакет", btn_url: "/contact/" },
  { name: "Бізнес",  price: "від $1500", popular: true,  features: "2 рекламні канали\nA/B тестування\nКреативи включено\nПідтримка 7/7", btn: "Обрати пакет", btn_url: "/contact/" },
  { name: "Експерт", price: "від $3000", popular: false, features: "Всі канали трафіку\nКомплексна стратегія\nПерсональний стратег\nПріоритетна підтримка", btn: "Обрати пакет", btn_url: "/contact/" },
];

const FB_FAQ = [
  { q: "Чи входить вартість рекламного бюджету в пакети?", a: "Ні, рекламний бюджет оплачується окремо безпосередньо в рекламні кабінети (Meta, Google). Наші пакети — це вартість роботи команди." },
  { q: "Чи можу я змінити пакет у процесі роботи?",       a: "Так, ми можемо переглянути умови співпраці в будь-який момент залежно від ваших потреб та масштабів проєкту." },
  { q: "Ви працюєте з ПДВ?",                               a: "Так, ми працюємо офіційно з укладанням договору та можливістю оплати на розрахунковий рахунок ТОВ з ПДВ." },
];

export default function Services() {
  const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
  const f   = (key: string, fb: any) => { const v = acf[key]; return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fb; };
  const rep = (key: string, fb: any[]) => { const v = acf[key]; return (Array.isArray(v) && v.length > 0) ? v : fb; };

  const services = rep('srv_items',      FB_SERVICES);
  const results  = rep('srv_results',    FB_RESULTS);
  const steps    = rep('srv_proc_steps', FB_STEPS);
  const packages = rep('srv_packages',   FB_PACKAGES);
  const faqItems = rep('srv_faq_items',  FB_FAQ);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter uppercase">
              {f('srv_h1_line1', 'ПОСЛУГИ, ЩО')} <br />
              <span className="text-primary">{f('srv_h1_accent', 'ГЕНЕРУЮТЬ ПРИБУТОК')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {f('srv_header_desc', 'Ми не просто налаштовуємо рекламу. Ми будуємо систему залучення клієнтів, яка працює на ваш бізнес 24/7.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service: any, i: number) => {
              const details = typeof service.details === 'string'
                ? service.details.split('\n').filter(Boolean)
                : (service.details ?? []);
              return (
                <div key={i} className={`flex flex-col lg:flex-row gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <div className="text-primary mb-6">{ICON_MAP[service.icon] ?? <Target className="w-12 h-12" />}</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight">{service.title}</h2>
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed">{service.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                      {details.map((detail: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                          <span className="font-medium">{detail}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="bg-brand-black text-white px-10 py-6 rounded-none hover:bg-primary transition-colors group"
                      onClick={() => { if (service.btn_url) window.location.href = service.btn_url; }}
                    >
                      {service.btn || 'Замовити'} {service.title} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute -inset-4 bg-primary/5 rounded-full blur-3xl" />
                    {service.image
                      ? <img src={service.image} alt={service.title} className="relative z-10 rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
                      : <img src={`https://picsum.photos/seed/service${i}/800/600`} alt={service.title} className="relative z-10 rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">{f('srv_res_title', 'ОЧІКУВАНІ РЕЗУЛЬТАТИ')}</h2>
            <p className="text-xl text-gray-600">{f('srv_res_subtitle', 'На що ви можете розраховувати, працюючи з нами.')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {results.map((stat: any, i: number) => (
              <Card key={i} className="p-10 text-center border-none shadow-sm">
                <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">{stat.label}</p>
                <p className="text-6xl font-bold mb-4 tracking-tighter">{stat.value}</p>
                <p className="text-gray-500">{stat.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center">{f('srv_proc_title', 'ЕТАПИ СПІВПРАЦІ')}</h2>
          <div className="space-y-12">
            {steps.map((item: any, i: number) => (
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

      {/* Packages */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">{f('srv_pkg_title', 'ПАКЕТИ ПОСЛУГ')}</h2>
            <p className="text-xl text-gray-600">{f('srv_pkg_subtitle', 'Оберіть оптимальний варіант для вашого бізнесу.')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg: any, i: number) => {
              const isPopular = pkg.popular === true || pkg.popular === '1' || pkg.popular === 1;
              const features = typeof pkg.features === 'string'
                ? pkg.features.split('\n').filter(Boolean)
                : (pkg.features ?? []);
              return (
                <Card key={i} className={`p-10 rounded-none border-2 transition-all relative ${isPopular ? 'border-primary shadow-2xl scale-105 z-10' : 'border-gray-100'}`}>
                  {isPopular && <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 text-xs font-bold uppercase tracking-widest">Популярний</span>}
                  <h3 className="text-2xl font-bold mb-2 text-center">{pkg.name}</h3>
                  <p className="text-4xl font-bold text-primary text-center mb-8">{pkg.price}</p>
                  <ul className="space-y-4 mb-10">
                    {features.map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-center space-x-3 text-gray-600">
                        <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full py-8 rounded-none font-bold uppercase tracking-widest ${isPopular ? 'bg-primary text-white' : 'bg-brand-black text-white'}`}
                    onClick={() => { if (pkg.btn_url) window.location.href = pkg.btn_url; }}
                  >
                    {pkg.btn || 'Обрати пакет'}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tighter">
            {f('srv_cta_title', 'НЕ ЗНАЄТЕ, ЯКУ ПОСЛУГУ ОБРАТИ?')}
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            {f('srv_cta_subtitle', 'Замовте безкоштовну консультацію, і ми підберемо інструменти саме під ваші цілі.')}
          </p>
          <Button
            size="lg"
            className="bg-primary text-white px-12 py-8 rounded-none text-xl font-bold uppercase tracking-widest shadow-xl hover:shadow-primary/20"
            onClick={() => { window.location.href = f('srv_cta_button_url', '/contact/'); }}
          >
            {f('srv_cta_button', 'Отримати консультацію')}
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">{f('srv_faq_title', 'ПИТАННЯ ПО ПОСЛУГАХ')}</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item: any, i: number) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-lg font-bold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600 text-lg">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
