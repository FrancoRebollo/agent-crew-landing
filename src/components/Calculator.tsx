'use client';

import { useId, useState } from 'react';
import { calculatorSection } from '../content/landing';
import { ArrowUpRightIcon } from './icons';

function formatArs(value: number): string {
  const rounded = Math.max(0, Math.round(value));
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `$ ${formatted}`;
}

function formatHours(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(1).replace('.', ',');
}

export function Calculator() {
  const workdayId = useId();
  const workdaysMonthId = useId();
  const effectiveHoursId = useId();
  const salaryId = useId();
  const chargesId = useId();
  const serviceId = useId();

  const [workdayHours, setWorkdayHours] = useState<number>(8);
  const [workdaysPerMonth, setWorkdaysPerMonth] = useState<number>(22);
  const [effectiveHours, setEffectiveHours] = useState<number>(6);
  const [netSalary, setNetSalary] = useState<number>(1100000);
  const [socialChargesPct, setSocialChargesPct] = useState<number>(35);
  const [serviceMonthly, setServiceMonthly] = useState<number>(350000);

  const safeWorkdayHours = Math.max(1, Math.min(16, workdayHours || 1));
  const safeWorkdays = Math.max(1, Math.min(31, workdaysPerMonth || 1));
  const safeEffectiveHours = Math.max(
    0.5,
    Math.min(safeWorkdayHours, effectiveHours || 0.5)
  );
  const safeSalary = Math.max(0, netSalary || 0);
  const safeCharges = Math.max(0, Math.min(100, socialChargesPct || 0));
  const safeService = Math.max(0, serviceMonthly || 0);

  const employeeTotalMonthly = safeSalary * (1 + safeCharges / 100);
  const employeeEffectiveHoursMonth = safeEffectiveHours * safeWorkdays;
  const employeeHourlyCost =
    employeeEffectiveHoursMonth > 0
      ? employeeTotalMonthly / employeeEffectiveHoursMonth
      : 0;

  const serviceHoursMonth = 720;
  const serviceHourlyCost = safeService / serviceHoursMonth;

  const monthlyDiff = employeeTotalMonthly - safeService;
  const annualDiff = monthlyDiff * 12;
  const savingsPct =
    employeeTotalMonthly > 0
      ? Math.round((monthlyDiff / employeeTotalMonthly) * 100)
      : 0;

  const maxMonthly = Math.max(employeeTotalMonthly, safeService, 1);
  const employeeBarPct = Math.round((employeeTotalMonthly / maxMonthly) * 100);
  const serviceBarPct = Math.round((safeService / maxMonthly) * 100);

  const handleSelectWorkdayPreset = (hours: number, defaultEffective: number) => {
    setWorkdayHours(hours);
    setEffectiveHours(Math.min(hours, defaultEffective));
  };

  return (
    <section
      id={calculatorSection.id}
      aria-labelledby="calculator-title"
      className="relative z-10 border-t border-white/15 bg-black/85 backdrop-blur-[2px] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <div className="max-w-3xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {calculatorSection.eyebrow}
          </p>
          <h2
            id="calculator-title"
            className="mt-4 font-display text-3xl font-medium tracking-tight text-white text-balance sm:text-4xl"
          >
            {calculatorSection.title}
          </h2>
          <p className="mt-4 max-w-[58ch] text-base leading-[1.65] text-ink-muted">
            {calculatorSection.lead}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          <div className="flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-surface p-6 sm:p-8 lg:col-span-6">
            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label
                    htmlFor={workdayId}
                    className="text-sm font-medium text-white"
                  >
                    {calculatorSection.inputs.workdayLabel}
                  </label>
                  <span className="font-display text-sm font-semibold text-white tabular-nums">
                    {formatHours(safeWorkdayHours)} h/día
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {calculatorSection.inputs.workdayPresets.map((preset) => {
                    const active = workdayHours === preset.hours;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() =>
                          handleSelectWorkdayPreset(
                            preset.hours,
                            preset.defaultEffective
                          )
                        }
                        aria-pressed={active}
                        className={`min-h-11 rounded-full border px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'border-white bg-white text-black'
                            : 'border-white/25 bg-transparent text-white/85 hover:border-white/60 hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <input
                      id={workdayId}
                      type="number"
                      min={1}
                      max={16}
                      step={0.5}
                      value={workdayHours}
                      onChange={(e) => {
                        const next = Number(e.currentTarget.value);
                        if (!Number.isNaN(next)) {
                          setWorkdayHours(next);
                          if (effectiveHours > next && next >= 0.5) {
                            setEffectiveHours(next);
                          }
                        }
                      }}
                      className="field tabular-nums"
                      aria-label="Horas de jornada por día"
                    />
                  </div>
                  <div>
                    <label htmlFor={workdaysMonthId} className="sr-only">
                      {calculatorSection.inputs.workdaysPerMonthLabel}
                    </label>
                    <div className="relative">
                      <input
                        id={workdaysMonthId}
                        type="number"
                        min={1}
                        max={31}
                        step={1}
                        value={workdaysPerMonth}
                        onChange={(e) => {
                          const next = Number(e.currentTarget.value);
                          if (!Number.isNaN(next)) setWorkdaysPerMonth(next);
                        }}
                        className="field pr-24 tabular-nums"
                      />
                      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ink-muted">
                        días/mes
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor={effectiveHoursId}
                    className="text-sm font-medium text-white"
                  >
                    {calculatorSection.inputs.effectiveHoursLabel}
                  </label>
                  <span className="font-display text-sm font-semibold text-white tabular-nums">
                    {formatHours(safeEffectiveHours)} h/día
                  </span>
                </div>
                <input
                  id={effectiveHoursId}
                  type="range"
                  min={0.5}
                  max={safeWorkdayHours}
                  step={0.5}
                  value={safeEffectiveHours}
                  onChange={(e) =>
                    setEffectiveHours(Number(e.currentTarget.value))
                  }
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-white"
                />
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  {calculatorSection.inputs.effectiveHoursHelp}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={salaryId}
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    {calculatorSection.inputs.salaryLabel}
                  </label>
                  <input
                    id={salaryId}
                    type="number"
                    min={0}
                    step={50000}
                    value={netSalary}
                    onChange={(e) => {
                      const next = Number(e.currentTarget.value);
                      if (!Number.isNaN(next)) setNetSalary(next);
                    }}
                    className="field tabular-nums"
                  />
                </div>

                <div>
                  <label
                    htmlFor={chargesId}
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    {calculatorSection.inputs.socialChargesLabel}
                  </label>
                  <input
                    id={chargesId}
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    value={socialChargesPct}
                    onChange={(e) => {
                      const next = Number(e.currentTarget.value);
                      if (!Number.isNaN(next)) setSocialChargesPct(next);
                    }}
                    className="field tabular-nums"
                  />
                </div>
              </div>
              <p className="-mt-3 text-xs leading-relaxed text-ink-muted">
                {calculatorSection.inputs.socialChargesHelp}
              </p>

              <div className="border-t border-white/15 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label
                    htmlFor={serviceId}
                    className="text-sm font-medium text-white"
                  >
                    {calculatorSection.inputs.serviceLabel}
                  </label>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {calculatorSection.inputs.servicePresets.map((preset) => {
                    const active = serviceMonthly === preset.monthly;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setServiceMonthly(preset.monthly)}
                        aria-pressed={active}
                        className={`min-h-11 rounded-full border px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'border-white bg-white text-black'
                            : 'border-white/25 bg-transparent text-white/85 hover:border-white/60 hover:text-white'
                        }`}
                      >
                        {preset.label} · {formatArs(preset.monthly)}
                      </button>
                    );
                  })}
                </div>

                <input
                  id={serviceId}
                  type="number"
                  min={0}
                  step={25000}
                  value={serviceMonthly}
                  onChange={(e) => {
                    const next = Number(e.currentTarget.value);
                    if (!Number.isNaN(next)) setServiceMonthly(next);
                  }}
                  className="field mt-3 tabular-nums"
                />
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  {calculatorSection.inputs.serviceHelp}
                </p>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-white/20 bg-black/70 p-6 sm:p-8 lg:col-span-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex h-full flex-col justify-between rounded-xl border border-white/15 bg-surface p-5">
                <div>
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                    {calculatorSection.results.employeeTitle}
                  </p>
                  <p className="mt-3 font-display text-2xl font-medium text-white tabular-nums sm:text-3xl">
                    {formatArs(employeeTotalMonthly)}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted tabular-nums">
                    {formatHours(employeeEffectiveHoursMonth)}{' '}
                    {calculatorSection.results.employeeSubtitleSuffix}
                  </p>
                </div>
                <p className="mt-4 border-t border-white/15 pt-3 text-xs text-ink-muted tabular-nums">
                  {calculatorSection.results.hourlyCostLabel}:{' '}
                  <span className="font-medium text-white">
                    {formatArs(employeeHourlyCost)}/h
                  </span>
                </p>
              </div>

              <div className="flex h-full flex-col justify-between rounded-xl border border-white/35 bg-surface-elevated p-5">
                <div>
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    {calculatorSection.results.serviceTitle}
                  </p>
                  <p className="mt-3 font-display text-2xl font-medium text-white tabular-nums sm:text-3xl">
                    {formatArs(safeService)}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted tabular-nums">
                    {calculatorSection.results.serviceSubtitle}
                  </p>
                </div>
                <p className="mt-4 border-t border-white/15 pt-3 text-xs text-ink-muted tabular-nums">
                  {calculatorSection.results.hourlyCostLabel}:{' '}
                  <span className="font-medium text-white">
                    {formatArs(serviceHourlyCost)}/h
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-white/15 bg-surface p-5">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                {calculatorSection.results.monthlyCostLabel}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-ink-muted">
                  <span>{calculatorSection.results.employeeTitle}</span>
                  <span className="font-medium text-white tabular-nums">
                    {formatArs(employeeTotalMonthly)}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white/45 transition-all duration-200"
                    style={{ width: `${employeeBarPct}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-ink-muted">
                  <span>{calculatorSection.results.serviceTitle}</span>
                  <span className="font-medium text-white tabular-nums">
                    {formatArs(safeService)}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-200"
                    style={{ width: `${serviceBarPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between rounded-xl border border-white/20 bg-surface p-6">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                {calculatorSection.results.savingsTitle}
              </p>

              {monthlyDiff >= 0 ? (
                <>
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <p className="font-display text-3xl font-medium text-white tabular-nums sm:text-4xl">
                      {formatArs(monthlyDiff)}
                    </p>
                    <p className="text-sm text-success tabular-nums">
                      -{savingsPct}% {calculatorSection.results.savingsPositiveSuffix}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-ink-muted tabular-nums">
                    {calculatorSection.results.savingsAnnualLabel}:{' '}
                    <span className="font-medium text-white">
                      {formatArs(annualDiff)}
                    </span>{' '}
                    por año, pasando de{' '}
                    <span className="font-medium text-white">
                      {formatHours(employeeEffectiveHoursMonth)} h
                    </span>{' '}
                    a{' '}
                    <span className="font-medium text-white">
                      {serviceHoursMonth} h
                    </span>{' '}
                    de cobertura mensual.
                  </p>
                </>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {calculatorSection.results.savingsNegativeNote}
                </p>
              )}

              <div className="mt-6 flex flex-col items-start gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-relaxed text-ink-muted">
                  {calculatorSection.results.disclaimer}
                </p>
                <a href="#contacto" className="btn btn-solid shrink-0">
                  <span>{calculatorSection.results.ctaLabel}</span>
                  <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
