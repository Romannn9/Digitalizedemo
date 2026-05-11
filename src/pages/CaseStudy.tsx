import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Building2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { decodeHtml, formatDate, stripHtml } from "../utils/wp";

export default function CaseStudy() {
  const post = typeof window !== "undefined" ? window.wpPage : null;
  const acf = typeof window !== "undefined" ? window.wpAcf ?? {} : {};
  const client = typeof acf.case_client_name === "string" ? acf.case_client_name : "";
  const industry = typeof acf.case_industry === "string" ? acf.case_industry : "";
  const roi = typeof acf.case_roi === "string" ? acf.case_roi : "";
  const cpa = typeof acf.case_cpa === "string" ? acf.case_cpa : "";
  const roas = typeof acf.case_roas === "string" ? acf.case_roas : "";

  useEffect(() => {
    if (!post?.title || typeof document === "undefined") return;
    const payload = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: stripHtml(post.title),
      image: post.image || undefined,
      datePublished: post.date || undefined,
      author: post.author ? { "@type": "Person", name: post.author } : undefined,
      description: post.excerpt ? stripHtml(post.excerpt) : undefined,
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-digitalize-case-jsonld", "1");
    el.textContent = JSON.stringify(payload);
    document.head.appendChild(el);
    return () => {
      document.head.querySelectorAll("script[data-digitalize-case-jsonld]").forEach((n) => n.remove());
    };
  }, [post?.title, post?.image, post?.date, post?.author, post?.excerpt]);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-400 text-xl">Кейс не знайдено.</p>
      </div>
    );
  }

  const stats = [
    { label: "ROI", value: roi },
    { label: "CPA", value: cpa },
    { label: "ROAS", value: roas },
  ].filter((s) => s.value);

  return (
    <div className="flex flex-col">
      <section className="py-20 md:py-28 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        {post.image ? (
          <div className="absolute inset-0">
            <img src={post.image} alt="" className="w-full h-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/90 to-brand-black" />
          </div>
        ) : null}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {post.categories && post.categories.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((cat, i) => (
                  <span
                    key={i}
                    className="inline-block bg-primary/25 border border-primary/40 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1"
                  >
                    {decodeHtml(cat)}
                  </span>
                ))}
              </div>
            ) : null}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              {decodeHtml(post.title)}
            </h1>
            {(client || industry) && (
              <div className="flex flex-wrap gap-6 text-gray-300 text-sm mb-8">
                {client ? (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{decodeHtml(client)}</span>
                  </div>
                ) : null}
                {industry ? (
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary shrink-0" />
                    <span>{decodeHtml(industry)}</span>
                  </div>
                ) : null}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
              {post.date ? (
                <span>{formatDate(post.date)}</span>
              ) : null}
            </div>
          </motion.div>
        </div>
      </section>

      {stats.length > 0 ? (
        <section className="border-b border-border bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{s.label}</p>
                  <p className="text-3xl md:text-4xl font-bold text-brand-black font-heading">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.image ? (
            <div className="mb-12 -mt-4 rounded-sm overflow-hidden shadow-2xl border border-border aspect-video">
              <img src={post.image} alt={decodeHtml(post.title)} className="w-full h-full object-cover" />
            </div>
          ) : null}
          {post.excerpt ? (
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 border-l-4 border-primary pl-6">
              {stripHtml(post.excerpt)}
            </p>
          ) : null}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg max-w-none text-foreground prose-headings:font-bold prose-headings:font-heading prose-headings:text-brand-black prose-a:text-primary prose-strong:text-brand-black"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-16 pt-8 border-t border-border">
            <a href="/cases/">
              <Button
                variant="outline"
                className="border-brand-black text-brand-black hover:bg-brand-black hover:text-white rounded-none px-8 py-6 gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Усі кейси
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
