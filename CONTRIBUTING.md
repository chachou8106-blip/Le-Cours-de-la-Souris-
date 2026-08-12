# 🤝 Contribuer à Le Cours de la Souris

**Merci de vouloir contribuer !** 🎉

Ce guide explique comment **contribuer** au projet **Le Cours de la Souris** (The Tooth Fairy Exchange). Que vous soyez un **développeur**, un **designer**, un **traducteur**, ou simplement un **utilisateur passionné**, votre aide est la bienvenue !

---

## 📌 1. Code de Conduite

En participant à ce projet, vous acceptez de respecter notre **[Code de Conduite](CODE_OF_CONDUCT.md)**. Soyez **courtois**, **respectueux**, et **bienveillant** envers les autres contributeurs.

---

## 📌 2. Comment Contribuer ?

### 2.1. **Signaler un Bug**
Si vous trouvez un bug, veuillez **ouvrir une issue** sur GitHub en utilisant le template **[Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)**. Incluez :
- Une **description claire** du bug.
- Les **étapes pour reproduire**.
- Votre **environnement** (navigateur, OS, version de l'app).
- Des **captures d'écran** si possible.

🔗 [Ouvrir une issue de bug](https://github.com/chachou8106-blip/Le-Cours-de-la-Souris-/issues/new?template=bug_report.md)

---

### 2.2. **Proposer une Nouvelle Fonctionnalité**
Si vous avez une idée pour améliorer le projet, ouvrez une issue en utilisant le template **[Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)**. Incluez :
- Une **description détaillée** de la fonctionnalité.
- Le **problème** que cela résout.
- Des **exemples** ou maquettes si possible.

🔗 [Proposer une fonctionnalité](https://github.com/chachou8106-blip/Le-Cours-de-la-Souris-/issues/new?template=feature_request.md)

---

### 2.3. **Contribuer au Code**
#### **Étapes pour Contribuer**
1. **Forker** le dépôt :
   ```bash
   git clone https://github.com/chachou8106-blip/Le-Cours-de-la-Souris-.git
   cd Le-Cours-de-la-Souris-
   ```

2. **Créer une branche** pour votre contribution :
   ```bash
   git checkout -b feat/ma-nouvelle-fonctionnalite
   ```

3. **Faire vos modifications** :
   - Respectez les **conventions de code** (voir [Section 4](#4-conventions-de-code)).
   - Ajoutez des **tests** si applicable.
   - Mettez à jour la **documentation** si nécessaire.

4. **Commiter vos changements** :
   ```bash
   git add .
   git commit -m "feat: ajouter ma nouvelle fonctionnalité"
   ```
   > ⚠️ **Utilisez des messages de commit clairs** (suivez [Conventional Commits](https://www.conventionalcommits.org/)).

5. **Pousser vers votre fork** :
   ```bash
   git push origin feat/ma-nouvelle-fonctionnalite
   ```

6. **Ouvrir une Pull Request (PR)** :
   - Utilisez le template **[Pull Request](.github/PULL_REQUEST_TEMPLATE.md)**.
   - Décrivez **clairement** vos changements.
   - Liez la PR à une **issue existante** (si applicable).

🔗 [Ouvrir une Pull Request](https://github.com/chachou8106-blip/Le-Cours-de-la-Souris-/compare)

---

### 2.4. **Contribuer aux Traductions**
Les traductions sont gérées dans `packages/i18n/src/locales/`.

1. **Trouver une traduction manquante** :
   - Vérifiez si votre langue est déjà supportée.
   - Si non, **créez un nouveau fichier** (ex: `es/translation.json`).

2. **Traduire les clés** :
   - Utilisez les **mêmes clés** que dans les fichiers existants (ex: `fr/translation.json`).
   - Respectez le **ton et le style** de la marque.

3. **Ouvrir une PR** avec vos traductions.

---

### 2.5. **Contribuer à la Documentation**
La documentation est dans le dossier `docs/`.

- **Corrigez les fautes** ou **améliorez les explications**.
- **Ajoutez des exemples** ou des **captures d'écran**.
- **Traduisez la documentation** dans d'autres langues.

---

### 2.6. **Contribuer aux Données**
#### **Déclarations de Montants**
- **Soumettez des déclarations** via le formulaire dans l'application.
- **Respectez les règles** :
  - Montants **réalistes** (pas de valeurs aberrantes).
  - **Pas de PII** (données personnelles sur les enfants).

#### **Tarifs Officiels**
- Si vous avez accès à des **données officielles** (ex: tarifs dentaires d'un ministère), contactez-nous à **data@zencheztoi.fr**.

---

## 📌 3. Types de Contributions

| Type | Description | Exemples |
|------|-------------|----------|
| **Bug Fix** | Correction d'un bug | Fix d'une erreur d'affichage |
| **Feature** | Nouvelle fonctionnalité | Ajout d'un mini-jeu |
| **Refactor** | Amélioration du code | Optimisation des performances |
| **Docs** | Amélioration de la documentation | Mise à jour du README |
| **Tests** | Ajout de tests | Tests unitaires, E2E |
| **Chore** | Tâches de maintenance | Mise à jour des dépendances |
| **Translation** | Traductions | Ajout d'une nouvelle langue |
| **Data** | Contribution de données | Déclarations, tarifs officiels |

---

## 📌 4. Conventions de Code

### 4.1. **Langages et Frameworks**
| Technologie | Conventions | Linter/Formatter |
|-------------|--------------|-------------------|
| **TypeScript** | `strict: true`, typage explicite | ESLint, Prettier |
| **React** | Composants en `PascalCase`, hooks personnalisés | ESLint |
| **Solidity** | `SPDX-License-Identifier`, NatSpec | Slither, Forge |
| **SQL** | Noms de tables en `snake_case` | - |
| **CSS** | Tailwind CSS, classes utilitaires | Prettier |

### 4.2. **Nommage**
| Type | Convention | Exemple |
|------|------------|---------|
| **Variables** | camelCase | `userBalance` |
| **Constantes** | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| **Fonctions** | camelCase | `calculateMedian()` |
| **Composants** | PascalCase | `CountryCard.tsx` |
| **Fichiers** | kebab-case | `use-countries.ts` |
| **Dossiers** | kebab-case | `features/games/` |

### 4.3. **Structure du Code**
- **Composants React** :
  - Un **fichier par composant** (ex: `Button.tsx`).
  - **Props typées** avec TypeScript.
  - **Documentation** en commentaires JSDoc.

- **Contrats Solidity** :
  - **NatSpec** pour toutes les fonctions.
  - **Checks-Effects-Interactions** pattern.
  - **Events** pour les actions critiques.

- **Routes API (Hono)** :
  - **Validation Zod** pour les entrées/sorties.
  - **Middleware** pour la sécurité (Turnstile, rate limiting).
  - **Gestion des erreurs** centralisée.

### 4.4. **Tests**
- **Frontend** : Vitest + React Testing Library.
- **Backend** : Tests unitaires avec `hono/testing`.
- **Contrats** : Forge (unit tests, fuzz tests, invariant tests).
- **E2E** : Playwright pour les parcours utilisateurs.

**Règles** :
- **Couverture minimale** : 80% pour le frontend et le backend.
- **Tests des contrats** : 100% de couverture si possible.

---

## 📌 5. Revue de Code

### 5.1. **Processus de Revue**
1. **Ouvrir une PR** avec une description claire.
2. **Attendre les commentaires** des mainteneurs.
3. **Corriger les problèmes** signalés.
4. **Merged !** Une fois approuvée, la PR est mergée.

### 5.2. **Checklist pour les PR**
- [ ] Le code **compile** sans erreur.
- [ ] Les **tests passent**.
- [ ] Le **linting** est OK (ESLint, Prettier).
- [ ] La **documentation** est mise à jour.
- [ ] Les **changements cassants** sont documentés.
- [ ] Les **issues liées** sont fermées.

### 5.3. **Critères d'Acceptation**
- **Qualité du code** : Respect des conventions, pas de code mort.
- **Tests** : Tous les tests passent, couverture suffisante.
- **Sécurité** : Pas de vulnérabilités introduites.
- **Documentation** : Le code est documenté et compréhensible.

---

## 📌 6. Bonnes Pratiques

### 6.1. **Sécurité**
- **Ne jamais commiter** de secrets (clés API, tokens).
- **Valider toutes les entrées** (Zod pour le backend, TypeScript pour le frontend).
- **Sanitizer les sorties** (anti-XSS).
- **Utiliser HTTPS** pour toutes les communications.

### 6.2. **Performance**
- **Éviter les rendus inutiles** dans React (utiliser `React.memo`, `useMemo`).
- **Optimiser les requêtes API** (cache, pagination).
- **Minimiser les dépendances** (ne pas ajouter de libraries inutiles).

### 6.3. **Accessibilité**
- **Respecter WCAG 2.1 AA**.
- **Utiliser des contrastes suffisants** (4.5:1 minimum).
- **Ajouter des labels** pour les champs de formulaire.
- **Rendre le site navigable au clavier**.

### 6.4. **Internationalisation (i18n)**
- **Ne pas hardcoder** les textes dans le code.
- **Utiliser les clés de traduction** (ex: `t('common.loading')`).
- **Respecter les formats locaux** (dates, monnaies).

---

## 📌 7. Reconnaissance

Tous les contributeurs sont **remerciés** pour leur aide !

- **Crédits** : Votre nom sera ajouté au fichier `CONTRIBUTORS.md` (si vous le souhaitez).
- **Récompenses** :
  - **CROQ Credits** pour les contributions majeures (ex: nouvelles fonctionnalités, corrections de bugs critiques).
  - **Badges** pour les contributions régulières.

---

## 📌 8. Ressources Utiles

### 8.1. **Documentation**
- [README.md](README.md) : Guide de démarrage.
- [Architecture](docs/architecture.md) : Vue d'ensemble technique.
- [API Documentation](docs/api.md) : Documentation de l'API.

### 8.2. **Outils**
- [GitHub](https://github.com/chachou8106-blip/Le-Cours-de-la-Souris-) : Dépôt principal.
- [Cloudflare Dashboard](https://dash.cloudflare.com/) : Gestion de l'infrastructure.
- [Foundry Book](https://book.getfoundry.sh/) : Documentation pour les contrats Solidity.

### 8.3. **Communauté**
- **Discussions** : [GitHub Discussions](https://github.com/chachou8106-blip/Le-Cours-de-la-Souris-/discussions)
- **Email** : contact@zencheztoi.fr

---

## 📌 9. Licence

En contribuant à ce projet, vous acceptez que vos contributions soient **licenciées sous la même licence** que le projet (MIT). Voir [LICENSE](LICENSE) pour plus de détails.

---

## 📜 Historique des Versions

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 12/08/2026 | Version initiale |