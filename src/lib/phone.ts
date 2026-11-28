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

function normalizeArgentineNationalDigits(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('0054')) {
    digits = digits.slice(4);
  } else if (digits.startsWith('54') && digits.length >= 11) {
    digits = digits.slice(2);
  }

  if (digits.startsWith('9') && digits.length >= 11) {
    digits = digits.slice(1);
  }

  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  digits = stripArgentine15(digits).nsn;

  return digits.slice(0, 10);
}

/**
 * Formats an Argentine national mobile number progressively as the user types
 * next to the fixed "+54 9" visual prefix (e.g. "11 2345-6789", "351 234-5678").
 */
export function formatArgentineLocalInput(raw: string): string {
  const digits = normalizeArgentineNationalDigits(raw);
  if (!digits) return '';

  if (digits.startsWith('11')) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  }

  const code3 = digits.slice(0, 3);
  if (digits.length >= 3 && THREE_DIGIT_AREA_CODES.has(code3)) {
    if (digits.length === 3) return code3;
    if (digits.length <= 6) return `${code3} ${digits.slice(3)}`;
    return `${code3} ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }

  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Builds the backend-ready "+54 9 ..." value from the local input.
 */
export function buildFullArgentineMobile(localRaw: string): string {
  const formattedLocal = formatArgentineLocalInput(localRaw);
  return formattedLocal ? `+54 9 ${formattedLocal}` : '';
}

/**
 * Validates the local Argentine phone input (requires 10 national digits).
 */
export function validateArgentineLocalPhone(localRaw: string): {
  valid: boolean;
  localFormatted: string;
  fullFormatted: string;
  error?: string;
} {
  const digits = normalizeArgentineNationalDigits(localRaw);
  const localFormatted = formatArgentineLocalInput(localRaw);
  const fullFormatted = localFormatted ? `+54 9 ${localFormatted}` : '';

  if (!digits) {
    return {
      valid: false,
      localFormatted: '',
      fullFormatted: '',
      error: 'Ingresá tu número de teléfono para poder contactarte.',
    };
  }

  if (digits.length !== 10) {
    return {
      valid: false,
      localFormatted,
      fullFormatted,
      error:
        'Ingresá tu código de área y número completo (10 dígitos, ej: 11 2345-6789).',
    };
  }

  return { valid: true, localFormatted, fullFormatted };
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
  if (
    digits.startsWith('54') &&
    (startsWithPlus || trimmed.startsWith('00') || digits.length >= 12)
  ) {
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
          'Ingresá el número completo con código de área (10 dígitos, ej: +54 9 11 2345-6789).',
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
      'Incluí el código de país y código de área (ej: +54 9 11 2345-6789).',
  };
}
