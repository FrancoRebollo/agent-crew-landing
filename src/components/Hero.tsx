import { ctaLabel, hero } from '../content/landing';
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  InstagramIcon,
  LayersIcon,
  SendIcon,
  WorkflowIcon,
} from './icons';

function renderQuickIcon(icon: (typeof hero.quickLinks)[number]['icon']) {
  switch (icon) {
    case 'layers':
      return <LayersIcon className="h-5 w-5" />;
    case 'workflow':
      return <WorkflowIcon className="h-5 w-5" />;
    case 'send':
      return <SendIcon className="h-5 w-5" />;
  }
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative z-10 w-full overflow-hidden bg-transparent"
    >
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[1440px] flex-col px-5 pt-10 pb-8 sm:min-h-[calc(100svh-5.5rem)] sm:px-10 sm:pt-14 sm:pb-10 lg:px-14">
        <div className="my-auto py-4 sm:py-6">
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.08em] text-white sm:mb-5 sm:text-lg lg:text-xl">
            {hero.kickerTop}
          </p>

          <h1
            id="hero-title"
            className="w-full font-display font-medium uppercase leading-none text-white"
          >
            <span className="sr-only">{hero.brandDisplay}</span>
            <span
              aria-hidden="true"
              className="mx-auto flex w-full items-center justify-center gap-[clamp(0.4rem,2.15vw,2.15rem)] text-[clamp(1.375rem,5.2vw,5rem)] select-none"
            >
              {hero.brandLetters.map((char, index) => (
                <span
                  key={index}
                  className={char === ' ' ? 'w-[0.4em] sm:w-[0.7em]' : undefined}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h1>

          <div className="mt-4 flex flex-col-reverse gap-6 sm:mt-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-[23.5rem]">
              <p className="text-sm leading-[1.6] text-white/85 sm:text-[15px]">
                {hero.description}
              </p>

              <div className="mt-6 flex items-center gap-2.5">
                <a href={hero.ctaHref} className="btn">
                  {ctaLabel}
                </a>
                <a
                  href={hero.ctaHref}
                  aria-label={hero.ctaArrowLabel}
                  className="btn-icon"
                >
                  <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            <p className="self-end font-display text-sm font-semibold uppercase tracking-[0.08em] text-white whitespace-nowrap shrink-0 sm:self-start sm:text-lg lg:text-xl">
              {hero.kickerBottom}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-10">
          <a
            href={hero.scrollStampHref}
            aria-label={hero.scrollStampLabel}
            className="group relative inline-flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
          >
            <svg
              viewBox="0 0 100 100"
              className="stamp-ring h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="hero-stamp-path"
                  d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                />
              </defs>
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="rgba(255,255,255,0.72)"
                strokeWidth="1"
              />
              <circle
                cx="50"
                cy="50"
                r="26"
                fill="none"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1"
              />
              <text
                fill="rgba(255,255,255,0.92)"
                fontSize="7.4"
                fontWeight="500"
                letterSpacing="2.1"
              >
                <textPath href="#hero-stamp-path" startOffset="0%">
                  {hero.scrollStampText}
                </textPath>
              </text>
            </svg>
            <ArrowDownIcon className="pointer-events-none absolute h-5 w-5 text-white transition-transform duration-200 group-hover:translate-y-0.5" />
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            {hero.quickLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {renderQuickIcon(item.icon)}
              </a>
            ))}

            <a
              href={hero.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={hero.instagram.label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-black/55 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
