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

/** Usato solo se il gestionale non risponde. */
export const fallbackMenu: PublicMenuSection[] = [
  {
    id: 'aperitivi',
    title: 'Aperitivi',
    subtitle: 'Less stress, more spritz.',
    items: [
      {
        name: 'Aperitivo a buffet',
        description: 'Venerdì, 17:00 – 20:30. Compresa la prima consumazione.',
        price: '13',
      },
      {
        name: 'Aperitivo con tagliere',
        description:
          'Tutti i giorni, 17:30 – 20:45. Formaggi, salumi, finger food e sfiziosità fritte. Compresa la prima consumazione.',
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
  return (import.meta.env.PUBLIC_GESTIONALE_URL ?? '').replace(/\/$/, '');
}

export async function fetchPublicMenu(): Promise<PublicMenu> {
  const base = gestionaleUrl();
  if (!base) {
    return { comingSoonCopy, categorie: fallbackMenu };
  }

  try {
    const res = await fetch(`${base}/api/public/menu`, {
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
