import { stagesSection } from '../content/landing';
import { ArrowUpRightIcon } from './icons';

export function Stages() {
  return (
    <section
      id={stagesSection.id}
      aria-labelledby="stages-title"
      className="relative z-10 border-t border-white/15 bg-black/85 backdrop-blur-[2px] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
              {stagesSection.eyebrow}
            </p>
            <h2
              id="stages-title"
              className="mt-4 font-display text-3xl font-medium tracking-tight text-white text-balance sm:text-4xl"
            >
              {stagesSection.title}
            </h2>
          </div>

          <a href={stagesSection.closingCtaHref} className="btn self-start sm:self-auto">
            <span>{stagesSection.closingCtaLabel}</span>
            <ArrowUpRightIcon className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stagesSection.items.map((item) => (
            <article
              key={item.step}
              className="flex flex-col justify-between rounded-2xl border border-white/15 bg-black/70 p-7 sm:p-8"
            >
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                  {item.step}
                </p>
                <h3 className="mt-4 font-display text-xl font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-muted">
                  {item.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
