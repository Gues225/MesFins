import { useState } from 'react';
import { useStore } from '../store';
import { formatFCFA } from '../utils';

export default function IncomeView() {
  const { data, addIncome, deleteIncome } = useStore();
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [recurrence, setRecurrence] = useState<'monthly' | 'one-off'>('monthly');

  const totalIncome = data.incomes.filter(i => i.active).reduce((s, i) => s + i.amount, 0);

  const handleAdd = () => {
    if (!label.trim() || !amount) return;
    addIncome({ label: label.trim(), amount: parseInt(amount, 10), recurrence, active: true });
    setLabel('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Revenus</h2>

      {/* Add income form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Ajouter un revenu</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Libellé (ex: Salaire)"
            value={label}
            onChange={e => setLabel(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
          <input
            type="number"
            placeholder="Montant (FCFA)"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
          <select
            value={recurrence}
            onChange={e => setRecurrence(e.target.value as 'monthly' | 'one-off')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          >
            <option value="monthly">Mensuel</option>
            <option value="one-off">Ponctuel</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-light transition-colors"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Income list */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Mes revenus</h3>
          <span className="text-lg font-bold text-blue-600">{formatFCFA(totalIncome)}</span>
        </div>
        {data.incomes.length === 0 ? (
          <p className="text-gray-400 text-sm">Aucun revenu enregistré. Ajoutez votre salaire pour commencer.</p>
        ) : (
          <div className="space-y-2">
            {data.incomes.map(inc => (
              <div key={inc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg">💰</span>
                  <div>
                    <p className="font-medium text-sm">{inc.label}</p>
                    <p className="text-xs text-gray-400">{inc.recurrence === 'monthly' ? 'Mensuel' : 'Ponctuel'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm">{formatFCFA(inc.amount)}</span>
                  <button
                    onClick={() => deleteIncome(inc.id)}
                    className="text-red-400 hover:text-red-600 text-sm"
                    title="Supprimer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}