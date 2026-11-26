'use client';

import { type FormEvent, type Ref, useRef } from 'react';
import { callConsent, contactForm, ctaLabel } from '../content/landing';
import {
  callRequestedField,
  contactAreas,
  contactLimits,
  honeypotField,
  phoneTypeField,
  type ContactField,
  type ContactState,
} from '../lib/contact';
import {
  applyAreaCodeToPhone,
  argentineAreas,
  formatPhoneValue,
} from '../lib/phone';
import { AlertCircleIcon, CheckCircleIcon, SpinnerIcon } from './icons';

export interface ContactFormViewProps {
  state: ContactState;
  pending: boolean;
  askPhoneType: boolean;
  sentTo: string;
  formRef: Ref<HTMLFormElement>;
  summaryRef: Ref<HTMLDivElement>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onPhoneBlur: () => void;
  onPhoneChange: (value: string) => void;
  onCallRequestedChange: (checked: boolean) => void;
  onPhoneTypeChange: () => void;
  onReset: () => void;
}

const orderedFields: readonly ContactField[] = [
  'name',
  'email',
  'company',
  'phone',
  'topic',
  'message',
];

const fieldLabels: Record<ContactField, string> = {
  name: contactForm.fields.name.label,
  email: contactForm.fields.email.label,
  company: contactForm.fields.company.label,
  phone: contactForm.fields.phone.label,
  topic: contactForm.fields.topic.label,
  message: contactForm.fields.message.label,
};

export function ContactFormView({
  state,
  pending,
  askPhoneType,
  sentTo,
  formRef,
  summaryRef,
  onSubmit,
  onPhoneBlur,
  onPhoneChange,
  onCallRequestedChange,
  onPhoneTypeChange,
  onReset,
}: ContactFormViewProps) {
  const phoneInputRef = useRef<HTMLInputElement>(null);

  if (state.status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-white/20 bg-surface p-7 sm:p-10"
      >
        <div className="flex items-start gap-3">
          <CheckCircleIcon className="mt-0.5 h-6 w-6 shrink-0 text-success" />
          <div>
            <h3 className="font-display text-2xl font-medium text-white">
              {contactForm.sent.title}
            </h3>
            <p className="mt-2 text-base text-ink-muted">
              {sentTo
                ? `${contactForm.sent.withEmailPrefix}${sentTo}${contactForm.sent.withEmailSuffix}`
                : contactForm.sent.withoutEmail}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-7">
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-white">
            {contactForm.sent.nextTitle}
          </h4>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
            {contactForm.sent.steps.map((step, idx) => (
              <li key={step} className="flex items-start gap-3">
                <span className="font-display text-xs font-semibold text-white tabular-nums mt-0.5">
                  0{idx + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8">
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

  const phoneDescribedBy = errors.phone
    ? 'contact-phone-help contact-phone-error'
    : 'contact-phone-help';

  const messageDescribedBy = errors.message
    ? 'contact-message-help contact-message-error'
    : 'contact-message-help';

  const getSelectedPhoneType = (
    form: HTMLFormElement | null
  ): 'mobile' | 'landline' | undefined => {
    if (!form) return undefined;
    const checked = form.querySelector<HTMLInputElement>(
      `input[name="${phoneTypeField}"]:checked`
    );
    return checked?.value === 'mobile' || checked?.value === 'landline'
      ? checked.value
      : undefined;
  };

  const syncPhoneFormat = (explicitType?: 'mobile' | 'landline') => {
    const input = phoneInputRef.current;
    if (!input) return;
    const type = explicitType ?? getSelectedPhoneType(input.form);
    const formatted = formatPhoneValue(input.value, type);
    if (formatted !== input.value) {
      input.value = formatted;
      onPhoneChange(formatted);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    syncPhoneFormat();
    onSubmit(event);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label={ctaLabel}
      className="relative rounded-2xl border border-white/20 bg-surface p-6 sm:p-9"
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
          className="mb-6 rounded-xl border border-danger/45 bg-danger-bg p-5"
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
              <ul className="mt-2.5 space-y-1.5 text-sm">
                {activeErrors.map((field) => (
                  <li key={field}>
                    <a
                      href={`#contact-${field}`}
                      onClick={(e) => {
                        e.preventDefault();
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

      <div aria-hidden="true" className="honeypot-trap">
        <label htmlFor="contact-website">No completar</label>
        <input
          id="contact-website"
          name={honeypotField}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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
            placeholder={contactForm.fields.name.placeholder}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={`field ${errors.name ? 'field-error' : ''}`}
          />
          {errors.name ? (
            <p
              id="contact-name-error"
              className="mt-2 flex items-center gap-1.5 text-xs text-danger"
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
            placeholder={contactForm.fields.email.placeholder}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={`field ${errors.email ? 'field-error' : ''}`}
          />
          {errors.email ? (
            <p
              id="contact-email-error"
              className="mt-2 flex items-center gap-1.5 text-xs text-danger"
            >
              <AlertCircleIcon className="h-4 w-4 shrink-0" />
              <span>{errors.email}</span>
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-company"
            className="mb-2 block text-sm font-medium text-white"
          >
            {contactForm.fields.company.label}
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={contactLimits.company}
            required
            placeholder={contactForm.fields.company.placeholder}
            aria-invalid={errors.company ? 'true' : undefined}
            aria-describedby={
              errors.company ? 'contact-company-error' : undefined
            }
            className={`field ${errors.company ? 'field-error' : ''}`}
          />
          {errors.company ? (
            <p
              id="contact-company-error"
              className="mt-2 flex items-center gap-1.5 text-xs text-danger"
            >
              <AlertCircleIcon className="h-4 w-4 shrink-0" />
              <span>{errors.company}</span>
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-phone-area"
            className="mb-2 block text-sm font-medium text-white"
          >
            {contactForm.fields.phone.areaLabel}
          </label>
          <select
            id="contact-phone-area"
            defaultValue=""
            onChange={(e) => {
              const code = e.currentTarget.value;
              const input = phoneInputRef.current;
              if (!code || !input) return;
              const next = applyAreaCodeToPhone(input.value, code);
              input.value = next;
              onPhoneChange(next);
              input.focus();
              const end = next.length;
              input.setSelectionRange(end, end);
            }}
            className="field"
          >
            <option value="">{contactForm.fields.phone.areaPlaceholder}</option>
            {argentineAreas.map((area) => (
              <option key={area.code} value={area.code}>
                {area.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="contact-phone"
            className="mb-2 block text-sm font-medium text-white"
          >
            {contactForm.fields.phone.label}{' '}
            <span className="font-normal text-ink-muted">
              {contactForm.fields.phone.optionalSuffix}
            </span>
          </label>
          <input
            ref={phoneInputRef}
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={contactLimits.phone}
            placeholder={contactForm.fields.phone.placeholder}
            onBlur={() => {
              syncPhoneFormat();
              onPhoneBlur();
            }}
            onChange={(e) => onPhoneChange(e.currentTarget.value)}
            aria-invalid={errors.phone ? 'true' : undefined}
            aria-describedby={phoneDescribedBy}
            className={`field tabular-nums ${errors.phone ? 'field-error' : ''}`}
          />
          <p id="contact-phone-help" className="mt-2 text-xs text-ink-muted">
            {contactForm.fields.phone.help}
          </p>
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
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-call"
          className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-white/15 bg-canvas/50 p-3.5 text-sm leading-relaxed text-white/90"
        >
          <input
            id="contact-call"
            name={callRequestedField}
            type="checkbox"
            value="yes"
            defaultChecked={false}
            onChange={(e) => onCallRequestedChange(e.currentTarget.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-white"
          />
          <span>{callConsent}</span>
        </label>
      </div>

      {askPhoneType ? (
        <fieldset className="mt-4 rounded-xl border border-white/20 bg-canvas/60 p-4">
          <legend className="px-1 text-sm font-medium text-white">
            {contactForm.fields.phoneType.legend}
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-5">
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-white">
              <input
                type="radio"
                name={phoneTypeField}
                value="mobile"
                onChange={() => {
                  syncPhoneFormat('mobile');
                  onPhoneTypeChange();
                }}
                className="h-4 w-4 accent-white"
              />
              <span>{contactForm.fields.phoneType.mobile}</span>
            </label>
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-white">
              <input
                type="radio"
                name={phoneTypeField}
                value="landline"
                onChange={() => {
                  syncPhoneFormat('landline');
                  onPhoneTypeChange();
                }}
                className="h-4 w-4 accent-white"
              />
              <span>{contactForm.fields.phoneType.landline}</span>
            </label>
          </div>
        </fieldset>
      ) : null}

      <div className="mt-5">
        <label
          htmlFor="contact-topic"
          className="mb-2 block text-sm font-medium text-white"
        >
          {contactForm.fields.topic.label}
        </label>
        <select
          id="contact-topic"
          name="topic"
          aria-invalid={errors.topic ? 'true' : undefined}
          aria-describedby={errors.topic ? 'contact-topic-error' : undefined}
          className={`field ${errors.topic ? 'field-error' : ''}`}
        >
          <option value="">{contactForm.fields.topic.emptyOption}</option>
          {contactAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        {errors.topic ? (
          <p
            id="contact-topic-error"
            className="mt-2 flex items-center gap-1.5 text-xs text-danger"
          >
            <AlertCircleIcon className="h-4 w-4 shrink-0" />
            <span>{errors.topic}</span>
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-medium text-white"
        >
          {contactForm.fields.message.label}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={contactLimits.message}
          required
          placeholder={contactForm.fields.message.placeholder}
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={messageDescribedBy}
          className={`field min-h-[7.5rem] resize-y ${
            errors.message ? 'field-error' : ''
          }`}
        />
        <p id="contact-message-help" className="mt-2 text-xs text-ink-muted">
          {contactForm.fields.message.help}
        </p>
        {errors.message ? (
          <p
            id="contact-message-error"
            className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
          >
            <AlertCircleIcon className="h-4 w-4 shrink-0" />
            <span>{errors.message}</span>
          </p>
        ) : null}
      </div>

      <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className="btn btn-solid gap-2.5"
        >
          {pending ? (
            <>
              <SpinnerIcon className="icon-spin h-4 w-4" />
              <span>{contactForm.submittingLabel}</span>
            </>
          ) : (
            <span>{ctaLabel}</span>
          )}
        </button>

        <p className="text-xs text-ink-muted">{contactForm.privacyNote}</p>
      </div>
    </form>
  );
}
