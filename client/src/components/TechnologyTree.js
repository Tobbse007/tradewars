import React, { useState, useEffect } from 'react';

function TechnologyTree({ gameId, gameState, onResearch }) {
  const [technologies, setTechnologies] = useState({});
  const [selectedTech, setSelectedTech] = useState(null);

  useEffect(() => {
    fetch('/api/technologies')
      .then(res => res.json())
      .then(data => setTechnologies(data))
      .catch(err => console.error('Error loading technologies:', err));
  }, []);

  const handleResearch = async (techId) => {
    try {
      const response = await fetch(`/api/game/${gameId}/research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ techId })
      });
      
      if (response.ok) {
        const data = await response.json();
        onResearch(data.game);
        alert(data.message);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (err) {
      console.error('Error researching technology:', err);
    }
  };

  const canResearch = (tech) => {
    if (gameState.technologies.includes(selectedTech)) return false;
    if (tech.requires && !gameState.technologies.includes(tech.requires)) return false;
    if (gameState.playerCountry.gdp < tech.cost) return false;
    return true;
  };

  return (
    <div className="card-apple">
      <h3 className="text-2xl font-semibold text-apple-gray-900 mb-6 tracking-tight">
        🔬 Technologiebaum
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(technologies).map(([techId, tech]) => {
          const isResearched = gameState.technologies.includes(techId);
          const canDo = canResearch(tech);
          const isLocked = tech.requires && !gameState.technologies.includes(tech.requires);
          
          return (
            <div
              key={techId}
              className={`p-5 rounded-apple-sm border transition-all duration-200 ${
                isResearched
                  ? 'bg-apple-green/10 border-apple-green'
                  : isLocked
                  ? 'bg-apple-gray-50 border-apple-gray-200 opacity-50'
                  : 'bg-white border-apple-gray-200 hover:border-apple-blue cursor-pointer'
              }`}
              onClick={() => !isResearched && !isLocked && setSelectedTech(techId)}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-apple-gray-900">{tech.name}</h4>
                {isResearched && <span className="text-2xl">✅</span>}
                {isLocked && <span className="text-2xl">🔒</span>}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-apple-gray-400">
                  <span>Kosten:</span>
                  <span className="font-medium">${tech.cost} Mrd.</span>
                </div>
                
                {tech.benefit.gdpBonus && (
                  <div className="flex justify-between text-apple-green">
                    <span>BIP Bonus:</span>
                    <span className="font-medium">+{(tech.benefit.gdpBonus * 100).toFixed(0)}%</span>
                  </div>
                )}
                
                {tech.requires && (
                  <div className="text-xs text-apple-gray-400 mt-2">
                    Benötigt: {technologies[tech.requires]?.name}
                  </div>
                )}
              </div>
              
              {selectedTech === techId && !isResearched && canDo && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResearch(techId);
                  }}
                  className="btn-apple w-full mt-4 text-sm"
                >
                  Erforschen
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TechnologyTree;
