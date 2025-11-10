import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import CountrySelection from './components/CountrySelection';
import Dashboard from './components/Dashboard';
import GamePlay from './components/GamePlay';

function App() {
  const [screen, setScreen] = useState('login'); // login, country-select, dashboard, gameplay
  const [playerName, setPlayerName] = useState('');
  const [gameId, setGameId] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [countries, setCountries] = useState({});

  useEffect(() => {
    // Load available countries
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error('Error loading countries:', err));
  }, []);

  const handleLogin = (name) => {
    setPlayerName(name);
    setScreen('country-select');
  };

  const handleCountrySelect = async (countryId) => {
    try {
      const response = await fetch('/api/game/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName, countryId })
      });
      const data = await response.json();
      setGameId(data.gameId);
      setGameState(data.game);
      setScreen('dashboard');
    } catch (err) {
      console.error('Error creating game:', err);
    }
  };

  const handleStartRound = () => {
    setScreen('gameplay');
  };

  const handleDecisionMade = async (decisions) => {
    try {
      const response = await fetch(`/api/game/${gameId}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(decisions)
      });
      const data = await response.json();
      setGameState(data.game);
      setScreen('dashboard');
      
      // Show round results
      alert(data.roundResult.feedback.join('\n\n'));
    } catch (err) {
      console.error('Error submitting decision:', err);
    }
  };

  const refreshGameState = async () => {
    if (!gameId) return;
    try {
      const response = await fetch(`/api/game/${gameId}`);
      const data = await response.json();
      setGameState(data);
    } catch (err) {
      console.error('Error refreshing game:', err);
    }
  };

  return (
    <div className="App">
      {screen === 'login' && (
        <Login onLogin={handleLogin} />
      )}
      {screen === 'country-select' && (
        <CountrySelection 
          countries={countries}
          onSelect={handleCountrySelect}
        />
      )}
      {screen === 'dashboard' && gameState && (
        <Dashboard 
          gameState={gameState}
          onStartRound={handleStartRound}
          onRefresh={refreshGameState}
        />
      )}
      {screen === 'gameplay' && gameState && (
        <GamePlay 
          gameState={gameState}
          onDecisionMade={handleDecisionMade}
        />
      )}
    </div>
  );
}

export default App;
