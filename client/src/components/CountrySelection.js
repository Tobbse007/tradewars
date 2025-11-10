import React from 'react';

function CountrySelection({ countries, onSelect }) {
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

  return (
    <div className="container">
      <div className="header">
        <h1>🌍 Wähle dein Land</h1>
        <p>Jedes Land hat unterschiedliche Stärken und Herausforderungen</p>
      </div>

      <div className="countries-grid">
        {Object.entries(countries).map(([id, country]) => (
          <div 
            key={id}
            className="country-card"
            onClick={() => onSelect(id)}
          >
            <h3>{getFlag(id)} {country.name}</h3>
            <div className="country-stats">
              <div><strong>BIP:</strong> ${country.gdp} Mrd.</div>
              <div><strong>Bevölkerung:</strong> {country.population} Mio.</div>
              <div><strong>Arbeitslosigkeit:</strong> {country.unemployment}%</div>
              <div><strong>Handelsbilanz:</strong> ${country.tradeSurplus > 0 ? '+' : ''}{country.tradeSurplus} Mrd.</div>
              <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#666' }}>
                <strong>Ressourcen:</strong> {country.resources.join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountrySelection;
