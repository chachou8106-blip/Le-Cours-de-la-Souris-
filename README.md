# 🦷 Le Cours de la Souris / The Tooth Fairy Exchange

**L’indice mondial communautaire des dents de lait.**

Une application familiale, humoristique et **token-ready** pour suivre, comparer et contribuer aux montants laissés par la Petite Souris (ou Tooth Fairy) dans le monde.

---

## 🚀 Démarrage Rapide

### Prérequis
- [Node.js 20+](https://nodejs.org/)
- [pnpm 8+](https://pnpm.io/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (pour Cloudflare Workers)
- [Foundry](https://book.getfoundry.sh/) (pour les contrats Solidity)

### Installation
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/chachou8106-blip/Le-Cours-de-la-Souris-.git
   cd Le-Cours-de-la-Souris-
   ```

2. Installer les dépendances :
   ```bash
   pnpm install
   ```

3. Configurer les variables d'environnement (voir `.dev.vars.example`).

4. Lancer l'application en développement :
   ```bash
   pnpm dev
   ```

---

## 📂 Structure du Projet

```
Le-Cours-de-la-Souris-/
├── apps/
│   ├── web/          # Frontend (React + Vite + PWA)
│   ├── worker/       # API (Hono + Cloudflare Workers)
│   └── admin/        # Dashboard Admin
├── packages/
│   ├── ui/           # Design System
│   ├── contracts/    # Smart Contracts (Foundry)
│   ├── index-engine/ # Moteur de calcul de l'indice
│   ├── ledger/       # Ledger CROQ (append-only)
│   ├── schemas/      # Schémas Zod + OpenAPI
│   ├── i18n/        # Traductions
│   └── data-connectors/ # Adaptateurs de données
├── infra/
│   ├── d1/          # Migrations + Seeds (Cloudflare D1)
│   └── cloudflare/  # Configurations Cloudflare
├── docs/            # Documentation
├── .github/         # Workflows GitHub Actions
└── public/          # Assets publics
```

---

## 🌍 Fonctionnalités Clés

### 📊 Cours et Indices
- **Cours officiel par pays** : Données sourcées auprès des ministères de la santé et associations dentaires.
- **Cours communautaire** : Médiane des montants déclarés par les utilisateurs.
- **Indice mondial** : Agrégation pondérée (par PPA) des cours communautaires.
- **Graphiques interactifs** : Évolution temporelle, comparatifs, et analyses.

### 🎮 Mini-Jeux (20+)
- **Devine le Montant** : Devinez le montant médian pour un pays.
- **Quizz Dentaire** : Questions sur les traditions dentaires.
- **Chasse aux Dents** : Collectionnez des dents virtuelles.
- **La Roue de la Souris** : Roue aléatoire avec bonus.
- *(Et 16 autres jeux...)*

### 🪙 Token CROQ
- **Phase 1** : CROQ Credits (récompenses virtuelles pour contributions).
- **Phase 2** : Token CROQ (ERC-20, staking, gouvernance).
- **Ledger append-only** : Preuves Merkle pour transparence.

### 📱 Mobile (PWA + Capacitor)
- **Compatibilité Android/iOS** via Capacitor.
- **Notifications push** pour les scènes humoristiques quotidiennes.
- **Mode hors ligne** pour une expérience fluide.

---

## 🤝 Partenariats
- **Amazon** : Liens d'affiliation avec le code `zencheztoi-21`.
- **Colgate/Oral-B** : Sponsoring de jeux et contenus éducatifs.
- **Autres** : Collaborations avec des marques de jouets et assurances.

---

## 🔒 Sécurité et Conformité
- **RGPD** : Pas de collecte de données personnelles sur les enfants.
- **Avertissements légaux** : CROQ Credits ≠ crypto, pas de promesse de rendement.
- **Audits** : Prêt pour les audits externes (contrats, sécurité, conformité).

---

## 📄 Documentation
- [Architecture](docs/architecture.md)
- [Méthodologie](docs/methodology.md)
- [Design du Token CROQ](docs/token-design.md)
- [Prêt pour l'Audit](docs/audit-readiness.md)
- [Politique de Confidentialité](docs/legal/privacy-policy.md)
- [Conditions Générales](docs/legal/terms-of-service.md)

---

## 🛠️ Déploiement

### Cloudflare
1. Configurer les variables d'environnement dans Cloudflare Dashboard.
2. Déployer les Workers :
   ```bash
   pnpm deploy:staging
   pnpm deploy:production
   ```

### Contrats Solidity
1. Tester localement avec Foundry :
   ```bash
   pnpm contracts:test
   ```
2. Déployer sur un testnet (ex: Sepolia) :
   ```bash
   forge script script/Deploy.s.sol --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast
   ```

---

## 🤖 Contribuer
Voir [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📜 Licence
[MIT](LICENSE) © Zen Chez Toi