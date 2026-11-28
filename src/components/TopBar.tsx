'use client';

import { useEffect, useState } from 'react';
import { navCtaLabel, navLinks, siteBrand } from '../content/landing';
import { VideoToggle } from './BackgroundVideo';
import { CloseIcon, MenuIcon, PhoneCallIcon } from './icons';

export const OPEN_LIVE_DEMO_EVENT = 'agentcrew:open-live-demo';

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const handleOpenLiveDemo = () => {
    setMenuOpen(false);
    const event = new CustomEvent(OPEN_LIVE_DEMO_EVENT, { cancelable: true });
    const handled = !window.dispatchEvent(event);
    if (!handled) {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <div className="flex h-20 items-center justify-between gap-4 sm:h-[5.5rem] sm:gap-8">
          <a
            href="#inicio"
            onClick={() => setMenuOpen(false)}
            className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-white whitespace-nowrap shrink-0 sm:text-[15px]"
          >
            {siteBrand.name}
          </a>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-7 md:flex lg:gap-10"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/85 transition-colors hover:text-white whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handleOpenLiveDemo}
              className="btn btn-solid hidden gap-2 md:inline-flex"
            >
              <PhoneCallIcon className="h-4 w-4 shrink-0" />
              <span>{navCtaLabel}</span>
            </button>

            <VideoToggle />

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              className="btn-icon md:hidden"
            >
              {menuOpen ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-white/15 bg-black/95 backdrop-blur-md md:hidden"
        >
          <nav
            aria-label="Navegación móvil"
            className="mx-auto flex max-w-[1440px] flex-col px-5 pt-2 pb-6 sm:px-10"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-12 items-center border-b border-white/10 text-base font-medium text-white/90 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <button
              type="button"
              onClick={handleOpenLiveDemo}
              className="btn btn-solid mt-5 w-full gap-2"
            >
              <PhoneCallIcon className="h-4 w-4 shrink-0" />
              <span>{navCtaLabel}</span>
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
