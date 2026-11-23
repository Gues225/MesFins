import { useState } from 'react';
import { StoreProvider, useStore } from './store';
import { computeSummary, getAlerts } from './utils';
import Dashboard from './components/Dashboard';
import IncomeView from './components/IncomeView';
import FixedExpensesView from './components/FixedExpensesView';
import VariableExpensesView from './components/VariableExpensesView';
import SavingsView from './components/SavingsView';
import SettingsView from './components/SettingsView';

type Tab = 'dashboard' | 'income' | 'fixed' | 'variable' | 'savings' | 'settings';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
  { id: 'income', label: 'Revenus', icon: '💰' },
  { id: 'fixed', label: 'Charges fixes', icon: '🏠' },
  { id: 'variable', label: 'Dépenses', icon: '🛒' },
  { id: 'savings', label: 'Épargne', icon: '🎯' },
  { id: 'settings', label: 'Paramètres', icon: '⚙️' },
];

function AppShell() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const { data } = useStore();
  const summary = computeSummary(data);
  const alerts = getAlerts(data, summary);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-brand text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💸</span>
            <div>
              <h1 className="text-xl font-bold">MesFins</h1>
              <p className="text-xs text-blue-200">Gestion mensuelle de vos finances</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-200">Reste à vivre</p>
            <p className={`text-lg font-bold ${summary.leftover >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {new Intl.NumberFormat('fr-FR').format(summary.leftover)} FCFA
            </p>
          </div>
        </div>
      </header>

      {/* Alerts banner */}
      {alerts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mt-3">
          {alerts.slice(0, 3).map(a => (
            <div key={a.id} className={`mb-2 px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
              a.level === 'red' ? 'bg-red-100 text-red-800 border border-red-300' :
              a.level === 'orange' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
              'bg-green-100 text-green-800 border border-green-300'
            }`}>
              <span>{a.level === 'red' ? '🔴' : a.level === 'orange' ? '🟠' : '🟢'}</span>
              <span>{a.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Nav tabs */}
      <nav className="max-w-6xl mx-auto px-4 mt-4">
        <div className="flex gap-1 bg-white rounded-xl shadow-sm p-1 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.id
                  ? 'bg-brand text-white shadow'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab === 'dashboard' && <Dashboard />}
        {tab === 'income' && <IncomeView />}
        {tab === 'fixed' && <FixedExpensesView />}
        {tab === 'variable' && <VariableExpensesView />}
        {tab === 'savings' && <SavingsView />}
        {tab === 'settings' && <SettingsView />}
      </main>

      <footer className="text-center text-xs text-gray-400 py-6">
        MesFins v0.1 — Données stockées localement sur votre appareil
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}