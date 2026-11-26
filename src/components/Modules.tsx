import { ctaLabel, modulesSection } from '../content/landing';
import { ArrowUpRightIcon } from './icons';

export function Modules() {
  return (
    <section
      id={modulesSection.id}
      aria-labelledby="modules-title"
      className="relative z-10 border-t border-white/15 bg-black/85 backdrop-blur-[2px] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
              {modulesSection.eyebrow}
            </p>
            <h2
              id="modules-title"
              className="mt-4 font-display text-3xl font-medium tracking-tight text-white text-balance sm:text-4xl"
            >
              {modulesSection.title}
            </h2>
            <p className="mt-4 max-w-[54ch] text-base leading-[1.65] text-ink-muted">
              {modulesSection.lead}
            </p>
          </div>

          <a href="#contacto" className="btn self-start lg:self-auto">
            <span>{ctaLabel}</span>
            <ArrowUpRightIcon className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {modulesSection.items.map((mod) => (
            <article
              key={mod.code}
              className="flex flex-col justify-between rounded-2xl border border-white/15 bg-black/70 p-7 sm:p-8"
            >
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                  {mod.code}
                </p>
                <h3 className="mt-3 font-display text-xl font-medium text-white">
                  {mod.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-muted">
                  {mod.description}
                </p>

                <div className="mt-6 border-t border-white/15 pt-5">
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-white/75">
                    {modulesSection.functionsLabel}
                  </p>
                  <ul className="mt-3.5 space-y-2.5 text-sm leading-relaxed text-white/85">
                    {mod.functions.map((fn) => (
                      <li key={fn} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/60"
                        />
                        <span>{fn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-7 border-t border-white/15 pt-5">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                  {modulesSection.goalLabel}
                </p>
                <p className="mt-2 text-sm leading-[1.6] text-white">
                  {mod.goal}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
