# Dai Ragazzi

Sito vetrina del bar Dai Ragazzi, Piazza Garavella 7, Carmagnola.

## Sviluppo

```sh
npm install
npm run dev
```

## Produzione (Coolify)

Il `Dockerfile` costruisce il sito statico con Node 22 Alpine e lo serve con Nginx sulla porta **80**.

In Coolify: nuova risorsa → Dockerfile → porta `80` → dominio `www.bardairagazzicarmagnola.it`.

Il menu si aggiorna in `src/data/menu.ts`.
