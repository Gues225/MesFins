import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { AppData, Income, Category, FixedExpense, VariableExpense, SavingsGoal, Threshold } from './types';
import { defaultCategories } from './defaults';

const STORAGE_KEY = 'mesfins_data';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function createDefaultData(): AppData {
  return {
    incomes: [],
    categories: defaultCategories.map(c => ({ ...c, id: generateId() })),
    fixedExpenses: [],
    variableExpenses: [],
    savingsGoals: [],
    thresholds: [
      { id: generateId(), type: 'min_balance', value: 50000, enabled: true },
      { id: generateId(), type: 'max_expense_pct', value: 40, enabled: true },
      { id: generateId(), type: 'min_savings_rate', value: 20, enabled: true },
    ],
    currency: 'FCFA',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppData;
      // Migration: ensure categories exist
      if (!parsed.categories || parsed.categories.length === 0) {
        parsed.categories = defaultCategories.map(c => ({ ...c, id: generateId() }));
      }
      return parsed;
    }
  } catch (e) {
    console.error('Erreur chargement données:', e);
  }
  return createDefaultData();
}

function saveData(data: AppData): void {
  data.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

interface StoreContextType {
  data: AppData;
  // Income
  addIncome: (income: Omit<Income, 'id' | 'createdAt'>) => void;
  updateIncome: (id: string, updates: Partial<Income>) => void;
  deleteIncome: (id: string) => void;
  // Categories
  addCategory: (cat: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  // Fixed expenses
  addFixedExpense: (exp: Omit<FixedExpense, 'id' | 'createdAt'>) => void;
  updateFixedExpense: (id: string, updates: Partial<FixedExpense>) => void;
  deleteFixedExpense: (id: string) => void;
  toggleFixedPaid: (id: string) => void;
  // Variable expenses
  addVariableExpense: (exp: Omit<VariableExpense, 'id' | 'createdAt'>) => void;
  deleteVariableExpense: (id: string) => void;
  // Savings goals
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'createdAt'>) => void;
  updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void;
  deleteSavingsGoal: (id: string) => void;
  addSavingsAmount: (id: string, amount: number) => void;
  // Thresholds
  updateThreshold: (id: string, updates: Partial<Threshold>) => void;
  // Reset
  resetData: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(loadData);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const update = useCallback((fn: (d: AppData) => AppData) => {
    setData(prev => fn({ ...prev }));
  }, []);

  // Income
  const addIncome = useCallback((income: Omit<Income, 'id' | 'createdAt'>) => {
    update(d => ({ ...d, incomes: [...d.incomes, { ...income, id: generateId(), createdAt: new Date().toISOString() }] }));
  }, [update]);
  const updateIncome = useCallback((id: string, updates: Partial<Income>) => {
    update(d => ({ ...d, incomes: d.incomes.map(i => i.id === id ? { ...i, ...updates } : i) }));
  }, [update]);
  const deleteIncome = useCallback((id: string) => {
    update(d => ({ ...d, incomes: d.incomes.filter(i => i.id !== id) }));
  }, [update]);

  // Categories
  const addCategory = useCallback((cat: Omit<Category, 'id'>) => {
    update(d => ({ ...d, categories: [...d.categories, { ...cat, id: generateId() }] }));
  }, [update]);
  const deleteCategory = useCallback((id: string) => {
    update(d => ({ ...d, categories: d.categories.filter(c => c.id !== id) }));
  }, [update]);

  // Fixed expenses
  const addFixedExpense = useCallback((exp: Omit<FixedExpense, 'id' | 'createdAt'>) => {
    update(d => ({ ...d, fixedExpenses: [...d.fixedExpenses, { ...exp, id: generateId(), createdAt: new Date().toISOString() }] }));
  }, [update]);
  const updateFixedExpense = useCallback((id: string, updates: Partial<FixedExpense>) => {
    update(d => ({ ...d, fixedExpenses: d.fixedExpenses.map(e => e.id === id ? { ...e, ...updates } : e) }));
  }, [update]);
  const deleteFixedExpense = useCallback((id: string) => {
    update(d => ({ ...d, fixedExpenses: d.fixedExpenses.filter(e => e.id !== id) }));
  }, [update]);
  const toggleFixedPaid = useCallback((id: string) => {
    update(d => ({ ...d, fixedExpenses: d.fixedExpenses.map(e => e.id === id ? { ...e, paid: !e.paid } : e) }));
  }, [update]);

  // Variable expenses
  const addVariableExpense = useCallback((exp: Omit<VariableExpense, 'id' | 'createdAt'>) => {
    update(d => ({ ...d, variableExpenses: [...d.variableExpenses, { ...exp, id: generateId(), createdAt: new Date().toISOString() }] }));
  }, [update]);
  const deleteVariableExpense = useCallback((id: string) => {
    update(d => ({ ...d, variableExpenses: d.variableExpenses.filter(e => e.id !== id) }));
  }, [update]);

  // Savings goals
  const addSavingsGoal = useCallback((goal: Omit<SavingsGoal, 'id' | 'createdAt'>) => {
    update(d => ({ ...d, savingsGoals: [...d.savingsGoals, { ...goal, id: generateId(), createdAt: new Date().toISOString() }] }));
  }, [update]);
  const updateSavingsGoal = useCallback((id: string, updates: Partial<SavingsGoal>) => {
    update(d => ({ ...d, savingsGoals: d.savingsGoals.map(g => g.id === id ? { ...g, ...updates } : g) }));
  }, [update]);
  const deleteSavingsGoal = useCallback((id: string) => {
    update(d => ({ ...d, savingsGoals: d.savingsGoals.filter(g => g.id !== id) }));
  }, [update]);
  const addSavingsAmount = useCallback((id: string, amount: number) => {
    update(d => ({ ...d, savingsGoals: d.savingsGoals.map(g => g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g) }));
  }, [update]);

  // Thresholds
  const updateThreshold = useCallback((id: string, updates: Partial<Threshold>) => {
    update(d => ({ ...d, thresholds: d.thresholds.map(t => t.id === id ? { ...t, ...updates } : t) }));
  }, [update]);

  const resetData = useCallback(() => {
    setData(createDefaultData());
  }, []);

  return (
    <StoreContext.Provider value={{
      data, addIncome, updateIncome, deleteIncome,
      addCategory, deleteCategory,
      addFixedExpense, updateFixedExpense, deleteFixedExpense, toggleFixedPaid,
      addVariableExpense, deleteVariableExpense,
      addSavingsGoal, updateSavingsGoal, deleteSavingsGoal, addSavingsAmount,
      updateThreshold, resetData,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}