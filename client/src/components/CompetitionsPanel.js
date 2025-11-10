import React, { useState, useEffect } from 'react';

function CompetitionsPanel({ gameId, gameState, onJoinCompetition }) {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    try {
      const response = await fetch('/api/competitions');
      const data = await response.json();
      setCompetitions(data);
    } catch (err) {
      console.error('Error loading competitions:', err);
    }
  };

  const handleJoin = async (competitionId) => {
    try {
      const response = await fetch(`/api/game/${gameId}/join-competition`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ competitionId })
      });

      if (response.ok) {
        const data = await response.json();
        onJoinCompetition(data.game);
        alert(data.message);
        loadCompetitions();
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (err) {
      console.error('Error joining competition:', err);
    }
  };

  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff < 0) return 'Beendet';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} Tag${days > 1 ? 'e' : ''} verbleibend`;
    if (hours > 0) return `${hours} Stunde${hours > 1 ? 'n' : ''} verbleibend`;
    return 'Endet bald';
  };

  const getTargetDescription = (target) => {
    switch(target.type) {
      case 'gdp':
        return `BIP von $${target.value} Mrd. erreichen`;
      case 'score':
        return `${target.value} Punkte erreichen`;
      case 'growth':
        return `${target.value}% Wachstum erreichen`;
      default:
        return 'Ziel erreichen';
    }
  };

  return (
    <div className="card-apple">
      <h3 className="text-2xl font-semibold text-apple-gray-900 mb-6 tracking-tight">
        🏆 Aktive Wettbewerbe
      </h3>

      {gameState.competitionId && (
        <div className="mb-6 p-5 bg-apple-blue/10 border-2 border-apple-blue rounded-apple-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎯</span>
            <div>
              <h4 className="font-semibold text-apple-gray-900">Du nimmst am Wettbewerb teil!</h4>
              <p className="text-sm text-apple-gray-400">Aktuelle Position auf der Rangliste prüfen</p>
            </div>
          </div>
        </div>
      )}

      {competitions.length === 0 ? (
        <div className="text-center py-12 text-apple-gray-400">
          <p className="text-lg mb-2">Keine aktiven Wettbewerbe</p>
          <p className="text-sm">Neue Turniere werden regelmäßig gestartet!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {competitions.map((competition) => {
            const isJoined = gameState.competitionId === competition.id;
            const timeRemaining = getTimeRemaining(competition.endDate);
            const isEnded = timeRemaining === 'Beendet';

            return (
              <div
                key={competition.id}
                className={`p-6 rounded-apple-sm border-2 transition-all ${
                  isJoined
                    ? 'border-apple-blue bg-apple-blue/5'
                    : isEnded
                    ? 'border-apple-gray-200 bg-apple-gray-50 opacity-60'
                    : 'border-apple-gray-200 hover:border-apple-blue bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🏆</span>
                    <div>
                      <h4 className="text-xl font-semibold text-apple-gray-900">
                        {competition.name}
                      </h4>
                      <p className="text-sm text-apple-gray-400 mt-1">
                        {competition.participants.length} Teilnehmer
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium px-3 py-1 rounded-pill ${
                      isEnded
                        ? 'bg-apple-gray-200 text-apple-gray-400'
                        : 'bg-apple-green/10 text-apple-green'
                    }`}>
                      {timeRemaining}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-2 text-apple-gray-400">
                    <span className="text-xl">🎯</span>
                    <span>Ziel: {getTargetDescription(competition.target)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-apple-gray-400">
                    <span className="text-xl">📅</span>
                    <span>Endet: {new Date(competition.endDate).toLocaleDateString('de-DE')}</span>
                  </div>
                </div>

                {competition.participants.length > 0 && (
                  <div className="mb-5 p-4 bg-apple-gray-50 rounded-apple-sm">
                    <h5 className="text-sm font-semibold text-apple-gray-900 mb-3">
                      Top 3 Teilnehmer
                    </h5>
                    <div className="space-y-2">
                      {competition.participants
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 3)
                        .map((participant, index) => (
                          <div
                            key={participant.gameId}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center gap-3">
                              <span className={`font-bold ${
                                index === 0 ? 'text-apple-yellow' :
                                index === 1 ? 'text-apple-gray-400' :
                                'text-apple-orange'
                              }`}>
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                              </span>
                              <span className="text-apple-gray-900">
                                {participant.playerName}
                              </span>
                              <span className="text-apple-gray-400">
                                ({participant.country})
                              </span>
                            </div>
                            <span className="font-semibold text-apple-blue">
                              {Math.round(participant.score)} Pkt
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {!isJoined && !isEnded && (
                  <button
                    onClick={() => handleJoin(competition.id)}
                    className="btn-apple w-full"
                  >
                    Jetzt teilnehmen
                  </button>
                )}

                {isJoined && (
                  <div className="text-center py-3 bg-apple-green/10 rounded-apple-sm">
                    <span className="text-apple-green font-medium">
                      ✓ Du nimmst teil
                    </span>
                  </div>
                )}

                {isEnded && (
                  <div className="text-center py-3 bg-apple-gray-100 rounded-apple-sm">
                    <span className="text-apple-gray-400 font-medium">
                      Wettbewerb beendet
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CompetitionsPanel;
