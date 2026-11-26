'use client';

import { type FormEvent, useRef, useState } from 'react';
import { ContactFormView } from '../components/ContactFormView';
import type { ContactErrors, ContactState } from '../lib/contact';
import { validateFormattedPhone } from '../lib/phone';

type PreviewPreset =
  | 'idle'
  | 'pending'
  | 'invalid'
  | 'askPhoneType'
  | 'unavailable'
  | 'rate_limited'
  | 'sent';

const presetButtons: { id: PreviewPreset; label: string }[] = [
  { id: 'idle', label: 'Vacío' },
  { id: 'pending', label: 'Enviando' },
  { id: 'invalid', label: 'Con errores' },
  { id: 'askPhoneType', label: '¿Celular o fijo?' },
  { id: 'unavailable', label: 'Servicio caído' },
  { id: 'rate_limited', label: 'Demasiados envíos' },
  { id: 'sent', label: 'Enviado' },
];

const sampleErrors: ContactErrors = {
  name: 'Ingresá tu nombre y apellido.',
  email: 'Ingresá un email laboral válido.',
  company: 'Indicá el nombre de tu empresa.',
  message: 'Contanos brevemente qué proceso querés evaluar.',
};

export function ContactFormDemo() {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const [preset, setPreset] = useState<PreviewPreset>('idle');
  const [state, setState] = useState<ContactState>({ status: 'idle' });
  const [pending, setPending] = useState(false);
  const [askPhoneType, setAskPhoneType] = useState(false);
  const [sentTo, setSentTo] = useState('');

  const applyPreset = (next: PreviewPreset) => {
    setPreset(next);

    switch (next) {
      case 'idle':
        setPending(false);
        setAskPhoneType(false);
        setSentTo('');
        setState({ status: 'idle' });
        break;
      case 'pending':
        setPending(true);
        setAskPhoneType(false);
        setState({ status: 'idle' });
        break;
      case 'invalid':
        setPending(false);
        setAskPhoneType(false);
        setState({ status: 'invalid', errors: sampleErrors });
        queueMicrotask(() => summaryRef.current?.focus());
        break;
      case 'askPhoneType':
        setPending(false);
        setAskPhoneType(true);
        setState({
          status: 'invalid',
          errors: {
            phone: 'Indicá si el número ingresado es celular o teléfono fijo.',
          },
          askPhoneType: true,
        });
        break;
      case 'unavailable':
        setPending(false);
        setAskPhoneType(false);
        setState({ status: 'unavailable' });
        break;
      case 'rate_limited':
        setPending(false);
        setAskPhoneType(false);
        setState({ status: 'rate_limited' });
        break;
      case 'sent':
        setPending(false);
        setAskPhoneType(false);
        setSentTo('lucia@empresa.com.ar');
        setState({ status: 'sent' });
        break;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const company = String(formData.get('company') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const callRequested = formData.get('call_requested') === 'yes';
    const message = String(formData.get('message') ?? '').trim();

    const errors: ContactErrors = {};
    if (!name) errors.name = 'Ingresá tu nombre y apellido.';
    if (!email || !email.includes('@'))
      errors.email = 'Ingresá un email laboral válido.';
    if (!company) errors.company = 'Indicá el nombre de tu empresa.';
    if (callRequested && !phone) {
      errors.phone =
        'Ingresá tu teléfono con código de área de tu provincia para que podamos llamarte.';
    } else if (phone) {
      const phoneCheck = validateFormattedPhone(phone);
      if (!phoneCheck.valid && phoneCheck.error) {
        errors.phone = phoneCheck.error;
      }
    }
    if (!message)
      errors.message = 'Contanos brevemente qué proceso querés evaluar.';

    if (Object.keys(errors).length > 0) {
      setPreset('invalid');
      setState({ status: 'invalid', errors });
      queueMicrotask(() => summaryRef.current?.focus());
      return;
    }

    setPending(true);
    setPreset('pending');
    window.setTimeout(() => {
      setPending(false);
      setSentTo(email);
      setAskPhoneType(Boolean(phone) && !formData.get('phone_type'));
      setPreset('sent');
      setState({ status: 'sent' });
    }, 550);
  };

  const handleReset = () => {
    formRef.current?.reset();
    applyPreset('idle');
  };

  return (
    <div>
      <ContactFormView
        state={state}
        pending={pending}
        askPhoneType={askPhoneType}
        sentTo={sentTo}
        formRef={formRef}
        summaryRef={summaryRef}
        onSubmit={handleSubmit}
        onPhoneBlur={() => {
          const phoneValue = formRef.current?.phone?.value?.trim?.() ?? '';
          if (phoneValue.length > 5) {
            setAskPhoneType(true);
          }
        }}
        onPhoneChange={(value) => {
          if (value.trim().length === 0) {
            setAskPhoneType(false);
          }
        }}
        onCallRequestedChange={(checked) => {
          if (checked) {
            const phoneValue = formRef.current?.phone?.value?.trim?.() ?? '';
            if (phoneValue.length > 0) {
              setAskPhoneType(true);
            }
          }
        }}
        onPhoneTypeChange={() => {}}
        onReset={handleReset}
      />

      <div
        role="group"
        aria-label="Selector de estados de vista previa del formulario"
        className="mt-5 flex flex-wrap items-center gap-2"
      >
        <span className="mr-1 text-xs font-medium text-ink-muted">
          Vista previa de estados:
        </span>
        {presetButtons.map((item) => {
          const isActive = preset === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => applyPreset(item.id)}
              aria-pressed={isActive}
              className={`min-h-9 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? 'border-white bg-white text-black'
                  : 'border-white/25 bg-transparent text-white/80 hover:border-white/60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
