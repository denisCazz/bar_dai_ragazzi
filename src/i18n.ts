export const defaultLocale = 'it' as const;
export const locales = ['it', 'en'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return value === 'it' || value === 'en';
}

export function localeFromPath(pathname: string): Locale {
  const path = pathname.replace(/\/$/, '') || '/';
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'it';
}

/** Path without the /en prefix and without a hash. */
export function stripLocale(pathname: string): string {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/en') return '/';
  if (path.startsWith('/en/')) return path.slice(3) || '/';
  return path;
}

/** Localize a site path. Hash is preserved: `/#gallery` → `/en#gallery`. */
export function localizedPath(path: string, locale: Locale): string {
  const hashAt = path.indexOf('#');
  const bare = hashAt >= 0 ? path.slice(0, hashAt) || '/' : path;
  const hash = hashAt >= 0 ? path.slice(hashAt) : '';
  const clean = stripLocale(bare);
  if (locale === defaultLocale) return `${clean}${hash}`;
  return `${clean === '/' ? '/en' : `/en${clean}`}${hash}`;
}

const it = {
  htmlLang: 'it',
  ogLocale: 'it_IT',
  skip: 'Vai ai contenuti',
  language: 'Lingua',
  openMenu: 'Apri menu',
  closeMenu: 'Chiudi menu',
  navLabel: 'Principale',
  navMobileLabel: 'Mobile',
  whatsappLabel: 'Scrivici su WhatsApp',
  brandHome: 'home',
  footerCredit: 'Sito creato da',
  hours: 'Tutti i giorni, 9:00 – 21:00',
  hoursNote: 'Orari soggetti a variazioni. Meglio una telefonata prima di passare.',
  keywords: [
    'bar Carmagnola',
    'Garavella 7',
    'aperitivo Carmagnola',
    'colazione Carmagnola',
    'hamburger Carmagnola',
    'cocktail bar Piazza Garavella',
    'tavola calda Carmagnola',
    'aperitivo buffet venerdì',
  ],
  description:
    'Bar Garavella 7 a Carmagnola: colazioni, tavola calda, panini, hamburger e aperitivi. Tutti i venerdì aperitivo a buffet, dal giovedì alla domenica (escluso il venerdì) aperitivo con tagliere. Piazza Garavella, 7.',
  cuisine: ['Italiana', 'Bar', 'Hamburger', 'Cocktail'],
  nav: [
    { href: '/', label: 'Home' },
    { href: '/#gallery', label: 'Gallery' },
    { href: '/menu', label: 'Menu' },
    { href: '/contatti', label: 'Contatti' },
  ],
  home: {
    kicker: 'Bar · Carmagnola',
    lead: 'Colazioni, pranzi e aperitivi in Piazza Garavella. Ambiente accogliente, cucina casareccia, cocktail e taglieri. Dalla brioche del mattino all’ultimo spritz.',
    ctaAperitivi: 'Scopri i nostri aperitivi',
    ctaMenu: 'Vedi il menu',
    heroAlt: 'Due spritz serviti al tavolo',
    heroCaption: 'Aperitivo, dal giovedì alla domenica.',
    marquee: 'Less stress · more spritz · colazione · hamburger · aperitivo · cocktail · Carmagnola ·',
    aperitivoKicker: 'Aperitivo time',
    aperitivoTitle: 'Scopri i nostri aperitivi',
    localeAlt: 'Interno accogliente di un cocktail bar',
    google: 'Su Google',
    localeTitle: 'Il locale sotto casa, senza stress.',
    localeText: (count: number, value: number) =>
      `${count} recensioni, media ${value}/5. Ambiente accogliente, apericena e un rapporto qualità-prezzo che fa tornare.`,
    galleryKicker: 'Il locale',
    galleryTitle: 'Gallery',
    openPhoto: 'Apri foto',
    close: 'Chiudi',
    prevPhoto: 'Foto precedente',
    nextPhoto: 'Foto successiva',
    visitKicker: 'Vieni a trovarci',
    call: (phone: string) => `Chiama ${phone}`,
    directions: 'Indicazioni',
    mapTitle: (name: string) => `Mappa di ${name}`,
    openMaps: 'Apri in Google Maps',
  },
  aperitivi: [
    {
      title: 'Aperitivo a buffet',
      when: 'Tutti i venerdì',
      note: 'Compresa la prima consumazione',
    },
    {
      title: 'Aperitivo con tagliere',
      when: 'Dal giovedì alla domenica, escluso il venerdì',
      note: 'Finger food, sfiziosità fritte, pizza. Può variare in base alle disponibilità. Compresa la prima consumazione',
    },
  ],
  galleryAlts: [
    'Sala con pareti menta, tavoli neri e sedie arancioni',
    'Cappuccino con latte art a forma di cuore',
    'Spritz servito davanti all’insegna Aperol',
    'Angolo arancione con scritte Aperol e Campari',
    'Espresso che scende nella tazzina dalla macchina',
    'Dehors con tende rosse, cuscini Aperol e Campari',
    'Sala con divano, cantinetta a muro e passavivande',
    'Tazzina da espresso sul bancone, con i bicchieri sullo sfondo',
    'Cappuccino in primo piano con l’insegna Garavella 7',
    'Sala serale con pareti verdi e lampadine appese',
    'Dettaglio dell’espresso versato in tazzina',
    'Tazzina da caffè sul bancone di legno',
    'Sala con botte, orologio e finestra sul bancone',
  ],
  menu: {
    title: 'Menu',
    description:
      'Menu Garavella 7 a Carmagnola: aperitivi, colazione, pausa pranzo, cocktail e cantina. Buffet del venerdì e aperitivo con tagliere dal giovedì alla domenica, escluso il venerdì.',
    kicker: 'La carta',
    lead: 'Quello che trovi al banco, aggiornato dal gestionale. Per allergie e intolleranze, chiedi a noi.',
    toc: 'Sezioni del menu',
    reservations: 'Prenotazioni',
    comingSoon: 'Il dettaglio dei piatti lo trovi al banco. Presto anche qui.',
    crumb: 'Menu',
  },
  fallback: {
    aperitiviTitle: 'Aperitivi',
    aperitiviSubtitle: 'Less stress, more spritz.',
    buffetDescription: 'Venerdì, 17:30 – 20:30. Compresa la prima consumazione.',
    tagliereDescription:
      'Dal giovedì alla domenica, escluso il venerdì, 17:30 – 20:30. Finger food, sfiziosità fritte, pizza. Può variare in base alle disponibilità. Compresa la prima consumazione.',
    breakfastTitle: 'Colazione',
    breakfastSubtitle: 'Dolce, salato, farcito al momento.',
  },
  contact: {
    title: 'Contatti',
    description: (address: string, phone: string, mobile: string) =>
      `Bar Garavella 7, ${address}. Telefono ${phone}, cellulare ${mobile}. Prenota un tavolo, chiedi gli orari o passa in piazza.`,
    kicker: 'Piazza Garavella, 7',
    heading: 'Vieni a Garavella 7.',
    lead: 'Siamo in centro a Carmagnola. Colazione, pausa pranzo, aperitivo. Una telefonata basta per un tavolo.',
    address: 'Indirizzo',
    phone: 'Telefono',
    mobile: 'Cellulare',
    whatsapp: 'WhatsApp',
    write: 'Scrivici',
    hours: 'Orari',
    mapTitle: (name: string) => `Mappa ${name}`,
    crumb: 'Contatti',
  },
  notFound: {
    title: 'Pagina non trovata',
    description: (name: string) => `La pagina non esiste. Torna su ${name}.`,
    heading: 'Qui non c’è nemmeno lo spritz.',
    body: 'La pagina non c’è. Torna in piazza, o al menu.',
  },
  faq: {
    buffetQuestion: 'Quando c’è l’aperitivo a buffet da Garavella 7?',
    buffetAnswer: (time: string, price: string) =>
      `Tutti i venerdì, ${time}, a ${price} euro. Prima consumazione inclusa.`,
    boardQuestion: 'Quanto costa l’aperitivo con tagliere?',
    boardAnswer: (when: string, time: string, price: string, note: string) =>
      `${when}, ${time}, a ${price} euro. ${note}.`,
    whereQuestion: 'Dove si trova il bar Garavella 7 a Carmagnola?',
    whereAnswer: (address: string, phone: string, mobile: string) =>
      `${address}. Telefono ${phone}, cellulare ${mobile}.`,
  },
};

const en: typeof it = {
  htmlLang: 'en',
  ogLocale: 'en_US',
  skip: 'Skip to content',
  language: 'Language',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  navLabel: 'Main',
  navMobileLabel: 'Mobile',
  whatsappLabel: 'Message us on WhatsApp',
  brandHome: 'home',
  footerCredit: 'Site by',
  hours: 'Every day, 9:00 – 21:00',
  hoursNote: 'Hours can change. Best to call before you come by.',
  keywords: [
    'bar Carmagnola',
    'Garavella 7',
    'aperitivo Carmagnola',
    'breakfast Carmagnola',
    'burger Carmagnola',
    'cocktail bar Piazza Garavella',
    'hot food Carmagnola',
    'Friday buffet aperitivo',
  ],
  description:
    'Garavella 7 in Carmagnola: breakfast, hot counter, sandwiches, burgers and aperitivo. Buffet aperitivo every Friday, and a board aperitivo from Thursday to Sunday (except Friday). Piazza Garavella, 7.',
  cuisine: ['Italian', 'Bar', 'Burgers', 'Cocktails'],
  nav: [
    { href: '/', label: 'Home' },
    { href: '/#gallery', label: 'Gallery' },
    { href: '/menu', label: 'Menu' },
    { href: '/contatti', label: 'Contact' },
  ],
  home: {
    kicker: 'Bar · Carmagnola',
    lead: 'Breakfast, lunch and aperitivo in Piazza Garavella. A welcoming room, home cooking, cocktails and boards. From the morning brioche to the last spritz.',
    ctaAperitivi: 'See our aperitivo',
    ctaMenu: 'See the menu',
    heroAlt: 'Two spritz served at the table',
    heroCaption: 'Aperitivo, Thursday to Sunday.',
    marquee: 'Less stress · more spritz · breakfast · burger · aperitivo · cocktail · Carmagnola ·',
    aperitivoKicker: 'Aperitivo time',
    aperitivoTitle: 'See our aperitivo',
    localeAlt: 'Welcoming interior of a cocktail bar',
    google: 'On Google',
    localeTitle: 'The neighbourhood bar, without the stress.',
    localeText: (count: number, value: number) =>
      `${count} reviews, averaging ${value}/5. A welcoming room, aperitivo dinner, and prices that bring people back.`,
    galleryKicker: 'The room',
    galleryTitle: 'Gallery',
    openPhoto: 'Open photo',
    close: 'Close',
    prevPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    visitKicker: 'Come and see us',
    call: (phone: string) => `Call ${phone}`,
    directions: 'Directions',
    mapTitle: (name: string) => `Map of ${name}`,
    openMaps: 'Open in Google Maps',
  },
  aperitivi: [
    {
      title: 'Buffet aperitivo',
      when: 'Every Friday',
      note: 'First drink included',
    },
    {
      title: 'Aperitivo with a board',
      when: 'Thursday to Sunday, except Friday',
      note: 'Finger food, fried bites, pizza. It can change with what’s available. First drink included',
    },
  ],
  galleryAlts: [
    'Room with mint walls, black tables and orange chairs',
    'Cappuccino with heart-shaped latte art',
    'Spritz served in front of the Aperol sign',
    'Orange corner with Aperol and Campari lettering',
    'Espresso pouring from the machine into a cup',
    'Outdoor seating with red awnings and Aperol and Campari cushions',
    'Room with a sofa, wall wine fridge and service hatch',
    'Espresso cup on the counter, glasses in the background',
    'Cappuccino in the foreground with the Garavella 7 sign',
    'Evening room with green walls and hanging bulbs',
    'Close-up of espresso poured into a cup',
    'Coffee cup on the wooden counter',
    'Room with a barrel, a clock and a window onto the counter',
  ],
  menu: {
    title: 'Menu',
    description:
      'Garavella 7 menu in Carmagnola: aperitivo, breakfast, lunch, cocktails and the cellar. Friday buffet, and a board aperitivo from Thursday to Sunday, except Friday.',
    kicker: 'The menu',
    lead: 'What’s on the counter, updated from the till. For allergies and intolerances, just ask us.',
    toc: 'Menu sections',
    reservations: 'Reservations',
    comingSoon: 'The dish list is at the counter. It will be here soon.',
    crumb: 'Menu',
  },
  fallback: {
    aperitiviTitle: 'Aperitivo',
    aperitiviSubtitle: 'Less stress, more spritz.',
    buffetDescription: 'Friday, 17:30 – 20:30. First drink included.',
    tagliereDescription:
      'Thursday to Sunday, except Friday, 17:30 – 20:30. Finger food, fried bites, pizza. It can change with what’s available. First drink included.',
    breakfastTitle: 'Breakfast',
    breakfastSubtitle: 'Sweet, savoury, filled to order.',
  },
  contact: {
    title: 'Contact',
    description: (address: string, phone: string, mobile: string) =>
      `Bar Garavella 7, ${address}. Phone ${phone}, mobile ${mobile}. Book a table, check the hours, or drop by the square.`,
    kicker: 'Piazza Garavella, 7',
    heading: 'Come to Garavella 7.',
    lead: 'We’re in the centre of Carmagnola. Breakfast, lunch, aperitivo. One phone call is enough for a table.',
    address: 'Address',
    phone: 'Phone',
    mobile: 'Mobile',
    whatsapp: 'WhatsApp',
    write: 'Message us',
    hours: 'Hours',
    mapTitle: (name: string) => `${name} map`,
    crumb: 'Contact',
  },
  notFound: {
    title: 'Page not found',
    description: (name: string) => `This page doesn’t exist. Back to ${name}.`,
    heading: 'Not even a spritz here.',
    body: 'This page isn’t here. Back to the square, or the menu.',
  },
  faq: {
    buffetQuestion: 'When is the buffet aperitivo at Garavella 7?',
    buffetAnswer: (time: string, price: string) =>
      `Every Friday, ${time}, €${price}. First drink included.`,
    boardQuestion: 'How much is the aperitivo with a board?',
    boardAnswer: (when: string, time: string, price: string, note: string) =>
      `${when}, ${time}, €${price}. ${note}.`,
    whereQuestion: 'Where is Garavella 7 in Carmagnola?',
    whereAnswer: (address: string, phone: string, mobile: string) =>
      `${address}. Phone ${phone}, mobile ${mobile}.`,
  },
};

const ui = { it, en };

export type Copy = (typeof ui)['it'];

export function t(locale: Locale): Copy {
  return ui[locale];
}

export function mapsEmbed(locale: Locale) {
  const hl = locale === 'en' ? 'en' : 'it';
  return `https://www.google.com/maps?q=Piazza+Garavella+7+Carmagnola&hl=${hl}&z=17&output=embed`;
}
