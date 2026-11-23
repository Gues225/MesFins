import { useStore } from '../store';

export default function SettingsView() {
  const { data, updateThreshold, resetData } = useStore();

  const handleReset = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes les données ? Cette action est irréversible.')) {
      resetData();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Paramètres</h2>

      {/* Thresholds */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Seuils et alertes</h3>
        <div className="space-y-4">
          {data.thresholds.map(t => (
            <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">
                  {t.type === 'min_balance' && 'Seuil minimum de compte courant (FCFA)'}
                  {t.type === 'max_expense_pct' && 'Seuil dépenses variables (% du revenu)'}
                  {t.type === 'min_savings_rate' && 'Taux d\'épargne minimum (%)'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={t.value}
                  onChange={e => updateThreshold(t.id, { value: parseInt(e.target.value, 10) || 0 })}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm w-24 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
                />
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={t.enabled}
                    onChange={e => updateThreshold(t.id, { enabled: e.target.checked })}
                    className="rounded"
                  />
                  Actif
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data management */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Gestion des données</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">Exporter les données</p>
              <p className="text-xs text-gray-400">Télécharger un fichier JSON de toutes vos données</p>
            </div>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `mesfins-backup-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Exporter
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div>
              <p className="font-medium text-sm text-red-700">Réinitialiser toutes les données</p>
              <p className="text-xs text-red-400">Cette action est irréversible</p>
            </div>
            <button
              onClick={handleReset}
              className="bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-2">À propos</h3>
        <p className="text-sm text-gray-600">
          MesFins v0.1 — Application de gestion financière personnelle.
          Données stockées localement sur votre appareil (localStorage).
          Aucune donnée n'est envoyée sur internet.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Devise : {data.currency} · Créé le {new Date(data.createdAt).toLocaleDateString('fr-FR')}
        </p>
      </div>
    </div>
  );
}