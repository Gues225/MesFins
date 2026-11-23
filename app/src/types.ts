// Types pour MesFins MVP v0.1

export type Recurrence = 'monthly' | 'one-off';

export interface Income {
  id: string;
  label: string;
  amount: number; // FCFA entier
  recurrence: Recurrence;
  active: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'fixed' | 'variable';
  color: string;
  icon: string;
  monthlyBudget: number; // FCFA
  isDefault: boolean;
}

export interface FixedExpense {
  id: string;
  categoryId: string;
  label: string;
  amount: number; // FCFA
  dayOfMonth: number; // 1-31
  recurrence: Recurrence;
  paid: boolean;
  createdAt: string;
}

export interface VariableExpense {
  id: string;
  categoryId: string;
  amount: number; // FCFA
  date: string; // ISO date
  note: string;
  createdAt: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number; // FCFA
  targetDate: string; // ISO date
  currentAmount: number; // FCFA
  color: string;
  createdAt: string;
}

export interface Threshold {
  id: string;
  type: 'min_balance' | 'max_expense_pct' | 'min_savings_rate';
  value: number;
  enabled: boolean;
}

export interface AppData {
  incomes: Income[];
  categories: Category[];
  fixedExpenses: FixedExpense[];
  variableExpenses: VariableExpense[];
  savingsGoals: SavingsGoal[];
  thresholds: Threshold[];
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthSummary {
  incomeTotal: number;
  fixedTotal: number;
  variableTotal: number;
  savingsTotal: number;
  leftover: number; // reste à vivre
  savingsRate: number; // %
  fixedRatio: number; // %
  variableRatio: number; // %
}

export type AlertLevel = 'green' | 'orange' | 'red';

export interface Alert {
  id: string;
  type: string;
  message: string;
  level: AlertLevel;
}