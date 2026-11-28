import { contactForm } from '../content/landing';
import { ContactFormDemo } from '../preview/ContactFormDemo';
import { CheckCircleIcon } from './icons';

export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="relative z-10 border-t border-white/15 bg-black/82 py-20 backdrop-blur-[2px] sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-5 lg:pt-2">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-surface px-3.5 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
              {contactForm.badge}
            </span>

            <h2
              id="contact-title"
              className="mt-5 font-display text-3xl font-medium tracking-tight text-white text-balance sm:text-4xl"
            >
              {contactForm.title}
            </h2>

            <p className="mt-4 max-w-[46ch] text-base leading-[1.65] text-ink-muted">
              {contactForm.subtitle}
            </p>

            <ul className="mt-8 space-y-3.5 border-t border-white/15 pt-7">
              {contactForm.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-white/90 sm:text-[15px]"
                >
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <ContactFormDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
