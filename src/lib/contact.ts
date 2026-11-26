export const contactAreas = [
  'Atención al cliente',
  'Ventas y seguimiento',
  'Operaciones',
  'Administración y cobranzas',
] as const;

export type ContactField = 'name' | 'email' | 'company' | 'phone' | 'topic' | 'message';

export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactState =
  | { status: 'idle' }
  | { status: 'sent' }
  | { status: 'invalid'; errors: ContactErrors; askPhoneType?: boolean }
  | { status: 'rate_limited' }
  | { status: 'unavailable' };

export const contactLimits = { name: 120, email: 254, company: 120, phone: 40, message: 4000 } as const;

export const honeypotField = 'website';
export const callRequestedField = 'call_requested';
export const phoneTypeField = 'phone_type';
