# 🪙 Design du Token CROQ

Ce document décrit le **design**, les **utilités** et les **règles** du token **CROQ** (Crédits → Crypto).

---

## 📌 Vue d'Ensemble

| Phase | Type | Symbole | Utilisation |
|-------|------|---------|-------------|
| 1 | CROQ Credits | CROQ | Récompenses virtuelles (hors chaîne) |
| 2 | CROQ Token | CROQ | Utility Token (ERC-20, on-chain) |

> ⚠️ **Avertissement** : Les **CROQ Credits** ne sont **pas** une cryptomonnaie. Ils n'ont **aucune valeur monétaire**, ne peuvent être **ni achetés ni vendus**, et ne donnent droit à **aucune promesse de rendement**. Le token CROQ n'est **pas encore lancé** et fera l'objet d'audits légaux et techniques avant tout déploiement.

---

## 🎯 Phase 1 : CROQ Credits (Hors Chaîne)

### Définition
Les **CROQ Credits** sont des **crédits virtuels** attribués aux utilisateurs pour :
- **Contribuer** à l'écosystème (déclarations, modération, traduction).
- **Participer** aux mini-jeux.
- **Engager** la communauté (partage, feedback).

### Caractéristiques
| Propriété | Valeur |
|-----------|--------|
| **Type** | Crédits virtuels (non transférables) |
| **Stockage** | Base de données D1 (ledger append-only) |
| **Émission** | Contrôlée par le protocole |
| **Transférabilité** | ❌ Non |
| **Valeur monétaire** | ❌ Aucune |
| **Conversion** | ❌ Impossible (pour l'instant) |

### Répartition des Récompenses
| Action | Récompense (CROQ Credits) | Fréquence |
|--------|---------------------------|-----------|
| Déclaration validée | 10-50 | Par déclaration |
| Modération de contenu | 20-100 | Par décision |
| Traduction | 50-200 | Par document |
| Signalement de bug | 10-50 | Par rapport valide |
| Connexion quotidienne | 5 | 1x/jour |
| Partage sur les réseaux | 20 | Par ami inscrit |
| Victoire à un mini-jeu | 5-500 | Par jeu |

### Utilisations des CROQ Credits
| Utilisation | Coût | Description |
|-------------|------|-------------|
| **Cosmétiques** | 10-1000 | Skins de souris, décors de profil |
| **Loteries** | 10-100 | Participation aux tirages quotidiens |
| **Contenus Premium** | 50-500 | Accès à des guides ou analyses avancées |
| **Badges** | 0 | Récompenses symboliques (ex: "Contributeur Actif") |
| **Futur Staking** | TBD | Staking pour valider des données (Phase 2) |

---

## 🚀 Phase 2 : CROQ Token (On-Chain)

### Définition
Le **token CROQ** est un **utility token ERC-20** conçu pour :
1. **Récompenser** les contributeurs (validateurs, traducteurs).
2. **Gouverner** le protocole (votes sur les paramètres non critiques).
3. **Accéder** à des fonctionnalités premium (API, données avancées).

### Caractéristiques Techniques
| Propriété | Valeur |
|-----------|--------|
| **Standard** | ERC-20 + Permit + Votes |
| **Nom** | CROQ Protocol Token |
| **Symbole** | CROQ |
| **Décimales** | 18 |
| **Supply Max** | **1 000 000 000 CROQ** (1 milliard, à valider légalement) |
| **Pausable** | ✅ Oui (par le timelock) |
| **Upgradeable** | ❌ Non (immutable) |
| **Proxy** | ❌ Non (pas de delegatecall) |

### Contrats
| Contrat | Description |
|---------|-------------|
| `CROQToken.sol` | Token ERC-20 avec Permit et Votes |
| `CROQStaking.sol` | Staking pour les validateurs |
| `MerkleRewardsDistributor.sol` | Distribution des récompenses via preuves Merkle |
| `ProtocolTimelock.sol` | Timelock pour les actions sensibles |
| `ProtocolTreasury.sol` | Trésorerie du protocole |

### Fonctionnalités
#### 1. Staking
- **Validateurs** : Adultes vérifiés peuvent staker leurs CROQ pour :
  - Valider des **lots de données** (déclarations, sources).
  - Gagner des **récompenses** (en CROQ).
- **Règles** :
  - **Délai de déliaison** : 7 jours.
  - **Récompenses** : Basées sur la qualité du travail.
  - **Slashing** : Pénalités pour mauvaise validation (ex: -10% des tokens stakés).

#### 2. Gouvernance
- **Paramètres votables** :
  - Ajout/suppression de **sources de données**.
  - Modification des **seuils de confiance**.
  - Allocation du **budget de la trésorerie**.
- **Exclusions** :
  - ❌ Changement du **cap total**.
  - ❌ Modification du **timelock**.
  - ❌ Accès direct à la **trésorerie**.

#### 3. Trésorerie
- **Financement** :
  - 10% des **récompenses des mini-jeux** (si monétisés).
  - **Dons** (optionnels).
  - **Partenariats** (ex: 1% des revenus Amazon).
- **Utilisation** :
  - **Sécurité** : Audits, bug bounty.
  - **Développement** : Nouvelles fonctionnalités.
  - **Marketing** : Promotion du protocole.
  - **Traductions** : Localisation.

---

## 📊 Tokenomics (À Valider Légalement)

### Supply et Distribution
| Catégorie | Pourcentage | Montant | Vesting |
|-----------|-------------|---------|---------|
| **Trésorerie** | 40% | 400 000 000 CROQ | 4 ans (linéaire) |
| **Récompenses** | 35% | 350 000 000 CROQ | 5 ans (linéaire) |
| **Équipe** | 15% | 150 000 000 CROQ | 4 ans (1 an cliff) |
| **Investisseurs** | 10% | 100 000 000 CROQ | 3 ans (1 an cliff) |

> ⚠️ **TBD_BY_LEGAL_AND_GOVERNANCE** : Ces valeurs sont **à valider** par un conseil juridique et une gouvernance communautaire.

### Émission
- **Déploiement initial** : 100% du supply minté vers la **trésorerie** (contrôlée par timelock).
- **Récompenses** : Distribuées via `MerkleRewardsDistributor` (anti-Sybil).
- **Aucun mint libre** : Seul le **timelock** peut mint des tokens (pour les récompenses).

### Brûlage (Burn)
- **Mécanisme** : 1% des **frais de transaction** (si appliqués) sont brûlés.
- **Objectif** : Réduire progressivement le supply pour augmenter la rareté.

---

## 🔒 Sécurité et Conformité

### Mesures de Sécurité
- **Audit externe** : Obligatoire avant tout déploiement.
- **Timelock** : Toutes les actions sensibles passent par un délai (ex: 48h).
- **Multisig** : La trésorerie est contrôlée par un **Safe multisig** (5/9 signataires).
- **Pause d'urgence** : Le token peut être mis en pause en cas d'incident.
- **No Upgrade** : Pas de proxy pour éviter les risques de mise à jour.

### Conformité Légale
- **MiCA** : À valider pour l'Europe.
- **KYC/AML** : À implémenter pour les **gros détenteurs** (> 10 000 CROQ).
- **Fiscalité** : À clarifier selon les juridictions.
- **Protection des mineurs** : **Interdiction** pour les < 18 ans.

### Checklist avant lancement
- [ ] Audit externe des contrats (ex: CertiK, OpenZeppelin).
- [ ] Audit de sécurité de l'application (pentest).
- [ ] Validation légale (MiCA, KYC/AML, fiscalité).
- [ ] Testnet deployment (ex: Sepolia).
- [ ] Bug bounty program (ex: Immunefi).
- [ ] Documentation complète (whitepaper, runbook).
- [ ] Vote communautaire (si DAO active).