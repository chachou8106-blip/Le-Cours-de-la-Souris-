# 📈 Méthodologie de Calcul

Ce document décrit la **méthodologie** utilisée pour calculer le **Cours de Référence de la Souris**, ainsi que les indices officiels et communautaires.

---

## 🎯 Principe de Base

Le **Cours de Référence de la Souris** est un **indice communautaire** qui reflète les montants **médians** laissés par les parents pour les dents de lait, **par pays et par devise**. Il est calculé de manière **transparente, reproductible et résistante aux manipulations**.

> ⚠️ **Important** : Il n'existe **pas de cours officiel** institutionnel pour la Petite Souris. Le Cours de Référence de la Souris est **uniquement officiel au regard de sa méthodologie publique**.

---

## 📊 Types de Données

### 1. Données Officielles (`official_dental_tariff`)
- **Source** : Ministères de la santé, associations dentaires, études publiques.
- **Exemples** :
  - Tarifs moyens des soins dentaires pour enfants (France : ~20-50€/an).
  - Recommandations des associations de pédiatrie.
- **Utilisation** : **Affichage séparé** (ne fait **pas partie** de l'indice communautaire).
- **Mise à jour** : Trimestrielle.

### 2. Données Communautaires (`family_payout_report`)
- **Source** : Déclarations **anonymes** des utilisateurs (adultes responsables).
- **Champs collectés** :
  - Pays (`country_iso2`)
  - Montant (`amount`)
  - Devise (`currency`)
  - Mois/Année (`month`, `year`)
  - Tranche d'âge (`age_range`) *(optionnel)*
  - Tradition (`tradition`) *(optionnel)*
  - Commentaire (`comment`) *(optionnel, modéré)*
- **Validation** :
  - **Turnstile** : Protection contre les bots.
  - **Rate Limiting** : 1 déclaration/5 minutes/IP.
  - **Modération automatique** : Détection des montants aberrants (ex: > 100€).
  - **Modération humaine** : Vérification aléatoire des déclarations.

### 3. Taux de Change (`fx_rate`)
- **Source** :
  - **API externes** (ex: ExchangeRate-API, Fixer.io).
  - **Mocks** pour le développement.
- **Fréquence** : Quotidienne.
- **Précision** : 4 décimales.

### 4. Parité de Pouvoir d'Achat (`ppp_rate`)
- **Source** : Banque Mondiale, FMI.
- **Fréquence** : Annuelle.
- **Utilisation** : Pondération des indices pour éviter les biais des devises fortes (ex: USD, EUR).

---

## 🧮 Calcul de l'Indice Communautaire

### 1. Filtrage des Données
Les déclarations sont filtrées selon les critères suivants :
- **Statut** : `published` (validées).
- **Période** : Derniers 12 mois (glissant).
- **Taille d'échantillon** : Minimum **10 déclarations** par pays pour être inclus.
- **Montants aberrants** : Exclus (seuils configurables par pays/devise).

### 2. Agrégation par Pays
Pour chaque pays (`country_iso2`) :
1. **Conversion en EUR** (si devise ≠ EUR) :
   ```
   amount_eur = amount * fx_rate(from_currency, to="EUR")
   ```
2. **Calcul de la médiane** :
   - Tri des montants.
   - Sélection de la valeur centrale (ou moyenne des 2 valeurs centrales si pair).
3. **Calcul de l'IQR (Interquartile Range)** :
   - Q1 = 25ème percentile.
   - Q3 = 75ème percentile.
   - IQR = Q3 - Q1.
4. **Score de confiance** :
   ```
   confidence = min(
       1.0,
       (sample_size / 100) * 0.3 +  # Taille de l'échantillon (max 0.3)
       (1 - (recentness_penalty)) * 0.4 +  # Récence (max 0.4)
       (1 - (dispersion_penalty)) * 0.3   # Dispersion (max 0.3)
   )
   ```
   - `recentness_penalty` : Pénalité si les données sont anciennes (ex: > 30 jours).
   - `dispersion_penalty` : Pénalité si l'IQR est trop large (ex: IQR > médiane * 0.5).

### 3. Indice Mondial
1. **Conversion en USD via PPA** :
   ```
   amount_usd_ppp = amount_eur * ppp_rate(country_iso2, base="USD")
   ```
2. **Pondération par pays** :
   - Chaque pays a un poids `w_i` calculé comme :
     ```
     w_i = min(0.2, sample_size_i / total_sample_size)
     ```
     *(Plafond à 20% par pays pour éviter la domination des grands pays.)*
3. **Moyenne pondérée** :
   ```
   global_index = Σ (amount_usd_ppp_i * w_i)
   ```

---

## 📉 Formules Mathématiques

### Médiane
```
Si n est impair : médiane = x_{(n+1)/2}
Si n est pair : médiane = (x_{n/2} + x_{n/2 + 1}) / 2
```

### IQR (Interquartile Range)
```
IQR = Q3 - Q1
```

### Score de Confiance
```
confidence = min(1.0, (sample_size / 100) * 0.3 + (1 - recentness_penalty) * 0.4 + (1 - dispersion_penalty) * 0.3)
```

### Indice Mondial
```
global_index = Σ (amount_usd_ppp_i * w_i)
```