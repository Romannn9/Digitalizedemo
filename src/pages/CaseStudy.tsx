import { useEffect } from "react";
import { ArrowLeft, Building2, CalendarDays, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { C, COND, SANS, ThemeStyles, wrap } from "@/src/lib/theme";
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
      <div style={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg, color: C.body }}>
        <p style={{ fontFamily: COND, fontSize: 28, fontWeight: 700, margin: 0 }}>Кейс не знайдено.</p>
      </div>
    );
  }

  const title = decodeHtml(post.title);
  const excerpt = post.excerpt ? stripHtml(post.excerpt) : "";
  const categories = Array.isArray(post.categories) ? post.categories : [];
  const stats = [
    { label: "ROI", value: roi },
    { label: "CPA", value: cpa },
    { label: "ROAS", value: roas },
  ].filter((s) => s.value);

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: SANS, overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
      <ThemeStyles />
      <style>{`
        .dz-case-content {
          color: ${C.soft};
          font-size: 18px;
          line-height: 1.78;
        }
        .dz-case-content > *:first-child { margin-top: 0; }
        .dz-case-content > *:last-child { margin-bottom: 0; }
        .dz-case-content h2,
        .dz-case-content h3,
        .dz-case-content h4 {
          font-family: ${COND};
          color: ${C.ink};
          font-weight: 800;
          line-height: 1.08;
          text-transform: uppercase;
          margin: 48px 0 18px;
          letter-spacing: -0.005em;
        }
        .dz-case-content h2 { font-size: clamp(30px, 4vw, 44px); }
        .dz-case-content h3 { font-size: clamp(24px, 3vw, 32px); }
        .dz-case-content p { margin: 0 0 22px; }
        .dz-case-content a { color: ${C.red}; font-weight: 700; text-decoration: none; }
        .dz-case-content a:hover { text-decoration: underline; }
        .dz-case-content ul,
        .dz-case-content ol { margin: 0 0 28px; padding-left: 26px; }
        .dz-case-content li { margin: 10px 0; }
        .dz-case-content blockquote {
          margin: 36px 0;
          padding: 24px 28px;
          border-left: 4px solid ${C.red};
          background: #fff;
          color: ${C.ink};
          box-shadow: 0 20px 45px -34px rgba(60,45,30,0.35);
        }
        .dz-case-content img {
          width: 100%;
          height: auto;
          border-radius: 18px;
          border: 1px solid ${C.border};
          box-shadow: 0 24px 60px -38px rgba(60,45,30,0.45);
          margin: 34px 0;
        }
        .dz-case-content figure { margin: 38px 0; }
        .dz-case-content figcaption {
          color: ${C.muted};
          font-size: 14px;
          line-height: 1.5;
          margin-top: 10px;
        }
        .dz-case-hero-body {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 54px;
          align-items: center;
        }
        .dz-case-meta {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .dz-case-stats {
          display: grid;
          gap: 14px;
        }
        @media (max-width: 820px) {
          .dz-case-hero-body { grid-template-columns: 1fr !important; gap: 34px !important; }
          .dz-case-excerpt { display: none !important; }
          .dz-case-meta { grid-template-columns: 1fr; }
          .dz-case-stats { grid-template-columns: 1fr !important; }
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

          <div className="dz-case-hero-body">
            <div>
            {excerpt ? (
              <p className="dz-case-excerpt" style={{ fontSize: 20, lineHeight: 1.62, color: C.body, maxWidth: 680, margin: "0 0 30px" }}>{excerpt}</p>
            ) : null}
            <div className="dz-case-meta">
              {client ? <Meta icon={<Building2 size={18} />} label="Клієнт" value={decodeHtml(client)} /> : null}
              {industry ? <Meta icon={<Layers size={18} />} label="Ніша" value={decodeHtml(industry)} /> : null}
              {post.date ? <Meta icon={<CalendarDays size={18} />} label="Дата" value={formatDate(post.date)} /> : null}
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

      {stats.length > 0 ? (
        <section style={{ ...wrap, padding: "34px 24px 0" }}>
          <div className="dz-case-stats" style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
            {stats.map((s) => (
              <div key={s.label} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px 26px", boxShadow: "0 18px 40px -34px rgba(60,45,30,0.35)" }}>
                <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.16em", color: C.muted, margin: "0 0 6px" }}>{s.label}</p>
                <p style={{ fontFamily: COND, fontSize: "clamp(32px, 5vw, 46px)", lineHeight: 1, fontWeight: 800, color: C.red, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section style={{ ...wrap, padding: "64px 24px 92px" }}>
        <article>
          <div className="dz-case-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div style={{ marginTop: 54, paddingTop: 28, borderTop: `1px solid ${C.border}` }}>
            <a href="/cases/" style={{ textDecoration: "none" }}>
              <Button variant="outline" className="gap-2 rounded-md border-brand-black px-7 py-6 text-brand-black hover:bg-brand-black hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Усі кейси
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
