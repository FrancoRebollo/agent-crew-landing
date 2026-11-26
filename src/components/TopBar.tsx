import { ctaLabel, navLinks, siteBrand } from '../content/landing';
import { VideoToggle } from './BackgroundVideo';

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 w-full bg-black/60 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <div className="flex h-20 items-center justify-between gap-8 sm:h-[5.5rem]">
          <a
            href="#inicio"
            className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-white whitespace-nowrap shrink-0 sm:text-[15px]"
          >
            {siteBrand.name}
          </a>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-8 md:flex lg:gap-11"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/90 transition-colors hover:text-white whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <a href="#contacto" className="btn hidden sm:inline-flex">
              {ctaLabel}
            </a>

            <VideoToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
