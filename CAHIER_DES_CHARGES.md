# CAHIER DES CHARGES — APPLICATION « MESFINS »

## Gestion mensuelle des revenus, dépenses et épargne

**Version :** 1.0 — document initial
**Date :** 2026-11-07
**Statut :** Validé v1.0 — prêt pour développement MVP v0.1
**Rédacteur :** Expert produit / finance
**Client :** Usage personnel (utilisateur unique), évolutif vers multi-utilisateurs

---

## 1. VISION ET OBJECTIFS

### 1.1 Vision
MesFins est une application personnelle de gestion financière mensuelle qui transforme
les revenus bruts en **plan d'action clair** : ce qu'il reste à vivre, ce qu'il faut
mettre de côté, ce qu'il est possible d'épargner pour ses projets.

> **Promesse produit :** « Sachez en 30 secondes où part votre argent, et ce qu'il vous reste à vivre. »

### 1.2 Objectifs mesurables
| Objectif | Mesure de succès |
|---|---|
| Prise de conscience | L'utilisateur sait en 30 s son reste à vivre et son taux d'épargne |
| Discipline | 100 % des dépenses mensuelles récurrentes sont catégorisées |
| Épargne | Taux d'épargne réel ≥ 10 % du revenu net sur 3 mois consécutifs |
| Zéro surprise | Alerte avant tout dépassement d'un seuil défini |

### 1.3 Hors périmètre (v1)
- Comptabilité professionnelle / déclarations fiscales
- Multi-devises et taux de change réels
- Connexion bancaire automatique (open banking)
- Gestion de dette / crédit revolving
- Investissements boursiers

---

## 2. PERSONAS ET CAS D'USAGE

### 2.1 Persona principal — « Le salarié conscient »
- Revenu fixe mensuel (salaire ou revenu freelance récurrent)
- Loyer + factures fixes + dépenses variables
- Objectifs personnels : vacances, voyage, achat, fonds d'urgence
- Besoin : voir en un coup d'œil ce qu'il peut dépenser sans se mettre en danger

### 2.2 Cas d'usage clés
1. **Saisie du revenu** — renseigner salaire(s) et autres revenus mensuels
2. **Planification des charges fixes** — loyer, factures, abonnements, crédits
3. **Suivi des dépenses variables** — alimentation, transport, loisirs, santé
4. **Définition d'objectifs d'épargne** — vacances, voyage, fonds d'urgence, projets
5. **Alertes de seuil** — ne pas descendre sous un solde minimum défini
6. **Options personnalisées** — l'utilisateur ajoute ses propres catégories/champs
7. **Bilan mensuel** — résumé du mois passé + projection du mois en cours
8. **Historique** — évolution sur 6 à 12 mois

---

## 3. FONCTIONNALITÉS DÉTAILLÉES

### 3.1 Module A — Revenus (« Ce qui entre »)
- Saisie du salaire principal (montant net mensuel)
- Ajout de revenus secondaires (freelance, allocations, rentes, cadeaux)
- **Revenu total mensuel** = somme des sources actives
- Marquage d'une source comme « récurrente » ou « ponctuelle »
- Historique des revenus par mois (pour projeter la moyenne)

### 3.2 Module B — Charges fixes (« Ce qui sort obligatoirement »)
Catégories par défaut (modifiables/supprimables) :
| Catégorie | Exemples |
|---|---|
| Logement | Loyer, charges, crédit immobilier |
| Énergie | Électricité, gaz, eau |
| Télécom | Téléphone, internet, TV |
| Assurances | Santé, habitation, auto |
| Crédits | Prêts personnels, auto, études |
| Abonnements | Streaming, logiciels, sport |
| Impôts / taxes | Taxe habitation, IS, cotisations |
| Garde d'enfants / scolarité | Crèche, école |

Fonctionnalités :
- Montant mensuel par charge + jour de prélèvement (pour projection)
- Marquage « payé / à payer »
- Total charges fixes = **charges obligatoires du mois**
- **Reste après charges fixes** = revenu − charges fixes

### 3.3 Module C — Dépenses variables (« Ce qui varie »)
Catégories par défaut :
- Alimentation (courses, restaurants, livraison)
- Transport (carburant, transports en commun, VTC)
- Santé / pharmacie
- Hygiène / soins personnels
- Vêtements
- Loisirs / sorties / cadeaux
- Éducation / formation
- Imprévus / autres

Fonctionnalités :
- Saisie rapide (montant + catégorie + date + note)
- Budget mensuel par catégorie (plafond défini par l'utilisateur)
- Alerte à 80 % et 100 % du budget catégorie
- Total dépenses variables du mois
- **Reste à vivre** = revenu − charges fixes − dépenses variables

### 3.4 Module D — Épargne et projets (« Ce qui se construit »)
- **Fonds d'urgence** : objectif = 3 à 6 mois de charges fixes (calculé auto)
- **Projets nommés** : vacances, voyage, achat (voiture, téléphone, meuble…), formation
  - Montant cible + date cible → épargne mensuelle nécessaire calculée
  - Progression en % et en montant
  - Alimentation manuelle (virement vers le compte épargne)
- **Taux d'épargne cible** : % du revenu à atteindre (ex. 20 %)
- **Solde épargne disponible** : somme des fonds

### 3.5 Module E — Seuils et alertes (« Les garde-fous »)
- **Seuil minimum de compte courant** : montant en dessous duquel une alerte rouge s'affiche
- **Seuil de dépense mensuelle** : alerte si les dépenses variables dépassent X % du revenu
- **Seuil d'épargne** : alerte si le taux d'épargne réel < taux cible
- **Alerte prévisionnelle** : « à ce rythme vous dépenserez X avant la fin du mois »
- Notifications in-app (v1) ; push/email en v2

### 3.6 Module F — Options personnalisables (« Ce que l'utilisateur ajoute »)
L'utilisateur peut créer ses propres éléments, sans code :
- **Catégories de dépenses** (nom, couleur, icône, budget)
- **Types de charges fixes** (nom, montant, jour de prélèvement, récurrence)
- **Projets d'épargne** (nom, montant cible, date, couleur)
- **Sources de revenus** (nom, montant, récurrence)
- **Champs personnalisés** sur une dépense (ex. « payé par qui », « remboursable »)
- **Modèles de mois** : sauvegarder un mois type pour le réutiliser

### 3.7 Module G — Tableau de bord (« Vue d'ensemble »)
- **Revenu du mois** / **Charges fixes** / **Dépenses variables** / **Épargne** / **Reste à vivre**
- Jauge de reste à vivre (vert / orange / rouge)
- Répartition des dépenses par catégorie (camembert + liste)
- Progression des projets d'épargne
- Comparaison mois courant vs mois précédent (flèches ↑↓)
- **Projection de fin de mois** : dépenses projetées si le rythme actuel se poursuit

### 3.8 Module H — Bilan et historique
- Bilan de fin de mois : ce qui est bien passé, ce qui a dérapé, recommandations
- Historique sur 12 mois (graphique en barres empilées)
- Export CSV / PDF (pour un comptable ou pour soi)
- Moyenne mobile sur 3 mois (lissage des dépenses irrégulières)

---

## 4. MODÈLE DE DONNÉES

### 4.1 Entités principales
```
User
  id, email, devise, salaire_net_mensuel (optionnel), created_at

Income (revenu)
  id, user_id, label, amount, recurrence (monthly/one-off), active, created_at

FixedExpense (charge fixe)
  id, user_id, category_id, label, amount, day_of_month, recurrence, paid, created_at

VariableExpense (dépense variable)
  id, user_id, category_id, amount, date, note, created_at

Category (catégorie)
  id, user_id, name, type (fixed/variable), color, icon, monthly_budget, is_default, created_at

SavingsGoal (projet d'épargne)
  id, user_id, name, target_amount, target_date, current_amount, color, created_at

EmergencyFund (fonds d'urgence)
  id, user_id, target_months (3-6), current_amount

Threshold (seuil)
  id, user_id, type (min_balance / max_expense_pct / min_savings_rate), value, enabled

MonthSnapshot (bilan mensuel)
  id, user_id, year, month, income_total, fixed_total, variable_total, savings_total, leftover
```

### 4.2 Règles d'intégrité
- Un montant ne peut jamais être négatif (montant en FCFA entier ≥ 0)
- Une catégorie supprimée réassigne ses dépenses à « Autres »
- Un projet d'épargne atteint 100 % → statut « accompli », archivé
- Le fonds d'urgence cible = `charges_fixes_mensuelles × target_months`

---

## 5. RÈGLES MÉTIER (logique financière)

### 5.1 Calculs fondamentaux
```
Revenu net mensuel (R)        = Σ revenus actifs
Charges fixes (CF)            = Σ charges fixes actives
Dépenses variables (DV)       = Σ dépenses variables du mois
Épargne réelle (E)            = R − CF − DV
Taux d'épargne (TE)           = E / R × 100
Reste à vivre (RAV)           = E  (ce qui reste après tout)
Reste après charges fixes     = R − CF
```

### 5.2 Règles de santé financière
| Indicateur | Vert | Orange | Rouge |
|---|---|---|---|
| Taux d'épargne | ≥ 20 % | 10–19 % | < 10 % |
| Charges fixes / revenu | ≤ 50 % | 51–70 % | > 70 % |
| Dépenses variables / revenu | ≤ 30 % | 31–40 % | > 40 % |
| Solde compte courant | ≥ seuil | seuil−20 % | < seuil |

### 5.3 Règles de projection
- **Projection de fin de mois** = dépenses variables à date × (30 / jour_courant)
- **Alerte prévisionnelle** déclenchée si projection > budget variables × 1,1
- **Mois type** : si un mois est marqué « type », ses montants servent de pré-remplissage pour le mois suivant

### 5.4 Règles d'arrondi et de devise
- **Devise par défaut : FCFA (XOF — Franc CFA de l'Afrique de l'Ouest).** Pas de subdivision : le FCFA n'a pas de centimes.
- Tous les montants sont stockés en **unités entières (FCFA)** — pas de flottants, pas de centimes.
- Affichage avec séparateur de milliers (espace) et symbole « FCFA » (ex. : 850 000 FCFA).
- Devise configurable (EUR, USD…) mais FCFA par défaut pour le marché cible.
- Arrondis : aucune décimale affichée (le FCFA est une devise entière).

---

## 6. KPIs ET INDICATEURS

### 6.1 KPIs utilisateur (affichés)
- Taux d'épargne mensuel et moyenne sur 3 mois
- Reste à vivre en valeur et en %
- Ratio charges fixes / revenu
- Progression de chaque projet d'épargne
- Nombre de mois d'urgence couverts (fonds d'urgence / charges fixes)
- Écart vs mois précédent (par catégorie)

### 6.2 KPIs produit (pour l'éditeur)
- Taux d'activation : % d'utilisateurs ayant saisi revenu + ≥ 1 charge fixe dans les 7 jours
- Rétention : % d'utilisateurs actifs à J30
- Taux d'usage : nombre de dépenses saisies par mois / utilisateur
- Taux d'atteinte d'objectif épargne

---

## 7. ROADMAP MVP (3 versions)

### v0.1 — « Je sais où va mon argent » (4 semaines)
- Saisie revenu, charges fixes, dépenses variables
- Catégories par défaut
- Tableau de bord : revenu / charges / variables / reste à vivre
- Alertes de seuil minimum de compte courant
- Stockage local (IndexedDB / localStorage)

### v0.2 — « Je planifie mon épargne » (4 semaines)
- Projets d'épargne nommés avec progression
- Fonds d'urgence calculé
- Budget par catégorie avec alertes 80/100 %
- Bilan de fin de mois
- Export CSV

### v0.3 — « Je pilote sur le temps » (4 semaines)
- Historique 12 mois + graphiques
- Options personnalisables (catégories, champs, modèles de mois)
- Projection de fin de mois
- Export PDF
- Synchronisation cloud (optionnelle)

---

## 8. CONTRAINTES TECHNIQUES

### 8.1 Stack recommandée (pour un MVP rapide)
- **Frontend** : React + TypeScript + Tailwind (ou Vue 3)
- **Stockage v1** : IndexedDB (offline-first) — pas de backend requis. Montants stockés en FCFA entiers (pas de centimes).
- **Stockage v2** : Supabase (auth + Postgres + sync) ou Firebase
- **Graphiques** : Recharts ou Chart.js
- **PWA** : installable sur mobile, fonctionne hors ligne
- **i18n** : français par défaut, anglais en option

### 8.2 Contraintes UX
- Saisie d'une dépense en ≤ 3 taps (montant → catégorie → valider)
- Tableau de bord chargé en < 1 s
- Fonctionne hors ligne (données locales)
- Aucune donnée financière envoyée sans consentement explicite
- Accessible (contraste AA, navigation clavier)

### 8.3 Sécurité et confidentialité
- Données financières = données sensibles
- Chiffrement au repos (IndexedDB chiffré en v2)
- Pas de tracking publicitaire
- Export / suppression des données à la demande (RGPD)
- Authentification biométrique optionnelle sur mobile

---

## 9. GLOSSAIRE

| Terme | Définition |
|---|---|
| Revenu net | Montant perçu après impôts et cotisations |
| Charges fixes | Dépenses récurrentes obligatoires et prévisibles |
| Dépenses variables | Dépenses dont le montant change d'un mois à l'autre |
| Reste à vivre | Ce qui reste après charges fixes ET dépenses variables |
| Taux d'épargne | Part du revenu mise de côté (en %) |
| Fonds d'urgence | Épargne de sécurité = 3 à 6 mois de charges fixes |
| Seuil minimum | Solde en dessous duquel une alerte est déclenchée |
| Mois type | Modèle de mois réutilisable |

---

## 10. ANNEXES

### 10.1 Exemple de tableau de bord (v0.1)
```
┌─────────────────────────────────────────┐
│  MESFINS — Novembre 2026                │
├─────────────────────────────────────────┤
│  Revenu net        :  850 000 FCFA      │
│  Charges fixes     :  420 000 FCFA  (49%)│
│  Dépenses variables:  180 000 FCFA  (21%)│
│  Épargne réelle    :  250 000 FCFA  (29%)│
│  ─────────────────────────────────────  │
│  Reste à vivre     :  250 000 FCFA  ✅  │
├─────────────────────────────────────────┤
│  🟢 Taux d'épargne 29 %  (cible 20 %)   │
│  🟢 Charges fixes 49 %  (max 50 %)      │
│  🟠 Variables 21 %  (cible 30 %)        │
└─────────────────────────────────────────┘
```

### 10.2 Exemple de projet d'épargne
```
Projet : Vacances Abidjan → Dakar
Cible  : 600 000 FCFA
Date   : août 2027
Épargne mensuelle nécessaire : 50 000 FCFA
Progression : ████████░░░░░░░░  42 %  (250 000 / 600 000)
```

---

**Fin du cahier des charges v1.0.**
**Prochaine étape :** validation des objectifs et choix de la stack, puis lancement du MVP v0.1.
