import { motion } from "motion/react";

export default function Page() {
  const post = typeof window !== 'undefined' ? window.wpPage : null;

  return (
    <div className="flex flex-col">
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter uppercase"
          >
            {post?.title ?? ''}
          </motion.h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none text-gray-700 prose-headings:font-bold prose-headings:text-brand-black prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: post?.content ?? '' }}
          />
        </div>
      </section>
    </div>
  );
}
