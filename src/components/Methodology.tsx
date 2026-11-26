import { methodologySection } from '../content/landing';

export function Methodology() {
  return (
    <section
      id={methodologySection.id}
      aria-labelledby="methodology-title"
      className="relative z-10 border-t border-white/15 bg-black/80 backdrop-blur-[2px] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
              {methodologySection.eyebrow}
            </p>
            <h2
              id="methodology-title"
              className="mt-4 font-display text-3xl font-medium tracking-tight text-white text-balance sm:text-4xl"
            >
              {methodologySection.title}
            </h2>
            <p className="mt-5 max-w-[46ch] text-base leading-[1.65] text-ink-muted">
              {methodologySection.lead}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-white/15 border-y border-white/15">
              {methodologySection.pillars.map((pillar) => (
                <article
                  key={pillar.index}
                  className="grid gap-3 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6"
                >
                  <span className="font-display text-sm font-medium text-ink-subtle tabular-nums sm:col-span-2">
                    {pillar.index}
                  </span>
                  <div className="sm:col-span-10">
                    <h3 className="font-display text-xl font-medium text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-muted">
                      {pillar.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
