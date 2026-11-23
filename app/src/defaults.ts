import type { Category } from './types';

export const defaultCategories: Omit<Category, 'id'>[] = [
  // Charges fixes
  { name: 'Logement', type: 'fixed', color: '#3b82f6', icon: '🏠', monthlyBudget: 0, isDefault: true },
  { name: 'Énergie', type: 'fixed', color: '#f59e0b', icon: '⚡', monthlyBudget: 0, isDefault: true },
  { name: 'Télécom', type: 'fixed', color: '#8b5cf6', icon: '📱', monthlyBudget: 0, isDefault: true },
  { name: 'Assurances', type: 'fixed', color: '#06b6d4', icon: '🛡️', monthlyBudget: 0, isDefault: true },
  { name: 'Crédits', type: 'fixed', color: '#ef4444', icon: '💳', monthlyBudget: 0, isDefault: true },
  { name: 'Abonnements', type: 'fixed', color: '#ec4899', icon: '📺', monthlyBudget: 0, isDefault: true },
  { name: 'Impôts / taxes', type: 'fixed', color: '#6b7280', icon: '📋', monthlyBudget: 0, isDefault: true },
  { name: 'Garde / scolarité', type: 'fixed', color: '#14b8a6', icon: '🎓', monthlyBudget: 0, isDefault: true },
  // Dépenses variables
  { name: 'Alimentation', type: 'variable', color: '#22c55e', icon: '🛒', monthlyBudget: 0, isDefault: true },
  { name: 'Transport', type: 'variable', color: '#3b82f6', icon: '🚗', monthlyBudget: 0, isDefault: true },
  { name: 'Santé', type: 'variable', color: '#ef4444', icon: '💊', monthlyBudget: 0, isDefault: true },
  { name: 'Hygiène / soins', type: 'variable', color: '#ec4899', icon: '🧴', monthlyBudget: 0, isDefault: true },
  { name: 'Vêtements', type: 'variable', color: '#8b5cf6', icon: '👕', monthlyBudget: 0, isDefault: true },
  { name: 'Loisirs / sorties', type: 'variable', color: '#f59e0b', icon: '🎉', monthlyBudget: 0, isDefault: true },
  { name: 'Éducation', type: 'variable', color: '#06b6d4', icon: '📚', monthlyBudget: 0, isDefault: true },
  { name: 'Imprévus / autres', type: 'variable', color: '#6b7280', icon: '📦', monthlyBudget: 0, isDefault: true },
];

export const variableCategoryNames = defaultCategories.filter(c => c.type === 'variable').map(c => c.name);
export const fixedCategoryNames = defaultCategories.filter(c => c.type === 'fixed').map(c => c.name);