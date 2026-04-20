import { motion } from "motion/react";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Post() {
  const post = typeof window !== 'undefined' ? window.wpPage : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-xl">Статтю не знайдено.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        {post.image && (
          <div className="absolute inset-0">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 to-brand-black" />
          </div>
        )}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 mb-6 flex-wrap">
                {post.categories.map((cat, i) => (
                  <span key={i} className="inline-block bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1">
                    {cat}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
              {post.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.image && (
            <div className="mb-12 -mt-8 aspect-video overflow-hidden shadow-2xl">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none text-gray-700 prose-headings:font-bold prose-headings:text-brand-black prose-a:text-primary prose-strong:text-brand-black"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-16 pt-8 border-t border-gray-100">
            <Button
              variant="outline"
              className="border-brand-black text-brand-black hover:bg-brand-black hover:text-white rounded-none px-8 py-6 gap-2"
              onClick={() => history.back()}
            >
              <ArrowLeft className="w-4 h-4" /> Назад до блогу
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
