export interface ArgentineAreaOption {
  label: string;
  code: string;
}

export const argentineAreas: readonly ArgentineAreaOption[] = [
  { label: 'CABA y GBA (11)', code: '11' },
  { label: 'Buenos Aires · La Plata (221)', code: '221' },
  { label: 'Buenos Aires · Mar del Plata (223)', code: '223' },
  { label: 'Buenos Aires · Bahía Blanca (291)', code: '291' },
  { label: 'Buenos Aires · Pilar / Escobar / Campana (348)', code: '348' },
  { label: 'Buenos Aires · Tandil (249)', code: '249' },
  { label: 'Catamarca (383)', code: '383' },
  { label: 'Chaco · Resistencia (362)', code: '362' },
  { label: 'Chubut · Rawson / Trelew / Madryn (280)', code: '280' },
  { label: 'Chubut · Comodoro Rivadavia (297)', code: '297' },
  { label: 'Córdoba · Capital (351)', code: '351' },
  { label: 'Córdoba · Río Cuarto (358)', code: '358' },
  { label: 'Córdoba · Villa María (353)', code: '353' },
  { label: 'Corrientes · Capital (379)', code: '379' },
  { label: 'Entre Ríos · Paraná (343)', code: '343' },
  { label: 'Entre Ríos · Concordia (345)', code: '345' },
  { label: 'Formosa (370)', code: '370' },
  { label: 'Jujuy (388)', code: '388' },
  { label: 'La Pampa · Santa Rosa (2954)', code: '2954' },
  { label: 'La Rioja (380)', code: '380' },
  { label: 'Mendoza · Gran Mendoza (261)', code: '261' },
  { label: 'Mendoza · San Rafael (260)', code: '260' },
  { label: 'Misiones · Posadas (376)', code: '376' },
  { label: 'Neuquén · Capital (299)', code: '299' },
  { label: 'Río Negro · Bariloche (294)', code: '294' },
  { label: 'Río Negro · Alto Valle / Roca (298)', code: '298' },
  { label: 'Río Negro · Viedma (2920)', code: '2920' },
  { label: 'Salta (387)', code: '387' },
  { label: 'San Juan (264)', code: '264' },
  { label: 'San Luis (266)', code: '266' },
  { label: 'Santa Cruz · Río Gallegos (2966)', code: '2966' },
  { label: 'Santa Fe · Rosario (341)', code: '341' },
  { label: 'Santa Fe · Capital (342)', code: '342' },
  { label: 'Santiago del Estero (385)', code: '385' },
  { label: 'Tierra del Fuego · Ushuaia (2901)', code: '2901' },
  { label: 'Tucumán (381)', code: '381' },
];

const THREE_DIGIT_AREA_CODES = new Set([
  '220', '221', '223', '230', '236', '237', '249',
  '260', '261', '263', '264', '266', '280', '291',
  '294', '297', '298', '299', '336', '341', '342',
  '343', '345', '348', '351', '353', '358', '362',
  '364', '370', '376', '379', '380', '381', '383',
  '385', '387', '388',
]);

function splitArgentineNsn(nsn10: string): { area: string; local: string } {
  if (nsn10.startsWith('11')) {
    return {
      area: '11',
      local: `${nsn10.slice(2, 6)}-${nsn10.slice(6, 10)}`,
    };
  }
  const code3 = nsn10.slice(0, 3);
  if (THREE_DIGIT_AREA_CODES.has(code3)) {
    return {
      area: code3,
      local: `${nsn10.slice(3, 6)}-${nsn10.slice(6, 10)}`,
    };
  }
  return {
    area: nsn10.slice(0, 4),
    local: `${nsn10.slice(4, 6)}-${nsn10.slice(6, 10)}`,
  };
}

function stripArgentine15(digits: string): { nsn: string; had15: boolean } {
  if (digits.length !== 12) {
    return { nsn: digits, had15: false };
  }
  if (digits.startsWith('1115')) {
    return { nsn: `11${digits.slice(4)}`, had15: true };
  }
  if (THREE_DIGIT_AREA_CODES.has(digits.slice(0, 3)) && digits.slice(3, 5) === '15') {
    return { nsn: `${digits.slice(0, 3)}${digits.slice(5)}`, had15: true };
  }
  if (digits.slice(4, 6) === '15') {
    return { nsn: `${digits.slice(0, 4)}${digits.slice(6)}`, had15: true };
  }
  return { nsn: digits, had15: false };
}

export function applyAreaCodeToPhone(currentValue: string, areaCode: string): string {
  if (!areaCode) return currentValue;

  const trimmed = currentValue.trim();
  const digitsOnly = trimmed.replace(/\D/g, '');

  // Extract existing local number if possible so user doesn't lose what they already typed
  let localDigits = '';
  if (digitsOnly.length > 0) {
    let rest = digitsOnly;
    if (rest.startsWith('54')) rest = rest.slice(2);
    if (rest.startsWith('9') && rest.length >= 11) rest = rest.slice(1);
    if (rest.startsWith('0')) rest = rest.slice(1);
    const stripped = stripArgentine15(rest).nsn;

    if (stripped.length === 10) {
      localDigits = splitArgentineNsn(stripped).local.replace(/\D/g, '');
    } else if (stripped.length <= 8 && !stripped.startsWith(areaCode)) {
      localDigits = stripped.startsWith('15') ? stripped.slice(2) : stripped;
    } else if (stripped.startsWith(areaCode)) {
      localDigits = stripped.slice(areaCode.length);
    }
  }

  const maxLocalLength = 10 - areaCode.length;
  const trimmedLocal = localDigits.slice(0, maxLocalLength);

  if (trimmedLocal.length === maxLocalLength) {
    return formatPhoneValue(`+54 9 ${areaCode}${trimmedLocal}`, 'mobile');
  }

  return trimmedLocal
    ? `+54 9 ${areaCode} ${trimmedLocal}`
    : `+54 9 ${areaCode} `;
}

export function formatPhoneValue(
  raw: string,
  phoneType?: 'mobile' | 'landline'
): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';

  const startsWithPlus = trimmed.startsWith('+');
  let digits = trimmed.replace(/\D/g, '');
  if (!digits) return '';

  if (trimmed.startsWith('00')) {
    digits = digits.slice(2);
  }

  // Non-Argentine international number
  if ((startsWithPlus || trimmed.startsWith('00')) && !digits.startsWith('54')) {
    return `+${digits.slice(0, 15)}`;
  }

  let had54 = false;
  let had9 = false;
  if (digits.startsWith('54') && (startsWithPlus || trimmed.startsWith('00') || digits.length >= 12)) {
    had54 = true;
    digits = digits.slice(2);
    if (digits.startsWith('9') && digits.length >= 11) {
      had9 = true;
      digits = digits.slice(1);
    }
  }

  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  const { nsn, had15 } = stripArgentine15(digits);

  if (nsn.length === 10) {
    const { area, local } = splitArgentineNsn(nsn);
    const useNine =
      phoneType === 'mobile'
        ? true
        : phoneType === 'landline'
          ? false
          : had9 || had15;
    return useNine ? `+54 9 ${area} ${local}` : `+54 ${area} ${local}`;
  }

  if (had54) {
    return `+54 ${had9 ? '9 ' : ''}${nsn}`;
  }

  return trimmed;
}

export function validateFormattedPhone(raw: string): {
  valid: boolean;
  formatted: string;
  error?: string;
} {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { valid: true, formatted: '' };
  }

  const formatted = formatPhoneValue(trimmed);
  const digits = formatted.replace(/\D/g, '');

  if (formatted.startsWith('+54')) {
    let national = digits.slice(2);
    if (national.startsWith('9') && national.length === 11) {
      national = national.slice(1);
    }
    if (national.length !== 10) {
      return {
        valid: false,
        formatted,
        error:
          'Ingresá el número completo con código de área de tu provincia (10 dígitos sin 0 ni 15, ej. +54 9 11 5555-1234).',
      };
    }
    return { valid: true, formatted };
  }

  if (formatted.startsWith('+')) {
    if (digits.length < 8 || digits.length > 15) {
      return {
        valid: false,
        formatted,
        error:
          'Verificá el código de país, código de área y número (entre 8 y 15 dígitos).',
      };
    }
    return { valid: true, formatted };
  }

  return {
    valid: false,
    formatted,
    error:
      'Incluí el código de país y código de área de tu provincia (ej. +54 9 11 5555-1234).',
  };
}
