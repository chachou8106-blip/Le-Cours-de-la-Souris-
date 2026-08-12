# 📜 Contrats Solidity - CROQ Protocol

Ce dossier contient les **contrats intelligents** du protocole **Le Cours de la Souris** (Tooth Fairy Exchange Protocol). Ces contrats sont conçus pour être **audit-ready**, **sécurisés**, et **conformes aux meilleures pratiques**.

---

## 📌 Structure du Dossier

```
packages/contracts/
├── src/                          # Code source des contrats
│   ├── CROQToken.sol            # Token ERC-20 avec Permit et Votes
│   ├── CROQStaking.sol          # Staking pour les validateurs
│   ├── MerkleRewardsDistributor.sol # Distribution des récompenses via Merkle
│   ├── ProtocolTimelock.sol     # Timelock pour les actions sensibles
│   └── ProtocolTreasury.sol     # Trésorerie du protocole
│
├── test/                        # Tests des contrats
│   ├── CROQToken.t.sol          # Tests pour CROQToken
│   ├── CROQStaking.t.sol        # Tests pour CROQStaking
│   └── MerkleRewardsDistributor.t.sol # Tests pour MerkleRewardsDistributor
│
├── script/                      # Scripts de déploiement
│   └── Deploy.s.sol             # Script de déploiement
│
├── foundry.toml                 # Configuration Foundry
├── .gitignore                   # Fichiers ignorés
└── README.md                    # Ce fichier
```

---

## 📌 Contrats

### 1. **CROQToken.sol**
- **Description** : Token ERC-20 avec **Permit** (EIP-2612) et **Votes** (EIP-712).
- **Fonctionnalités** :
  - **Mint/Burn** : Contrôlé par le owner (timelock).
  - **Pausable** : Possibilité de mettre en pause en cas d'urgence.
  - **Cap Immuable** : Supply maximal fixe (1 milliard de tokens).
- **Sécurité** :
  - **No Upgrade** : Pas de proxy (immutabilité).
  - **Checks-Effects-Interactions** : Respect de la pattern.
  - **ReentrancyGuard** : Protection contre les attaques de réentrance.

### 2. **CROQStaking.sol**
- **Description** : Contrat de **staking** pour les validateurs.
- **Fonctionnalités** :
  - **Staking** : Dépôt de tokens CROQ pour valider des données.
  - **Délai de déliaison** : 7 jours avant retrait.
  - **Récompenses** : Basées sur la qualité du travail (futur).
  - **Slashing** : Pénalités pour mauvaise validation (futur).
- **Sécurité** :
  - **Pausable** : Possibilité de mettre en pause en cas d'urgence.
  - **ReentrancyGuard** : Protection contre les attaques de réentrance.

### 3. **MerkleRewardsDistributor.sol**
- **Description** : Distribution des récompenses via **preuves Merkle**.
- **Fonctionnalités** :
  - **Preuves Merkle** : Vérification des récompenses sans stocker toutes les données on-chain.
  - **Anti-Sybil** : Chaque adresse ne peut claimer qu'une seule fois par snapshot.
  - **Batch Distribution** : Distribution efficace des récompenses.
- **Sécurité** :
  - **Pausable** : Possibilité de mettre en pause en cas d'urgence.
  - **No Reentrancy** : Pas de risque de réentrance.

### 4. **ProtocolTimelock.sol**
- **Description** : **Timelock** pour les actions sensibles.
- **Fonctionnalités** :
  - **Délai minimal** : 48 heures pour les actions critiques.
  - **Proposers/Executors** : Rôles séparés pour proposer et exécuter.
- **Sécurité** :
  - **No Direct Execution** : Aucune action critique ne peut être exécutée sans délai.

### 5. **ProtocolTreasury.sol**
- **Description** : **Trésorerie** du protocole.
- **Fonctionnalités** :
  - **Réception de fonds** : Via mint du token CROQ.
  - **Décaissement** : Uniquement via le timelock.
  - **No Direct Access** : Aucun accès direct, même pour le owner.
- **Sécurité** :
  - **Pausable** : Possibilité de mettre en pause en cas d'urgence.
  - **Multisig** : Contrôle via un Safe multisig (futur).

---

## 📌 Déploiement

### Prérequis
1. **Foundry** : Installé et configuré.
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

2. **Dépendances** : OpenZeppelin.
   ```bash
   forge install
   ```

3. **Variables d'Environnement** :
   - `SEPOLIA_RPC_URL` : URL du RPC Sepolia.
   - `PRIVATE_KEY` : Clé privée du déploiement (à ne jamais commiter !).

### Déploiement sur Sepolia
```bash
# Configurer les variables d'environnement
export SEPOLIA_RPC_URL=https://rpc.sepolia.dev
export PRIVATE_KEY=your_private_key

# Déployer les contrats
forge script script/Deploy.s.sol:Deploy --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast

# Vérifier le déploiement
forge script script/Deploy.s.sol:Deploy --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --sig "checkDeployment()" --broadcast
```

> ⚠️ **Attention** : Le déploiement est **désactivé par défaut** (`DEPLOY_ENABLED = false`). Pour activer, modifiez le script et définissez `DEPLOY_ENABLED = true`.

### Déploiement sur Mainnet
> ❌ **Interdit** : Le déploiement sur mainnet nécessite une **validation légale et technique** préalable. Voir [docs/token-launch-gates.md](../docs/token-launch-gates.md).

---

## 📌 Tests

### Exécuter les Tests
```bash
# Tests unitaires
forge test

# Tests avec coverage
forge coverage

# Tests de fuzz
forge test --fuzz-runs 1000

# Tests d'invariants
forge test --invariant-runs 1000
```

### Analyse de Sécurité
```bash
# Slither (analyse statique)
slither .

# Slither avec rapport détaillé
slither . --exclude-dependencies --json report.json
```

---

## 📌 Bonnes Pratiques

### 1. **Sécurité**
- **Ne jamais utiliser** `tx.origin` pour l'authentification (utiliser `msg.sender`).
- **Toujours vérifier** les entrées (ex: `require(amount > 0)`).
- **Utiliser OpenZeppelin** pour les implémentations standard (ERC20, Ownable, etc.).
- **Éviter `delegatecall`** sur des contrats non trustés.

### 2. **Tests**
- **100% de couverture** si possible.
- **Tests de fuzz** pour les fonctions critiques.
- **Tests d'invariants** pour vérifier les propriétés du contrat.

### 3. **Documentation**
- **NatSpec** : Commentaires complets pour toutes les fonctions.
  ```solidity
  /// @title CROQ Token
  /// @dev Token ERC-20 avec Permit et Votes.
  /// @notice Ce contrat est conçu pour être audit-ready.
  ```
- **Diagrammes** : Utiliser des outils comme [Merkly](https://merkly.io/) ou [Solidity Visual Developer](https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-visual-auditor).

---

## 📌 Ressources

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Foundry Book](https://book.getfoundry.sh/)
- [Slither](https://github.com/crytic/slither)
- [SWC Registry](https://swcregistry.io/) (Smart Contract Weakness Classification)

---

## 📌 Checklist avant Audit

- [ ] Tous les contrats **compilent** sans erreur.
- [ ] Tous les tests **passent** (100% de couverture si possible).
- [ ] **Slither** ne rapporte **aucune vulnérabilité critique**.
- [ ] Les **permissions** sont correctement configurées (owner, timelock, etc.).
- [ ] Les **événements** sont émis pour toutes les actions critiques.
- [ ] La **documentation** est complète (NatSpec, README).
- [ ] Le **script de déploiement** est testé et sécurisé.

---

## 📜 Historique

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 12/08/2026 | Version initiale |