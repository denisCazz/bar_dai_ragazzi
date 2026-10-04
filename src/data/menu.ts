import { t, type Locale } from '../i18n';

export type PublicMenuItem = {
  name: string;
  description?: string;
  price?: string;
  image?: string;
};

export type PublicMenuSection = {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  items: PublicMenuItem[];
};

export type PublicMenu = {
  updatedAt?: string;
  comingSoonCopy: string;
  categorie: PublicMenuSection[];
};

export const PUBLIC_MENU_PATH = '/api/public/menu';

const PRODUCTION_GESTIONALE_URL = 'https://gestionalegaravella7.bitora.it';

/** Usato solo se il gestionale non risponde. */
export function fallbackMenuFor(locale: Locale): PublicMenuSection[] {
  const copy = t(locale);
  return [
    {
      id: 'aperitivi',
      title: copy.fallback.aperitiviTitle,
      subtitle: copy.fallback.aperitiviSubtitle,
      items: [
        {
          name: copy.aperitivi[0].title,
          description: copy.fallback.buffetDescription,
          price: '13',
        },
        {
          name: copy.aperitivi[1].title,
          description: copy.fallback.tagliereDescription,
          price: '8.50',
        },
      ],
    },
    {
      id: 'colazione',
      title: copy.fallback.breakfastTitle,
      subtitle: copy.fallback.breakfastSubtitle,
      items: [],
    },
  ];
}

export const fallbackMenu = fallbackMenuFor('it');

export function gestionaleUrl() {
  const raw = (import.meta.env.PUBLIC_GESTIONALE_URL || PRODUCTION_GESTIONALE_URL).replace(
    /\/$/,
    '',
  );
  const local = /localhost|127\.0\.0\.1/.test(raw);
  if (raw.startsWith('http://') && !local) {
    return `https://${raw.slice('http://'.length)}`;
  }
  return raw;
}

export async function fetchPublicMenu(locale: Locale = 'it'): Promise<PublicMenu> {
  const fallback = {
    comingSoonCopy: t(locale).menu.comingSoon,
    categorie: fallbackMenuFor(locale),
  };
  const base = gestionaleUrl();
  if (!base) return fallback;

  try {
    const res = await fetch(`${base}${PUBLIC_MENU_PATH}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return fallback;
    const data = (await res.json()) as PublicMenu;
    if (!Array.isArray(data.categorie)) return fallback;
    return {
      updatedAt: data.updatedAt,
      comingSoonCopy:
        locale === 'en' ? fallback.comingSoonCopy : data.comingSoonCopy || fallback.comingSoonCopy,
      categorie: data.categorie,
    };
  } catch {
    return fallback;
  }
}
