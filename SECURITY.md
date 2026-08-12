# 🔒 Politique de Sécurité

**Dernière mise à jour : 12 août 2026**

## 📌 Signalement de Vulnérabilités

Si vous découvrez une **vulnérabilité de sécurité** dans **Le Cours de la Souris**, nous vous encourageons à la **signaler de manière responsable** à notre équipe.

### **Comment Signaler ?**
1. **Envoyez un email** à : **security@zencheztoi.fr**
2. **Utilisez notre formulaire** : [https://zencheztoi.fr/security-report](https://zencheztoi.fr/security-report)
3. **Ouvrez une issue privée** sur GitHub (si vous avez accès).

### **Que Inclure dans votre Rapport ?**
- **Description** de la vulnérabilité.
- **Étapes pour reproduire** (si possible).
- **Impact potentiel** (ex: accès non autorisé, fuite de données).
- **Preuve de concept (PoC)** (si disponible, **sans exploiter la vulnérabilité**).
- **Vos coordonnées** (pour vous contacter si nécessaire).

### **Ce que Nous Faisons**
- Nous **accusons réception** sous 24h.
- Nous **enquêtons** rapidement sur le rapport.
- Nous **corrigeons** la vulnérabilité en priorité.
- Nous **vous créditons** (si vous le souhaitez) dans nos remerciements.

---

## 📌 Engagements de Sécurité

### **Ce que Nous Faisons**
✅ **Validation des entrées** : Toutes les données utilisateurs sont validées (Zod).
✅ **Sanitization** : Protection contre les attaques XSS.
✅ **Chiffrement** : Données sensibles chiffrées (AES-256).
✅ **Rate Limiting** : 100 requêtes/minute/IP.
✅ **Turnstile** : Protection anti-bot pour les formulaires.
✅ **CORS** : Restreint aux domaines autorisés.
✅ **Audit Régulier** : Analyse statique (CodeQL, Slither) et pentests.
✅ **Mises à Jour** : Dépendances à jour via Dependabot.

### **Ce que Nous Ne Faisons Pas**
❌ **Stockage de PII** : Aucune donnée personnelle sur les enfants.
❌ **Secrets dans le code** : Utilisation de GitHub Secrets et Cloudflare Secrets.
❌ **Accès non autorisé** : Vérification stricte des rôles et permissions.

---

## 📌 Bonnes Pratiques pour les Développeurs

### **Sécurité du Code**
- **Ne jamais faire confiance** aux entrées utilisateurs.
- **Utiliser des bibliothèques sécurisées** (ex: Zod, OpenZeppelin).
- **Éviter les anti-patterns** (ex: `eval()`, `innerHTML`, `delegatecall`).
- **Gérer les erreurs** de manière sécurisée (pas de fuites d'informations).

### **Gestion des Secrets**
- **Jamais commiter** de secrets dans le code.
- **Utiliser des variables d'environnement** (`.env` + `.gitignore`).
- **Rotater les secrets** régulièrement (tous les 90 jours).

### **Tests de Sécurité**
- **Exécuter CodeQL** avant de merger.
- **Exécuter Slither** pour les contrats Solidity.
- **Tester les permissions** (ex: vérifiez que seul l'admin peut accéder à `/admin`).

---

## 📌 Outils de Sécurité

| Outil | Finalité | Lien |
|-------|----------|------|
| **CodeQL** | Analyse statique (JS/TS) | [GitHub](https://codeql.github.com/) |
| **Slither** | Analyse statique (Solidity) | [GitHub](https://github.com/crytic/slither) |
| **OWASP ZAP** | Tests de pénétration | [OWASP](https://www.zaproxy.org/) |
| **TruffleHog** | Détection de secrets | [GitHub](https://github.com/trufflesecurity/trufflehog) |

---

## 📌 Ressources

- [Threat Model](docs/threat-model.md)
- [Audit Readiness](docs/audit-readiness.md)
- [Incident Response](docs/incident-response.md)

---

## 📜 Historique

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 12/08/2026 | Version initiale |