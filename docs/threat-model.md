# 🛡️ Modèle de Menace (Threat Model)

Ce document décrit les **menaces potentielles**, les **vulnérabilités**, et les **mesures de mitigation** pour le projet **Le Cours de la Souris**. Il suit la méthodologie **STRIDE** (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) pour identifier et classer les risques.

---

## 📌 1. Introduction

### 1.1. **Objectif**
Ce modèle de menace a pour but de :
- **Identifier** les risques de sécurité pour le projet.
- **Évaluer** leur probabilité et leur impact.
- **Proposer** des mesures de mitigation.
- **Prioriser** les actions de sécurité.

### 1.2. **Périmètre**
Le modèle couvre :
- **Frontend** (React + Vite + PWA).
- **Backend** (Hono + Cloudflare Workers).
- **Base de données** (Cloudflare D1).
- **Contrats intelligents** (Solidity + Foundry).
- **Infrastructure** (Cloudflare, GitHub).

### 1.3. **Acteurs**
| Acteur | Description | Niveau de Confiance |
|--------|-------------|---------------------|
| **Utilisateur standard** | Adultes utilisant le Service pour déclarer des montants ou jouer. | Moyen |
| **Contributeur** | Utilisateurs contribuant des données (modération, traduction). | Élevé |
| **Validateur** | Adultes vérifiés validant des données (futur). | Très élevé |
| **Admin** | Équipe de Zen Chez Toi gérant le Service. | Très élevé |
| **Attaquant** | Acteur malveillant cherchant à exploiter des vulnérabilités. | Aucun |

---

## 📌 2. Diagrammes d'Architecture

### 2.1. **Diagramme des Composants**
```
┌───────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────────────────────────┐  │
│   │   Utilisateur │────▶│  Frontend   │────▶│           Backend (Hono)        │  │
│   │  (Navigateur) │     │ (React/Vite) │     │  - Routes API                   │  │
│   └─────────────┘     └─────────────┘     │  - Middlewares (Turnstile, etc.) │  │
│                                           └──────────────┬─────────────────┘  │
│                                                          │                  │
│                          ┌───────────────────────────────┼─────────────────┐ │
│                          │                               │                 │ │
│                          ▼                               ▼                 ▼ │
│   ┌─────────────────────────┐   ┌─────────────┐   ┌─────────────────┐  │
│   │   Cloudflare D1 (SQL)    │   │  Cloudflare  │   │  Cloudflare R2   │  │
│   │  - Pays                 │   │    KV       │   │  (Stockage)      │  │
│   │  - Rapports             │   │  (Cache)     │   │                 │  │
│   │  - Tarifs officiels     │   └─────────────┘   └─────────────────┘  │
│   └─────────────────────────┘                                         │
│                                                                       │
│   ┌───────────────────────────────────────────────────────────────────┐  │
│   │                        Contrats Solidity (Ethereum)               │  │
│   │  - CROQToken.sol                                                │  │
│   │  - CROQStaking.sol                                              │  │
│   │  - MerkleRewardsDistributor.sol                                 │  │
│   └───────────────────────────────────────────────────────────────────┘  │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

### 2.2. **Flux de Données**
1. **Utilisateur** → **Frontend** : Déclaration de montant, jeu, consultation des données.
2. **Frontend** → **Backend** : Appels API (GET/POST).
3. **Backend** → **D1** : Lecture/Écriture des données.
4. **Backend** → **KV** : Cache des réponses fréquentes.
5. **Backend** → **R2** : Stockage des assets (images, exports).
6. **Backend** → **Contrats** : Interaction avec la blockchain (futur).

---

## 📌 3. Identification des Menaces (STRIDE)

### 3.1. **Spoofing (Usurpation d'Identité)**
| ID | Menace | Description | Impact | Probabilité | Mesures de Mitigation |
|----|--------|-------------|--------|--------------|-----------------------|
| T-001 | Usurpation de session | Un attaquant vole un cookie de session pour accéder au compte d'un utilisateur. | **Élevé** | Moyen | - Cookies `HttpOnly` + `Secure` + `SameSite`.<br>- Jetons JWT avec expiration courte.<br>- Détection des IP suspects. |
| T-002 | Usurpation d'email | Un attaquant utilise une adresse email volée pour s'inscrire. | Moyen | Faible | - Vérification email obligatoire.<br>- Limite de tentatives de connexion.<br>- 2FA (futur). |
| T-003 | Usurpation de validateur | Un attaquant se fait passer pour un validateur pour valider des données frauduleuses. | **Élevé** | Faible | - Vérification manuelle des validateurs.<br>- Staking obligatoire pour les validateurs.<br>- Slashing en cas de mauvaise validation. |
| T-004 | Usurpation de contrat | Un attaquant déploie un faux contrat CROQ pour tromper les utilisateurs. | **Critique** | Faible | - Vérification du code source.<br>- Avertissements clairs sur le site officiel.<br>- Utilisation de ENS (futur). |

---

### 3.2. **Tampering (Altération de Données)**
| ID | Menace | Description | Impact | Probabilité | Mesures de Mitigation |
|----|--------|-------------|--------|--------------|-----------------------|
| T-005 | Altération des déclarations | Un attaquant modifie les montants déclarés dans la base de données. | **Élevé** | Moyen | - Validation Zod côté serveur.<br>- Modération manuelle des déclarations.<br>- Ledger append-only pour les événements critiques. |
| T-006 | Altération des tarifs officiels | Un attaquant modifie les tarifs dentaires officiels. | Moyen | Faible | - Données officiels stockées dans une table séparée.<br>- Vérification manuelle des mises à jour.<br>- Sources fiables uniquement. |
| T-007 | Altération des récompenses | Un attaquant modifie le montant des récompenses CROQ. | **Élevé** | Faible | - Calcul des récompenses côté serveur.<br>- Ledger CROQ immuable.<br>- Preuves Merkle pour les distributions. |
| T-008 | Altération des contrats | Un attaquant modifie le code d'un contrat Solidity après déploiement. | **Critique** | Très Faible | - Contrats **immutables** (pas de proxies).<br>- Vérification du code source.<br>- Déploiement via timelock + multisig. |

---

### 3.3. **Repudiation (Non-Répudiation)**
| ID | Menace | Description | Impact | Probabilité | Mesures de Mitigation |
|----|--------|-------------|--------|--------------|-----------------------|
| T-009 | Niement d'une déclaration | Un utilisateur nie avoir soumis une déclaration. | Faible | Moyen | - Journalisation de toutes les actions (qui, quoi, quand).<br>- Preuves cryptographiques (hash des déclarations). |
| T-010 | Niement d'une transaction | Un utilisateur nie avoir effectué une transaction CROQ. | Faible | Moyen | - Ledger append-only avec preuves Merkle.<br>- Événements blockchain (futur). |
| T-011 | Niement d'une action admin | Un admin nie avoir effectué une action sensible. | Moyen | Faible | - Journal d'audit pour toutes les actions admin.<br>- Double confirmation pour les actions sensibles.<br>- Notifications par email. |

---

### 3.4. **Information Disclosure (Divulgation d'Information)**
| ID | Menace | Description | Impact | Probabilité | Mesures de Mitigation |
|----|--------|-------------|--------|--------------|-----------------------|
| T-012 | Fuites de données utilisateurs | Un attaquant accède aux données personnelles des utilisateurs. | **Critique** | Faible | - **Pas de PII** stockée (sauf email pour les comptes).<br>- Chiffrement des données sensibles.<br>- Accès restreint à la base de données. |
| T-013 | Fuites de données enfants | Un attaquant accède aux données des enfants. | **Critique** | Très Faible | - **Aucune donnée** sur les enfants n'est collectée.<br>- Vérification manuelle des déclarations. |
| T-014 | Divulgation des secrets API | Un attaquant accède aux clés API (Cloudflare, Turnstile). | **Critique** | Faible | - **Jamais de secrets** dans le code (utilisation de `.dev.vars`).<br>- GitHub Secrets pour les workflows.<br>- Rotation régulière des clés. |
| T-015 | Divulgation des données officielles | Un attaquant accède aux tarifs dentaires officiels avant publication. | Moyen | Faible | - Données officiels publiées **après vérification**.<br>- Accès restreint aux données non publiées. |

---

### 3.5. **Denial of Service (Déni de Service)**
| ID | Menace | Description | Impact | Probabilité | Mesures de Mitigation |
|----|--------|-------------|--------|--------------|-----------------------|
| T-016 | Attaque DDoS sur l'API | Un attaquant inonde l'API avec des requêtes pour la rendre indisponible. | **Élevé** | Moyen | - Rate limiting (100 requêtes/minute/IP).<br>- Cloudflare DDoS Protection.<br>- Cache KV pour les réponses fréquentes. |
| T-017 | Attaque DDoS sur le frontend | Un attaquant inonde le frontend avec des requêtes. | Moyen | Faible | - Cloudflare CDN.<br>- Service Worker pour le cache hors ligne. |
| T-018 | Saturation de la base de données | Un attaquant soumet un grand nombre de déclarations pour saturer D1. | Moyen | Faible | - Limite de déclarations par IP (1/5 minutes).<br>- Modération automatique des déclarations suspects. |
| T-019 | Saturation du ledger CROQ | Un attaquant spam le ledger avec des événements pour le saturer. | Moyen | Faible | - Limite de 10 événements/secondes par compte.<br>- Batch des événements pour réduire la charge. |

---

### 3.6. **Elevation of Privilege (Élévation de Privilèges)**
| ID | Menace | Description | Impact | Probabilité | Mesures de Mitigation |
|----|--------|-------------|--------|--------------|-----------------------|
| T-020 | Élévation de privilèges utilisateur | Un utilisateur standard accède à des fonctionnalités admin. | **Critique** | Faible | - Vérification des rôles côté serveur.<br>- Pas de stockages des rôles dans le frontend.<br>- Double confirmation pour les actions sensibles. |
| T-021 | Élévation de privilèges validateur | Un validateur accède à des fonctionnalités qu'il ne devrait pas avoir. | **Élevé** | Faible | - Rôles strictement définis (validateur ≠ admin).<br>- Vérification des permissions dans chaque contrat. |
| T-022 | Exploitation de vulnérabilités Solidity | Un attaquant exploite une faille dans un contrat pour prendre le contrôle. | **Critique** | Faible | - Audit externe des contrats.<br>- Respect des bonnes pratiques (OpenZeppelin).<br>- Tests complets (fuzz, invariants). |

---

## 📌 4. Matrice des Risques

| ID | Menace | Impact | Probabilité | Score (1-10) | Priorité |
|----|--------|--------|--------------|--------------|-----------|
| T-001 | Usurpation de session | Élevé | Moyen | 8 | **Haute** |
| T-003 | Usurpation de validateur | Élevé | Faible | 6 | Moyenne |
| T-004 | Usurpation de contrat | Critique | Faible | 7 | Moyenne |
| T-005 | Altération des déclarations | Élevé | Moyen | 7 | **Haute** |
| T-007 | Altération des récompenses | Élevé | Faible | 6 | Moyenne |
| T-008 | Altération des contrats | Critique | Très Faible | 5 | Moyenne |
| T-012 | Fuites de données utilisateurs | Critique | Faible | 9 | **Haute** |
| T-013 | Fuites de données enfants | Critique | Très Faible | 4 | Faible |
| T-014 | Divulgation des secrets API | Critique | Faible | 8 | **Haute** |
| T-016 | Attaque DDoS sur l'API | Élevé | Moyen | 7 | **Haute** |
| T-020 | Élévation de privilèges utilisateur | Critique | Faible | 8 | **Haute** |
| T-022 | Exploitation de vulnérabilités Solidity | Critique | Faible | 7 | **Haute** |

---

## 📌 5. Mesures de Mitigation par Priorité

### 5.1. **Priorité Haute (Score ≥ 7)**
| ID | Mesure | Statut |
|----|--------|--------|
| T-001 | Implémenter 2FA pour les comptes admin | ⚠️ À faire |
| T-005 | Ajouter une couche de modération manuelle pour les déclarations | ✅ Fait |
| T-012 | Chiffrer toutes les données sensibles en base | ✅ Fait |
| T-014 | Utiliser GitHub Secrets et Cloudflare Secrets | ✅ Fait |
| T-016 | Configurer Cloudflare DDoS Protection | ✅ Fait |
| T-020 | Vérifier les rôles côté serveur pour toutes les actions | ✅ Fait |
| T-022 | Auditer les contrats avec CertiK ou OpenZeppelin | ⚠️ À faire |

### 5.2. **Priorité Moyenne (Score 4-6)**
| ID | Mesure | Statut |
|----|--------|--------|
| T-003 | Mettre en place un système de staking + slashing pour les validateurs | ⚠️ À faire |
| T-007 | Implémenter des preuves Merkle pour les distributions de récompenses | ✅ Fait |
| T-008 | Déployer les contrats via timelock + multisig | ⚠️ À faire |
| T-011 | Implémenter un journal d'audit pour les actions admin | ⚠️ À faire |

### 5.3. **Priorité Faible (Score ≤ 3)**
| ID | Mesure | Statut |
|----|--------|--------|
| T-013 | Ajouter des avertissements supplémentaires sur la protection des enfants | ✅ Fait |
| T-015 | Limiter l'accès aux données officielles non publiées | ✅ Fait |

---

## 📌 6. Scénarios d'Attaque

### 6.1. **Scénarios les plus Probables**
#### **Scénarios 1 : Spam de Déclarations**
- **Attaquant** : Bot soumettant des milliers de déclarations frauduleuses.
- **Objectif** : Fausser les données communautaires.
- **Impact** : Données inexactes, perte de confiance.
- **Mitigation** :
  - Turnstile pour les soumissions.
  - Rate limiting (1 déclaration/5 minutes/IP).
  - Modération automatique des montants aberrants.

#### **Scénarios 2 : Attaque DDoS sur l'API**
- **Attaquant** : Réseau de bots inondant l'API de requêtes.
- **Objectif** : Rendre le Service indisponible.
- **Impact** : Indisponibilité du Service.
- **Mitigation** :
  - Cloudflare DDoS Protection.
  - Rate limiting (100 requêtes/minute/IP).
  - Cache KV pour les réponses fréquentes.

#### **Scénarios 3 : Usurpation de Session**
- **Attaquant** : Vol de cookie de session via XSS ou MITM.
- **Objectif** : Accéder au compte d'un utilisateur.
- **Impact** : Accès non autorisé aux données utilisateurs.
- **Mitigation** :
  - Cookies `HttpOnly` + `Secure` + `SameSite`.
  - Jetons JWT avec expiration courte.
  - Détection des IP suspects.

---

### 6.2. **Scénarios Critiques (mais Improbables)**
#### **Scénarios 4 : Exploitation de Contrat Solidity**
- **Attaquant** : Exploitation d'une faille de réentrance ou d'un overflow.
- **Objectif** : Vol de fonds ou prise de contrôle du contrat.
- **Impact** : Perte de fonds, perte de confiance.
- **Mitigation** :
  - Audit externe des contrats.
  - Respect des bonnes pratiques (OpenZeppelin).
  - Tests complets (fuzz, invariants).

#### **Scénarios 5 : Fuites de Données Utilisateurs**
- **Attaquant** : Accès non autorisé à la base de données D1.
- **Objectif** : Vol de données personnelles.
- **Impact** : Atteinte à la vie privée, sanctions légales.
- **Mitigation** :
  - Pas de PII stockée (sauf email pour les comptes).
  - Chiffrement des données sensibles.
  - Accès restreint à la base de données.

---

## 📌 7. Outils et Ressources

### 7.1. **Outils de Sécurité**
| Outil | Finalité | Lien |
|-------|----------|------|
| **CodeQL** | Analyse statique (JavaScript/TypeScript) | [GitHub](https://codeql.github.com/) |
| **Slither** | Analyse statique (Solidity) | [GitHub](https://github.com/crytic/slither) |
| **OWASP ZAP** | Tests de pénétration | [OWASP](https://www.zaproxy.org/) |
| **Burp Suite** | Tests de sécurité web | [PortSwigger](https://portswigger.net/burp) |
| **TruffleHog** | Détection de secrets dans le code | [GitHub](https://github.com/trufflesecurity/trufflehog) |

### 7.2. **Ressources Externes**
| Ressource | Description | Lien |
|-----------|-------------|------|
| **OWASP Top 10** | Top 10 des risques de sécurité web | [OWASP](https://owasp.org/www-project-top-ten/) |
| **STRIDE** | Méthodologie de modélisation des menaces | [Microsoft](https://docs.microsoft.com/en-us/azure/security/develop/threat-modeling) |
| **CWE Top 25** | Top 25 des failles logicielles | [CWE](https://cwe.mitre.org/top25/) |
| **Ethereum Security** | Bonnes pratiques pour les contrats | [ConsenSys](https://consensys.github.io/smart-contract-best-practices/) |

---

## 📌 8. Plan de Réponse aux Incidents

### 8.1. **Détection**
- **Surveillance** : Cloudflare Analytics, logs des Workers.
- **Alertes** : Notifications pour les activités suspectes (ex: spike de requêtes).
- **Outils** : Utilisation de SIEM (ex: Datadog, Splunk) si disponible.

### 8.2. **Réponse**
| Type d'Incident | Action Immédiate | Responsable | Escalade |
|----------------|-------------------|-------------|----------|
| **Usurpation de session** | Révoquer les cookies/sessions compromis | Équipe Technique | Responsable Sécurité |
| **Attaque DDoS** | Activer Cloudflare DDoS Protection | Cloudflare | Équipe Technique |
| **Fuites de données** | Isoler la base de données, notifier les utilisateurs | Équipe Sécurité | DPO |
| **Exploitation de contrat** | Pauser les contrats, notifier la communauté | Équipe Contrats | Auditeur Externe |
| **Élévation de privilèges** | Révoquer les accès, enquêter | Équipe Admin | Responsable Sécurité |

### 8.3. **Communication**
- **Interne** : Notifier l'équipe via Slack/Email.
- **Externe** : Publier un avis de sécurité sur le site web.
- **Légal** : Notifier les autorités compétentes si requis (ex: CNIL, ANSSI).

### 8.4. **Post-Incident**
- **Analyse** : Retrospective pour identifier la cause racine.
- **Correction** : Appliquer les correctifs nécessaires.
- **Documentation** : Mettre à jour le runbook et les procédures.

---

## 📌 9. Améliorations Continues

### 9.1. **Revue Régulière**
- **Fréquence** : Revue trimestrielle du modèle de menace.
- **Participants** : Équipe Technique, Sécurité, Juridique.
- **Objectif** : Identifier de nouvelles menaces et mettre à jour les mesures.

### 9.2. **Veille Technologique**
- **Sources** : OWASP, CVE, blogs de sécurité (ex: Krebs on Security).
- **Outils** : Alertes GitHub pour les vulnérabilités dans les dépendances.
- **Formation** : Sessions de formation pour l'équipe sur les nouvelles menaces.

### 9.3. **Tests Réguliers**
- **Pentests** : Tests de pénétration annuels (interne + externe).
- **Audit de Code** : Revue annuelle des contrats et du backend.
- **Exercices** : Simulations d'incidents de sécurité.

---

## 📌 10. Contacts

### 10.1. **Équipe Interne**
- **Responsable Sécurité** : [Nom] - security@zencheztoi.fr
- **Responsable Technique** : [Nom] - tech@zencheztoi.fr
- **DPO** : [Nom] - dpo@zencheztoi.fr

### 10.2. **Autorités Compétentes**
| Autorité | Pays | Contact |
|----------|------|---------|
| **CNIL** | France | [https://www.cnil.fr](https://www.cnil.fr) |
| **ANSSI** | France | [https://www.ssi.gouv.fr](https://www.ssi.gouv.fr) |
| **FinCEN** | États-Unis | [https://www.fincen.gov](https://www.fincen.gov) |
| **OFAC** | États-Unis | [https://home.treasury.gov](https://home.treasury.gov) |

---

## 📜 Historique des Versions

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 12/08/2026 | Version initiale |