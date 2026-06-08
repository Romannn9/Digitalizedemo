import { Users, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  const acf = typeof window !== 'undefined' ? (window.wpAcf ?? {}) : {};
  const f   = (key: string, fb: any) => { const v = acf[key]; return (v !== undefined && v !== null && v !== '' && v !== false) ? v : fb; };

  return (
    <div className="flex flex-col">
      {/* Form + Info */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Info */}
            <div>
              <div className="space-y-10 mb-12">
                {[
                  { icon: <Phone className="w-6 h-6" />, label: "Телефон", value: f('cnt_phone',   '+38 (044) 123-45-67') },
                  { icon: <Mail  className="w-6 h-6" />, label: "Email",   value: f('cnt_email',   'hello@digitalize.ua') },
                  { icon: <MapPin className="w-6 h-6" />, label: "Адреса", value: f('cnt_address', 'Київ, вул. Велика Васильківська, 100') },
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
                  { icon: <Users className="w-6 h-6" />,      label: "Персональний менеджер",      desc: "Завжди на зв'язку для вирішення ваших питань." },
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
            <ContactForm buttonLabel={f('cnt_form_button', 'Надіслати запит')} />
          </div>
        </div>
      </section>
    </div>
  );
}
