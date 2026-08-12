# 🎨 Charte Graphique (Brand Guidelines)

**Version : 1.0**
**Dernière mise à jour : 12 août 2026**

Ce document définit les **règles d'utilisation de la marque** **Le Cours de la Souris** (ou **The Tooth Fairy Exchange**). Il couvre l'**identité visuelle**, les **couleurs**, les **typographies**, les **logos**, et les **bonnes pratiques** pour une utilisation cohérente de la marque.

---

## 📌 1. Identité de la Marque

### 1.1. **Noms Officiels**
| Langue | Nom Principal | Nom Court | Sous-titre |
|--------|---------------|-----------|------------|
| **Français** | Le Cours de la Souris | Cours de la Souris | L’indice mondial communautaire des dents de lait |
| **Anglais** | The Tooth Fairy Exchange | Tooth Fairy Exchange | The community-powered global tooth index |

### 1.2. **Nom Technique**
- **Protocole** : **Tooth Fairy Exchange Protocol** (TFXP).
- **Token** : **CROQ** (Crédits → Crypto).

### 1.3. **Ton et Voix**
- **Ton** : Chaleureux, intelligent, élégant, amusant, **jamais infantilisant**.
- **Voix** : Familiale, inclusive, professionnelle.

---

## 📌 2. Logo

### 2.1. **Description**
- Une **souris élégante** tenant une **pièce dorée** marquée d'une **dent stylisée** (🦷).
- Une **ligne de cotation discrète** en arrière-plan.

### 2.2. **Variantes**
| Variante | Fichier | Utilisation |
|----------|---------|-------------|
| Logo Principal (2048px) | `public/brand/logo-2048.png` | Site web, documents |
| Logo Clair | `public/brand/logo-light.png` | Fond clair |
| Logo Sombre | `public/brand/logo-dark.png` | Fond sombre |
| Favicon (ICO) | `public/brand/favicon.ico` | Navigateurs |
| Favicon (PNG) | `public/brand/favicon-32x32.png` | Apps mobiles |

### 2.3. **Règles d'Utilisation**
- **Ne pas modifier** les proportions ou les couleurs.
- **Ne pas déformer** (étirement, compression).
- **Espace minimal** : 10% de la largeur du logo.

---

## 📌 3. Couleurs

### 3.1. **Palette Principale**
| Couleur | Code Hex | Utilisation |
|---------|----------|-------------|
| Bleu Nuit (Primary) | `#0F6E56` | Boutons, en-têtes |
| Ivoire (Light) | `#F7F3EC` | Arrière-plan |
| Marron (Secondary) | `#8B7D6B` | Textes secondaires |
| Or Doux (Accent) | `#FFD700` | Récompenses, pièces |
| Corail (Alert) | `#FF6B6B` | Erreurs, alertes |

### 3.2. **Règles**
- **Contraste** : Ratio ≥ 4.5:1 (WCAG AA).
- **Couleur principale** : `#0F6E56` pour les CTA.

---

## 📌 4. Typographie

### 4.1. **Polices**
| Police | Famille | Utilisation |
|--------|---------|-------------|
| Serif | `Playfair Display` | Titres |
| Sans-Serif | `Inter` | Corps de texte |
| Monospace | `Fira Code` | Code |

### 4.2. **Hiérarchie**
| Élément | Taille (Desktop) | Poids | Couleur |
|---------|------------------|-------|---------|
| H1 | 48px | Bold | `#0F6E56` |
| H2 | 36px | Bold | `#0F6E56` |
| Corps | 16px | Regular | `#3A3A3A` |
| Boutons | 16px | Bold | `#FFFFFF` |

---

## 📌 5. Éléments Graphiques

### 5.1. **Icônes**
- **Bibliothèque** : Lucide React.
- **Style** : Minimaliste, monochrome.

### 5.2. **Illustrations**
- **Style** : Minimaliste, élégant, amusant.
- **Thèmes** : Souris, dents, pièces, graphiques.

---

## 📌 6. Composants UI

### 6.1. **Boutons**
| Type | Style | Utilisation |
|------|-------|-------------|
| Principal | `bg-[#0F6E56] text-white` | Actions principales |
| Secondaire | `bg-[#8B7D6B] text-white` | Actions secondaires |
| Accent | `bg-[#FFD700] text-[#0F6E56]` | Récompenses |

### 6.2. **Cartes**
- **Style** : `bg-white border border-[#0F6E56] rounded-lg p-4 shadow-md`
- **Border Radius** : 8px.

---

## 📌 7. Accessibilité
- **WCAG 2.1 AA** : Respect des normes.
- **Contraste** : ≥ 4.5:1.
- **Navigation clavier** : Tous les éléments interactifs.
- **ARIA** : Attributs pour les composants complexes.

---

## 📌 8. Ressources
- **Dossier** : `public/brand/`
- **Génération** : `scripts/generate-brand-assets.ts`

---

## 📜 Historique
| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 12/08/2026 | Version initiale |