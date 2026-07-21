import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appendCf7HiddenFields, CF7_FORM_ID, getCf7FeedbackUrl, parseCf7FeedbackBody } from "@/src/lib/cf7";

const CALLBACK_AUTO_OPEN_KEY = "digitalize_callback_seen";
const CALLBACK_AUTO_OPEN_DELAY_MS = 8000;

export default function CallbackWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(CALLBACK_AUTO_OPEN_KEY) === "1") return;

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(CALLBACK_AUTO_OPEN_KEY, "1");
      setOpen(true);
    }, CALLBACK_AUTO_OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const toggleOpen = () => {
    setOpen((value) => {
      const nextOpen = !value;
      if (nextOpen && typeof window !== "undefined") {
        window.sessionStorage.setItem(CALLBACK_AUTO_OPEN_KEY, "1");
      }
      return nextOpen;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    setStatus("loading");
    setErrorMsg("");

    const data = new FormData();
    appendCf7HiddenFields(data, CF7_FORM_ID);
    data.append("your-name", name.trim() || "Заявка на дзвінок");
    data.append("your-email", "callback@digitalize.local");
    data.append("your-phone", phone);
    data.append("your-website", "");
    data.append("your-message", "Клієнт залишив телефон у віджеті для зворотного дзвінка.");

    try {
      const res = await fetch(getCf7FeedbackUrl(CF7_FORM_ID), {
        method: "POST",
        body: data,
        credentials: "same-origin",
      });
      const raw = await res.text();
      const json = parseCf7FeedbackBody(raw);

      if (json.status === "mail_sent") {
        setStatus("success");
        setName("");
        setPhone("");
        return;
      }

      setStatus("error");
      setErrorMsg(typeof json.message === "string" ? json.message : "Помилка надсилання. Спробуйте ще раз.");
    } catch {
      setStatus("error");
      setErrorMsg("Помилка з'єднання. Спробуйте ще раз.");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-[min(calc(100vw-2.5rem),360px)] rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/10"
            role="dialog"
            aria-modal="false"
            aria-labelledby="callback-widget-title"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 id="callback-widget-title" className="text-lg font-bold leading-tight text-brand-black">
                  Залиште телефон
                </h2>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Ми передзвонимо та коротко обговоримо ваш запит.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center text-gray-400 transition-colors hover:text-brand-black"
                aria-label="Закрити форму"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {status === "success" ? (
              <div className="py-3">
                <p className="font-bold text-brand-black">Заявку надіслано</p>
                <p className="mt-1 text-sm text-gray-500">Зв'яжемося з вами найближчим часом.</p>
                <Button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 w-full rounded-xl bg-primary py-5 font-bold uppercase tracking-wider text-white hover:bg-primary/90"
                >
                  Надіслати ще раз
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
                  <input
                    type="text"
                    name="_hp_callback_website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше ім'я"
                  className="h-12 rounded-xl border-gray-300 focus:border-primary"
                />
                <Input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+38 (0__) ___ __ __"
                  className="h-12 rounded-xl border-gray-300 focus:border-primary"
                />

                {status === "error" && <p className="text-sm text-red-500">{errorMsg}</p>}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-xl bg-primary py-6 font-bold uppercase tracking-wider text-white hover:bg-primary/90 disabled:opacity-60"
                >
                  {status === "loading" ? "Надсилається..." : "Передзвоніть мені"}
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleOpen}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-primary/30 ring-4 ring-white transition hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        aria-label={open ? "Закрити форму зворотного дзвінка" : "Відкрити форму зворотного дзвінка"}
        aria-expanded={open}
      >
        <Phone className="h-7 w-7" />
      </button>
    </div>
  );
}
