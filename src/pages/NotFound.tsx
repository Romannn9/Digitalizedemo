import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-4"
      >
        <p className="text-[10rem] md:text-[16rem] font-bold leading-none tracking-tighter text-white/5 select-none absolute inset-0 flex items-center justify-center">
          404
        </p>
        <div className="relative z-10">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-6 block">Помилка 404</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter uppercase">
            СТОРІНКУ<br /><span className="text-primary">НЕ ЗНАЙДЕНО</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-lg mx-auto">
            Схоже, ця сторінка переїхала або ніколи не існувала. Але ми точно існуємо — і готові допомогти.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-white px-10 py-6 rounded-none font-bold uppercase tracking-widest hover:bg-primary/90"
              onClick={() => { window.location.href = '/'; }}
            >
              На головну
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-transparent hover:bg-white/10 px-10 py-6 rounded-none font-bold uppercase tracking-widest gap-2"
              onClick={() => history.back()}
            >
              <ArrowLeft className="w-4 h-4" /> Назад
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
