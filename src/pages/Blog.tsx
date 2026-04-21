import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Calendar, User, Mail, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { decodeHtml, stripHtml, formatDate } from "../utils/wp";

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

function getPostMeta(post: WpPost) {
  return {
    image:    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '',
    author:   decodeHtml(post._embedded?.author?.[0]?.name ?? ''),
    category: decodeHtml(post._embedded?.['wp:term']?.[0]?.[0]?.name ?? ''),
    excerpt:  stripHtml(post.excerpt.rendered),
  };
}

function PostImage({ image, title, className = '' }: { image: string; title: string; className?: string }) {
  return image
    ? <img src={image} alt={title} className={`object-cover w-full h-full ${className}`} />
    : <div className="w-full h-full bg-gray-800 flex items-center justify-center text-primary text-5xl font-bold">D</div>;
}

export default function Blog() {
  const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
  const f   = (key: string, fb: any) => { const v = acf[key]; return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fb; };
  const rep = (key: string, fb: any[]) => { const v = acf[key]; return (Array.isArray(v) && v.length > 0) ? v : fb; };

  const authors  = rep('blg_authors',   FB_AUTHORS);
  const faqItems = rep('blg_faq_items', FB_FAQ);

  const [posts, setPosts]         = useState<WpPost[]>([]);
  const [loading, setLoading]     = useState(true);
  const [sliderIdx, setSliderIdx] = useState(0);
  const [search, setSearch]       = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const apiBase = (typeof window !== 'undefined' && window.wpSite?.apiUrl) ? window.wpSite.apiUrl : '/wp-json/';
    fetch(`${apiBase}wp/v2/posts?_embed&per_page=20&status=publish`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setPosts(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Slide groups: each slide = [featured, mini1, mini2]
  const slideGroups: WpPost[][] = [];
  for (let i = 0; i < posts.length; i += 3) {
    const g = posts.slice(i, i + 3);
    if (g.length > 0) slideGroups.push(g);
  }
  const totalSlides = slideGroups.length;

  // Auto-advance
  useEffect(() => {
    if (totalSlides < 2) return;
    const t = setInterval(() => setSliderIdx(i => (i + 1) % totalSlides), 4500);
    return () => clearInterval(t);
  }, [totalSlides]);

  const currentGroup  = slideGroups[sliderIdx % Math.max(totalSlides, 1)] ?? [];
  const featuredSlide = currentGroup[0] ?? null;
  const miniSlides    = currentGroup.slice(1, 3);

  const allCategories = Array.from(new Set(
    posts.flatMap(p => p._embedded?.['wp:term']?.[0]?.map(t => decodeHtml(t.name)) ?? [])
  )).filter(Boolean);

  const gridPosts = posts.slice(1).filter(p => {
    const title = decodeHtml(p.title.rendered).toLowerCase();
    const cats  = p._embedded?.['wp:term']?.[0]?.map(t => decodeHtml(t.name)) ?? [];
    return (!search || title.includes(search.toLowerCase()) || stripHtml(p.excerpt.rendered).toLowerCase().includes(search.toLowerCase()))
      && (!activeCategory || cats.includes(activeCategory));
  });

  const recentPosts = posts.slice(0, 5);

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

      {/* Hero Slider — окрема секція, поза чорним фоном */}
      {!loading && slideGroups.length > 0 && (
        <section className="bg-gray-50 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden" style={{ minHeight: '480px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={sliderIdx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-2"
                >
                  {/* Featured — 2/3 */}
                  {featuredSlide && (() => {
                    const { image, author, category, excerpt } = getPostMeta(featuredSlide);
                    return (
                      <a
                        href={featuredSlide.link}
                        className="relative group overflow-hidden lg:col-span-2"
                        style={{ minHeight: '480px' }}
                      >
                        <div className="absolute inset-0">
                          <PostImage image={image} title={featuredSlide.title.rendered} className="group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-end p-8">
                          {category && (
                            <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4 w-fit">
                              {category}
                            </span>
                          )}
                          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                            {decodeHtml(featuredSlide.title.rendered)}
                          </h2>
                          <p className="text-gray-300 text-sm line-clamp-2 mb-4 max-w-xl">{excerpt}</p>
                          <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(featuredSlide.date)}</span>
                            {author && <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{author}</span>}
                          </div>
                        </div>
                      </a>
                    );
                  })()}

                  {/* Mini posts — 1/3 */}
                  <div className="flex flex-col gap-2">
                    {miniSlides.map((post) => {
                      const { image, category } = getPostMeta(post);
                      return (
                        <a
                          key={post.id}
                          href={post.link}
                          className="relative group overflow-hidden flex-1"
                          style={{ minHeight: '236px' }}
                        >
                          <div className="absolute inset-0">
                            <PostImage image={image} title={post.title.rendered} className="group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                          </div>
                          <div className="relative z-10 h-full flex flex-col justify-end p-5">
                            {category && (
                              <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 mb-2 w-fit">
                                {category}
                              </span>
                            )}
                            <h3 className="text-base font-bold text-white leading-snug group-hover:text-primary transition-colors">
                              {decodeHtml(post.title.rendered)}
                            </h3>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              {totalSlides > 1 && (
                <div className="flex items-center justify-between mt-4">
                  {/* Dots */}
                  <div className="flex gap-2">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSliderIdx(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === sliderIdx % totalSlides ? 'w-8 bg-primary' : 'w-4 bg-gray-300'}`}
                      />
                    ))}
                  </div>
                  {/* Arrows */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => setSliderIdx(i => (i - 1 + totalSlides) % totalSlides)}
                      className="bg-white border border-gray-200 hover:bg-primary hover:text-white text-gray-600 w-8 h-8 flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSliderIdx(i => (i + 1) % totalSlides)}
                      className="bg-white border border-gray-200 hover:bg-primary hover:text-white text-gray-600 w-8 h-8 flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Posts grid + Sidebar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Posts grid – 2/3 */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-video bg-gray-100 mb-4" />
                      <div className="h-3 bg-gray-100 rounded mb-2 w-1/3" />
                      <div className="h-5 bg-gray-100 rounded mb-2" />
                      <div className="h-3 bg-gray-100 rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : gridPosts.length === 0 ? (
                <p className="text-gray-400 py-12">
                  {posts.length === 0 ? 'Поки немає публікацій.' : 'Нічого не знайдено.'}
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {gridPosts.map((post, i) => {
                    const { image, author, category, excerpt } = getPostMeta(post);
                    return (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group"
                      >
                        <a href={post.link} className="block">
                          <div className="relative overflow-hidden mb-5 aspect-video">
                            <PostImage image={image} title={post.title.rendered} className="group-hover:scale-105 transition-transform duration-700" />
                            {category && (
                              <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5">
                                {category}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.date)}</span>
                            {author && <span className="flex items-center gap-1"><User className="w-3 h-3" />{author}</span>}
                          </div>
                          <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                            {decodeHtml(post.title.rendered)}
                          </h3>
                          <p className="text-gray-500 text-sm line-clamp-2 mb-4">{excerpt}</p>
                        </a>
                        <a
                          href={post.link}
                          className="inline-flex items-center text-primary text-sm font-bold hover:gap-2 gap-1 transition-all"
                        >
                          Читати <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </motion.article>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sidebar – 1/3 */}
            <aside className="space-y-10">
              {/* Search */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Пошук</h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Пошук по блогу..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 rounded-none border-gray-200 h-11"
                  />
                </div>
              </div>

              {/* Recent posts */}
              {recentPosts.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">
                    Останні публікації
                  </h4>
                  <div className="space-y-4">
                    {recentPosts.map(post => {
                      const { image, category } = getPostMeta(post);
                      return (
                        <a key={post.id} href={post.link} className="flex gap-3 group">
                          <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-gray-100">
                            <PostImage image={image} title={post.title.rendered} className="group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            {category && <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">{category}</p>}
                            <p className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                              {decodeHtml(post.title.rendered)}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{formatDate(post.date)}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Categories */}
              {allCategories.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">
                    Категорії
                  </h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveCategory('')}
                      className={`block w-full text-left text-sm py-1.5 px-2 transition-colors ${!activeCategory ? 'text-primary font-bold bg-primary/5' : 'text-gray-600 hover:text-primary'}`}
                    >
                      Всі публікації
                    </button>
                    {allCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat === activeCategory ? '' : cat)}
                        className={`block w-full text-left text-sm py-1.5 px-2 transition-colors ${activeCategory === cat ? 'text-primary font-bold bg-primary/5' : 'text-gray-600 hover:text-primary'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
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
