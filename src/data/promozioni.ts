import { t, type Locale } from '../i18n';
import { gestionaleUrl } from './menu';
import { aperitivi } from './site';

export type PublicPromozione = {
  id: string;
  title: string;
  titleEn?: string;
  when: string;
  whenEn?: string;
  time: string;
  price: string;
  note: string;
  noteEn?: string;
  highlight: boolean;
};

export const PUBLIC_PROMOZIONI_PATH = '/api/public/promozioni';

export function fallbackPromozioniFor(locale: Locale): PublicPromozione[] {
  const copy = t(locale);
  return aperitivi.map((item, index) => {
    const loc = copy.aperitivi[index];
    return {
      id: item.id,
      title: loc?.title ?? item.title,
      when: loc?.when ?? item.when,
      time: item.time,
      price: item.price,
      note: loc?.note ?? item.note,
      highlight: item.highlight,
    };
  });
}

export async function fetchPublicPromozioni(locale: Locale = 'it'): Promise<PublicPromozione[]> {
  const fallback = fallbackPromozioniFor(locale);
  const base = gestionaleUrl();
  if (!base) return fallback;

  try {
    const res = await fetch(`${base}${PUBLIC_PROMOZIONI_PATH}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return fallback;
    const data = (await res.json()) as { promozioni?: PublicPromozione[] };
    if (!Array.isArray(data.promozioni) || data.promozioni.length === 0) return fallback;
    return data.promozioni.map((p) => ({
      id: p.id,
      title: locale === 'en' && p.titleEn ? p.titleEn : p.title,
      when: locale === 'en' && p.whenEn ? p.whenEn : p.when,
      time: p.time ?? '',
      price: p.price ?? '',
      note: locale === 'en' && p.noteEn ? p.noteEn : p.note ?? '',
      highlight: Boolean(p.highlight),
    }));
  } catch {
    return fallback;
  }
}
