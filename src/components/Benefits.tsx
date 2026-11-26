import { benefitsSection } from '../content/landing';

export function Benefits() {
  return (
    <section
      id={benefitsSection.id}
      aria-labelledby="benefits-title"
      className="relative z-10 border-t border-white/15 bg-black/80 backdrop-blur-[2px] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {benefitsSection.eyebrow}
          </p>
          <h2
            id="benefits-title"
            className="mt-4 font-display text-3xl font-medium tracking-tight text-white text-balance sm:text-4xl"
          >
            {benefitsSection.title}
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-[1.65] text-ink-muted">
            {benefitsSection.lead}
          </p>
        </div>

        <div className="mt-12 grid gap-x-12 border-t border-white/15 md:grid-cols-2">
          {benefitsSection.items.map((benefit) => (
            <article
              key={benefit.index}
              className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-white/15 py-6"
            >
              <span className="font-display text-sm font-medium text-ink-subtle tabular-nums">
                {benefit.index}
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-white">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-[1.6] text-ink-muted">
                  {benefit.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
