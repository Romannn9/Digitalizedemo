import React, { useEffect } from "react";
import { ArrowLeft, CalendarDays, Tags, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { C, COND, SANS, ThemeStyles, wrap } from "@/src/lib/theme";
import { decodeHtml, formatDate, stripHtml } from "../utils/wp";

export default function Post() {
  const post = typeof window !== "undefined" ? window.wpPage : null;

  useEffect(() => {
    if (!post?.title || typeof document === "undefined") return;
    const payload = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: stripHtml(post.title),
      image: post.image || undefined,
      datePublished: post.date || undefined,
      author: post.author ? { "@type": "Person", name: post.author } : undefined,
      description: post.excerpt ? stripHtml(post.excerpt) : undefined,
      mainEntityOfPage: typeof window !== "undefined" ? window.location.href : undefined,
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-digitalize-post-jsonld", "1");
    el.textContent = JSON.stringify(payload);
    document.head.appendChild(el);
    return () => {
      document.head.querySelectorAll("script[data-digitalize-post-jsonld]").forEach((n) => n.remove());
    };
  }, [post?.title, post?.image, post?.date, post?.author, post?.excerpt]);

  if (!post) {
    return (
      <div style={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg, color: C.body }}>
        <p style={{ fontFamily: COND, fontSize: 28, fontWeight: 700, margin: 0 }}>Статтю не знайдено.</p>
      </div>
    );
  }

  const title = decodeHtml(post.title);
  const excerpt = post.excerpt ? stripHtml(post.excerpt) : "";
  const categories = Array.isArray(post.categories) ? post.categories : [];

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: SANS, overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
      <ThemeStyles />
      <style>{`
        .dz-post-content {
          color: ${C.soft};
          font-size: 18px;
          line-height: 1.78;
        }
        .dz-post-content > *:first-child { margin-top: 0; }
        .dz-post-content > *:last-child { margin-bottom: 0; }
        .dz-post-content h2,
        .dz-post-content h3,
        .dz-post-content h4 {
          font-family: ${COND};
          color: ${C.ink};
          font-weight: 800;
          line-height: 1.08;
          text-transform: uppercase;
          margin: 48px 0 18px;
          letter-spacing: -0.005em;
        }
        .dz-post-content h2 { font-size: clamp(30px, 4vw, 44px); }
        .dz-post-content h3 { font-size: clamp(24px, 3vw, 32px); }
        .dz-post-content p { margin: 0 0 22px; }
        .dz-post-content a { color: ${C.red}; font-weight: 700; text-decoration: none; }
        .dz-post-content a:hover { text-decoration: underline; }
        .dz-post-content ul,
        .dz-post-content ol { margin: 0 0 28px; padding-left: 26px; }
        .dz-post-content li { margin: 10px 0; }
        .dz-post-content blockquote {
          margin: 36px 0;
          padding: 24px 28px;
          border-left: 4px solid ${C.red};
          background: #fff;
          color: ${C.ink};
          box-shadow: 0 20px 45px -34px rgba(60,45,30,0.35);
        }
        .dz-post-content img {
          width: 100%;
          height: auto;
          border-radius: 18px;
          border: 1px solid ${C.border};
          box-shadow: 0 24px 60px -38px rgba(60,45,30,0.45);
          margin: 34px 0;
        }
        .dz-post-content figure { margin: 38px 0; }
        .dz-post-content figcaption {
          color: ${C.muted};
          font-size: 14px;
          line-height: 1.5;
          margin-top: 10px;
        }
        .dz-post-hero-body {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 54px;
          align-items: center;
        }
        .dz-post-meta {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        @media (max-width: 820px) {
          .dz-post-hero-body { grid-template-columns: 1fr !important; gap: 34px !important; }
          .dz-post-excerpt { display: none !important; }
          .dz-post-meta { grid-template-columns: 1fr; }
        }
      `}</style>

      <header style={{ borderBottom: `1px solid ${C.border}`, background: `linear-gradient(180deg, ${C.alt} 0%, ${C.bg} 100%)` }}>
        <div style={{ ...wrap, padding: "72px 24px 58px" }}>
          <div>
            {categories.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                {categories.map((cat, i) => (
                  <span key={i} style={{ border: `1px solid ${C.redSoftBorder}`, background: C.redSoft, color: C.redDark, borderRadius: 999, padding: "7px 13px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {decodeHtml(cat)}
                  </span>
                ))}
              </div>
            ) : null}
            <h1 style={{ fontFamily: COND, fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 0.98, fontWeight: 800, letterSpacing: "-0.005em", textTransform: "uppercase", margin: "0 0 30px", color: C.ink, maxWidth: 980 }}>
              {title}
            </h1>
          </div>

          <div className="dz-post-hero-body">
            <div>
              {excerpt ? (
                <p className="dz-post-excerpt" style={{ fontSize: 20, lineHeight: 1.62, color: C.body, maxWidth: 680, margin: "0 0 30px" }}>{excerpt}</p>
              ) : null}
              <div className="dz-post-meta">
                {post.date ? <Meta icon={<CalendarDays size={18} />} label="Дата" value={formatDate(post.date)} /> : null}
                {post.author ? <Meta icon={<UserRound size={18} />} label="Автор" value={decodeHtml(post.author)} /> : null}
                {categories.length > 0 ? <Meta icon={<Tags size={18} />} label="Розділ" value={decodeHtml(categories[0])} /> : null}
              </div>
            </div>

            {post.image ? (
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: "8% -3% -6% 9%", background: C.redSoft, borderRadius: 24, transform: "rotate(-2deg)" }} />
                <img src={post.image} alt={title} style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block", borderRadius: 22, border: `1px solid ${C.border}`, boxShadow: "0 34px 80px -42px rgba(60,45,30,0.55)" }} />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <section style={{ ...wrap, padding: "64px 24px 92px" }}>
        <article>
          <div className="dz-post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div style={{ marginTop: 54, paddingTop: 28, borderTop: `1px solid ${C.border}` }}>
            <a href="/blog/" style={{ textDecoration: "none" }}>
              <Button variant="outline" className="gap-2 rounded-md border-brand-black px-7 py-6 text-brand-black hover:bg-brand-black hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Усі статті
              </Button>
            </a>
          </div>
        </article>
      </section>
    </div>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px" }}>
      <span style={{ color: C.red, display: "inline-flex", flexShrink: 0 }}>{icon}</span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: C.muted, lineHeight: 1.1 }}>{label}</span>
        <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: C.ink, marginTop: 4, lineHeight: 1.25 }}>{value}</span>
      </span>
    </div>
  );
}
