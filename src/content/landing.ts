export const siteBrand = {
  name: 'AGENT CREW',
  skipToContent: 'Ir al contenido',
} as const;

export const ctaLabel = 'Pedí un diagnóstico';

export const callConsent =
  'Quiero que Agent Crew me llame a este teléfono para coordinar el diagnóstico.';

export const navLinks = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Módulos', href: '#modulos' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Comparador', href: '#comparador' },
  { label: 'Contacto', href: '#contacto' },
] as const;

export const hero = {
  kickerTop: 'AGENTES DE IA',
  brandDisplay: 'AGENT CREW',
  brandLetters: ['A', 'G', 'E', 'N', 'T', ' ', 'C', 'R', 'E', 'W'] as const,
  kickerBottom: 'PARA EMPRESAS',
  description:
    'Implementamos agentes de IA para empresas por etapas, con una persona de nuestro equipo al lado en cada paso.',
  ctaHref: '#contacto',
  ctaArrowLabel: 'Ir al pedido de diagnóstico',
  scrollStampText: 'EXPLORAR · POR ETAPAS · DIAGNÓSTICO · ',
  scrollStampLabel: 'Bajar al contenido principal',
  scrollStampHref: '#contenido',
  video: {
    poster: '/video/hero-poster.webp',
    mp4: '/video/hero.mp4',
    pauseLabel: 'Pausar la animación',
    playLabel: 'Reproducir la animación',
  },
  quickLinks: [
    { label: 'Cómo funciona', href: '#como-funciona', icon: 'layers' as const },
    { label: 'Módulos', href: '#modulos', icon: 'workflow' as const },
    { label: 'Pedí un diagnóstico', href: '#contacto', icon: 'send' as const },
  ],
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

export const calculatorSection = {
  id: 'comparador',
  eyebrow: 'Comparador de costos',
  title: 'Estimá el costo de un puesto tradicional frente a Agent Crew.',
  lead: 'Ajustá la jornada, las horas efectivas de trabajo y el sueldo para comparar el costo real por hora operativa contra una estimación referencial del servicio.',
  inputs: {
    workdayLabel: 'Jornada laboral diaria',
    workdayPresets: [
      { id: 'part', label: 'Media (4 h)', hours: 4, defaultEffective: 3.5 },
      { id: 'full', label: 'Completa (8 h)', hours: 8, defaultEffective: 6 },
      { id: 'ext', label: 'Extendida (9 h)', hours: 9, defaultEffective: 6.5 },
    ],
    workdaysPerMonthLabel: 'Días hábiles por mes',
    effectiveHoursLabel: 'Horas efectivas de trabajo por día',
    effectiveHoursHelp:
      'Descontando pausas, reuniones internas, cambios de tarea y tiempos sin demanda.',
    salaryLabel: 'Sueldo neto mensual estimado ($ ARS)',
    socialChargesLabel: 'Cargas sociales y costos laborales adicionales (%)',
    socialChargesHelp:
      'Aportes, contribuciones, ART, aguinaldo proporcional y estructura asociada.',
    serviceLabel: 'Costo aproximado mensual de Agent Crew ($ ARS)',
    servicePresets: [
      { id: 'm1', label: '1 módulo', monthly: 350000 },
      { id: 'm2', label: '2 módulos', monthly: 550000 },
      { id: 'm3', label: '3 módulos', monthly: 750000 },
    ],
    serviceHelp:
      'Valor referencial orientativo para comparar escenarios; el presupuesto exacto surge del diagnóstico.',
  },
  results: {
    employeeTitle: 'Puesto tradicional',
    employeeSubtitleSuffix: 'h efectivas/mes',
    serviceTitle: 'Agent Crew (24/7)',
    serviceSubtitle: '720 h/mes · atención simultánea',
    monthlyCostLabel: 'Costo mensual total',
    hourlyCostLabel: 'Costo por hora efectiva',
    savingsTitle: 'Diferencia mensual estimada',
    savingsAnnualLabel: 'Proyección anual',
    savingsPositiveSuffix: 'de ahorro estimado por mes',
    savingsNegativeNote:
      'Con estos parámetros el servicio cubre 24/7 con mayor capacidad por una inversión mensual superior al sueldo ingresado.',
    coverageComparisonLabel: 'Cobertura operativa mensual',
    disclaimer:
      'Cálculo orientativo en pesos argentinos. Podés editar cualquier monto o porcentaje para reflejar la estructura real de tu empresa.',
    ctaLabel: 'Pedí tu presupuesto exacto',
  },
} as const;

export const contactForm = {
  eyebrow: 'Contacto',
  title: 'Pedí un diagnóstico',
  subtitle:
    'Contanos qué proceso querés ordenar primero y coordinamos una charla para evaluarlo por etapas.',
  liveCallDemo: {
    title: 'Probalo en vivo con tu propio teléfono',
    body: 'Si dejás tu número y marcás la casilla de llamada, uno de nuestros agentes de IA te va a llamar por teléfono para coordinar el diagnóstico y que puedas probar el producto en una conversación real.',
    whatsappNote:
      'Si dejás tu teléfono y no marcás la casilla, uno de nuestros agentes te va a escribir por WhatsApp para brindarte más información y que puedas probar el servicio de primera mano.',
  },
  fields: {
    name: {
      label: 'Nombre y apellido',
      placeholder: 'Ej. Lucía Fernández',
    },
    email: {
      label: 'Email laboral',
      placeholder: 'lucia@tuempresa.com',
    },
    company: {
      label: 'Empresa',
      placeholder: 'Nombre de tu empresa',
    },
    phone: {
      label: 'Teléfono',
      optionalSuffix: '(opcional)',
      placeholder: '+54 9 11 5555-1234',
      areaLabel: 'Provincia / código de área',
      areaPlaceholder: 'Elegí tu provincia para autocompletar',
      help: 'Incluí código de país (+54), código de área/provincia y número sin 0 ni 15.',
    },
    phoneType: {
      legend: '¿Es un celular o un teléfono fijo?',
      mobile: 'Celular',
      landline: 'Fijo',
    },
    topic: {
      label: 'Área principal a evaluar',
      emptyOption: 'Todavía no lo sé',
    },
    message: {
      label: 'Contanos qué te gustaría resolver',
      placeholder: 'Describí brevemente el volumen de consultas, herramientas que usan o el cuello de botella actual.',
      help: 'Con dos o tres líneas alcanza para preparar el diagnóstico.',
    },
  },
  privacyNote: 'Usamos tus datos sólo para responderte.',
  submittingLabel: 'Enviando…',
  errorSummary: {
    single: 'Revisá 1 campo para enviar tu pedido',
    pluralPrefix: 'Revisá ',
    pluralSuffix: ' campos para enviar tu pedido',
  },
  notices: {
    rate_limited:
      'Recibimos varios pedidos seguidos desde tu conexión. Esperá unos minutos antes de volver a intentar.',
    unavailable:
      'En este momento no pudimos procesar el envío. Intentá nuevamente en unos minutos.',
  },
  sent: {
    title: 'Recibimos tu pedido de diagnóstico',
    withEmailPrefix: 'Te escribimos a ',
    withEmailSuffix: ' para coordinar la llamada.',
    withoutEmail: 'Te escribimos a la brevedad para coordinar la llamada.',
    nextTitle: 'Qué sigue',
    steps: [
      'Revisamos el contexto que compartiste sobre tu empresa.',
      'Te contactamos para acordar día y horario de la reunión de diagnóstico.',
      'Definimos juntos si conviene avanzar con una primera etapa acotada.',
    ],
    resetLabel: 'Enviar otro pedido',
  },
} as const;

export const footerContent = {
  legalNotice:
    'Agent Crew es una marca comercial operada por Franco Rebollo, titular de la actividad económica en Argentina.',
  legalLinkLabel: 'Información legal',
  legalLinkHref: '/informacion-legal',
} as const;
