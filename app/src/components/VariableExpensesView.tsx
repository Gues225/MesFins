import { useState } from 'react';
import { useStore } from '../store';
import { formatFCFA, categoryName, categoryIcon } from '../utils';

export default function VariableExpensesView() {
  const { data, addVariableExpense, deleteVariableExpense } = useStore();
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const varCats = data.categories.filter(c => c.type === 'variable');
  const now = new Date();
  const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const monthExpenses = data.variableExpenses.filter(e => e.date.startsWith(prefix));
  const total = monthExpenses.reduce((s, e) => s + e.amount, 0);

  const handleAdd = () => {
    if (!amount || !categoryId) return;
    addVariableExpense({
      categoryId,
      amount: parseInt(amount, 10),
      date,
      note: note.trim(),
    });
    setAmount('');
    setNote('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dépenses variables</h2>

      {/* Quick add form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Saisie rapide</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          >
            <option value="">Catégorie</option>
            {varCats.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Montant (FCFA)"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
          <input
            type="text"
            placeholder="Note (optionnel)"
            value={note}
            onChange={e => setNote(e.target.value)}
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

      {/* Monthly total */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Dépenses du mois</h3>
          <span className="text-lg font-bold text-purple-600">{formatFCFA(total)}</span>
        </div>
        {monthExpenses.length === 0 ? (
          <p className="text-gray-400 text-sm">Aucune dépense ce mois. Commencez à saisir !</p>
        ) : (
          <div className="space-y-2">
            {monthExpenses
              .sort((a, b) => b.date.localeCompare(a.date))
              .map(exp => (
                <div key={exp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{categoryIcon(data, exp.categoryId)}</span>
                    <div>
                      <p className="font-medium text-sm">{categoryName(data, exp.categoryId)}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(exp.date).toLocaleDateString('fr-FR')} {exp.note && `· ${exp.note}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm">{formatFCFA(exp.amount)}</span>
                    <button
                      onClick={() => deleteVariableExpense(exp.id)}
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