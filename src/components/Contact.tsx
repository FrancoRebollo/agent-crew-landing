import { contactForm } from '../content/landing';
import { ContactFormDemo } from '../preview/ContactFormDemo';
import { PhoneCallIcon, WhatsAppIcon } from './icons';

export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="relative z-10 border-t border-white/15 bg-black/82 backdrop-blur-[2px] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {contactForm.eyebrow}
          </p>
          <h2
            id="contact-title"
            className="mt-4 font-display text-3xl font-medium tracking-tight text-white text-balance sm:text-4xl"
          >
            {contactForm.title}
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-[1.65] text-ink-muted">
            {contactForm.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/20 bg-surface/90 p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <PhoneCallIcon className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                <div>
                  <h3 className="font-display text-base font-medium text-white">
                    {contactForm.liveCallDemo.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.65] text-ink-muted">
                    {contactForm.liveCallDemo.body}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3 border-t border-white/15 pt-5">
                <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                <p className="text-sm leading-[1.65] text-ink-muted">
                  {contactForm.liveCallDemo.whatsappNote}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactFormDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
