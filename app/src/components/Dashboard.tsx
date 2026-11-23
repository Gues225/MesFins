import { useStore } from '../store';
import { computeSummary, getAlerts, expensesByCategory, healthLevel, formatFCFA } from '../utils';

export default function Dashboard() {
  const { data } = useStore();
  const summary = computeSummary(data);
  const alerts = getAlerts(data, summary);
  const varByCat = expensesByCategory(data, 'variable');
  const fixedByCat = expensesByCategory(data, 'fixed');

  const savingsRateLevel = healthLevel(summary.savingsRate, 20, 10, true);
  const fixedRatioLevel = healthLevel(summary.fixedRatio, 50, 70, false);
  const variableRatioLevel = healthLevel(summary.variableRatio, 30, 40, false);

  const levelColor = (l: string) =>
    l === 'green' ? 'text-green-600' : l === 'orange' ? 'text-amber-600' : 'text-red-600';
  const levelBg = (l: string) =>
    l === 'green' ? 'bg-green-50 border-green-200' : l === 'orange' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Tableau de bord — {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</h2>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Revenu net" value={summary.incomeTotal} color="text-blue-600" bg="bg-blue-50" icon="💰" />
        <KpiCard label="Charges fixes" value={summary.fixedTotal} color="text-orange-600" bg="bg-orange-50" icon="🏠" sub={`${summary.fixedRatio.toFixed(0)} % du revenu`} />
        <KpiCard label="Dépenses variables" value={summary.variableTotal} color="text-purple-600" bg="bg-purple-50" icon="🛒" sub={`${summary.variableRatio.toFixed(0)} % du revenu`} />
        <KpiCard label="Reste à vivre" value={summary.leftover} color={summary.leftover >= 0 ? 'text-green-600' : 'text-red-600'} bg={summary.leftover >= 0 ? 'bg-green-50' : 'bg-red-50'} icon="🎯" />
      </div>

      {/* Health indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HealthCard
          label="Taux d'épargne"
          value={`${summary.savingsRate.toFixed(1)} %`}
          target="Objectif : 20 %"
          level={savingsRateLevel}
          levelColor={levelColor}
          levelBg={levelBg}
        />
        <HealthCard
          label="Charges fixes / revenu"
          value={`${summary.fixedRatio.toFixed(1)} %`}
          target="Max recommandé : 50 %"
          level={fixedRatioLevel}
          levelColor={levelColor}
          levelBg={levelBg}
        />
        <HealthCard
          label="Dépenses variables / revenu"
          value={`${summary.variableRatio.toFixed(1)} %`}
          target="Max recommandé : 30 %"
          level={variableRatioLevel}
          levelColor={levelColor}
          levelBg={levelBg}
        />
      </div>

      {/* Reste à vivre gauge */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-3">Reste à vivre</h3>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${summary.leftover >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: `${Math.min(100, Math.max(0, (summary.leftover / (summary.incomeTotal || 1)) * 100))}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 FCFA</span>
          <span>{formatFCFA(summary.incomeTotal)}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {summary.leftover >= 0
            ? `Vous avez ${formatFCFA(summary.leftover)} de reste à vivre ce mois.`
            : `⚠️ Déficit de ${formatFCFA(Math.abs(summary.leftover))} ce mois.`}
        </p>
      </div>

      {/* Expenses by category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryBreakdown title="Dépenses variables par catégorie" items={varByCat} total={summary.variableTotal} />
        <CategoryBreakdown title="Charges fixes par catégorie" items={fixedByCat} total={summary.fixedTotal} />
      </div>

      {/* Savings goals progress */}
      {data.savingsGoals.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Projets d'épargne</h3>
          <div className="space-y-4">
            {data.savingsGoals.map(g => {
              const pct = g.targetAmount > 0 ? Math.min(100, (g.currentAmount / g.targetAmount) * 100) : 0;
              return (
                <div key={g.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{g.name}</span>
                    <span className="text-gray-500">{formatFCFA(g.currentAmount)} / {formatFCFA(g.targetAmount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: g.color }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{pct.toFixed(0)} % — échéance {new Date(g.targetDate).toLocaleDateString('fr-FR')}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-3">Alertes</h3>
          <div className="space-y-2">
            {alerts.map(a => (
              <div key={a.id} className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                a.level === 'red' ? 'bg-red-50 text-red-700' : a.level === 'orange' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
              }`}>
                <span>{a.level === 'red' ? '🔴' : a.level === 'orange' ? '🟠' : '🟢'}</span>
                <span>{a.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function KpiCard({ label, value, color, bg, icon, sub }: { label: string; value: number; color: string; bg: string; icon: string; sub?: string }) {
  return (
    <div className={`${bg} rounded-xl p-4 shadow-sm`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="text-xs text-gray-500 font-medium">{label}</span>
      </div>
      <p className={`text-xl font-bold ${color}`}>{new Intl.NumberFormat('fr-FR').format(value)} FCFA</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function HealthCard({ label, value, target, level, levelColor, levelBg }: {
  label: string; value: string; target: string; level: string;
  levelColor: (l: string) => string; levelBg: (l: string) => string;
}) {
  return (
    <div className={`rounded-xl p-4 border ${levelBg(level)}`}>
      <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
      <p className={`text-2xl font-bold ${levelColor(level)}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-1">{target}</p>
    </div>
  );
}

function CategoryBreakdown({ title, items, total }: { title: string; items: { name: string; amount: number; color: string; icon: string }[]; total: number }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-gray-400 text-sm">Aucune dépense enregistrée</p>
      ) : (
        <div className="space-y-3">
          {items.map(item => {
            const pct = total > 0 ? (item.amount / total) * 100 : 0;
            return (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </span>
                  <span className="text-gray-500">{formatFCFA(item.amount)} ({pct.toFixed(0)} %)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}