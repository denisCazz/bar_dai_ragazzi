import { aperitivi, site } from '../data/site';
import type { PublicMenuSection } from '../data/menu';

const sameAs = [site.social.instagram, site.social.facebook, site.social.tiktok];

const openingHoursSpecification = site.hours.weekly.map((block) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: [...block.days],
  opens: block.opens,
  closes: block.closes,
}));

const address = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  postalCode: site.address.postalCode,
  addressRegion: site.address.region,
  addressCountry: site.address.country,
};

const geo = {
  '@type': 'GeoCoordinates',
  latitude: site.geo.lat,
  longitude: site.geo.lng,
};

export function barJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['BarOrPub', 'Restaurant', 'CafeOrCoffeeShop'],
    '@id': `${site.url}/#locale`,
    name: site.name,
    alternateName: ['Bar Dai Ragazzi', 'Dai Ragazzi Carmagnola', 'Bar dai ragazzi'],
    description: site.description,
    url: site.url,
    image: [`${site.url}/og.png`, `${site.url}/favicon.png`],
    logo: `${site.url}/favicon.png`,
    telephone: [site.telephone, site.mobile],
    priceRange: site.priceRange,
    servesCuisine: ['Italiana', 'Bar', 'Hamburger', 'Cocktail'],
    menu: `${site.url}/menu`,
    acceptsReservations: 'True',
    address,
    geo,
    hasMap: site.maps.google,
    sameAs,
    openingHoursSpecification,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(site.rating.value),
      reviewCount: String(site.rating.count),
      bestRating: String(site.rating.best),
      worstRating: '1',
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: 'it-IT',
    description: site.description,
    publisher: { '@id': `${site.url}/#locale` },
  };
}

export function faqJsonLd() {
  const buffet = aperitivi[0];
  const tagliere = aperitivi[1];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quando c’è l’aperitivo a buffet Dai Ragazzi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Tutti i venerdì, ${buffet.time}, a ${buffet.price} euro. Prima consumazione inclusa.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto costa l’aperitivo con tagliere?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${tagliere.when}, ${tagliere.time}, a ${tagliere.price} euro. ${tagliere.note}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Dove si trova il bar Dai Ragazzi a Carmagnola?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${site.address.display}. Telefono ${site.telephoneDisplay}, cellulare ${site.mobileDisplay}.`,
        },
      },
    ],
  };
}

export function menuJsonLd(menu: PublicMenuSection[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${site.url}/menu#menu`,
    name: `Menu ${site.name}`,
    hasMenuSection: menu.map((section) => ({
      '@type': 'MenuSection',
      name: section.title,
      description: section.subtitle,
      hasMenuItem: section.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        ...(item.price
          ? {
              offers: {
                '@type': 'Offer',
                price: item.price.replace(',', '.'),
                priceCurrency: 'EUR',
              },
            }
          : {}),
      })),
    })),
  };
}

export function webpageJsonLd(opts: { path: string; title: string; description: string }) {
  const url = new URL(opts.path, site.url).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: 'it-IT',
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#locale` },
  };
}
