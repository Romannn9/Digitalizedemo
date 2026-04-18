import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { Users, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Зв'язатися
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              ОБГОВОРИМО<br />
              <span className="text-primary italic">ВАШ ПРОЄКТ?</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Заповніть форму, і наш експерт зв'яжеться з вами протягом 30 хвилин.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Info */}
            <div>
              <div className="space-y-10 mb-12">
                {[
                  { icon: <Phone className="w-6 h-6" />, label: "Телефон", value: "+38 (044) 123-45-67" },
                  { icon: <Mail className="w-6 h-6" />, label: "Email", value: "hello@digitalize.ua" },
                  { icon: <MapPin className="w-6 h-6" />, label: "Адреса", value: "Київ, вул. Велика Васильківська, 100" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{item.label}</p>
                      <p className="text-gray-500">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {[
                  { icon: <Users className="w-6 h-6" />, label: "Персональний менеджер", desc: "Завжди на зв'язку для вирішення ваших питань." },
                  { icon: <ShieldCheck className="w-6 h-6" />, label: "Гарантія конфіденційності", desc: "Ваші дані та стратегії під надійним захистом NDA." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{item.label}</p>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <Card className="p-8 md:p-12 border-none shadow-2xl rounded-none">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Ваше ім'я</label>
                    <Input placeholder="Іван Іванов" className="rounded-none border-gray-300 h-12 focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Телефон</label>
                    <Input placeholder="+38 (0__) ___ __ __" className="rounded-none border-gray-300 h-12 focus:border-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">Email</label>
                  <Input placeholder="example@mail.com" className="rounded-none border-gray-300 h-12 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">Ваш сайт (якщо є)</label>
                  <Input placeholder="https://..." className="rounded-none border-gray-300 h-12 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">Повідомлення</label>
                  <Textarea placeholder="Розкажіть коротко про ваші цілі..." className="rounded-none border-gray-300 min-h-[120px] focus:border-primary" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-8 rounded-none font-bold uppercase tracking-widest">
                  Надіслати запит
                </Button>
                <p className="text-xs text-gray-400 text-center">
                  Натискаючи кнопку, ви погоджуєтесь з політикою конфіденційності.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
