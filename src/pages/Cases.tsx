import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "motion/react";
import { ArrowRight, TrendingUp, DollarSign, Users, PlayCircle, CheckCircle } from "lucide-react";

export default function Cases() {
  const cases = [
    {
      title: "Масштабування E-commerce бренду одягу",
      category: "Target",
      results: { roi: "520%", cpa: "$2.4", roas: "6.2" },
      img: "https://picsum.photos/seed/case1/800/600"
    },
    {
      title: "Залучення лідів для ЖК преміум-класу",
      category: "Context",
      results: { roi: "380%", cpa: "$15", roas: "4.5" },
      img: "https://picsum.photos/seed/case2/800/600"
    },
    {
      title: "Просування мобільного додатку для фітнесу",
      category: "SMM",
      results: { roi: "410%", cpa: "$0.8", roas: "5.1" },
      img: "https://picsum.photos/seed/case3/800/600"
    },
    {
      title: "SEO-просування міжнародного маркетплейсу",
      category: "SEO",
      results: { roi: "890%", cpa: "$1.2", roas: "12.4" },
      img: "https://picsum.photos/seed/case4/800/600"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* 1. Header */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">НАШІ КЕЙСИ: <br /> <span className="text-primary">РЕАЛЬНІ ЦИФРИ</span></h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Ми не просто показуємо красиві картинки. Ми показуємо, як наші стратегії впливають на банківський рахунок клієнта.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Filter */}
      <section className="py-12 bg-white border-b border-gray-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-transparent h-auto p-0 flex flex-wrap gap-4">
              {["all", "Target", "Context", "SMM", "SEO"].map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab}
                  className="px-8 py-3 rounded-none border border-gray-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary transition-all"
                >
                  {tab === "all" ? "Всі проєкти" : tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* 3. Cases Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {cases.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-8 aspect-[4/3]">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between text-white">
                      <div className="text-center">
                        <p className="text-xs uppercase opacity-60">ROI</p>
                        <p className="text-xl font-bold">{item.results.roi}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs uppercase opacity-60">CPA</p>
                        <p className="text-xl font-bold">{item.results.cpa}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs uppercase opacity-60">ROAS</p>
                        <p className="text-xl font-bold">{item.results.roas}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-primary text-sm font-bold uppercase tracking-widest mb-4">
                  <span className="w-8 h-0.5 bg-primary" />
                  <span>{item.category}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">{item.title}</h3>
                <Button variant="link" className="p-0 text-lg font-bold group-hover:translate-x-2 transition-transform">
                  Дивитися деталі <ArrowRight className="ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Case Detail */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-16 shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8">Як ми допомогли Fintech-стартапу залучити 10,000 користувачів за 3 місяці</h2>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary rounded-full shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">Проблема</p>
                      <p className="text-gray-600">Висока вартість інсталу ($4.5) та низька конверсія в реєстрацію.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary rounded-full shrink-0">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">Рішення</p>
                      <p className="text-gray-600">Повна перебудова воронки, впровадження AI-оптимізації ставок та нові креативи.</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
                  <div>
                    <p className="text-3xl font-bold text-primary">10k+</p>
                    <p className="text-sm text-gray-500 uppercase">Користувачів</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">$1.2</p>
                    <p className="text-sm text-gray-500 uppercase">CPI</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">25%</p>
                    <p className="text-sm text-gray-500 uppercase">CR в реєстрацію</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/fintech/600/800" 
                  alt="Fintech Case" 
                  className="rounded-sm shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Video/Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">ВІДЕО-ВІДГУКИ КЛІЄНТІВ</h2>
            <p className="text-xl text-gray-600">Послухайте тих, хто вже пройшов шлях до успіху з нами.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative group cursor-pointer overflow-hidden rounded-sm">
                <img 
                  src={`https://picsum.photos/seed/video${i}/600/400`} 
                  alt="Video" 
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <p className="font-bold">Олексій, засновник BrandX</p>
                  <p className="text-sm opacity-80">"Digitalize змінили наше уявлення про маркетинг"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">ХОЧЕТЕ ТАКІ Ж РЕЗУЛЬТАТИ?</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Ми готові розробити для вас індивідуальну стратегію росту. Перша консультація — безкоштовно.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-xl px-12 py-8 rounded-none font-bold uppercase tracking-widest">
            Обговорити проєкт
          </Button>
        </div>
      </section>

      {/* 7. Benefits of working with us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-12">ЧОМУ ОБИРАЮТЬ DIGITALIZE</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Прозорість", desc: "Ви бачите кожну витрачену гривню в реальному часі." },
                  { title: "Експертність", desc: "Команда з досвідом у 50+ різних нішах бізнесу." },
                  { title: "Технології", desc: "Використовуємо власні AI-рішення для аналітики." },
                  { title: "Швидкість", desc: "Реагуємо на зміни ринку миттєво." }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center space-x-2 text-primary mb-4">
                      <CheckCircle className="w-6 h-6" />
                      <h4 className="font-bold text-xl">{item.title}</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-black p-12 text-white">
              <h3 className="text-3xl font-bold mb-8">Наші досягнення</h3>
              <div className="space-y-8">
                <div>
                  <p className="text-5xl font-bold text-primary mb-2">$50M+</p>
                  <p className="text-gray-400">Рекламного бюджету в управлінні</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-primary mb-2">300+</p>
                  <p className="text-gray-400">Успішно реалізованих проєктів</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-primary mb-2">95%</p>
                  <p className="text-gray-400">Клієнтів залишаються з нами назавжди</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Process */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center uppercase tracking-tighter">ШЛЯХ ДО ВАШОГО УСПІХУ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Занурення", desc: "Вивчаємо ваш продукт, конкурентів та цільову аудиторію." },
              { step: "02", title: "Гіпотези", desc: "Формуємо список рекламних гіпотез та креативних підходів." },
              { step: "03", title: "Масштабування", desc: "Знаходимо робочі зв'язки та збільшуємо бюджет для максимізації прибутку." }
            ].map((item, i) => (
              <div key={i} className="relative p-10 bg-white shadow-sm hover:shadow-xl transition-all">
                <span className="text-8xl font-bold text-gray-100 absolute top-4 right-4 z-0 leading-none">{item.step}</span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">{item.title}</h3>
                  <p className="text-gray-600 text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">ПИТАННЯ ПО КЕЙСАХ</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Чи всі ваші кейси справжні?", a: "Так, за кожним кейсом стоїть реальний бізнес та підтверджені дані з рекламних кабінетів. Ми можемо надати детальнішу інформацію при особистій зустрічі." },
              { q: "Чому деякі назви компаній приховані?", a: "Деякі клієнти підписують NDA, що забороняє публічне розголошення назви бренду, але дозволяє показувати результати в знеособленому вигляді." },
              { q: "Чи можете ви повторити результат для мого бізнесу?", a: "Кожен бізнес унікальний, але ми використовуємо перевірені методології, які працюють у більшості ніш." }
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
