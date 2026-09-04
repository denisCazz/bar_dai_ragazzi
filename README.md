# Dai Ragazzi

Sito vetrina del bar Dai Ragazzi, Piazza Garavella 7, Carmagnola.

## Sviluppo

```sh
npm install
npm run dev
```

## Produzione (Coolify)

Il `Dockerfile` costruisce il sito statico con Node 22 Alpine e lo serve con Nginx sulla porta **80**.

Domini attuali: sito `garavella7.bitora.it`, gestionale `gestionalegaravella7.bitora.it`.

In Coolify, variabile di build:

```
PUBLIC_GESTIONALE_URL=https://gestionalegaravella7.bitora.it
```

Deve essere **https**, altrimenti il browser blocca il menu (mixed content). Nginx fa da proxy su `/api/public/menu`, così la pagina si aggiorna dal gestionale senza ricompilare il sito.
