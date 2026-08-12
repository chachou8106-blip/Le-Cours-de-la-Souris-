# 🏗️ Architecture du Projet

## 📌 Vue d'Ensemble

`Le Cours de la Souris` est une **application full-stack** conçue pour être **modulaire, scalable et token-ready**. Voici une vue d'ensemble de son architecture :

---

## 🖥️ Frontend (React + Vite + PWA)

### Structure
```
apps/web/
├── public/           # Assets statiques (logos, favicons, etc.)
├── src/
│   ├── components/   # Composants React réutilisables
│   │   ├── ui/       # Composants UI (boutons, cartes, modales)
│   │   ├── charts/   # Graphiques (Recharts)
│   │   ├── map/      # Carte mondiale (MapLibre GL)
│   │   └── games/    # Composants des mini-jeux
│   │
│   ├── features/    # Fonctionnalités principales
│   │   ├── daily-humor/ # Scènes humoristiques quotidiennes
│   │   ├── games/     # Mini-jeux (20+)
│   │   ├── reports/   # Déclaration de dents
│   │   └── croq/      # Tout ce qui concerne CROQ
│   │
│   ├── pages/       # Pages de l'application
│   │   ├── Home/      # Accueil
│   │   ├── Countries/ # Liste et détails des pays
│   │   ├── Index/     # Indice mondial
│   │   ├── Games/     # Page des mini-jeux
│   │   ├── CROQ/      # Page CROQ
│   │   └── Admin/     # Dashboard admin
│   │
│   ├── hooks/       # Custom hooks (ex: useCountries)
│   ├── utils/       # Fonctions utilitaires
│   ├── styles/      # Styles globaux (Tailwind CSS)
│   ├── types/       # Types TypeScript
│   ├── App.tsx      # Composant racine
│   └── main.tsx     # Point d'entrée
│
├── capacitor.config.ts  # Configuration Capacitor (mobile)
├── vite.config.ts       # Configuration Vite
└── package.json
```

### Technologies
- **React 18** : Bibliothèque principale pour l'UI.
- **Vite** : Bundler ultra-rapide.
- **TypeScript** : Typage statique.
- **Tailwind CSS** : Framework CSS utilitaire.
- **Radix UI** : Composants accessibles (modales, dropdowns).
- **Recharts** : Bibliothèque de graphiques.
- **MapLibre GL** : Carte interactive.
- **i18next** : Internationalisation (FR/EN/ES/DEU/...).
- **Capacitor** : Compatibilité mobile (Android/iOS).

### Fonctionnalités Clés
- **PWA** : Installable, hors ligne, notifications push.
- **Responsive Design** : Adapté à tous les écrans.
- **Thème** : Mode clair/sombre, couleurs personnalisées.
- **Accessibilité** : Conforme WCAG 2.1.

---

## 🚀 Backend (Hono + Cloudflare Workers)

### Structure
```
apps/worker/
├── src/
│   ├── routes/       # Routes API (v1)
│   │   ├── health.ts     # /api/v1/health
│   │   ├── countries.ts  # /api/v1/countries
│   │   ├── reports.ts    # /api/v1/reports
│   │   ├── index.ts      # /api/v1/index
│   │   ├── chat.ts       # /api/v1/chat
│   │   ├── croq.ts       # /api/v1/croq
│   │   └── admin/        # /api/v1/admin/*
│   │
│   ├── handlers/     # Logique métier
│   │   ├── index-engine.ts # Calcul des indices
│   │   ├── moderation.ts   # Modération des déclarations
│   │   └── ...
│   │
│   ├── middleware/   # Middleware
│   │   ├── auth.ts        # Authentification
│   │   ├── rate-limit.ts  # Rate limiting
│   │   └── turnstile.ts   # Vérification Turnstile
│   │
│   └── bindings/     # Bindings Cloudflare
│       ├── d1.ts         # Base de données D1
│       ├── r2.ts         # Stockage R2
│       └── kv.ts         # KV (cache/sessions)
│
├── wrangler.toml    # Configuration Wrangler
└── package.json
```

### Technologies
- **Hono** : Framework web léger pour Cloudflare Workers.
- **Cloudflare D1** : Base de données SQL serverless.
- **Cloudflare R2** : Stockage d'objets (images, exports).
- **Cloudflare KV** : Clé-valeur (cache, sessions).
- **Cloudflare Turnstile** : Protection anti-bot.
- **Cloudflare Queues** : Tâches asynchrones (modération, traduction).
- **Zod** : Validation des données.
- **Drizzle ORM** : ORM pour D1.

### Fonctionnalités Clés
- **API REST** : Routes versionnées (`/api/v1/*`).
- **Validation** : Zod pour toutes les entrées/sorties.
- **Sécurité** : Turnstile, rate limiting, CORS strict.
- **Cache** : KV pour les réponses fréquentes.
- **Tâches asynchrones** : Queues pour la modération et l'ingestion de données.

---

## 📦 Packages (Logique Partagée)

### Structure
```
packages/
├── ui/               # Design System (composants partagés)
├── contracts/        # Smart Contracts (Foundry)
│   ├── src/          # Contrats Solidity
│   ├── test/         # Tests Foundry
│   └── script/       # Scripts de déploiement
│
├── index-engine/     # Moteur de calcul de l'indice
│   └── src/
│       ├── community-index.ts # Médiane, IQR, confiance
│       └── official-index.ts   # Agrégation des tarifs officiels
│
├── ledger/           # Ledger CROQ (append-only)
│   └── src/
│       ├── croq-ledger.ts    # Gestion des événements
│       └── merkle.ts         # Preuves Merkle
│
├── schemas/          # Schémas Zod + OpenAPI
│   └── src/
│       ├── api/      # Schémas pour l'API
│       └── db/       # Schémas pour D1
│
├── i18n/             # Traductions
│   └── src/
│       └── locales/ # fr/, en/, es/, ...
│
├── data-connectors/  # Adaptateurs de données
│   └── src/
│       ├── fx-providers/     # Taux de change
│       ├── ppp-providers/    # Parité de pouvoir d'achat
│       └── dental-tariffs/   # Tarifs dentaires officiels
│
└── config/           # Configurations partagées
    ├── tsconfig.json
    ├── eslint.config.js
    └── prettierrc.json
```

### Technologies
- **TypeScript** : Typage strict pour toute la logique partagée.
- **Zod** : Validation des données.
- **Foundry** : Développement et test des contrats Solidity.
- **OpenZeppelin** : Bibliothèques sécurisées pour les contrats.

---

## 🗃️ Base de Données (Cloudflare D1)

### Schéma Principal
| Table | Description |
|-------|-------------|
| `countries` | Pays avec métadonnées (devise, tradition, etc.). |
| `family_payout_reports` | Rapports de paiement familial (déclarations utilisateurs). |
| `currency_metadata` | Métadonnées des devises. |
| `moderation_decisions` | Décisions de modération. |
| `fx_rates` | Taux de change (FX). |
| `ppp_rates` | Taux de parité de pouvoir d'achat (PPA). |
| `croq_ledger_events` | Événements du ledger CROQ (append-only). |
| `merkle_snapshots` | Snapshots Merkle pour vérification. |

### Exemple de Requête
```sql
-- Récupérer le montant médian pour un pays
SELECT 
    country_iso2,
    AVG(amount) as avg_amount,
    COUNT(*) as sample_size
FROM family_payout_reports
WHERE country_iso2 = 'FR' AND status = 'published'
GROUP BY country_iso2;
```

---

## 🔗 Intégrations Externes

### Cloudflare
- **Workers** : Hébergement de l'API et du frontend.
- **D1** : Base de données SQL.
- **R2** : Stockage d'objets (images, exports).
- **KV** : Cache et sessions.
- **Queues** : Tâches asynchrones.
- **Turnstile** : Protection anti-bot.
- **AI Gateway** : Chatbot et modération automatique.

### Amazon Associates
- **Code** : `zencheztoi-21`
- **Intégration** : Liens d'affiliation dans les fiches pays et jeux.

### Partenariats
- **Colgate/Oral-B** : Sponsoring de contenus éducatifs.
- **Lego/Disney** : Collaborations pour des contenus exclusifs.

---

## 🔒 Sécurité

### Mesures Implémentées
- **Pas de PII** : Aucune donnée personnelle sur les enfants.
- **Turnstile** : Protection contre les bots/spam.
- **Rate Limiting** : Limite des requêtes API (100/minute/IP).
- **CORS** : Restreint aux domaines autorisés.
- **Chiffrement** : Données sensibles chiffrées en base.
- **Ledger Immuable** : Preuves Merkle pour transparence.
- **Audits** : Prêt pour les audits externes (contrats, sécurité).

### Bonnes Pratiques
- **Validation** : Zod pour toutes les entrées.
- **Sanitization** : Nettoyage des commentaires utilisateurs.
- **Modération** : Quarantaine automatique pour les contenus suspects.
- **Logs** : Journalisation sans PII.

---

## 📊 Performances

### Optimisations
- **Cache** : KV pour les réponses fréquentes (ex: liste des pays).
- **CDN** : Cloudflare CDN pour les assets statiques.
- **Lazy Loading** : Chargement différé des composants lourds.
- **Compression** : Gzip/Brotli pour les réponses API.

### Métriques
| Métrique | Valeur Cible |
|----------|--------------|
| Temps de chargement (PWA) | < 2s |
| Temps de réponse API | < 200ms |
| Disponibilité | 99.9% |
| Couverture de tests | > 80% |

---

## 🚀 Déploiement

### Environnements
| Environnement | Description | URL |
|---------------|-------------|-----|
| Local | Développement local | `http://localhost:3000` |
| Staging | Pré-production | `https://staging.coursdelasouris.fr` |
| Production | Production | `https://coursdelasouris.fr` |

### Workflows CI/CD
- **GitHub Actions** :
  - `ci.yml` : Lint, typecheck, tests unitaires.
  - `e2e.yml` : Tests Playwright.
  - `contracts.yml` : Tests Foundry + Slither.
  - `staging.yml` : Déploiement sur staging.
  - `production.yml` : Déploiement en production (manuel).

### Commandes Utiles
```bash
# Développement
pnpm dev

# Build
pnpm build

# Tests
pnpm test
pnpm test:e2e
pnpm contracts:test

# Déploiement
pnpm deploy:staging
pnpm deploy:production
```

---

## 📜 Licence
[MIT](../LICENSE) © Zen Chez Toi