import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, Beaker, Ship, Handshake, Trophy, ScrollText, TrendingUp, TrendingDown, Users, DollarSign, Target, Lightbulb } from 'lucide-react';
import EventLog from './EventLog';
import TechnologyTree from './TechnologyTree';
import TradePanel from './TradePanel';
import DiplomacyPanel from './DiplomacyPanel';
import CompetitionsPanel from './CompetitionsPanel';
import AITipsPanel from './AITipsPanel';

function Dashboard({ gameState, onStartRound, onRefresh }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [localGameState, setLocalGameState] = useState(gameState);

  useEffect(() => {
    setLocalGameState(gameState);
    loadLeaderboard();
  }, [gameState]);

  const loadLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      setLeaderboard(data);
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    }
  };

  const handleGameUpdate = (newGameState) => {
    setLocalGameState(newGameState);
    onRefresh();
  };

  const getFlag = (countryName) => {
    const flags = {
      'Germany': '🇩🇪',
      'Deutschland': '🇩🇪',
      'USA': '🇺🇸',
      'China': '🇨🇳',
      'Japan': '🇯🇵',
      'UK': '🇬🇧',
      'Vereinigtes Königreich': '🇬🇧',
      'France': '🇫🇷',
      'Frankreich': '🇫🇷'
    };
    return flags[countryName] || '🌍';
  };

  const chartData = localGameState.history.map((h, idx) => ({
    round: h.round,
    BIP: Math.round(h.gdp),
    Arbeitslosigkeit: h.unemployment,
    Handelsbilanz: h.tradeSurplus
  }));

  const tabs = [
    { id: 'overview', label: 'Übersicht', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'technology', label: 'Technologie', icon: <Beaker className="w-5 h-5" /> },
    { id: 'trade', label: 'Handel', icon: <Ship className="w-5 h-5" /> },
    { id: 'diplomacy', label: 'Diplomatie', icon: <Handshake className="w-5 h-5" /> },
    { id: 'competitions', label: 'Wettbewerbe', icon: <Trophy className="w-5 h-5" /> },
    { id: 'events', label: 'Ereignisse', icon: <ScrollText className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="card-apple mb-6 animate-slide-down">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-apple-gray-900 tracking-tight flex items-center gap-3">
                <span className="text-5xl">{getFlag(localGameState.playerCountry.name)}</span>
                {localGameState.playerCountry.name}
              </h1>
              <p className="text-apple-gray-400 mt-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                {localGameState.playerName} • Runde {localGameState.round} • 
                <span className="font-semibold text-apple-blue ml-1 flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {Math.round(localGameState.score)} Punkte
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={onRefresh} className="btn-apple-secondary">
                🔄 Aktualisieren
              </button>
              <button onClick={onStartRound} className="btn-apple-success">
                ▶️ Nächste Runde
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="stat-card animate-slide-up group hover:shadow-apple transition-all" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-apple-gray-400">BIP</h4>
              <BarChart3 className="w-4 h-4 text-apple-blue group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-apple-gray-900">
              ${Math.round(localGameState.playerCountry.gdp)}
            </div>
            <div className="text-xs text-apple-gray-400 mt-1">Milliarden</div>
          </div>

          <div className="stat-card animate-slide-up group hover:shadow-apple transition-all" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-apple-gray-400">Arbeitslosigkeit</h4>
              {localGameState.playerCountry.unemployment > 6 ? 
                <TrendingDown className="w-4 h-4 text-apple-red group-hover:scale-110 transition-transform" /> :
                <TrendingUp className="w-4 h-4 text-apple-green group-hover:scale-110 transition-transform" />
              }
            </div>
            <div className={`text-2xl font-bold ${
              localGameState.playerCountry.unemployment > 6 ? 'text-apple-red' :
              localGameState.playerCountry.unemployment > 4 ? 'text-apple-orange' :
              'text-apple-green'
            }`}>
              {localGameState.playerCountry.unemployment.toFixed(1)}%
            </div>
          </div>

          <div className="stat-card animate-slide-up group hover:shadow-apple transition-all" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-apple-gray-400">Handelsbilanz</h4>
              <DollarSign className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                localGameState.playerCountry.tradeSurplus > 0 ? 'text-apple-green' : 'text-apple-red'
              }`} />
            </div>
            <div className={`text-2xl font-bold flex items-center gap-1 ${
              localGameState.playerCountry.tradeSurplus > 0 ? 'text-apple-green' : 'text-apple-red'
            }`}>
              {localGameState.playerCountry.tradeSurplus > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              {localGameState.playerCountry.tradeSurplus > 0 ? '+' : ''}
              ${Math.round(localGameState.playerCountry.tradeSurplus)}
            </div>
          </div>

          <div className="stat-card animate-slide-up group hover:shadow-apple transition-all" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-apple-gray-400">Steuersatz</h4>
              <DollarSign className="w-4 h-4 text-apple-orange group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-apple-gray-900">
              {localGameState.playerCountry.taxRate}%
            </div>
          </div>

          <div className="stat-card animate-slide-up group hover:shadow-apple transition-all" style={{ animationDelay: '250ms' }}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-apple-gray-400">Zollsatz</h4>
              <Target className="w-4 h-4 text-apple-blue group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-apple-gray-900">
              {localGameState.playerCountry.tariffRate}%
            </div>
          </div>

          <div className="stat-card animate-slide-up group hover:shadow-apple transition-all" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-apple-gray-400">Technologien</h4>
              <Beaker className="w-4 h-4 text-apple-blue group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-apple-blue">
              {localGameState.technologies?.length || 0}
            </div>
            <div className="text-xs text-apple-gray-400 mt-1">Erforscht</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-pill font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-apple-blue text-white shadow-apple-blue'
                  : 'bg-white text-apple-gray-400 hover:bg-apple-gray-50 hover:text-apple-blue'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* AI Tips */}
            {localGameState.aiTips && localGameState.aiTips.length > 0 && (
              <AITipsPanel tips={localGameState.aiTips} />
            )}

            {chartData.length > 0 && (
              <div className="card-apple animate-fade-in">
                <h3 className="text-2xl font-semibold text-apple-gray-900 mb-6 tracking-tight">
                  📈 Wirtschaftliche Entwicklung
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d2d2d7" />
                    <XAxis dataKey="round" stroke="#6e6e73" />
                    <YAxis stroke="#6e6e73" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff',
                        border: '1px solid #d2d2d7',
                        borderRadius: '10px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="BIP" stroke="#0071e3" strokeWidth={3} />
                    <Line type="monotone" dataKey="Handelsbilanz" stroke="#34c759" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* AI Countries */}
            <div className="card-apple animate-fade-in">
              <h3 className="text-2xl font-semibold text-apple-gray-900 mb-6 tracking-tight">
                🌐 Internationale Beziehungen
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localGameState.aiCountries.map((country) => {
                  const flag = getFlag(country.id);
                  return (
                    <div key={country.id} className="p-5 bg-apple-gray-50 rounded-apple-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-apple-gray-900 flex items-center gap-2">
                          <span className="text-2xl">{flag}</span>
                          {country.name}
                        </h4>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm text-apple-gray-400 mb-3">
                        <div>
                          <div className="font-medium">BIP</div>
                          <div className="text-apple-gray-900">${Math.round(country.gdp)}</div>
                        </div>
                        <div>
                          <div className="font-medium">Arbeitslos.</div>
                          <div className="text-apple-gray-900">{country.unemployment.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="font-medium">Zölle</div>
                          <div className="text-apple-gray-900">{country.tariffRate}%</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-apple-gray-400">Beziehung</span>
                          <span className="font-medium text-apple-gray-900">
                            {Math.round(country.relationship)}%
                          </span>
                        </div>
                        <div className="h-2 bg-apple-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              country.relationship >= 70 ? 'bg-apple-green' :
                              country.relationship >= 40 ? 'bg-apple-orange' :
                              'bg-apple-red'
                            }`}
                            style={{ width: `${country.relationship}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leaderboard */}
            {leaderboard.length > 0 && (
              <div className="card-apple animate-fade-in">
                <h3 className="text-2xl font-semibold text-apple-gray-900 mb-6 tracking-tight flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-apple-orange" />
                  Bestenliste
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-apple-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Rang</th>
                        <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Spieler</th>
                        <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Land</th>
                        <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Runde</th>
                        <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Punkte</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, index) => (
                        <tr
                          key={entry.gameId}
                          className={`border-b border-apple-gray-100 transition-colors ${
                            entry.gameId === localGameState.id
                              ? 'bg-apple-blue/5 font-semibold'
                              : 'hover:bg-apple-gray-50'
                          }`}
                        >
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">{entry.playerName}</td>
                          <td className="py-3 px-4">{entry.country}</td>
                          <td className="py-3 px-4">{entry.round}</td>
                          <td className="py-3 px-4 text-apple-blue">{Math.round(entry.score)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Feedback */}
            {localGameState.history.length > 0 && (
              <div className="card-apple bg-apple-yellow/10 border-l-4 border-apple-yellow animate-fade-in">
                <h3 className="text-2xl font-semibold text-apple-gray-900 mb-4 tracking-tight flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-apple-orange" />
                  Letztes Feedback
                </h3>
                <ul className="space-y-3">
                  {localGameState.history[localGameState.history.length - 1].feedback.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <p className="text-apple-gray-900 font-medium mb-1">
                        {typeof item === 'string' ? item : item.message}
                      </p>
                      {typeof item === 'object' && item.explanation && (
                        <p className="text-sm text-apple-gray-400 mt-1 pl-4 border-l-2 border-apple-gray-200">
                          {item.explanation}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'technology' && (
          <TechnologyTree 
            gameId={localGameState.id}
            gameState={localGameState}
            onResearch={handleGameUpdate}
          />
        )}

        {activeTab === 'trade' && (
          <TradePanel
            gameId={localGameState.id}
            gameState={localGameState}
            onTrade={handleGameUpdate}
          />
        )}

        {activeTab === 'diplomacy' && (
          <DiplomacyPanel
            gameId={localGameState.id}
            gameState={localGameState}
            onDiplomacy={handleGameUpdate}
          />
        )}

        {activeTab === 'competitions' && (
          <CompetitionsPanel
            gameId={localGameState.id}
            gameState={localGameState}
            onJoinCompetition={handleGameUpdate}
          />
        )}

        {activeTab === 'events' && (
          <EventLog events={localGameState.events} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
