export type ContactField = 'name' | 'email' | 'phone';

export type ContactChannel = 'call' | 'whatsapp';

export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactState =
  | { status: 'idle' }
  | { status: 'sent' }
  | { status: 'invalid'; errors: ContactErrors }
  | { status: 'rate_limited' }
  | { status: 'unavailable' };

export const contactLimits = {
  name: 120,
  email: 254,
  phone: 40,
} as const;

export const honeypotField = 'website';
export const callRequestedField = 'call_requested';
export const phoneTypeField = 'phone_type';
