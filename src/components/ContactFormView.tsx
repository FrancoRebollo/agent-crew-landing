'use client';

import { type FormEvent, type Ref } from 'react';
import { contactForm } from '../content/landing';
import {
  callRequestedField,
  contactLimits,
  honeypotField,
  phoneTypeField,
  type ContactChannel,
  type ContactField,
  type ContactState,
} from '../lib/contact';
import { buildFullArgentineMobile } from '../lib/phone';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  PhoneCallIcon,
  SpinnerIcon,
  WhatsAppIcon,
} from './icons';

export interface ContactFormViewProps {
  state: ContactState;
  pending: boolean;
  nameValue: string;
  emailValue: string;
  phoneLocalValue: string;
  channel: ContactChannel;
  sentName: string;
  sentPhone: string;
  sentChannel: ContactChannel;
  formRef: Ref<HTMLFormElement>;
  summaryRef: Ref<HTMLDivElement>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneLocalChange: (value: string) => void;
  onChannelChange: (channel: ContactChannel) => void;
  onReset: () => void;
}

const orderedFields: readonly ContactField[] = ['name', 'email', 'phone'];

const fieldLabels: Record<ContactField, string> = {
  name: contactForm.fields.name.label,
  email: contactForm.fields.email.label,
  phone: contactForm.fields.phone.label,
};

export function ContactFormView({
  state,
  pending,
  nameValue,
  emailValue,
  phoneLocalValue,
  channel,
  sentName,
  sentPhone,
  sentChannel,
  formRef,
  summaryRef,
  onSubmit,
  onNameChange,
  onEmailChange,
  onPhoneLocalChange,
  onChannelChange,
  onReset,
}: ContactFormViewProps) {
  if (state.status === 'sent') {
    const isCall = sentChannel === 'call';
    const title = isCall
      ? `${contactForm.sent.callTitlePrefix}${sentName}${contactForm.sent.callTitleSuffix}`
      : `${contactForm.sent.whatsappTitlePrefix}${sentName}${contactForm.sent.whatsappTitleSuffix}`;
    const bodyPrefix = isCall
      ? contactForm.sent.callBodyPrefix
      : contactForm.sent.whatsappBodyPrefix;
    const bodySuffix = isCall
      ? contactForm.sent.callBodySuffix
      : contactForm.sent.whatsappBodySuffix;

    return (
      <div
        role="status"
        className="rounded-2xl border border-white/20 bg-surface p-7 shadow-[var(--shadow-soft)] sm:p-10"
      >
        <div className="flex items-start gap-3.5">
          <CheckCircleIcon className="mt-0.5 h-6 w-6 shrink-0 text-success" />
          <div>
            <h3 className="font-display text-2xl font-medium tracking-tight text-white">
              {title}
            </h3>
            <p className="mt-2.5 text-base leading-[1.6] text-ink-muted">
              {bodyPrefix}
              <span className="font-medium text-white tabular-nums">
                {sentPhone}
              </span>
              {bodySuffix}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6">
          <button type="button" onClick={onReset} className="btn">
            {contactForm.sent.resetLabel}
          </button>
        </div>
      </div>
    );
  }

  const errors = state.status === 'invalid' ? state.errors : {};
  const activeErrors = orderedFields.filter((field) => Boolean(errors[field]));

  const summaryTitle =
    activeErrors.length === 1
      ? contactForm.errorSummary.single
      : `${contactForm.errorSummary.pluralPrefix}${activeErrors.length}${contactForm.errorSummary.pluralSuffix}`;

  const activeOption = contactForm.fields.preference.options[channel];
  const fullFormattedPhone = buildFullArgentineMobile(phoneLocalValue);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-label={contactForm.title}
      className="relative rounded-2xl border border-white/20 bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      {state.status === 'rate_limited' ? (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-warning/40 bg-warning-bg p-4 text-sm text-white"
        >
          <AlertCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
          <p>{contactForm.notices.rate_limited}</p>
        </div>
      ) : null}

      {state.status === 'unavailable' ? (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-danger/40 bg-danger-bg p-4 text-sm text-white"
        >
          <AlertCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
          <p>{contactForm.notices.unavailable}</p>
        </div>
      ) : null}

      {activeErrors.length > 0 ? (
        <div
          ref={summaryRef}
          role="alert"
          tabIndex={-1}
          aria-labelledby="contact-errors-title"
          className="mb-6 rounded-xl border border-danger/45 bg-danger-bg p-4 sm:p-5"
        >
          <div className="flex items-start gap-3">
            <AlertCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
            <div>
              <h3
                id="contact-errors-title"
                className="font-display text-sm font-semibold text-white"
              >
                {summaryTitle}
              </h3>
              <ul className="mt-2 space-y-1 text-sm">
                {activeErrors.map((field) => (
                  <li key={field}>
                    <a
                      href={`#contact-${field}`}
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById(`contact-${field}`)?.focus();
                      }}
                      className="text-white underline decoration-white/60 underline-offset-4 hover:decoration-white"
                    >
                      {fieldLabels[field]}: {errors[field]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      {/* Campo antispam (Honeypot) oculto visualmente y para lectores de pantalla */}
      <div aria-hidden="true" className="sr-only hidden">
        <label htmlFor="contact-website">No completar</label>
        <input
          id="contact-website"
          name={honeypotField}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Valores normalizados compatibles con el backend actual */}
      <input type="hidden" name="phone" value={fullFormattedPhone} />
      <input type="hidden" name={phoneTypeField} value="mobile" />
      {channel === 'call' ? (
        <input type="hidden" name={callRequestedField} value="yes" />
      ) : null}

      <div className="space-y-5">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm font-medium text-white"
          >
            {contactForm.fields.name.label}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={contactLimits.name}
            required
            value={nameValue}
            onChange={(event) => onNameChange(event.currentTarget.value)}
            placeholder={contactForm.fields.name.placeholder}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={`field ${errors.name ? 'field-error' : ''}`}
          />
          {errors.name ? (
            <p
              id="contact-name-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
            >
              <AlertCircleIcon className="h-4 w-4 shrink-0" />
              <span>{errors.name}</span>
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm font-medium text-white"
          >
            {contactForm.fields.email.label}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={contactLimits.email}
            required
            value={emailValue}
            onChange={(event) => onEmailChange(event.currentTarget.value)}
            placeholder={contactForm.fields.email.placeholder}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={`field ${errors.email ? 'field-error' : ''}`}
          />
          {errors.email ? (
            <p
              id="contact-email-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
            >
              <AlertCircleIcon className="h-4 w-4 shrink-0" />
              <span>{errors.email}</span>
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="mb-2 block text-sm font-medium text-white"
          >
            {contactForm.fields.phone.label}
          </label>
          <div
            className={`flex min-h-11 w-full items-center overflow-hidden rounded-[var(--radius-field)] border bg-surface transition-colors ${
              errors.phone
                ? 'border-danger focus-within:border-danger'
                : 'border-line hover:border-white/42 focus-within:border-ink'
            }`}
          >
            <span
              aria-hidden="true"
              className="flex min-h-11 shrink-0 select-none items-center border-r border-white/15 bg-surface-elevated px-3.5 text-sm font-medium text-white tabular-nums"
            >
              {contactForm.fields.phone.prefix}
            </span>
            <input
              id="contact-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              maxLength={contactLimits.phone}
              required
              value={phoneLocalValue}
              onChange={(event) => onPhoneLocalChange(event.currentTarget.value)}
              placeholder={contactForm.fields.phone.placeholder}
              aria-invalid={errors.phone ? 'true' : undefined}
              aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
              className="min-h-11 w-full bg-transparent px-3.5 py-2.5 text-[15px] text-ink tabular-nums placeholder:text-ink-subtle focus:outline-none"
            />
          </div>
          {errors.phone ? (
            <p
              id="contact-phone-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
            >
              <AlertCircleIcon className="h-4 w-4 shrink-0" />
              <span>{errors.phone}</span>
            </p>
          ) : null}
        </div>

        <fieldset>
          <legend className="mb-2.5 block text-sm font-medium text-white">
            {contactForm.fields.preference.legend}
          </legend>

          <div className="grid gap-3">
            {(['call', 'whatsapp'] as const).map((optionKey) => {
              const option = contactForm.fields.preference.options[optionKey];
              const selected = channel === optionKey;
              const Icon = optionKey === 'call' ? PhoneCallIcon : WhatsAppIcon;

              return (
                <label
                  key={optionKey}
                  className={`relative flex min-h-16 cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white ${
                    selected
                      ? 'border-white bg-surface-elevated'
                      : 'border-white/20 bg-canvas/50 hover:border-white/45'
                  }`}
                >
                  <input
                    type="radio"
                    name="contact_channel"
                    value={optionKey}
                    checked={selected}
                    onChange={() => onChannelChange(optionKey)}
                    className="sr-only"
                  />

                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      selected
                        ? 'border-white bg-white text-black'
                        : 'border-white/25 bg-transparent text-white/80'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-white">
                      {option.title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                      {option.description}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      selected ? 'border-white bg-white' : 'border-white/35'
                    }`}
                  >
                    {selected ? (
                      <span className="h-2 w-2 rounded-full bg-black" />
                    ) : null}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="pt-1">
          <button
            type="submit"
            disabled={pending}
            aria-busy={pending}
            className="btn btn-solid min-h-12 w-full gap-2.5 text-[15px]"
          >
            {pending ? (
              <>
                <SpinnerIcon className="icon-spin h-4 w-4 shrink-0" />
                <span>{activeOption.submittingLabel}</span>
              </>
            ) : (
              <>
                {channel === 'call' ? (
                  <PhoneCallIcon className="h-4 w-4 shrink-0" />
                ) : (
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                )}
                <span>{activeOption.ctaLabel}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
