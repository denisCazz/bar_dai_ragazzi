import { t, type Locale } from '../i18n';
import { gestionaleUrl } from './menu';

export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  layout: 'wide' | 'tall' | 'banner';
};

export function mosaicLayout(
  index: number,
  total: number,
  width: number,
  height: number,
): GalleryPhoto['layout'] {
  if (index === total - 1 && width >= height) return 'banner';
  return width >= height ? 'wide' : 'tall';
}

export async function fetchPublicGallery(): Promise<GalleryPhoto[] | null> {
  const base = gestionaleUrl();
  if (!base) return null;
  try {
    const res = await fetch(`${base}/api/public/gallery`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      foto?: { src: string; width: number; height: number; alt: string }[];
    };
    if (!Array.isArray(data.foto) || data.foto.length === 0) return null;
    return data.foto.map((photo, index) => ({
      ...photo,
      layout: mosaicLayout(index, data.foto!.length, photo.width, photo.height),
    }));
  } catch {
    return null;
  }
}

export function galleryFor(locale: Locale): GalleryPhoto[] {
  const alts = t(locale).galleryAlts;
  return gallery.map((photo, index) => ({
    ...photo,
    alt: alts[index] ?? photo.alt,
  }));
}

export const gallery = [
  {
    src: '/gallery/sala-menta.jpg',
    width: 1024,
    height: 682,
    alt: 'Sala con pareti menta, tavoli neri e sedie arancioni',
    layout: 'wide',
  },
  {
    src: '/gallery/cappuccino.jpg',
    width: 682,
    height: 1024,
    alt: 'Cappuccino con latte art a forma di cuore',
    layout: 'tall',
  },
  {
    src: '/gallery/spritz.jpg',
    width: 682,
    height: 1024,
    alt: 'Spritz servito davanti all’insegna Aperol',
    layout: 'tall',
  },
  {
    src: '/gallery/angolo-aperol.jpg',
    width: 1024,
    height: 682,
    alt: 'Angolo arancione con scritte Aperol e Campari',
    layout: 'wide',
  },
  {
    src: '/gallery/espresso-macchina.jpg',
    width: 682,
    height: 1024,
    alt: 'Espresso che scende nella tazzina dalla macchina',
    layout: 'tall',
  },
  {
    src: '/gallery/dehors.jpg',
    width: 682,
    height: 1024,
    alt: 'Dehors con tende rosse, cuscini Aperol e Campari',
    layout: 'tall',
  },
  {
    src: '/gallery/sala-divano.jpg',
    width: 1024,
    height: 682,
    alt: 'Sala con divano, cantinetta a muro e passavivande',
    layout: 'wide',
  },
  {
    src: '/gallery/espresso-bancone.jpg',
    width: 682,
    height: 1024,
    alt: 'Tazzina da espresso sul bancone, con i bicchieri sullo sfondo',
    layout: 'tall',
  },
  {
    src: '/gallery/cappuccino-insegna.jpg',
    width: 682,
    height: 1024,
    alt: 'Cappuccino in primo piano con l’insegna Garavella 7',
    layout: 'tall',
  },
  {
    src: '/gallery/sala-sera.jpg',
    width: 1024,
    height: 682,
    alt: 'Sala serale con pareti verdi e lampadine appese',
    layout: 'wide',
  },
  {
    src: '/gallery/espresso-versato.jpg',
    width: 682,
    height: 1024,
    alt: 'Dettaglio dell’espresso versato in tazzina',
    layout: 'tall',
  },
  {
    src: '/gallery/tazzina-bancone.jpg',
    width: 682,
    height: 1024,
    alt: 'Tazzina da caffè sul bancone di legno',
    layout: 'tall',
  },
  {
    src: '/gallery/sala-botte.jpg',
    width: 1024,
    height: 682,
    alt: 'Sala con botte, orologio e finestra sul bancone',
    layout: 'banner',
  },
] as const;
