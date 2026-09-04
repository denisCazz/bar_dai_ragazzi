export type PublicMenuItem = {
  name: string;
  description?: string;
  price?: string;
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

export const comingSoonCopy =
  'Il dettaglio dei piatti lo trovi al banco. Presto anche qui.';

export const PUBLIC_MENU_PATH = '/api/public/menu';

const PRODUCTION_GESTIONALE_URL = 'https://gestionaledairagazzi.bitora.it';

/** Usato solo se il gestionale non risponde. */
export const fallbackMenu: PublicMenuSection[] = [
  {
    id: 'aperitivi',
    title: 'Aperitivi',
    subtitle: 'Less stress, more spritz.',
    items: [
      {
        name: 'Aperitivo a buffet',
        description: 'Venerdì, 17:30 – 20:30. Compresa la prima consumazione.',
        price: '13',
      },
      {
        name: 'Aperitivo con tagliere',
        description:
          'Dal giovedì alla domenica, escluso il venerdì, 17:30 – 20:30. Finger food, sfiziosità fritte, pizza. Può variare in base alle disponibilità. Compresa la prima consumazione.',
        price: '8.50',
      },
    ],
  },
  {
    id: 'colazione',
    title: 'Colazione',
    subtitle: 'Dolce, salato, farcito al momento.',
    items: [],
  },
];

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

export async function fetchPublicMenu(): Promise<PublicMenu> {
  const base = gestionaleUrl();
  if (!base) {
    return { comingSoonCopy, categorie: fallbackMenu };
  }

  try {
    const res = await fetch(`${base}${PUBLIC_MENU_PATH}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return { comingSoonCopy, categorie: fallbackMenu };
    }
    const data = (await res.json()) as PublicMenu;
    if (!Array.isArray(data.categorie)) {
      return { comingSoonCopy, categorie: fallbackMenu };
    }
    return {
      updatedAt: data.updatedAt,
      comingSoonCopy: data.comingSoonCopy || comingSoonCopy,
      categorie: data.categorie,
    };
  } catch {
    return { comingSoonCopy, categorie: fallbackMenu };
  }
}
