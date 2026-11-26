import { footerContent, siteBrand } from '../content/landing';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/15 bg-black/90 py-12">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
        <div className="space-y-2">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-white">
            {siteBrand.name}
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
            {footerContent.legalNotice}
          </p>
        </div>

        <a
          href={footerContent.legalLinkHref}
          className="inline-flex min-h-11 items-center text-sm font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white whitespace-nowrap shrink-0"
        >
          {footerContent.legalLinkLabel}
        </a>
      </div>
    </footer>
  );
}
