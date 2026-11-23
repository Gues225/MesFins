import { useState } from 'react';
import { useStore } from '../store';
import { formatFCFA } from '../utils';

export default function SavingsView() {
  const { data, addSavingsGoal, deleteSavingsGoal, addSavingsAmount } = useStore();
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [date, setDate] = useState('');
  const [color, setColor] = useState('#3b82f6');
  const [addAmount, setAddAmount] = useState<Record<string, string>>({});

  const totalSaved = data.savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
  const totalTarget = data.savingsGoals.reduce((s, g) => s + g.targetAmount, 0);

  const handleAdd = () => {
    if (!name.trim() || !target || !date) return;
    addSavingsGoal({
      name: name.trim(),
      targetAmount: parseInt(target, 10),
      targetDate: date,
      currentAmount: 0,
      color,
    });
    setName('');
    setTarget('');
    setDate('');
  };

  const handleAddAmount = (id: string) => {
    const amt = parseInt(addAmount[id] || '0', 10);
    if (amt > 0) {
      addSavingsAmount(id, amt);
      setAddAmount(prev => ({ ...prev, [id]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Épargne et projets</h2>

      {/* Add goal */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Nouveau projet d'épargne</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            type="text"
            placeholder="Nom (ex: Vacances)"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
          <input
            type="number"
            placeholder="Montant cible (FCFA)"
            value={target}
            onChange={e => setTarget(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm h-10"
          />
          <button
            onClick={handleAdd}
            className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-light transition-colors"
          >
            Créer
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Mes projets</h3>
          <span className="text-sm text-gray-500">
            {formatFCFA(totalSaved)} / {formatFCFA(totalTarget)}
          </span>
        </div>
        {data.savingsGoals.length === 0 ? (
          <p className="text-gray-400 text-sm">Aucun projet. Créez-en un (vacances, voyage, achat…)</p>
        ) : (
          <div className="space-y-4">
            {data.savingsGoals.map(g => {
              const pct = g.targetAmount > 0 ? Math.min(100, (g.currentAmount / g.targetAmount) * 100) : 0;
              const remaining = g.targetAmount - g.currentAmount;
              const monthsLeft = Math.max(1, Math.ceil((new Date(g.targetDate).getTime() - Date.now()) / (30 * 24 * 60 * 60 * 1000)));
              const monthlyNeeded = Math.ceil(remaining / monthsLeft);
              return (
                <div key={g.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{g.name}</p>
                      <p className="text-xs text-gray-400">
                        Échéance : {new Date(g.targetDate).toLocaleDateString('fr-FR')} · {monthsLeft} mois restants
                      </p>
                    </div>
                    <button
                      onClick={() => deleteSavingsGoal(g.id)}
                      className="text-red-400 hover:text-red-600 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: g.color }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <span>{pct.toFixed(0)} %</span>
                    <span>{formatFCFA(g.currentAmount)} / {formatFCFA(g.targetAmount)}</span>
                  </div>
                  {remaining > 0 && (
                    <p className="text-xs text-gray-400 mb-2">
                      Il reste {formatFCFA(remaining)} à épargner → {formatFCFA(monthlyNeeded)} / mois
                    </p>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Montant à ajouter"
                      value={addAmount[g.id] || ''}
                      onChange={e => setAddAmount(prev => ({ ...prev, [g.id]: e.target.value }))}
                      className="border border-gray-300 rounded-lg px-3 py-1 text-sm flex-1 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
                    />
                    <button
                      onClick={() => handleAddAmount(g.id)}
                      className="bg-green-600 text-white rounded-lg px-3 py-1 text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      + Épargner
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Emergency fund info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">🛡️ Fonds d'urgence</h3>
        <p className="text-sm text-blue-700">
          Objectif recommandé : 3 à 6 mois de charges fixes.
          {data.fixedExpenses.length > 0 && (
            <> Vos charges fixes sont de <strong>{formatFCFA(data.fixedExpenses.reduce((s, e) => s + e.amount, 0))}</strong> / mois,
            soit un fonds d'urgence cible de <strong>{formatFCFA(data.fixedExpenses.reduce((s, e) => s + e.amount, 0) * 3)}</strong> (3 mois)
            à <strong>{formatFCFA(data.fixedExpenses.reduce((s, e) => s + e.amount, 0) * 6)}</strong> (6 mois).</>
          )}
        </p>
      </div>
    </div>
  );
}