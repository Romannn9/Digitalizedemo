import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { appendCf7HiddenFields, CF7_FORM_ID, getCf7FeedbackUrl, parseCf7FeedbackBody } from "@/src/lib/cf7";

interface Props {
  buttonLabel?: string;
}

function getInitialFields() {
  const fields = { name: '', email: '', phone: '', website: '', message: '' };
  if (typeof window === 'undefined') return fields;

  const params = new URLSearchParams(window.location.search);
  const selectedPackage = params.get('package');
  const selectedService = params.get('service');
  const selectedTopic = params.get('topic');

  if (selectedPackage) {
    fields.message = `Цікавить пакет: ${selectedPackage}`;
  } else if (selectedService) {
    fields.message = `Цікавить послуга: ${selectedService}`;
  } else if (selectedTopic) {
    fields.message = `Тема звернення: ${selectedTopic}`;
  }

  return fields;
}

export default function ContactForm({ buttonLabel = 'Надіслати запит' }: Props) {
  const [fields, setFields] = useState(getInitialFields);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot caught

    setStatus('loading');
    const data = new FormData();
    appendCf7HiddenFields(data, CF7_FORM_ID);
    data.append('your-name',    fields.name);
    data.append('your-email',   fields.email);
    data.append('your-phone',   fields.phone);
    data.append('your-website', fields.website);
    data.append('your-message', fields.message);

    try {
      const res = await fetch(getCf7FeedbackUrl(CF7_FORM_ID), {
        method: 'POST',
        body: data,
        credentials: 'same-origin',
      });
      const raw = await res.text();
      let json: Record<string, unknown>;
      try {
        json = parseCf7FeedbackBody(raw);
      } catch {
        setStatus('error');
        setErrorMsg(
          res.ok
            ? 'Некоректна відповідь сервера. Спробуйте ще раз.'
            : `Помилка сервера (${res.status}). Спробуйте пізніше.`
        );
        return;
      }

      if (json.status === 'mail_sent') {
        setStatus('success');
        setFields({ name: '', email: '', phone: '', website: '', message: '' });
        return;
      }

      setStatus('error');
      const msg =
        typeof json.message === 'string'
          ? json.message
          : typeof json.code === 'string'
            ? json.code
            : '';
      setErrorMsg(msg || 'Помилка надсилання. Спробуйте ще раз.');
    } catch {
      setStatus('error');
      setErrorMsg('Помилка з\'єднання. Спробуйте ще раз.');
    }
  };

  if (status === 'success') {
    return (
      <Card className="p-8 md:p-12 shadow-2xl rounded-2xl flex items-center justify-center min-h-[400px]" style={{ border: '1px solid #EBE2D6', background: '#fff' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#E31E24' }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-heading text-2xl font-bold mb-2" style={{ color: '#1A1613' }}>Заявку надіслано!</h3>
          <p style={{ color: '#6E655B' }}>Наш експерт зв'яжеться з вами протягом 30 хвилин.</p>
          <button onClick={() => setStatus('idle')} className="mt-6 text-[15px] hover:underline" style={{ color: '#E31E24' }}>
            Надіслати ще одну заявку
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 md:p-12 shadow-2xl rounded-2xl" style={{ border: '1px solid #EBE2D6', background: '#fff' }}>
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
            <Input required value={fields.name} onChange={set('name')} placeholder="Іван Іванов" className="rounded-xl h-12 focus:border-primary" style={{ borderColor: '#DCD2C4', background: '#FBF9F5' }} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider">Телефон</label>
            <Input value={fields.phone} onChange={set('phone')} placeholder="+38 (0__) ___ __ __" className="rounded-xl h-12 focus:border-primary" style={{ borderColor: '#DCD2C4', background: '#FBF9F5' }} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">Email *</label>
          <Input required type="email" value={fields.email} onChange={set('email')} placeholder="example@mail.com" className="rounded-xl h-12 focus:border-primary" style={{ borderColor: '#DCD2C4', background: '#FBF9F5' }} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">Ваш сайт (якщо є)</label>
          <Input value={fields.website} onChange={set('website')} placeholder="https://..." className="rounded-xl h-12 focus:border-primary" style={{ borderColor: '#DCD2C4', background: '#FBF9F5' }} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">Повідомлення</label>
          <Textarea value={fields.message} onChange={set('message')} placeholder="Розкажіть коротко про ваші цілі..." className="rounded-xl min-h-[120px] focus:border-primary" style={{ borderColor: '#DCD2C4', background: '#FBF9F5' }} />
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-sm">{errorMsg}</p>
        )}

        <Button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-8 rounded-xl font-bold uppercase tracking-widest disabled:opacity-60"
        >
          {status === 'loading' ? 'Надсилається...' : buttonLabel}
        </Button>

        <p className="text-[13px] text-center" style={{ color: '#9C9184' }}>
          Натискаючи кнопку, ви погоджуєтесь з політикою конфіденційності.
        </p>
      </form>
    </Card>
  );
}
