import type { AppData, MonthSummary, Alert, AlertLevel } from './types';

export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

export function formatFCFAShort(amount: number): string {
  if (Math.abs(amount) >= 1000000) return (amount / 1000000).toFixed(1) + ' M FCFA';
  if (Math.abs(amount) >= 1000) return (amount / 1000).toFixed(0) + ' k FCFA';
  return amount + ' FCFA';
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function currentMonth(): { year: number; month: number } {
  const d = new Date();
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

export function computeSummary(data: AppData): MonthSummary {
  const { year, month } = currentMonth();
  const monthPrefix = `${year}-${String(month).padStart(2, '0')}`;

  const incomeTotal = data.incomes
    .filter(i => i.active)
    .reduce((s, i) => s + i.amount, 0);

  const fixedTotal = data.fixedExpenses.reduce((s, e) => s + e.amount, 0);

  const variableTotal = data.variableExpenses
    .filter(e => e.date.startsWith(monthPrefix))
    .reduce((s, e) => s + e.amount, 0);

  const savingsTotal = data.savingsGoals.reduce((s, g) => s + g.currentAmount, 0);

  const leftover = incomeTotal - fixedTotal - variableTotal;
  const savingsRate = incomeTotal > 0 ? (leftover / incomeTotal) * 100 : 0;
  const fixedRatio = incomeTotal > 0 ? (fixedTotal / incomeTotal) * 100 : 0;
  const variableRatio = incomeTotal > 0 ? (variableTotal / incomeTotal) * 100 : 0;

  return { incomeTotal, fixedTotal, variableTotal, savingsTotal, leftover, savingsRate, fixedRatio, variableRatio };
}

export function getAlerts(data: AppData, summary: MonthSummary): Alert[] {
  const alerts: Alert[] = [];
  const thresholds = data.thresholds.filter(t => t.enabled);

  for (const t of thresholds) {
    if (t.type === 'min_balance') {
      if (summary.leftover < t.value) {
        const level: AlertLevel = summary.leftover < t.value * 0.8 ? 'red' : 'orange';
        alerts.push({
          id: t.id,
          type: 'min_balance',
          message: `Reste à vivre (${formatFCFA(summary.leftover)}) sous le seuil minimum (${formatFCFA(t.value)})`,
          level,
        });
      }
    }
    if (t.type === 'max_expense_pct') {
      if (summary.variableRatio > t.value) {
        alerts.push({
          id: t.id,
          type: 'max_expense_pct',
          message: `Dépenses variables à ${summary.variableRatio.toFixed(0)} % du revenu (seuil ${t.value} %)`,
          level: 'orange',
        });
      }
    }
    if (t.type === 'min_savings_rate') {
      if (summary.savingsRate < t.value) {
        alerts.push({
          id: t.id,
          type: 'min_savings_rate',
          message: `Taux d'épargne ${summary.savingsRate.toFixed(0)} % sous l'objectif ${t.value} %`,
          level: summary.savingsRate < t.value * 0.5 ? 'red' : 'orange',
        });
      }
    }
  }

  // Budget par catégorie dépassé
  const { year, month } = currentMonth();
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  for (const cat of data.categories.filter(c => c.type === 'variable' && c.monthlyBudget > 0)) {
    const spent = data.variableExpenses
      .filter(e => e.categoryId === cat.id && e.date.startsWith(prefix))
      .reduce((s, e) => s + e.amount, 0);
    if (spent > cat.monthlyBudget) {
      alerts.push({
        id: 'cat_' + cat.id,
        type: 'category_budget',
        message: `${cat.name} : ${formatFCFA(spent)} dépensé sur ${formatFCFA(cat.monthlyBudget)} budget`,
        level: 'red',
      });
    } else if (spent > cat.monthlyBudget * 0.8) {
      alerts.push({
        id: 'cat_' + cat.id,
        type: 'category_budget',
        message: `${cat.name} : ${((spent / cat.monthlyBudget) * 100).toFixed(0)} % du budget utilisé`,
        level: 'orange',
      });
    }
  }

  return alerts;
}

export function healthLevel(value: number, green: number, orange: number, higherIsBetter = true): AlertLevel {
  if (higherIsBetter) {
    if (value >= green) return 'green';
    if (value >= orange) return 'orange';
    return 'red';
  }
  if (value <= green) return 'green';
  if (value <= orange) return 'orange';
  return 'red';
}

export function categoryName(data: AppData, id: string): string {
  return data.categories.find(c => c.id === id)?.name || 'Inconnu';
}

export function categoryColor(data: AppData, id: string): string {
  return data.categories.find(c => c.id === id)?.color || '#6b7280';
}

export function categoryIcon(data: AppData, id: string): string {
  return data.categories.find(c => c.id === id)?.icon || '📦';
}

export function expensesByCategory(data: AppData, type: 'fixed' | 'variable'): { name: string; amount: number; color: string; icon: string }[] {
  const cats = data.categories.filter(c => c.type === type);
  return cats.map(c => {
    const amount = type === 'fixed'
      ? data.fixedExpenses.filter(e => e.categoryId === c.id).reduce((s, e) => s + e.amount, 0)
      : data.variableExpenses.reduce((s, e) => e.categoryId === c.id ? s + e.amount : s, 0);
    return { name: c.name, amount, color: c.color, icon: c.icon };
  }).filter(c => c.amount > 0).sort((a, b) => b.amount - a.amount);
}