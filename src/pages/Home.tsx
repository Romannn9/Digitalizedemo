import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, BarChart3, Target, Zap, Users, ShieldCheck, MessageSquare } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
const f = (key: string, fallback: any) => {
  const v = acf[key];
  return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fallback;
};
const rep = (key: string, fallback: any[]) => {
  const v = acf[key];
  return (Array.isArray(v) && v.length > 0) ? v : fallback;
};

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="w-10 h-10 text-primary" />,
  Target:    <Target    className="w-10 h-10 text-primary" />,
  Zap:       <Zap       className="w-10 h-10 text-primary" />,
  Users:     <Users     className="w-10 h-10 text-primary" />,
};

export default function Home() {
  // Hero
  const heroBadge          = f('hero_badge',            'Top Digital Agency 2026');
  const heroLine1          = f('hero_title_line1',      'МАСШТАБУЄМО');
  const heroAccent         = f('hero_title_accent',     'ВАШ БІЗНЕС');
  const heroLine3          = f('hero_title_line3',      'ЧЕРЕЗ ДАНІ');
  const heroSubtitle       = f('hero_subtitle',         'Digitalize — це не просто реклама. Це стратегія, яка приносить ROI 300%+ та перетворює кліків на лояльних клієнтів.');
  const heroCta1Text       = f('hero_cta_primary',      'Отримати стратегію');
  const heroCta1Url        = f('hero_cta_primary_url',  '/contact/');
  const heroCta2Text       = f('hero_cta_secondary',    'Наші кейси');
  const heroCta2Url        = f('hero_cta_secondary_url','/cases/');

  // Benefits
  const benefits = rep('benefits', [
    { icon: 'BarChart3', title: 'Фокус на ROI',       desc: 'Ми не звітуємо про охоплення. Ми звітуємо про прибуток, який ви отримали від кожної гривні.' },
    { icon: 'Target',    title: 'Точний таргетинг',   desc: 'Використовуємо AI-алгоритми для пошуку вашої ідеальної аудиторії з точністю до 98%.' },
    { icon: 'Zap',       title: 'Швидкий старт',      desc: 'Запускаємо перші кампанії за 7 днів та отримуємо перші ліди вже в день запуску.' },
  ]);

  // Services
  const servicesTitle    = f('services_title',    'КОМПЛЕКСНІ РІШЕННЯ ДЛЯ ВАШОГО РОСТУ');
  const servicesSubtitle = f('services_subtitle', 'Ми закриваємо всі потреби вашого маркетингу в одному місці.');
  const servicesLinkText = f('services_link_text','Всі послуги');
  const servicesLinkUrl  = f('services_link_url', '/services/');
  const services = rep('services', [
    { title: 'Targeted Ads',     desc: 'Facebook, Instagram, TikTok' },
    { title: 'Contextual Ads',   desc: 'Google Search, GDN, YouTube' },
    { title: 'SMM Strategy',     desc: 'Контент, який продає бренд' },
    { title: 'SEO Optimization', desc: 'Вихід у ТОП без реклами' },
  ]);

  // Cases
  const casesTitle = f('cases_title', 'РЕЗУЛЬТАТИ, ЯКІ ГОВОРЯТЬ САМІ ЗА СЕБЕ');
  const cases = rep('cases', [
    { client: 'E-commerce Brand', result: 'ROI 450%', desc: 'Збільшили продажі в 3 рази за 6 місяців через таргет та ретаргетинг.',           image: 'https://picsum.photos/seed/agency1/800/600' },
    { client: 'SaaS Platform',    result: 'CPA -40%', desc: 'Знизили вартість залучення клієнта завдяки оптимізації Google Ads.', image: 'https://picsum.photos/seed/agency2/800/600' },
  ]);

  // About
  const aboutImage = f('about_image', 'https://picsum.photos/seed/team/600/800');
  const aboutYears = f('about_years', 8);
  const aboutTitle = f('about_title', 'МИ НЕ ПРОСТО АГЕНЦІЯ. МИ ВАШ ПАРТНЕР У РОСТІ.');
  const aboutText  = f('about_text',  "Digitalize народилася з ідеї, що маркетинг має бути прозорим та вимірюваним. Ми об'єднали кращих аналітиків та креативників, щоб створювати кампанії, які неможливо ігнорувати.");
  const aboutCheckpoints = rep('about_checkpoints', [
    { text: 'Власна методологія аналізу ринку' },
    { text: 'Сертифіковані Google та Meta партнери' },
    { text: 'Прозорі звіти в режимі реального часу' },
  ]);
  const aboutCta    = f('about_cta',     'Дізнатися більше про нас');
  const aboutCtaUrl = f('about_cta_url', '/about/');

  // Process
  const processTitle    = f('process_title',    'ЯК МИ ПРАЦЮЄМО');
  const processSubtitle = f('process_subtitle', 'Чіткий алгоритм дій для досягнення ваших цілей.');
  const processSteps = rep('process_steps', [
    { step: '01', title: 'Аудит',       desc: 'Аналізуємо ваш поточний стан та конкурентів.' },
    { step: '02', title: 'Стратегія',   desc: 'Розробляємо покроковий план масштабування.' },
    { step: '03', title: 'Запуск',      desc: 'Налаштовуємо та запускаємо рекламні кампанії.' },
    { step: '04', title: 'Оптимізація', desc: 'Постійно покращуємо показники на основі даних.' },
  ]);

  // Testimonials
  const testimonialsTitle    = f('testimonials_title',    'ЩО ПРО НАС КАЖУТЬ КЛІЄНТИ');
  const testimonialsSubtitle = f('testimonials_subtitle', 'Довіра — це фундамент нашої роботи. Ми пишаємося успіхами наших партнерів.');
  const testimonialsCount    = f('testimonials_count',    '500+');
  const testimonials = rep('testimonials', [
    { name: 'Олександр Коваленко', role: 'CEO TechStart',                    text: 'Digitalize допомогли нам вийти на ринок США. Результати перевершили очікування вдвічі.' },
    { name: 'Марія Іванова',       role: 'Marketing Director, FashionHub',   text: 'Найкраща агенція з точки зору аналітики. Кожен цент під контролем.' },
  ]);

  // CTA
  const ctaTitle     = f('cta_title',      'ГОТОВІ ДО ВИБУХОВОГО РОСТУ?');
  const ctaSubtitle  = f('cta_subtitle',   'Залиште заявку сьогодні та отримайте безкоштовний аудит вашої рекламної стратегії вартістю $500.');
  const ctaButton    = f('cta_button',     'Хочу аудит');
  const ctaButtonUrl = f('cta_button_url', '/contact/');

  // FAQ
  const faqTitle = f('faq_title', 'ЧАСТІ ЗАПИТАННЯ');
  const faqItems = rep('faq_items', [
    { q: 'Який мінімальний бюджет для старту?',  a: 'Ми працюємо з бюджетами від $1000 на місяць, щоб забезпечити достатню кількість даних для оптимізації.' },
    { q: 'Коли я побачу перші результати?',       a: "Перші ліди зазвичай з'являються протягом 24-48 годин після запуску кампанії." },
    { q: 'Ви працюєте з нішею B2B?',              a: 'Так, у нас великий досвід у залученні клієнтів для складних B2B продуктів через LinkedIn та Google Search.' },
    { q: 'Чи надаєте ви гарантії?',              a: 'Ми гарантуємо виконання KPI по вартості ліда та об\'єму трафіку, зафіксованих у договорі.' },
  ]);

  // Contact
  const contactTitle    = f('contact_title',    'ОБГОВОРИМО ВАШ ПРОЄКТ?');
  const contactSubtitle = f('contact_subtitle', "Заповніть форму, і наш експерт зв'яжеться з вами протягом 30 хвилин.");
  const contactButton   = f('contact_button',   'Надіслати запит');

  return (
    <div className="flex flex-col">

      {/* 1. Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-black text-white">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              {heroBadge}
            </span>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 tracking-tighter">
              {heroLine1} <br />
              <span className="text-primary italic">{heroAccent}</span> <br />
              {heroLine3}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              {heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={heroCta1Url}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-8 rounded-none group">
                  {heroCta1Text}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href={heroCta2Url}>
                <Button size="lg" variant="outline" className="border-white/20 bg-transparent hover:bg-white/10 text-white hover:text-white text-lg px-10 py-8 rounded-none">
                  {heroCta2Text}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col space-y-4"
              >
                {iconMap[item.icon] ?? <BarChart3 className="w-10 h-10 text-primary" />}
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{servicesTitle}</h2>
              <p className="text-xl text-gray-600">{servicesSubtitle}</p>
            </div>
            <a href={servicesLinkUrl}>
              <Button variant="link" className="text-primary font-bold text-lg p-0 group">
                {servicesLinkText} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service: any, i: number) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-12 h-1 bg-primary mb-6 group-hover:w-full transition-all duration-500" />
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-500">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Cases */}
      <section className="py-24 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tighter">{casesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {cases.map((item: any, i: number) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-6 aspect-video">
                  <img
                    src={item.image}
                    alt={item.client}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 font-bold">
                    {item.result}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.client}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. About */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full" />
              <img
                src={aboutImage}
                alt="Team"
                className="relative z-10 w-full rounded-sm shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 text-white z-20">
                <span className="text-5xl font-bold block">{aboutYears}+</span>
                <span className="text-sm uppercase tracking-widest">років досвіду</span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{aboutTitle}</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{aboutText}</p>
              <ul className="space-y-4 mb-10">
                {aboutCheckpoints.map((item: any, i: number) => (
                  <li key={i} className="flex items-center space-x-3 text-lg font-medium">
                    <CheckCircle2 className="text-primary w-6 h-6" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <a href={aboutCtaUrl}>
                <Button className="bg-brand-black text-white px-10 py-6 rounded-none hover:bg-primary transition-colors">
                  {aboutCta}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Process */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{processTitle}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{processSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
            {processSteps.map((item: any, i: number) => (
              <div key={i} className="relative z-10 bg-gray-50 p-6 text-center">
                <div className="w-16 h-16 bg-brand-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 border-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold mb-6">{testimonialsTitle}</h2>
              <p className="text-lg text-gray-600 mb-8">{testimonialsSubtitle}</p>
              <div className="flex space-x-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-full border-2 border-white" referrerPolicy="no-referrer" />
                  ))}
                </div>
                <div className="text-sm font-bold">
                  <span className="block">{testimonialsCount} задоволених</span>
                  <span className="text-primary">клієнтів по всьому світу</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t: any, i: number) => (
                <Card key={i} className="bg-gray-50 border-none p-8">
                  <MessageSquare className="text-primary mb-6 w-8 h-8 opacity-20" />
                  <p className="text-lg italic mb-6">"{t.text}"</p>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-white max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{ctaTitle}</h2>
                <p className="text-xl opacity-90">{ctaSubtitle}</p>
              </div>
              <a href={ctaButtonUrl}>
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-xl px-12 py-8 rounded-none font-bold">
                  {ctaButton}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">{faqTitle}</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item: any, i: number) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-lg font-bold hover:text-primary transition-colors">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600 text-lg leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 10. Contact */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">{contactTitle}</h2>
              <p className="text-xl text-gray-600 mb-12">{contactSubtitle}</p>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center text-primary">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Персональний менеджер</p>
                    <p className="text-gray-500">Завжди на зв'язку для вирішення ваших питань.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Гарантія конфіденційності</p>
                    <p className="text-gray-500">Ваші дані та стратегії під надійним захистом NDA.</p>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm buttonLabel={contactButton} />
          </div>
        </div>
      </section>

    </div>
  );
}
