import React, { useState } from 'react';

function TradePanel({ gameId, gameState, onTrade }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tradeType, setTradeType] = useState('export');

  const getFlag = (countryId) => {
    const flags = {
      'Germany': '🇩🇪',
      'USA': '🇺🇸',
      'China': '🇨🇳',
      'Japan': '🇯🇵',
      'UK': '🇬🇧',
      'France': '🇫🇷'
    };
    return flags[countryId] || '🏳️';
  };

  const handleTrade = async () => {
    if (!selectedCountry) return;

    try {
      const response = await fetch(`/api/game/${gameId}/trade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countryId: selectedCountry, type: tradeType })
      });

      if (response.ok) {
        const data = await response.json();
        onTrade(data.game);
        alert(data.message);
        setSelectedCountry(null);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (err) {
      console.error('Error creating trade:', err);
    }
  };

  return (
    <div className="card-apple">
      <h3 className="text-2xl font-semibold text-apple-gray-900 mb-6 tracking-tight">
        🚢 Internationaler Handel
      </h3>

      <div className="mb-6">
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setTradeType('export')}
            className={`flex-1 py-3 px-4 rounded-apple-sm font-medium transition-all ${
              tradeType === 'export'
                ? 'bg-apple-blue text-white'
                : 'bg-apple-gray-50 text-apple-gray-400 hover:bg-apple-gray-100'
            }`}
          >
            📤 Export
          </button>
          <button
            onClick={() => setTradeType('import')}
            className={`flex-1 py-3 px-4 rounded-apple-sm font-medium transition-all ${
              tradeType === 'import'
                ? 'bg-apple-blue text-white'
                : 'bg-apple-gray-50 text-apple-gray-400 hover:bg-apple-gray-100'
            }`}
          >
            📥 Import
          </button>
        </div>

        <p className="text-sm text-apple-gray-400 mb-4">
          {tradeType === 'export'
            ? 'Exportiere Waren und steigere dein BIP durch Handelsüberschuss'
            : 'Importiere Waren für günstigen Konsum und Industriebedarf'}
        </p>
      </div>

      <div className="space-y-3">
        {gameState.aiCountries.map((country) => {
          const canTrade = country.relationship >= 40;
          const isSelected = selectedCountry === country.id;

          return (
            <div
              key={country.id}
              className={`p-4 rounded-apple-sm border transition-all cursor-pointer ${
                isSelected
                  ? 'border-apple-blue bg-apple-blue/5'
                  : canTrade
                  ? 'border-apple-gray-200 hover:border-apple-blue bg-white'
                  : 'border-apple-gray-200 bg-apple-gray-50 opacity-50 cursor-not-allowed'
              }`}
              onClick={() => canTrade && setSelectedCountry(country.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getFlag(country.id)}</span>
                  <div>
                    <h4 className="font-semibold text-apple-gray-900">{country.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-apple-gray-400">
                        Beziehung: {Math.round(country.relationship)}%
                      </span>
                      <div className="w-20 h-2 bg-apple-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            country.relationship >= 70
                              ? 'bg-apple-green'
                              : country.relationship >= 40
                              ? 'bg-apple-orange'
                              : 'bg-apple-red'
                          }`}
                          style={{ width: `${country.relationship}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {!canTrade && <span className="text-2xl">🔒</span>}
              </div>
            </div>
          );
        })}
      </div>

      {selectedCountry && (
        <button onClick={handleTrade} className="btn-apple w-full mt-6">
          Handelsabkommen schließen
        </button>
      )}

      {gameState.tradeAgreements && gameState.tradeAgreements.length > 0 && (
        <div className="mt-6 pt-6 border-t border-apple-gray-200">
          <h4 className="font-semibold text-apple-gray-900 mb-3">Aktive Abkommen</h4>
          <div className="space-y-2">
            {gameState.tradeAgreements.slice(-5).map((agreement, idx) => {
              const partner = gameState.aiCountries.find(c => c.id === agreement.partner);
              return (
                <div key={idx} className="text-sm text-apple-gray-400 flex justify-between">
                  <span>{getFlag(agreement.partner)} {partner?.name}</span>
                  <span className="font-medium">${agreement.value} Mrd.</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TradePanel;
