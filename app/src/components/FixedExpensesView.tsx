import { useState } from 'react';
import { useStore } from '../store';
import { formatFCFA, categoryName, categoryIcon } from '../utils';

export default function FixedExpensesView() {
  const { data, addFixedExpense, deleteFixedExpense, toggleFixedPaid } = useStore();
  const [categoryId, setCategoryId] = useState('');
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [dayOfMonth, setDayOfMonth] = useState('1');

  const fixedCats = data.categories.filter(c => c.type === 'fixed');
  const total = data.fixedExpenses.reduce((s, e) => s + e.amount, 0);

  const handleAdd = () => {
    if (!label.trim() || !amount || !categoryId) return;
    addFixedExpense({
      categoryId,
      label: label.trim(),
      amount: parseInt(amount, 10),
      dayOfMonth: parseInt(dayOfMonth, 10),
      recurrence: 'monthly',
      paid: false,
    });
    setLabel('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Charges fixes</h2>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Ajouter une charge fixe</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          >
            <option value="">Catégorie</option>
            {fixedCats.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Libellé (ex: Loyer)"
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
          <input
            type="number"
            placeholder="Jour (1-31)"
            value={dayOfMonth}
            onChange={e => setDayOfMonth(e.target.value)}
            min={1} max={31}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
          <button
            onClick={handleAdd}
            className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-light transition-colors"
          >
            Ajouter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Mes charges fixes</h3>
          <span className="text-lg font-bold text-orange-600">{formatFCFA(total)} / mois</span>
        </div>
        {data.fixedExpenses.length === 0 ? (
          <p className="text-gray-400 text-sm">Aucune charge fixe. Ajoutez votre loyer, factures, abonnements…</p>
        ) : (
          <div className="space-y-2">
            {data.fixedExpenses.map(exp => (
              <div key={exp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{categoryIcon(data, exp.categoryId)}</span>
                  <div>
                    <p className="font-medium text-sm">{exp.label}</p>
                    <p className="text-xs text-gray-400">
                      {categoryName(data, exp.categoryId)} · prélevé le {exp.dayOfMonth}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFixedPaid(exp.id)}
                    className={`text-xs px-2 py-1 rounded ${exp.paid ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
                  >
                    {exp.paid ? '✓ Payé' : 'À payer'}
                  </button>
                  <span className="font-bold text-sm">{formatFCFA(exp.amount)}</span>
                  <button
                    onClick={() => deleteFixedExpense(exp.id)}
                    className="text-red-400 hover:text-red-600 text-sm"
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