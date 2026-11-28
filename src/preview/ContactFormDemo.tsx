'use client';

import { type FormEvent, useRef, useState } from 'react';
import { ContactFormView } from '../components/ContactFormView';
import {
  callRequestedField,
  honeypotField,
  type ContactChannel,
  type ContactErrors,
  type ContactState,
} from '../lib/contact';
import {
  formatArgentineLocalInput,
  validateArgentineLocalPhone,
} from '../lib/phone';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactFormDemo() {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<ContactState>({ status: 'idle' });
  const [pending, setPending] = useState(false);

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneLocalValue, setPhoneLocalValue] = useState('');
  const [channel, setChannel] = useState<ContactChannel>('call');

  const [sentName, setSentName] = useState('');
  const [sentPhone, setSentPhone] = useState('');
  const [sentChannel, setSentChannel] = useState<ContactChannel>('call');

  const clearFieldError = (field: keyof ContactErrors) => {
    setState((prev) => {
      if (prev.status !== 'invalid' || !prev.errors[field]) return prev;
      const nextErrors = { ...prev.errors };
      delete nextErrors[field];
      return Object.keys(nextErrors).length > 0
        ? { status: 'invalid', errors: nextErrors }
        : { status: 'idle' };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Honeypot silencioso: si fue completado por un bot, simulamos éxito sin procesar
    if (String(formData.get(honeypotField) ?? '').trim().length > 0) {
      setState({ status: 'sent' });
      return;
    }

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const callRequested = formData.get(callRequestedField) === 'yes';
    const phoneCheck = validateArgentineLocalPhone(phoneLocalValue);

    const errors: ContactErrors = {};
    if (!name) {
      errors.name = 'Ingresá tu nombre y apellido.';
    }
    if (!email || !EMAIL_PATTERN.test(email)) {
      errors.email = 'Ingresá un email válido (ej: laura@tuempresa.com).';
    }
    if (!phoneCheck.valid && phoneCheck.error) {
      errors.phone = phoneCheck.error;
    }

    if (Object.keys(errors).length > 0) {
      setState({ status: 'invalid', errors });
      queueMicrotask(() => summaryRef.current?.focus());
      return;
    }

    setPending(true);
    setState({ status: 'idle' });

    window.setTimeout(() => {
      setPending(false);
      setSentName(name.split(/\s+/)[0] || name);
      setSentPhone(phoneCheck.fullFormatted);
      setSentChannel(callRequested ? 'call' : 'whatsapp');
      setState({ status: 'sent' });
    }, 600);
  };

  const handleReset = () => {
    formRef.current?.reset();
    setNameValue('');
    setEmailValue('');
    setPhoneLocalValue('');
    setChannel('call');
    setSentName('');
    setSentPhone('');
    setPending(false);
    setState({ status: 'idle' });
  };

  return (
    <ContactFormView
      state={state}
      pending={pending}
      nameValue={nameValue}
      emailValue={emailValue}
      phoneLocalValue={phoneLocalValue}
      channel={channel}
      sentName={sentName}
      sentPhone={sentPhone}
      sentChannel={sentChannel}
      formRef={formRef}
      summaryRef={summaryRef}
      onSubmit={handleSubmit}
      onNameChange={(value) => {
        setNameValue(value);
        clearFieldError('name');
      }}
      onEmailChange={(value) => {
        setEmailValue(value);
        clearFieldError('email');
      }}
      onPhoneLocalChange={(raw) => {
        setPhoneLocalValue(formatArgentineLocalInput(raw));
        clearFieldError('phone');
      }}
      onChannelChange={(next) => setChannel(next)}
      onReset={handleReset}
    />
  );
}
