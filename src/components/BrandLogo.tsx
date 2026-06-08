interface BrandLogoProps {
  variant?: "dark" | "light";
}

export default function BrandLogo({ variant = "dark" }: BrandLogoProps) {
  const textClass = variant === "light" ? "text-white" : "text-brand-black";
  const subTextClass = variant === "light" ? "text-white/55" : "text-gray-500";

  return (
    <span className="flex items-center gap-3" aria-label="Digitalize Agency">
      <svg className="h-11 w-11 shrink-0" viewBox="0 0 48 48" role="img" aria-hidden="true">
        <rect width="48" height="48" rx="10" fill="#0A0A0A" />
        <path d="M15 11H25.5C34 11 40 16.6 40 24C40 31.5 34 37 25.5 37H15V11Z" fill="#FFFFFF" />
        <path d="M22 19V29H25.2C28.9 29 31.5 26.9 31.5 24C31.5 21.1 28.9 19 25.2 19H22Z" fill="#0A0A0A" />
        <path d="M14 34L21 27.5L26.5 30.5L36 18" fill="none" stroke="#E31E24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="36" cy="18" r="3" fill="#E31E24" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-heading text-2xl font-bold tracking-tight ${textClass}`}>DIGITALIZE</span>
        <span className={`mt-1 text-[10px] font-bold uppercase tracking-[0.28em] ${subTextClass}`}>Agency</span>
      </span>
    </span>
  );
}
