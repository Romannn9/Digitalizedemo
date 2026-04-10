import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "motion/react";
import { Search, ArrowRight, Calendar, User, Tag, Mail } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "Як AI змінює таргетовану рекламу в 2026 році",
      excerpt: "Дізнайтеся, як нові алгоритми Meta та TikTok допомагають знаходити клієнтів з меншими витратами.",
      date: "10 Квітня, 2026",
      author: "Артем Волков",
      category: "AI & Ads",
      img: "https://picsum.photos/seed/blog1/800/600"
    },
    {
      title: "5 помилок у Google Ads, які з'їдають ваш бюджет",
      excerpt: "Аналіз реальних кейсів та поради, як оптимізувати ваші кампанії вже сьогодні.",
      date: "08 Квітня, 2026",
      author: "Максим Данилюк",
      category: "Google Ads",
      img: "https://picsum.photos/seed/blog2/800/600"
    },
    {
      title: "Майбутнє SEO: чому контент все ще король",
      excerpt: "Як писати тексти, які подобаються і людям, і пошуковим роботам у новій ері інтернету.",
      date: "05 Квітня, 2026",
      author: "Олена Кравченко",
      category: "SEO",
      img: "https://picsum.photos/seed/blog3/800/600"
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
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter uppercase">БЛОГ <span className="text-primary">DIGITALIZE</span></h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Ділимося експертизою, кейсами та трендами світу digital-маркетингу. Тільки корисний контент для вашого бізнесу.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Categories & Search */}
      <section className="py-12 bg-white border-b border-gray-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap gap-4">
            {["Всі", "Ads", "SEO", "SMM", "Strategy", "AI"].map((cat) => (
              <button key={cat} className="px-6 py-2 border border-gray-200 hover:border-primary hover:text-primary transition-all font-medium text-sm uppercase tracking-wider">
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input placeholder="Пошук статей..." className="pl-12 rounded-none border-gray-200 h-12 focus:border-primary" />
          </div>
        </div>
      </section>

      {/* 3. Article List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-6 aspect-video">
                  <img 
                    src={post.img} 
                    alt={post.title} 
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                    {post.category}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-gray-400 text-sm mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{post.excerpt}</p>
                <Button variant="link" className="p-0 text-primary font-bold group">
                  Читати далі <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.article>
            ))}
          </div>
          <div className="mt-20 text-center">
            <Button variant="outline" className="border-brand-black text-brand-black hover:bg-brand-black hover:text-white rounded-none px-12 py-8 text-lg font-bold uppercase tracking-widest">
              Завантажити ще
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Popular Articles */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 uppercase tracking-widest">ПОПУЛЯРНЕ ЗА МІСЯЦЬ</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full md:w-48 shrink-0 aspect-square overflow-hidden">
                  <img src={`https://picsum.photos/seed/pop${i}/400/400`} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Trending</span>
                  <h4 className="text-xl font-bold mb-4 hover:text-primary cursor-pointer transition-colors">Як налаштувати GA4 для E-commerce: повний гід</h4>
                  <div className="flex items-center space-x-4 text-gray-400 text-xs">
                    <span>15 хв читання</span>
                    <span>•</span>
                    <span>2.4k переглядів</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Subscription */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-16 h-16 mx-auto mb-8 opacity-50" />
          <h2 className="text-4xl font-bold mb-6 uppercase tracking-tighter">ПІДПИШІТЬСЯ НА ДАЙДЖЕСТ</h2>
          <p className="text-xl mb-10 opacity-90">Отримуйте кращі матеріали та ексклюзивні поради раз на тиждень.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <Input placeholder="Ваш Email" className="bg-white text-brand-black rounded-none h-16 px-6 text-lg border-none" />
            <Button className="bg-brand-black text-white hover:bg-gray-900 rounded-none h-16 px-10 text-lg font-bold uppercase tracking-widest">
              Підписатися
            </Button>
          </form>
          <p className="mt-6 text-sm opacity-60">Жодного спаму. Тільки користь. Відписатися можна в будь-який момент.</p>
        </div>
      </section>

      {/* 7. Authors */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center uppercase tracking-widest">НАШІ АВТОРИ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Артем Волков", role: "CEO & Ads Expert", bio: "8 років у маркетингу, керував бюджетами понад $50M." },
              { name: "Олена Кравченко", role: "Head of SEO", bio: "Експерт з виведення сайтів у ТОП на міжнародних ринках." },
              { name: "Максим Данилюк", role: "Google Ads Specialist", bio: "Сертифікований фахівець з контекстної реклами." }
            ].map((author, i) => (
              <div key={i} className="text-center p-8 border border-gray-100">
                <img src={`https://i.pravatar.cc/150?img=${i+20}`} className="w-24 h-24 rounded-full mx-auto mb-6 grayscale" referrerPolicy="no-referrer" />
                <h3 className="text-xl font-bold mb-2">{author.name}</h3>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">{author.role}</p>
                <p className="text-gray-500">{author.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SEO Block */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-600">
            <h2 className="text-3xl font-bold text-brand-black mb-6">Експертний блог про Digital-маркетинг</h2>
            <p>
              Ласкаво просимо до блогу Digitalize — вашого надійного джерела знань у світі інтернет-реклами та маркетингу. Ми створили цей ресурс, щоб ділитися практичним досвідом, який ми здобуваємо щодня, працюючи з десятками проєктів у різних нішах.
            </p>
            <p>
              У нашому блозі ви знайдете актуальні матеріали про:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Тренди таргетованої реклами у Facebook та Instagram;</li>
              <li>Оптимізацію конверсій та зниження вартості ліда;</li>
              <li>Технічне та контентне SEO для бізнесу;</li>
              <li>Стратегії SMM та побудову особистого бренду;</li>
              <li>Використання штучного інтелекту в маркетингових процесах.</li>
            </ul>
            <p className="mt-6">
              Ми віримо, що знання мають бути доступними, а маркетинг — прозорим. Читайте, впроваджуйте та масштабуйте свій бізнес разом з нами!
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">ПИТАННЯ ПО БЛОГУ</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Як часто виходять нові статті?", a: "Ми публікуємо 2-3 глибоких аналітичних матеріали на тиждень, щоб ви завжди були в курсі останніх змін на ринку." },
              { q: "Чи можу я запропонувати тему для статті?", a: "Так, ми завжди відкриті до пропозицій! Напишіть нам на пошту або в соцмережі, і ми розглянемо вашу ідею." },
              { q: "Чи є у вас гостьові публікації?", a: "Ми приймаємо гостьові статті лише від перевірених експертів ринку. Якщо ви хочете стати автором — надішліть нам свій кейс." }
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
