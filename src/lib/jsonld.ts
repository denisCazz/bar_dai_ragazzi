import { aperitivi, site } from '../data/site';
import type { PublicMenuSection } from '../data/menu';
import { localizedPath, t, type Locale } from '../i18n';

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

export function barJsonLd(locale: Locale) {
  const copy = t(locale);
  return {
    '@context': 'https://schema.org',
    '@type': ['BarOrPub', 'Restaurant', 'CafeOrCoffeeShop'],
    '@id': `${site.url}/#locale`,
    name: site.name,
    alternateName: ['Bar Garavella 7', 'Garavella 7 Carmagnola', 'Garavella7'],
    description: copy.description,
    url: new URL(localizedPath('/', locale), site.url).href,
    image: [`${site.url}/og.png`, `${site.url}/favicon.png`],
    logo: `${site.url}/favicon.png`,
    telephone: [site.telephone, site.mobile],
    priceRange: site.priceRange,
    servesCuisine: [...copy.cuisine],
    menu: new URL(localizedPath('/menu', locale), site.url).href,
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

export function websiteJsonLd(locale: Locale) {
  const copy = t(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: locale === 'en' ? 'en' : 'it-IT',
    description: copy.description,
    publisher: { '@id': `${site.url}/#locale` },
  };
}

export function faqJsonLd(locale: Locale) {
  const copy = t(locale);
  const buffet = aperitivi[0];
  const tagliere = aperitivi[1];
  const tagliereCopy = copy.aperitivi[1];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: copy.faq.buffetQuestion,
        acceptedAnswer: {
          '@type': 'Answer',
          text: copy.faq.buffetAnswer(buffet.time, buffet.price),
        },
      },
      {
        '@type': 'Question',
        name: copy.faq.boardQuestion,
        acceptedAnswer: {
          '@type': 'Answer',
          text: copy.faq.boardAnswer(
            tagliereCopy.when,
            tagliere.time,
            tagliere.price,
            tagliereCopy.note,
          ),
        },
      },
      {
        '@type': 'Question',
        name: copy.faq.whereQuestion,
        acceptedAnswer: {
          '@type': 'Answer',
          text: copy.faq.whereAnswer(
            site.address.display,
            site.telephoneDisplay,
            site.mobileDisplay,
          ),
        },
      },
    ],
  };
}

export function menuJsonLd(menu: PublicMenuSection[], locale: Locale) {
  const menuUrl = new URL(localizedPath('/menu', locale), site.url).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${menuUrl}#menu`,
    name: `Menu ${site.name}`,
    inLanguage: locale === 'en' ? 'en' : 'it-IT',
    hasMenuSection: menu.map((section) => ({
      '@type': 'MenuSection',
      name: section.title,
      description: section.subtitle,
      hasMenuItem: section.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        ...(item.image ? { image: new URL(item.image, site.url).href } : {}),
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

export function webpageJsonLd(opts: {
  path: string;
  title: string;
  description: string;
  locale: Locale;
}) {
  const url = new URL(opts.path, site.url).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: opts.locale === 'en' ? 'en' : 'it-IT',
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#locale` },
  };
}
