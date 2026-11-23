# MesFins — MVP v0.1

Application personnelle de gestion financière mensuelle (FCFA).

## Fonctionnalités v0.1
- ✅ Saisie des revenus (salaire + revenus secondaires)
- ✅ Charges fixes (loyer, factures, abonnements) avec jour de prélèvement
- ✅ Dépenses variables avec saisie rapide (montant → catégorie → date → note)
- ✅ Tableau de bord : revenu / charges / variables / reste à vivre
- ✅ Jauges de santé financière (taux d'épargne, ratio charges, ratio variables)
- ✅ Alertes de seuil (solde minimum, % dépenses, taux d'épargne, budget catégorie)
- ✅ Projets d'épargne avec progression et calcul de l'épargne mensuelle nécessaire
- ✅ Fonds d'urgence (3-6 mois de charges fixes)
- ✅ Paramètres : seuils configurables, export JSON, réinitialisation
- ✅ Stockage local (localStorage) — fonctionne hors ligne

## Stack
- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- localStorage (offline-first)

## Lancer le projet
```bash
cd app
npm install
npm run dev
```
Ouvrir http://localhost:5173

## Build production
```bash
cd app
npm run build
```

## Prochaines étapes (v0.2)
- Bilan de fin de mois
- Export CSV
- Budget par catégorie avec alertes 80/100 %
- Historique 12 mois
- Options personnalisables (catégories, champs, modèles de mois)