import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🌍 Econo-Me</h1>
        <p>Trade Wars - Wirtschaftssimulation</p>
      </div>
      
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Dein Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Gib deinen Namen ein..."
              autoFocus
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Spiel starten 🚀
          </button>
        </form>
        
        <div style={{ marginTop: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '10px' }}>
          <h3 style={{ color: '#667eea', marginBottom: '15px' }}>Spielziel:</h3>
          <ul style={{ listStyle: 'none', color: '#666' }}>
            <li>📊 Führe dein Land zum wirtschaftlichen Erfolg</li>
            <li>💰 Treffe kluge Entscheidungen über Zölle und Steuern</li>
            <li>🤝 Manage Beziehungen zu anderen Nationen</li>
            <li>🏆 Erreiche die höchste Punktzahl</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
