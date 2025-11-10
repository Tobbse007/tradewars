import React, { useState } from 'react';

function GamePlay({ gameState, onDecisionMade }) {
  const [tariffChange, setTariffChange] = useState(0);
  const [taxChange, setTaxChange] = useState(0);
  const [infrastructure, setInfrastructure] = useState(0);
  const [subsidies, setSubsidies] = useState(0);

  const handleSubmit = () => {
    onDecisionMade({
      tariffChange,
      taxChange,
      infrastructure,
      subsidies
    });
  };

  const newTariff = Math.max(0, Math.min(50, gameState.playerCountry.tariffRate + tariffChange));
  const newTax = Math.max(0, Math.min(60, gameState.playerCountry.taxRate + taxChange));

  return (
    <div className="container">
      <div className="header">
        <h1>⚙️ Runde {gameState.round} - Entscheidungen treffen</h1>
        <p>{gameState.playerCountry.name} | BIP: ${Math.round(gameState.playerCountry.gdp)} Mrd.</p>
      </div>

      <div className="card">
        <h3>💼 Wirtschaftspolitische Maßnahmen</h3>
        
        <div className="slider-group">
          <label>
            Zollsatz ändern: 
            <span className="slider-value">
              {tariffChange > 0 ? '+' : ''}{tariffChange}% 
              (Aktuell: {gameState.playerCountry.tariffRate}% → Neu: {newTariff}%)
            </span>
          </label>
          <input
            type="range"
            min="-10"
            max="10"
            value={tariffChange}
            onChange={(e) => setTariffChange(Number(e.target.value))}
          />
          <div style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
            Höhere Zölle schützen heimische Industrie, können aber Handelspartner verärgern.
          </div>
        </div>

        <div className="slider-group">
          <label>
            Steuersatz ändern: 
            <span className="slider-value">
              {taxChange > 0 ? '+' : ''}{taxChange}% 
              (Aktuell: {gameState.playerCountry.taxRate}% → Neu: {newTax}%)
            </span>
          </label>
          <input
            type="range"
            min="-10"
            max="10"
            value={taxChange}
            onChange={(e) => setTaxChange(Number(e.target.value))}
          />
          <div style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
            Niedrigere Steuern stimulieren Wirtschaft, reduzieren aber Staatseinnahmen.
          </div>
        </div>

        <div className="slider-group">
          <label>
            Infrastruktur-Investition: 
            <span className="slider-value">{infrastructure}</span>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={infrastructure}
            onChange={(e) => setInfrastructure(Number(e.target.value))}
          />
          <div style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
            Investitionen in Straßen, Bildung und Technologie fördern langfristiges Wachstum.
          </div>
        </div>

        <div className="slider-group">
          <label>
            Subventionen: 
            <span className="slider-value">{subsidies}</span>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={subsidies}
            onChange={(e) => setSubsidies(Number(e.target.value))}
          />
          <div style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
            Unterstütze Schlüsselindustrien und schaffe Arbeitsplätze.
          </div>
        </div>
      </div>

      <div className="card" style={{ background: '#e7f3ff' }}>
        <h3>📊 Vorschau deiner Politik</h3>
        <ul style={{ listStyle: 'none' }}>
          {tariffChange !== 0 && (
            <li>🛃 Zölle: {gameState.playerCountry.tariffRate}% → {newTariff}%</li>
          )}
          {taxChange !== 0 && (
            <li>💰 Steuern: {gameState.playerCountry.taxRate}% → {newTax}%</li>
          )}
          {infrastructure > 0 && (
            <li>🏗️ Infrastruktur-Investition: Level {infrastructure}</li>
          )}
          {subsidies > 0 && (
            <li>🏭 Subventionen: Level {subsidies}</li>
          )}
          {tariffChange === 0 && taxChange === 0 && infrastructure === 0 && subsidies === 0 && (
            <li style={{ color: '#666' }}>Keine Änderungen - Status Quo beibehalten</li>
          )}
        </ul>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button className="btn" onClick={handleSubmit} style={{ fontSize: '1.2em', padding: '20px 40px' }}>
          Entscheidungen umsetzen ✅
        </button>
      </div>
    </div>
  );
}

export default GamePlay;
