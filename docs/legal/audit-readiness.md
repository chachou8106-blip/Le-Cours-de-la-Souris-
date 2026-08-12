# 🔍 Prêt pour l'Audit

Ce document décrit les **mesures, processus et vérifications** mis en place pour garantir que **Le Cours de la Souris** est prêt pour un **audit externe** (sécurité, conformité, contrats intelligents).

---

## 📌 1. Périmètre de l'Audit

### 1.1. Composants à auditer
| Composant | Description | Statut |
|-----------|-------------|--------|
| **Frontend (React + Vite)** | Application web (PWA) | ✅ Prêt |
| **Backend (Hono + Cloudflare)** | API REST + Workers | ✅ Prêt |
| **Base de données (D1)** | Stockage des données (SQL) | ✅ Prêt |
| **Contrats Solidity** | Smart Contracts (Foundry) | ✅ Prêt |
| **Workflows CI/CD** | GitHub Actions | ✅ Prêt |
| **Documentation** | Architecture, méthodologie, etc. | ✅ Prêt |

### 1.2. Exclusions
- **Données utilisateurs réelles** : Les données de production ne sont pas incluses dans l'audit.
- **Secrets et clés API** : Les variables d'environnement ne sont pas partagées.
- **Infrastructure Cloudflare** : L'audit se concentre sur le code, pas sur l'infrastructure.

---

## 📌 2. Préparation du Code

### 2.1. Bonnes Pratiques Implémentées
- **TypeScript strict** : `"strict": true` dans tous les `tsconfig.json`.
- **Validation des entrées** : Zod pour toutes les API et bases de données.
- **Sécurité** :
  - Turnstile pour les requêtes POST.
  - Rate limiting (100 requêtes/minute/IP).
  - CORS restreint aux domaines autorisés.
  - Pas de PII (Personally Identifiable Information) stockée.
- **Chiffrement** : Données sensibles chiffrées en base (AES-256).
- **Immuabilité** : Ledger CROQ en **append-only** avec preuves Merkle.

### 2.2. Vérifications Automatiques
- **Linting** : ESLint avec règles strictes (`@typescript-eslint`).
- **TypeCheck** : Vérification des types TypeScript.
- **Tests unitaires** : Vitest pour le frontend, Forge pour les contrats.
- **Tests E2E** : Playwright pour les parcours utilisateurs.
- **CodeQL** : Analyse statique pour les vulnérabilités.
- **Slither** : Analyse statique pour les contrats Solidity.

### 2.3. Couverture de Tests
| Composant | Couverture Cible | Couverture Actuelle |
|-----------|------------------|----------------------|
| Frontend | > 80% | À vérifier |
| Backend | > 80% | À vérifier |
| Contrats | 100% | À vérifier |

---

## 📌 3. Sécurité

### 3.1. Mesures Implémentées
- **Pas de PII** : Aucune donnée personnelle sur les enfants.
- **Turnstile** : Protection contre les bots/spam.
- **Rate Limiting** : 100 requêtes/minute/IP.
- **CORS** : Restreint à `https://coursdelasouris.fr` et `https://staging.coursdelasouris.fr`.
- **Chiffrement** : Données sensibles chiffrées (ex: emails).
- **Sanitization** : Nettoyage des commentaires utilisateurs (anti-XSS).
- **Modération** : Quarantaine automatique pour les montants aberrants.

### 3.2. Vulnérabilités Connues
| Type | Statut | Action |
|------|--------|--------|
| Injection SQL | ❌ Non applicable | Utilisation de Drizzle ORM |
| XSS | ✅ Protégé | Sanitization + CSP |
| CSRF | ✅ Protégé | SameSite cookies + CORS |
| Reentrancy (Contrats) | ✅ Protégé | ReentrancyGuard (OpenZeppelin) |
| Front-Running | ✅ Protégé | Checks-Effects-Interactions |
| Oracle Manipulation | ✅ Protégé | Données sourcées depuis des APIs fiables |

### 3.3. Outils de Sécurité
- **CodeQL** : Analyse statique (JavaScript/TypeScript).
- **Slither** : Analyse statique (Solidity).
- **npm audit** : Détection des vulnérabilités dans les dépendances.
- **Dependabot** : Mises à jour automatiques des dépendances.

---

## 📌 4. Conformité

### 4.1. RGPD (Règlement Général sur la Protection des Données)
- **Minimisation des données** : Seules les données nécessaires sont collectées.
- **Consentement** : Consentement explicite pour les cookies et déclarations.
- **Droit à l'oubli** : Suppression des données utilisateurs sur demande.
- **Portabilité** : Export des données utilisateurs possible.
- **DPO** : Désigné (à confirmer).

### 4.2. MiCA (Markets in Crypto-Assets Regulation)
- **Statut** : En cours de validation.
- **Avertissements** : Les CROQ Credits ne sont **pas** une cryptomonnaie.
- **Token CROQ** : Pas encore lancé (en attente d'audit légal).

### 4.3. KYC/AML
- **Statut** : À implémenter pour les **gros détenteurs** (> 10 000 CROQ).
- **Fournisseur** : À définir (ex: Chainalysis, Sumsub).

### 4.4. Fiscalité
- **Statut** : À clarifier selon les juridictions.
- **Conseil juridique** : Requis avant le lancement du token.

---

## 📌 5. Contrats Intelligents

### 5.1. Contrats à Auditer
| Contrat | Description | Complexité |
|---------|-------------|------------|
| `CROQToken.sol` | Token ERC-20 + Permit + Votes | ⭐⭐⭐⭐ |
| `CROQStaking.sol` | Staking pour validateurs | ⭐⭐⭐ |
| `MerkleRewardsDistributor.sol` | Distribution des récompenses | ⭐⭐⭐ |
| `ProtocolTimelock.sol` | Timelock pour les actions sensibles | ⭐⭐ |
| `ProtocolTreasury.sol` | Trésorerie du protocole | ⭐⭐⭐ |

### 5.2. Bonnes Pratiques Implémentées
- **OpenZeppelin** : Utilisation des bibliothèques auditées.
- **Checks-Effects-Interactions** : Respecté dans tous les contrats.
- **ReentrancyGuard** : Protection contre les attaques de réentrance.
- **Pausable** : Possibilité de mettre en pause les contrats en cas d'urgence.
- **No Upgrade** : Pas de proxies (immutabilité).
- **Events** : Événements émis pour toutes les actions critiques.

### 5.3. Tests
- **Unit Tests** : Forge pour tous les contrats.
- **Fuzz Tests** : 256 runs par fonction.
- **Invariant Tests** : Vérification des invariants.
- **Slither** : Analyse statique.

### 5.4. Checklist avant Déploiement
- [ ] Audit externe par un cabinet réputé (ex: CertiK, OpenZeppelin).
- [ ] Tests sur testnet (ex: Sepolia).
- [ ] Vérification des permissions (multisig, timelock).
- [ ] Documentation complète (NatSpec, runbook).
- [ ] Bug Bounty program (ex: Immunefi).

---

## 📌 6. Processus d'Audit

### 6.1. Étapes Prévues
1. **Pré-audit** :
   - Vérification interne du code.
   - Correction des vulnérabilités connues.
   - Documentation complète.

2. **Sélection de l'Auditeur** :
   - Cabinet réputé (ex: CertiK, OpenZeppelin, Quantstamp).
   - Devis et calendrier.

3. **Audit** :
   - Analyse du code.
   - Tests de pénétration.
   - Revue de l'architecture.

4. **Corrections** :
   - Correction des vulnérabilités trouvées.
   - Re-audit si nécessaire.

5. **Rapport Final** :
   - Publication du rapport (public ou privé).
   - Mise en œuvre des recommandations.

### 6.2. Coût et Durée Estimés
| Type d'Audit | Coût (USD) | Durée |
|-------------|------------|-------|
| Audit de sécurité (application) | 10 000 - 30 000 | 2-4 semaines |
| Audit des contrats Solidity | 15 000 - 50 000 | 3-6 semaines |
| Audit complet (app + contrats) | 25 000 - 80 000 | 4-8 semaines |

### 6.3. Livrables Attendus
- Rapport détaillé des vulnérabilités.
- Niveau de risque pour chaque vulnérabilité.
- Recommandations de correction.
- Certificat de conformité (si applicable).

---

## 📌 7. Contacts

### 7.1. Équipe Technique
- **Responsable Sécurité** : À désigner.
- **Responsable Contrats** : À désigner.
- **Responsable Conformité** : À désigner.

### 7.2. Auditeurs Potentiels
| Cabinet | Site Web | Spécialisation |
|---------|----------|---------------|
| CertiK | [https://www.certik.com](https://www.certik.com) | Sécurité, Contrats |
| OpenZeppelin | [https://openzeppelin.com](https://openzeppelin.com) | Contrats, Audit |
| Quantstamp | [https://quantstamp.com](https://quantstamp.com) | Sécurité, Contrats |
| Trail of Bits | [https://www.trailofbits.com](https://www.trailofbits.com) | Sécurité |
| ConsenSys Diligence | [https://consensys.net/diligence](https://consensys.net/diligence) | Contrats |

---

## 📌 8. Documentation Complémentaire
- [Architecture](../architecture.md)
- [Méthodologie](../methodology.md)
- [Design du Token CROQ](../token-design.md)
- [Modèle de Menace](../threat-model.md)
- [Politique de Confidentialité](../legal/privacy-policy.md)
- [Conditions Générales](../legal/terms-of-service.md)

---

## 📜 Historique des Versions
| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 12/08/2026 | Version initiale |