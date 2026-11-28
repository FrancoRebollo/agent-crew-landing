export const siteBrand = {
  name: 'AGENT CREW',
  skipToContent: 'Ir al contenido',
} as const;

export const ctaLabel = 'Pedí un diagnóstico';

export const callConsent =
  'Quiero que Agent Crew me llame a este teléfono para coordinar el diagnóstico.';

export const navCtaLabel = 'Probar en vivo';

export const navLinks = [
  { label: 'Agentes', href: '#modulos' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const hero = {
  eyebrow: 'Agentes de IA para empresas',
  title: 'Multiplicá la capacidad de tu negocio con agentes de IA 24/7.',
  subtitleLead:
    'Desde llamadas y WhatsApp hasta facturación, cobranzas y control de stock:',
  subtitleMiddle: 'automatizamos tu operación',
  subtitleAccent: 'por etapas, con acompañamiento humano en cada paso.',
  primaryCtaLabel: 'Probá el agente por teléfono',
  secondaryCtaLabel: ctaLabel,
  secondaryCtaHref: '#contacto',
  trustNote: 'Implementación por etapas · Sin equipo técnico interno',
  liveDemoModal: {
    eyebrow: 'Prueba en vivo',
    title: 'Probá el agente por teléfono',
    description:
      'Dejanos tu nombre y teléfono y uno de nuestros agentes de IA te llama en segundos para que lo pruebes en una conversación real.',
    nameLabel: 'Nombre',
    namePlaceholder: 'Ej. Lucía Fernández',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '+54 9 11 5555-1234',
    phoneHelp: 'Incluí código de país y área (ej. +54 9 11 5555-1234).',
    submitLabel: 'Recibir llamada ahora',
    submittingLabel: 'Iniciando llamada…',
    privacyNote: 'Solo usamos tu número para esta llamada de prueba.',
    sentTitlePrefix: '¡Listo, ',
    sentTitleSuffix: '! Te estamos llamando',
    sentBodyPrefix: 'Nuestro agente de IA está llamando al ',
    sentBodySuffix: '. Atendé para probar la conversación en vivo.',
    closeLabel: 'Cerrar',
    diagnosticFallbackLabel: '¿Preferís un diagnóstico completo?',
  },
  scrollStampText: 'EXPLORAR · POR ETAPAS · DIAGNÓSTICO · ',
  scrollStampLabel: 'Bajar al contenido principal',
  scrollStampHref: '#contenido',
  video: {
    poster: '/video/hero-poster.webp',
    mp4: '/video/hero.mp4',
    pauseLabel: 'Pausar la animación',
    playLabel: 'Reproducir la animación',
  },
  instagram: {
    label: 'Agent Crew en Instagram',
    href: 'https://www.instagram.com/agentcrew.cloud/',
  },
} as const;

export const methodologySection = {
  id: 'como-funciona',
  eyebrow: 'Cómo funciona',
  title: 'Agentes de IA implementados por etapas, nunca a ciegas.',
  lead: 'Cada empresa tiene procesos propios. En lugar de prometer soluciones mágicas de un día para el otro, trabajamos codo a codo con tu equipo desde el primer diagnóstico hasta la operación diaria.',
  pillars: [
    {
      index: '01',
      title: 'Diagnóstico del proceso real',
      body: 'Relevamos cómo trabaja hoy tu equipo en atención, ventas, administración o logística para detectar dónde un agente aporta valor concreto.',
    },
    {
      index: '02',
      title: 'Implementación gradual',
      body: 'Avanzamos por etapas cortas y medibles sobre tus herramientas actuales, validando cada caso antes de pasar al siguiente.',
    },
    {
      index: '03',
      title: 'Una persona del equipo al lado',
      body: 'No te dejamos solo con un panel. Tenés acompañamiento humano continuo para ajustar criterios, entrenar al agente y escalar con tranquilidad.',
    },
  ],
} as const;

export const modulesSection = {
  id: 'modulos',
  eyebrow: 'Módulos principales',
  title: 'Tres módulos diseñados para resolver la operación diaria.',
  lead: 'Podés empezar por el área que hoy genera más demoras o trabajo manual e incorporar los demás módulos a medida que la operación se ordena.',
  functionsLabel: 'Funciones incluidas',
  goalLabel: 'Objetivo',
  items: [
    {
      code: 'Módulo 01',
      title: 'Atención al cliente y ventas',
      description:
        'Automatización de la comunicación con clientes actuales y potenciales.',
      functions: [
        'Atención telefónica automatizada.',
        'Atención por WhatsApp.',
        'Respuestas en redes sociales y página web.',
        'Atención de consultas las 24 horas.',
        'Llamadas salientes a bases de datos.',
        'Ofrecimiento de productos y servicios.',
        'Seguimiento de potenciales clientes.',
        'Recuperación de oportunidades comerciales.',
      ],
      goal: 'Mejorar la atención, reducir tiempos de espera y aumentar las oportunidades de venta.',
    },
    {
      code: 'Módulo 02',
      title: 'Administración, facturación y cobranzas',
      description:
        'Automatización de procesos administrativos posteriores a la venta.',
      functions: [
        'Emisión automática de facturas.',
        'Envío de enlaces de pago.',
        'Gestión y seguimiento de cobranzas.',
        'Recordatorios de pagos pendientes.',
        'Registro de operaciones.',
        'Seguimiento administrativo de clientes.',
      ],
      goal: 'Reducir tareas manuales, agilizar la administración y mejorar los tiempos de cobro.',
    },
    {
      code: 'Módulo 03',
      title: 'Control de stock y logística',
      description:
        'Automatización de procesos vinculados con inventarios y operaciones.',
      functions: [
        'Control de existencias.',
        'Actualización de stock.',
        'Alertas de stock mínimo.',
        'Seguimiento de pedidos.',
        'Control de movimientos de mercadería.',
        'Coordinación y seguimiento de entregas.',
      ],
      goal: 'Mejorar el control operativo, reducir errores y optimizar la logística.',
    },
  ],
} as const;

export const benefitsSection = {
  id: 'beneficios',
  eyebrow: 'Beneficios para PyMEs',
  title: 'Por qué las empresas reemplazan tareas repetitivas por agentes.',
  lead: 'Impacto directo en costos, capacidad de respuesta y productividad sin armar un equipo técnico interno.',
  items: [
    {
      index: '01',
      title: 'Ahorro en costos laborales',
      detail: 'Menor necesidad de incorporar personal para tareas automatizables.',
    },
    {
      index: '02',
      title: 'Reducción de cargas laborales',
      detail: 'Menor estructura de costos asociada a las funciones automatizadas.',
    },
    {
      index: '03',
      title: 'Disponibilidad 24/7',
      detail: 'Atención continua, incluso fines de semana y feriados.',
    },
    {
      index: '04',
      title: 'Respuesta inmediata',
      detail: 'Reducción de tiempos de espera.',
    },
    {
      index: '05',
      title: 'Mayor capacidad de atención',
      detail: 'Posibilidad de gestionar múltiples consultas simultáneamente.',
    },
    {
      index: '06',
      title: 'Incremento de oportunidades comerciales',
      detail: 'Contacto y seguimiento permanente de potenciales clientes.',
    },
    {
      index: '07',
      title: 'Mayor productividad',
      detail: 'Los empleados pueden concentrarse en tareas de mayor valor.',
    },
    {
      index: '08',
      title: 'Reducción de errores',
      detail: 'Automatización de procesos repetitivos.',
    },
    {
      index: '09',
      title: 'Escalabilidad',
      detail: 'Posibilidad de crecer sin aumentar proporcionalmente la estructura operativa.',
    },
    {
      index: '10',
      title: 'Tecnología sin desarrollo propio',
      detail: 'Acceso a soluciones avanzadas sin tener que contratar un equipo tecnológico interno.',
    },
  ],
} as const;

export const stagesSection = {
  id: 'etapas',
  eyebrow: 'Etapas',
  title: 'Del relevamiento inicial al agente en producción.',
  items: [
    {
      step: 'Etapa 1',
      title: 'Mapeo y alcance',
      detail: 'Definimos un área prioritaria, las reglas del negocio y el criterio de éxito con los responsables de tu equipo.',
    },
    {
      step: 'Etapa 2',
      title: 'Puesta en marcha asistida',
      detail: 'Conectamos el agente en un entorno controlado y probamos escenarios reales junto a las personas que operan el área.',
    },
    {
      step: 'Etapa 3',
      title: 'Seguimiento y expansión',
      detail: 'Medimos respuestas, ajustamos bordes y evaluamos nuevas tareas recién cuando la primera etapa funciona estable.',
    },
  ],
  closingCtaLabel: ctaLabel,
  closingCtaHref: '#contacto',
} as const;

export const contactForm = {
  badge: 'PRUEBA EN VIVO',
  title: 'Probalo ahora mismo en tu propio teléfono',
  subtitle:
    'Dejanos tus datos, elegí si preferís llamada o WhatsApp y comprobá cómo responde nuestro agente de IA en una conversación real.',
  highlights: [
    'Respuesta en segundos',
    'Acompañamiento humano en cada etapa',
    'Usamos tus datos solo para responderte',
  ],
  fields: {
    name: {
      label: 'Nombre y apellido',
      placeholder: 'Ej: Laura Gómez',
    },
    email: {
      label: 'Email',
      placeholder: 'laura@tuempresa.com',
    },
    phone: {
      label: 'Teléfono',
      prefix: '🇦🇷 +54 9',
      placeholder: '11 2345-6789',
    },
    preference: {
      legend: '¿Cómo preferís probarlo?',
      options: {
        call: {
          title: 'Quiero que el agente me llame',
          description: 'Probá la voz en vivo y coordiná tu diagnóstico.',
          ctaLabel: 'Recibir llamada de prueba',
          submittingLabel: 'Iniciando llamada…',
        },
        whatsapp: {
          title: 'Prefiero que me escriba por WhatsApp',
          description: 'Chateá con el agente para recibir información.',
          ctaLabel: 'Recibir WhatsApp de prueba',
          submittingLabel: 'Enviando WhatsApp…',
        },
      },
    },
  },
  errorSummary: {
    single: 'Revisá 1 campo para continuar',
    pluralPrefix: 'Revisá ',
    pluralSuffix: ' campos para continuar',
  },
  notices: {
    rate_limited:
      'Recibimos varios pedidos seguidos desde tu conexión. Esperá unos minutos antes de volver a intentar.',
    unavailable:
      'En este momento no pudimos procesar el envío. Intentá nuevamente en unos minutos.',
  },
  sent: {
    callTitlePrefix: '¡Listo, ',
    callTitleSuffix: '! Te estamos llamando',
    callBodyPrefix: 'Nuestro agente de IA está llamando al ',
    callBodySuffix: '. Atendé para probar la conversación en vivo.',
    whatsappTitlePrefix: '¡Listo, ',
    whatsappTitleSuffix: '! Revisá tu WhatsApp',
    whatsappBodyPrefix: 'Nuestro agente de IA te está escribiendo al ',
    whatsappBodySuffix: ' para que puedas probarlo en tiempo real.',
    resetLabel: 'Probar con otro número',
  },
} as const;

export const footerContent = {
  legalNotice:
    'Agent Crew es una marca comercial operada por Franco Rebollo, titular de la actividad económica en Argentina.',
  legalLinkLabel: 'Información legal',
  legalLinkHref: '/informacion-legal',
} as const;
