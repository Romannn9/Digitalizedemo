import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "motion/react";
import { ArrowRight, Calendar, User, Mail } from "lucide-react";

interface WpPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    author?: Array<{ name: string }>;
    'wp:term'?: Array<Array<{ name: string }>>;
  };
}

const FB_AUTHORS = [
  { name: "Артем Волков",    role: "CEO & Ads Expert",      bio: "8 років у маркетингу, керував бюджетами понад $50M.", image: "" },
  { name: "Олена Кравченко", role: "Head of SEO",           bio: "Експерт з виведення сайтів у ТОП на міжнародних ринках.", image: "" },
  { name: "Максим Данилюк",  role: "Google Ads Specialist", bio: "Сертифікований фахівець з контекстної реклами.", image: "" },
];

const FB_FAQ = [
  { q: "Як часто виходять нові статті?",           a: "Ми публікуємо 2-3 глибоких аналітичних матеріали на тиждень, щоб ви завжди були в курсі останніх змін на ринку." },
  { q: "Чи можу я запропонувати тему для статті?", a: "Так, ми завжди відкриті до пропозицій! Напишіть нам на пошту або в соцмережі, і ми розглянемо вашу ідею." },
  { q: "Чи є у вас гостьові публікації?",          a: "Ми приймаємо гостьові статті лише від перевірених експертів ринку. Якщо ви хочете стати автором — надішліть нам свій кейс." },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/gi, ' ').trim();
}

export default function Blog() {
  const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
  const f   = (key: string, fb: any) => { const v = acf[key]; return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fb; };
  const rep = (key: string, fb: any[]) => { const v = acf[key]; return (Array.isArray(v) && v.length > 0) ? v : fb; };

  const authors  = rep('blg_authors',   FB_AUTHORS);
  const faqItems = rep('blg_faq_items', FB_FAQ);

  const [posts, setPosts]     = useState<WpPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = (typeof window !== 'undefined' && window.wpSite?.apiUrl) ? window.wpSite.apiUrl : '/wp-json/';
    fetch(`${apiBase}wp/v2/posts?_embed&per_page=12&status=publish`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setPosts(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter uppercase">
              {f('blg_h1_line1', 'БЛОГ')} <span className="text-primary">{f('blg_h1_accent', 'DIGITALIZE')}</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              {f('blg_header_desc', 'Ділимося експертизою, кейсами та трендами світу digital-маркетингу. Тільки корисний контент для вашого бізнесу.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-100 mb-6" />
                  <div className="h-4 bg-gray-100 rounded mb-3 w-1/2" />
                  <div className="h-6 bg-gray-100 rounded mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-400 py-20">Поки немає публікацій.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post, i) => {
                const image    = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '';
                const author   = post._embedded?.author?.[0]?.name ?? '';
                const category = post._embedded?.['wp:term']?.[0]?.[0]?.name ?? '';
                const excerpt  = stripHtml(post.excerpt.rendered);
                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden mb-6 aspect-video">
                      {image
                        ? <img src={image} alt={post.title.rendered} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                        : <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 text-5xl font-bold">D</div>
                      }
                      {category && (
                        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                          {category}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      {author && (
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{author}</span>
                        </div>
                      )}
                    </div>
                    <h3
                      className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <p className="text-gray-600 mb-6 line-clamp-2">{excerpt}</p>
                    <Button variant="link" className="p-0 text-primary font-bold group" onClick={() => { window.location.href = post.link; }}>
                      Читати далі <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Subscription */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-16 h-16 mx-auto mb-8 opacity-50" />
          <h2 className="text-4xl font-bold mb-6 uppercase tracking-tighter">{f('blg_sub_title', 'ПІДПИШІТЬСЯ НА ДАЙДЖЕСТ')}</h2>
          <p className="text-xl mb-10 opacity-90">{f('blg_sub_subtitle', 'Отримуйте кращі матеріали та ексклюзивні поради раз на тиждень.')}</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={e => e.preventDefault()}>
            <Input placeholder="Ваш Email" className="bg-white text-brand-black rounded-none h-16 px-6 text-lg border-none" />
            <Button className="bg-brand-black text-white hover:bg-gray-900 rounded-none h-16 px-10 text-lg font-bold uppercase tracking-widest">
              {f('blg_sub_button', 'Підписатися')}
            </Button>
          </form>
          <p className="mt-6 text-sm opacity-60">{f('blg_sub_notice', 'Жодного спаму. Тільки користь. Відписатися можна в будь-який момент.')}</p>
        </div>
      </section>

      {/* Authors */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center uppercase tracking-widest">{f('blg_authors_title', 'НАШІ АВТОРИ')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {authors.map((author: any, i: number) => (
              <div key={i} className="text-center p-8 border border-gray-100">
                {author.image
                  ? <img src={author.image} alt={author.name} className="w-24 h-24 rounded-full mx-auto mb-6 grayscale object-cover" />
                  : <img src={`https://i.pravatar.cc/150?img=${i + 20}`} alt={author.name} className="w-24 h-24 rounded-full mx-auto mb-6 grayscale" referrerPolicy="no-referrer" />
                }
                <h3 className="text-xl font-bold mb-2">{author.name}</h3>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">{author.role}</p>
                <p className="text-gray-500">{author.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">{f('blg_faq_title', 'ПИТАННЯ ПО БЛОГУ')}</h2>
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
