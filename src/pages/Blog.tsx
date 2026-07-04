import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Calendar, User, Mail, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { decodeHtml, stripHtml, formatDate } from "../utils/wp";
import { C, SANS, COND, wrap, eyebrowStyle, h2Style, ThemeStyles } from "@/src/lib/theme";

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
    ? <img src={image} alt={title} referrerPolicy="no-referrer" className={`object-cover w-full h-full ${className}`} />
    : <div className="w-full h-full flex items-center justify-center font-heading text-5xl font-bold" style={{ background: '#F0E6D8', color: C.border2 }}>D</div>;
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
  const [openFaq, setOpenFaq]     = useState(0);

  useEffect(() => {
    const apiBase = (typeof window !== 'undefined' && window.wpSite?.apiUrl) ? window.wpSite.apiUrl : '/wp-json/';
    fetch(`${apiBase}wp/v2/posts?_embed&per_page=20&status=publish`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setPosts(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const slideGroups: WpPost[][] = [];
  for (let i = 0; i < posts.length; i += 3) {
    const g = posts.slice(i, i + 3);
    if (g.length > 0) slideGroups.push(g);
  }
  const totalSlides = slideGroups.length;

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

  const catBtn = (active: boolean): React.CSSProperties => ({
    display: 'block', width: '100%', textAlign: 'left', fontSize: 15, padding: '8px 12px',
    borderRadius: 10, cursor: 'pointer', font: 'inherit', border: 'none', transition: 'all .15s',
    background: active ? C.redSoft : 'transparent',
    color: active ? C.redDark : C.body, fontWeight: active ? 700 : 400,
  });

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: SANS, overflowX: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
      <ThemeStyles />

      {/* HERO */}
      <header style={{ ...wrap, padding: '72px 24px 56px' }}>
        <div style={{ maxWidth: 760 }}>
          <div style={eyebrowStyle}>Блог</div>
          <h1 style={{ fontFamily: COND, fontSize: 'clamp(46px, 8vw, 82px)', lineHeight: 0.9, fontWeight: 800, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: '0 0 24px', color: C.ink }}>
            {f('blg_h1_line1', 'Блог')} <span style={{ color: C.red }}>{f('blg_h1_accent', 'Digitalize')}</span>
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.65, color: C.body, margin: 0 }}>
            {f('blg_header_desc', 'Ділимося експертизою, кейсами та трендами світу digital-маркетингу. Тільки корисний контент для вашого бізнесу.')}
          </p>
        </div>
      </header>

      {/* HERO SLIDER */}
      {!loading && slideGroups.length > 0 && (
        <section style={{ background: C.alt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ ...wrap, padding: '48px 24px' }}>
            <div style={{ position: 'relative', minHeight: 480 }}>
              <AnimatePresence mode="wait">
                <motion.div key={sliderIdx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45 }} className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {featuredSlide && (() => {
                    const { image, author, category, excerpt } = getPostMeta(featuredSlide);
                    return (
                      <a href={featuredSlide.link} className="relative group overflow-hidden lg:col-span-2 rounded-2xl" style={{ minHeight: 480 }}>
                        <div className="absolute inset-0">
                          <PostImage image={image} title={featuredSlide.title.rendered} className="group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,22,19,0.88), rgba(26,22,19,0.25) 45%, transparent)' }} />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-end p-8">
                          {category && <span className="inline-block text-white text-[13px] font-bold uppercase tracking-widest px-3 py-1 mb-4 w-fit rounded-full" style={{ background: C.red }}>{category}</span>}
                          <h2 className="font-heading text-2xl md:text-4xl font-extrabold uppercase text-white mb-4 leading-[1.05]">{decodeHtml(featuredSlide.title.rendered)}</h2>
                          <p className="text-[15px] line-clamp-2 mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.82)' }}>{excerpt}</p>
                          <div className="flex items-center gap-4 text-[14px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(featuredSlide.date)}</span>
                            {author && <span className="flex items-center gap-1"><User className="w-4 h-4" />{author}</span>}
                          </div>
                        </div>
                      </a>
                    );
                  })()}
                  <div className="flex flex-col gap-3">
                    {miniSlides.map((post) => {
                      const { image, category } = getPostMeta(post);
                      return (
                        <a key={post.id} href={post.link} className="relative group overflow-hidden flex-1 rounded-2xl" style={{ minHeight: 232 }}>
                          <div className="absolute inset-0">
                            <PostImage image={image} title={post.title.rendered} className="group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,22,19,0.82), transparent)' }} />
                          </div>
                          <div className="relative z-10 h-full flex flex-col justify-end p-5">
                            {category && <span className="inline-block text-white text-[12px] font-bold uppercase tracking-widest px-2 py-0.5 mb-2 w-fit rounded-full" style={{ background: C.red }}>{category}</span>}
                            <h3 className="font-heading text-lg font-bold text-white leading-snug">{decodeHtml(post.title.rendered)}</h3>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {totalSlides > 1 && (
                <div className="flex items-center justify-between mt-5">
                  <div className="flex gap-2">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                      <button key={i} onClick={() => setSliderIdx(i)} className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === sliderIdx % totalSlides ? 32 : 16, background: i === sliderIdx % totalSlides ? C.red : C.border2 }} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSliderIdx(i => (i - 1 + totalSlides) % totalSlides)} className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:text-white" style={{ background: '#fff', border: `1px solid ${C.border2}`, color: C.soft }}>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={() => setSliderIdx(i => (i + 1) % totalSlides)} className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:text-white" style={{ background: '#fff', border: `1px solid ${C.border2}`, color: C.soft }}>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* POSTS GRID + SIDEBAR */}
      <section style={{ ...wrap, padding: '80px 24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-video rounded-xl mb-4" style={{ background: C.alt }} />
                    <div className="h-3 rounded mb-2 w-1/3" style={{ background: C.alt }} />
                    <div className="h-5 rounded mb-2" style={{ background: C.alt }} />
                    <div className="h-3 rounded w-2/3" style={{ background: C.alt }} />
                  </div>
                ))}
              </div>
            ) : gridPosts.length === 0 ? (
              <p style={{ color: C.muted, padding: '48px 0', fontSize: 18 }}>{posts.length === 0 ? 'Поки немає публікацій.' : 'Нічого не знайдено.'}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {gridPosts.map((post, i) => {
                  const { image, author, category, excerpt } = getPostMeta(post);
                  return (
                    <motion.article key={post.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group">
                      <a href={post.link} className="block">
                        <div className="relative overflow-hidden mb-5 aspect-video rounded-xl" style={{ border: `1px solid ${C.border}` }}>
                          <PostImage image={image} title={post.title.rendered} className="group-hover:scale-105 transition-transform duration-700" />
                          {category && <span className="absolute top-3 left-3 text-white text-[12px] font-bold uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: C.red }}>{category}</span>}
                        </div>
                        <div className="flex items-center gap-3 text-[13px] mb-3" style={{ color: C.muted }}>
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(post.date)}</span>
                          {author && <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{author}</span>}
                        </div>
                        <h3 className="font-heading text-xl font-bold mb-3 leading-snug transition-colors group-hover:text-[#E31E24]" style={{ color: C.ink }}>{decodeHtml(post.title.rendered)}</h3>
                        <p className="text-[15px] line-clamp-2 mb-4" style={{ color: C.body }}>{excerpt}</p>
                      </a>
                      <a href={post.link} className="inline-flex items-center gap-1 text-[14px] font-bold uppercase tracking-wider hover:gap-2 transition-all" style={{ color: C.red }}>
                        Читати <ArrowRight className="w-4 h-4" />
                      </a>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>

          <aside className="space-y-10">
            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>Пошук</h4>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: C.muted }} />
                <Input placeholder="Пошук по блогу..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 rounded-xl h-11" style={{ borderColor: C.border2, background: '#fff' }} />
              </div>
            </div>

            {recentPosts.length > 0 && (
              <div>
                <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] mb-4 pb-2" style={{ color: C.muted, borderBottom: `1px solid ${C.border}` }}>Останні публікації</h4>
                <div className="space-y-4">
                  {recentPosts.map(post => {
                    const { image, category } = getPostMeta(post);
                    return (
                      <a key={post.id} href={post.link} className="flex gap-3 group">
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg" style={{ background: C.alt }}>
                          <PostImage image={image} title={post.title.rendered} className="group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {category && <p className="text-[12px] font-bold uppercase tracking-wider mb-1" style={{ color: C.red }}>{category}</p>}
                          <p className="text-[15px] font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-[#E31E24]" style={{ color: C.ink }}>{decodeHtml(post.title.rendered)}</p>
                          <p className="text-[13px] mt-1" style={{ color: C.muted }}>{formatDate(post.date)}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {allCategories.length > 0 && (
              <div>
                <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] mb-4 pb-2" style={{ color: C.muted, borderBottom: `1px solid ${C.border}` }}>Категорії</h4>
                <div className="space-y-1">
                  <button onClick={() => setActiveCategory('')} style={catBtn(!activeCategory)}>Всі публікації</button>
                  {allCategories.map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat === activeCategory ? '' : cat)} style={catBtn(activeCategory === cat)}>{cat}</button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* SUBSCRIPTION */}
      <section style={{ ...wrap, padding: '20px 24px 96px' }}>
        <div style={{ background: C.red, borderRadius: 26, padding: '72px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 40px 80px -34px rgba(227,30,36,0.5)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.14), transparent 40%), radial-gradient(circle at 85% 85%, rgba(0,0,0,0.12), transparent 42%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
            <Mail className="w-14 h-14 mx-auto mb-6" style={{ color: 'rgba(255,255,255,0.85)' }} />
            <h2 style={{ fontFamily: COND, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.005em', color: '#fff', margin: '0 0 16px' }}>{f('blg_sub_title', 'Підпишіться на дайджест')}</h2>
            <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.9)', margin: '0 0 32px' }}>{f('blg_sub_subtitle', 'Отримуйте кращі матеріали та ексклюзивні поради раз на тиждень.')}</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={e => e.preventDefault()}>
              <Input placeholder="Ваш Email" className="rounded-xl h-14 px-5 text-lg border-none" style={{ background: '#fff', color: C.ink }} />
              <Button type="submit" className="rounded-xl h-14 px-9 text-lg font-bold uppercase tracking-wider hover:opacity-90" style={{ background: C.ink, color: '#fff' }}>
                {f('blg_sub_button', 'Підписатися')}
              </Button>
            </form>
            <p style={{ marginTop: 18, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{f('blg_sub_notice', 'Жодного спаму. Тільки користь. Відписатися можна в будь-який момент.')}</p>
          </div>
        </div>
      </section>

      {/* AUTHORS */}
      <section style={{ background: C.alt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ ...wrap, padding: '96px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={eyebrowStyle}>Автори</div>
            <h2 style={h2Style}>{f('blg_authors_title', 'Наші автори')}</h2>
          </div>
          <div className="dz-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {authors.map((author: any, i: number) => (
              <div key={i} className="dz-card dz-svc" style={{ textAlign: 'center', padding: 34, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18 }}>
                <img src={author.image || `https://i.pravatar.cc/150?img=${i + 20}`} alt={author.name} referrerPolicy="no-referrer" style={{ width: 96, height: 96, borderRadius: 999, margin: '0 auto 22px', objectFit: 'cover', border: `3px solid ${C.redSoftBorder}` }} />
                <h3 style={{ fontFamily: COND, fontSize: 22, fontWeight: 700, margin: '0 0 6px', color: C.ink }}>{author.name}</h3>
                <p style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.red, margin: '0 0 14px' }}>{author.role}</p>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: C.body, margin: 0 }}>{author.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={eyebrowStyle}>Часті питання</div>
          <h2 style={h2Style}>{f('blg_faq_title', 'Питання по блогу')}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {faqItems.map((item: any, i: number) => {
            const open = openFaq === i;
            return (
              <div key={i} style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(open ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '24px 26px', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', font: 'inherit' }}>
                  <span style={{ fontFamily: COND, fontSize: 19, fontWeight: 600, color: C.ink }}>{item.q}</span>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'transform .2s', transform: `rotate(${open ? 180 : 0}deg)` }}><path d="m6 9 6 6 6-6" /></svg>
                </button>
                {open ? <p style={{ margin: 0, padding: '0 26px 26px', fontSize: 16, lineHeight: 1.7, color: C.body }}>{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
