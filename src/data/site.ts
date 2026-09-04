export const site = {
  name: 'Dai Ragazzi',
  legalName: 'Bar Dai Ragazzi',
  tagline: 'Less stress, more spritz!',
  shortDescription:
    'Colazioni, pranzi e aperitivi in Piazza Garavella a Carmagnola.',
  description:
    'Bar Dai Ragazzi a Carmagnola: colazioni, tavola calda, panini, hamburger e aperitivi. Tutti i venerdì aperitivo a buffet, dal giovedì alla domenica (escluso il venerdì) aperitivo con tagliere. Piazza Garavella, 7.',
  url: 'https://garavella7.bitora.it',
  lang: 'it',
  locale: 'it_IT',
  telephone: '+390110860110',
  telephoneDisplay: '011 086 0110',
  mobile: '+393802605646',
  mobileDisplay: '380 260 5646',
  whatsapp: 'https://wa.me/390110860110',
  priceRange: '€',
  foundingHint: 'Bar, tavola calda, hamburgeria e cocktail in centro a Carmagnola.',
  address: {
    street: 'Piazza Garavella, 7',
    city: 'Carmagnola',
    postalCode: '10022',
    region: 'TO',
    regionName: 'Piemonte',
    country: 'IT',
    countryName: 'Italia',
    display: 'Piazza Garavella, 7 — 10022 Carmagnola (TO)',
  },
  geo: {
    lat: 44.84655,
    lng: 7.720389,
  },
  maps: {
    google:
      'https://www.google.com/maps/search/?api=1&query=Piazza+Garavella+7+Carmagnola',
    embed:
      'https://www.google.com/maps?q=Piazza+Garavella+7+Carmagnola&hl=it&z=17&output=embed',
  },
  social: {
    instagram: 'https://www.instagram.com/bardairagazzi/',
    facebook: 'https://www.facebook.com/bardairagazzi',
    tiktok: 'https://www.tiktok.com/@bar.dai.ragazzi',
  },
  creator: {
    name: 'bitora.it',
    url: 'https://bitora.it',
  },
  hours: {
    display: 'Tutti i giorni, 9:00 – 21:00',
    note: 'Orari soggetti a variazioni. Meglio una telefonata prima di passare.',
    weekly: [
      {
        days: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ] as const,
        daysIt: 'Lun – Dom',
        opens: '09:00',
        closes: '21:00',
      },
    ],
  },
  rating: {
    value: 4.7,
    count: 87,
    best: 5,
  },
  keywords: [
    'bar Carmagnola',
    'Dai Ragazzi',
    'aperitivo Carmagnola',
    'colazione Carmagnola',
    'hamburger Carmagnola',
    'cocktail bar Piazza Garavella',
    'tavola calda Carmagnola',
    'aperitivo buffet venerdì',
  ],
} as const;

export const aperitivi = [
  {
    id: 'buffet',
    title: 'Aperitivo a buffet',
    when: 'Tutti i venerdì',
    time: '17:30 – 20:30',
    price: '13',
    note: 'Compresa la prima consumazione',
    highlight: true,
  },
  {
    id: 'tagliere',
    title: 'Aperitivo con tagliere',
    when: 'Dal giovedì alla domenica, escluso il venerdì',
    time: '17:30 – 20:30',
    price: '8.50',
    note: 'Finger food, sfiziosità fritte, pizza. Può variare in base alle disponibilità. Compresa la prima consumazione',
    highlight: false,
  },
] as const;

export const moments = [
  {
    title: 'Colazione',
    text: 'Brioche farcite al momento, caffè e il via della giornata senza fretta.',
  },
  {
    title: 'Pausa pranzo',
    text: 'Tavola calda, panini, focacce calde e hamburger pronti in pochi minuti.',
  },
  {
    title: 'Aperitivo',
    text: 'Spritz, cocktail, taglieri e il buffet del venerdì. Less stress, more spritz.',
  },
] as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/contatti', label: 'Contatti' },
] as const;
