'use client';

import { type FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { hero } from '../content/landing';
import { contactLimits } from '../lib/contact';
import { formatPhoneValue, validateFormattedPhone } from '../lib/phone';
import {
  AlertCircleIcon,
  ArrowDownIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  CloseIcon,
  InstagramIcon,
  PhoneCallIcon,
  SpinnerIcon,
} from './icons';
import { OPEN_LIVE_DEMO_EVENT } from './TopBar';

type DemoModalStatus = 'idle' | 'submitting' | 'sent';

interface DemoErrors {
  name?: string;
  phone?: string;
}

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<DemoModalStatus>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<DemoErrors>({});

  const nameInputRef = useRef<HTMLInputElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback(() => {
    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setErrors({});
    setStatus('idle');
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setStatus('idle');
    setErrors({});
    queueMicrotask(() => {
      lastFocusedRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    const handleOpenEvent = (event: Event) => {
      event.preventDefault();
      openModal();
    };

    window.addEventListener(OPEN_LIVE_DEMO_EVENT, handleOpenEvent);
    return () => {
      window.removeEventListener(OPEN_LIVE_DEMO_EVENT, handleOpenEvent);
    };
  }, [openModal]);

  useEffect(() => {
    if (!modalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen, closeModal]);

  const handlePhoneBlur = () => {
    if (!phone.trim()) return;
    const formatted = formatPhoneValue(phone);
    if (formatted !== phone) {
      setPhone(formatted);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const formattedPhone = formatPhoneValue(phone);
    if (formattedPhone !== phone) {
      setPhone(formattedPhone);
    }

    const nextErrors: DemoErrors = {};
    if (!trimmedName) {
      nextErrors.name = 'Ingresá tu nombre.';
    }

    if (!formattedPhone) {
      nextErrors.phone = 'Ingresá tu número con código de área para llamarte.';
    } else {
      const check = validateFormattedPhone(formattedPhone);
      if (!check.valid && check.error) {
        nextErrors.phone = check.error;
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');
    window.setTimeout(() => {
      setStatus('sent');
    }, 550);
  };

  const { liveDemoModal } = hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative z-10 w-full overflow-hidden bg-transparent"
    >
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[1440px] flex-col px-5 pt-6 pb-6 sm:min-h-[calc(100svh-5.5rem)] sm:px-10 sm:pt-12 sm:pb-10 lg:px-14">
        <div className="my-auto max-w-4xl py-2 sm:py-6">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75 sm:text-xs">
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-3 font-display text-[1.875rem] font-medium leading-[1.12] tracking-[-0.02em] text-white text-balance sm:mt-4 sm:text-5xl sm:leading-[1.08] lg:text-[3.75rem] lg:leading-[1.05]"
          >
            {hero.title}
          </h1>

          <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.58] text-white/80 sm:mt-6 sm:text-lg sm:leading-[1.65]">
            <strong className="font-medium text-white">
              {hero.subtitleLead}
            </strong>{' '}
            {hero.subtitleMiddle}{' '}
            <strong className="font-medium text-white">
              {hero.subtitleAccent}
            </strong>
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
            <button
              type="button"
              onClick={openModal}
              className="btn btn-solid w-full gap-2.5 sm:w-auto"
            >
              <PhoneCallIcon className="h-4 w-4 shrink-0" />
              <span>{hero.primaryCtaLabel}</span>
            </button>

            <a
              href={hero.secondaryCtaHref}
              className="btn w-full gap-2 sm:w-auto"
            >
              <span>{hero.secondaryCtaLabel}</span>
              <ArrowUpRightIcon className="h-4 w-4 shrink-0" />
            </a>
          </div>

          <p className="mt-4 text-xs font-medium tracking-[0.01em] text-white/75 sm:mt-5 sm:text-[13px]">
            {hero.trustNote}
          </p>
        </div>

        <div className="mt-auto hidden items-end justify-between gap-4 pt-8 sm:flex">
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

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="live-demo-modal-title"
            className="relative w-full max-w-md rounded-2xl border border-white/20 bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Cerrar ventana"
              className="btn-icon absolute top-5 right-5"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            {status === 'sent' ? (
              <div role="status" className="pr-8">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-0.5 h-6 w-6 shrink-0 text-success" />
                  <div>
                    <h2
                      id="live-demo-modal-title"
                      className="font-display text-xl font-medium text-white sm:text-2xl"
                    >
                      {liveDemoModal.sentTitlePrefix}
                      {name.trim()}
                      {liveDemoModal.sentTitleSuffix}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                      {liveDemoModal.sentBodyPrefix}
                      <span className="font-medium text-white tabular-nums">
                        {phone}
                      </span>
                      {liveDemoModal.sentBodySuffix}
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-solid w-full sm:w-auto"
                  >
                    {liveDemoModal.closeLabel}
                  </button>
                  <a
                    href={hero.secondaryCtaHref}
                    onClick={closeModal}
                    className="text-center text-xs font-medium text-ink-muted underline decoration-white/35 underline-offset-4 transition-colors hover:text-white sm:text-left"
                  >
                    {liveDemoModal.diagnosticFallbackLabel}
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  {liveDemoModal.eyebrow}
                </p>
                <h2
                  id="live-demo-modal-title"
                  className="mt-3 pr-10 font-display text-2xl font-medium tracking-tight text-white"
                >
                  {liveDemoModal.title}
                </h2>
                <p className="mt-2.5 text-sm leading-[1.6] text-ink-muted">
                  {liveDemoModal.description}
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="live-demo-name"
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      {liveDemoModal.nameLabel}
                    </label>
                    <input
                      ref={nameInputRef}
                      id="live-demo-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={contactLimits.name}
                      required
                      value={name}
                      onChange={(event) => {
                        setName(event.currentTarget.value);
                        if (errors.name) {
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }
                      }}
                      placeholder={liveDemoModal.namePlaceholder}
                      aria-invalid={errors.name ? 'true' : undefined}
                      aria-describedby={
                        errors.name ? 'live-demo-name-error' : undefined
                      }
                      className={`field ${errors.name ? 'field-error' : ''}`}
                    />
                    {errors.name ? (
                      <p
                        id="live-demo-name-error"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
                      >
                        <AlertCircleIcon className="h-4 w-4 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="live-demo-phone"
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      {liveDemoModal.phoneLabel}
                    </label>
                    <input
                      id="live-demo-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={contactLimits.phone}
                      required
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.currentTarget.value);
                        if (errors.phone) {
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }
                      }}
                      onBlur={handlePhoneBlur}
                      placeholder={liveDemoModal.phonePlaceholder}
                      aria-invalid={errors.phone ? 'true' : undefined}
                      aria-describedby={
                        errors.phone
                          ? 'live-demo-phone-help live-demo-phone-error'
                          : 'live-demo-phone-help'
                      }
                      className={`field tabular-nums ${
                        errors.phone ? 'field-error' : ''
                      }`}
                    />
                    <p
                      id="live-demo-phone-help"
                      className="mt-1.5 text-xs text-ink-muted"
                    >
                      {liveDemoModal.phoneHelp}
                    </p>
                    {errors.phone ? (
                      <p
                        id="live-demo-phone-error"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
                      >
                        <AlertCircleIcon className="h-4 w-4 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    ) : null}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      aria-busy={status === 'submitting'}
                      className="btn btn-solid w-full gap-2.5"
                    >
                      {status === 'submitting' ? (
                        <>
                          <SpinnerIcon className="icon-spin h-4 w-4" />
                          <span>{liveDemoModal.submittingLabel}</span>
                        </>
                      ) : (
                        <>
                          <PhoneCallIcon className="h-4 w-4 shrink-0" />
                          <span>{liveDemoModal.submitLabel}</span>
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs text-ink-muted">
                      {liveDemoModal.privacyNote}
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
