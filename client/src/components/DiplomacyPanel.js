import React, { useState } from 'react';

function DiplomacyPanel({ gameId, gameState, onDiplomacy }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  const handleDiplomacy = async (action) => {
    if (!selectedCountry) return;

    try {
      const response = await fetch(`/api/game/${gameId}/diplomacy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countryId: selectedCountry, action })
      });

      if (response.ok) {
        const data = await response.json();
        onDiplomacy(data.game);
        alert(data.message);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (err) {
      console.error('Error with diplomacy:', err);
    }
  };

  const selectedCountryData = gameState.aiCountries.find(c => c.id === selectedCountry);

  return (
    <div className="card-apple">
      <h3 className="text-2xl font-semibold text-apple-gray-900 mb-6 tracking-tight">
        🤝 Diplomatie
      </h3>

      <div className="space-y-3 mb-6">
        {gameState.aiCountries.map((country) => {
          const isSelected = selectedCountry === country.id;
          const relationshipColor =
            country.relationship >= 70
              ? 'text-apple-green'
              : country.relationship >= 40
              ? 'text-apple-orange'
              : 'text-apple-red';

          return (
            <div
              key={country.id}
              className={`p-5 rounded-apple-sm border transition-all cursor-pointer ${
                isSelected
                  ? 'border-apple-blue bg-apple-blue/5'
                  : 'border-apple-gray-200 hover:border-apple-blue bg-white'
              }`}
              onClick={() => setSelectedCountry(country.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getFlag(country.id)}</span>
                  <h4 className="font-semibold text-apple-gray-900">{country.name}</h4>
                </div>
                <span className={`text-2xl font-bold ${relationshipColor}`}>
                  {Math.round(country.relationship)}%
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-apple-gray-400">
                  <span>BIP:</span>
                  <span className="font-medium">${Math.round(country.gdp)} Mrd.</span>
                </div>
                <div className="flex justify-between text-apple-gray-400">
                  <span>Zollsatz:</span>
                  <span className="font-medium">{country.tariffRate}%</span>
                </div>
                
                <div className="mt-3">
                  <div className="h-3 bg-apple-gray-200 rounded-full overflow-hidden">
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
                  <p className="text-xs text-apple-gray-400 mt-1">
                    {country.relationship >= 70
                      ? 'Ausgezeichnete Beziehungen'
                      : country.relationship >= 40
                      ? 'Neutrale Beziehungen'
                      : 'Angespannte Beziehungen'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCountryData && (
        <div className="space-y-3 pt-6 border-t border-apple-gray-200">
          <h4 className="font-semibold text-apple-gray-900 mb-4">
            Diplomatische Aktionen mit {selectedCountryData.name}
          </h4>
          
          <button
            onClick={() => handleDiplomacy('improve')}
            className="w-full py-3 px-4 bg-apple-green text-white rounded-apple-sm font-medium hover:bg-apple-green/90 transition-all"
          >
            🤝 Beziehungen verbessern (-$20 Mrd.)
          </button>
          
          <button
            onClick={() => handleDiplomacy('gift')}
            className="w-full py-3 px-4 bg-apple-blue text-white rounded-apple-sm font-medium hover:bg-apple-blue-dark transition-all"
          >
            🎁 Entwicklungshilfe senden (-$50 Mrd.)
          </button>
          
          <button
            onClick={() => handleDiplomacy('sanction')}
            className="w-full py-3 px-4 bg-apple-red text-white rounded-apple-sm font-medium hover:bg-apple-red/90 transition-all"
          >
            ⚠️ Sanktionen verhängen
          </button>
        </div>
      )}
    </div>
  );
}

export default DiplomacyPanel;
