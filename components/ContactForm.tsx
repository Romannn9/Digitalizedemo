import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CF7_FORM_ID = 41;

interface Props {
  buttonLabel?: string;
}

export default function ContactForm({ buttonLabel = 'Надіслати запит' }: Props) {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', website: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot caught

    setStatus('loading');
    const apiBase = window.wpSite?.apiUrl ?? '/wp-json/';
    const data = new FormData();
    data.append('your-name',    fields.name);
    data.append('your-email',   fields.email);
    data.append('your-phone',   fields.phone);
    data.append('your-website', fields.website);
    data.append('your-message', fields.message);

    try {
      const res = await fetch(`${apiBase}contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`, {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.status === 'mail_sent') {
        setStatus('success');
        setFields({ name: '', email: '', phone: '', website: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(json.message ?? 'Помилка надсилання. Спробуйте ще раз.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Помилка з\'єднання. Спробуйте ще раз.');
    }
  };

  if (status === 'success') {
    return (
      <Card className="p-8 md:p-12 border-none shadow-2xl rounded-none flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Заявку надіслано!</h3>
          <p className="text-gray-500">Наш експерт зв'яжеться з вами протягом 30 хвилин.</p>
          <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-primary hover:underline">
            Надіслати ще одну заявку
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 md:p-12 border-none shadow-2xl rounded-none">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot — приховане поле, яке заповнюють лише боти */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
          <input
            type="text"
            name="_hp_website"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider">Ваше ім'я *</label>
            <Input required value={fields.name} onChange={set('name')} placeholder="Іван Іванов" className="rounded-none border-gray-300 h-12 focus:border-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider">Телефон</label>
            <Input value={fields.phone} onChange={set('phone')} placeholder="+38 (0__) ___ __ __" className="rounded-none border-gray-300 h-12 focus:border-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">Email *</label>
          <Input required type="email" value={fields.email} onChange={set('email')} placeholder="example@mail.com" className="rounded-none border-gray-300 h-12 focus:border-primary" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">Ваш сайт (якщо є)</label>
          <Input value={fields.website} onChange={set('website')} placeholder="https://..." className="rounded-none border-gray-300 h-12 focus:border-primary" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">Повідомлення</label>
          <Textarea value={fields.message} onChange={set('message')} placeholder="Розкажіть коротко про ваші цілі..." className="rounded-none border-gray-300 min-h-[120px] focus:border-primary" />
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-sm">{errorMsg}</p>
        )}

        <Button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-8 rounded-none font-bold uppercase tracking-widest disabled:opacity-60"
        >
          {status === 'loading' ? 'Надсилається...' : buttonLabel}
        </Button>

        <p className="text-xs text-gray-400 text-center">
          Натискаючи кнопку, ви погоджуєтесь з політикою конфіденційності.
        </p>
      </form>
    </Card>
  );
}
