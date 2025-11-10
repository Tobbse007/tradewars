const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Game state storage (in-memory for prototype)
let games = {};
let leaderboard = [];

// Country templates with starting values
const COUNTRIES = {
  'Germany': {
    name: 'Deutschland',
    gdp: 4000,
    population: 83,
    unemployment: 5.5,
    tradeSurplus: 200,
    resources: ['technology', 'automotive', 'machinery'],
    taxRate: 25,
    tariffRate: 5
  },
  'USA': {
    name: 'USA',
    gdp: 23000,
    population: 331,
    unemployment: 6.0,
    tradeSurplus: -800,
    resources: ['technology', 'finance', 'agriculture'],
    taxRate: 21,
    tariffRate: 8
  },
  'China': {
    name: 'China',
    gdp: 17700,
    population: 1400,
    unemployment: 4.5,
    tradeSurplus: 500,
    resources: ['manufacturing', 'rare_earth', 'textiles'],
    taxRate: 25,
    tariffRate: 10
  },
  'Japan': {
    name: 'Japan',
    gdp: 5000,
    population: 125,
    unemployment: 2.8,
    tradeSurplus: 150,
    resources: ['technology', 'automotive', 'robotics'],
    taxRate: 30,
    tariffRate: 6
  },
  'UK': {
    name: 'Vereinigtes Königreich',
    gdp: 3100,
    population: 67,
    unemployment: 4.5,
    tradeSurplus: -100,
    resources: ['finance', 'services', 'pharmaceuticals'],
    taxRate: 19,
    tariffRate: 7
  },
  'France': {
    name: 'Frankreich',
    gdp: 2900,
    population: 67,
    unemployment: 8.0,
    tradeSurplus: -50,
    resources: ['luxury_goods', 'agriculture', 'aerospace'],
    taxRate: 28,
    tariffRate: 5
  }
};

// API Routes

// Get available countries
app.get('/api/countries', (req, res) => {
  res.json(COUNTRIES);
});

// Create new game
app.post('/api/game/create', (req, res) => {
  const { playerName, countryId } = req.body;
  
  if (!COUNTRIES[countryId]) {
    return res.status(400).json({ error: 'Invalid country' });
  }

  const gameId = Date.now().toString();
  const playerCountry = { ...COUNTRIES[countryId], id: countryId };
  
  // Initialize AI countries
  const aiCountries = Object.entries(COUNTRIES)
    .filter(([id]) => id !== countryId)
    .map(([id, data]) => ({
      ...data,
      id,
      isAI: true,
      relationship: 50 // neutral starting relationship
    }));

  games[gameId] = {
    id: gameId,
    playerName,
    playerCountry,
    aiCountries,
    round: 1,
    score: 0,
    history: [],
    createdAt: new Date()
  };

  res.json({ gameId, game: games[gameId] });
});

// Get game state
app.get('/api/game/:gameId', (req, res) => {
  const game = games[req.params.gameId];
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  res.json(game);
});

// Make decision and advance round
app.post('/api/game/:gameId/decision', (req, res) => {
  const game = games[req.params.gameId];
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }

  const { tariffChange, taxChange, infrastructure, subsidies } = req.body;
  
  // Apply player decisions
  const oldGdp = game.playerCountry.gdp;
  const oldUnemployment = game.playerCountry.unemployment;
  
  game.playerCountry.tariffRate = Math.max(0, Math.min(50, game.playerCountry.tariffRate + (tariffChange || 0)));
  game.playerCountry.taxRate = Math.max(0, Math.min(60, game.playerCountry.taxRate + (taxChange || 0)));
  
  // Calculate economic impacts
  let gdpChange = 0;
  let unemploymentChange = 0;
  let tradeChange = 0;
  let feedback = [];

  // Tariff impact
  if (tariffChange) {
    if (tariffChange > 0) {
      gdpChange -= tariffChange * 10; // Tariffs reduce trade and GDP
      unemploymentChange += tariffChange * 0.1;
      tradeChange -= tariffChange * 15;
      feedback.push(`📈 Zölle erhöht: Deine Importkosten steigen, heimische Industrie profitiert kurzfristig, aber Handelspartner sind verärgert.`);
      
      // AI countries retaliate
      game.aiCountries.forEach(country => {
        country.relationship -= tariffChange * 2;
        if (country.relationship < 30) {
          country.tariffRate += tariffChange * 0.5;
          feedback.push(`⚠️ ${country.name} verhängt Gegenzölle!`);
        }
      });
    } else if (tariffChange < 0) {
      gdpChange += Math.abs(tariffChange) * 15;
      tradeChange += Math.abs(tariffChange) * 20;
      feedback.push(`📉 Zölle gesenkt: Mehr Handel, bessere Beziehungen, aber heimische Industrie unter Druck.`);
      
      game.aiCountries.forEach(country => {
        country.relationship += Math.abs(tariffChange) * 1.5;
      });
    }
  }

  // Tax impact
  if (taxChange) {
    if (taxChange > 0) {
      gdpChange -= taxChange * 8;
      unemploymentChange += taxChange * 0.08;
      feedback.push(`💰 Steuern erhöht: Mehr Staatseinnahmen, aber Wirtschaft wird gebremst.`);
    } else {
      gdpChange += Math.abs(taxChange) * 12;
      unemploymentChange -= Math.abs(taxChange) * 0.1;
      feedback.push(`💸 Steuern gesenkt: Mehr Konsum, Wirtschaft wächst, aber Staatshaushalt leidet.`);
    }
  }

  // Infrastructure investment
  if (infrastructure > 0) {
    gdpChange += infrastructure * 5;
    unemploymentChange -= infrastructure * 0.05;
    feedback.push(`🏗️ Infrastruktur-Investition: Langfristiges Wachstum gesichert, Arbeitsplätze geschaffen.`);
  }

  // Subsidies
  if (subsidies > 0) {
    gdpChange += subsidies * 3;
    unemploymentChange -= subsidies * 0.03;
    feedback.push(`🏭 Subventionen verteilt: Schlüsselindustrien gestärkt.`);
  }

  // Random economic events
  const randomEvent = Math.random();
  if (randomEvent < 0.1) {
    gdpChange += 50;
    feedback.push(`🎉 Positive Überraschung: Neue Technologie steigert Produktivität!`);
  } else if (randomEvent > 0.9) {
    gdpChange -= 40;
    feedback.push(`⚠️ Wirtschaftsschock: Globale Krise trifft deine Exporte.`);
  }

  // Apply changes
  game.playerCountry.gdp += gdpChange;
  game.playerCountry.unemployment = Math.max(0, game.playerCountry.unemployment + unemploymentChange);
  game.playerCountry.tradeSurplus += tradeChange;

  // AI countries make decisions
  game.aiCountries.forEach(country => {
    const aiChange = (Math.random() - 0.5) * 100;
    country.gdp += aiChange;
    country.unemployment += (Math.random() - 0.5) * 0.5;
  });

  // Calculate score
  const growthScore = ((game.playerCountry.gdp - oldGdp) / oldGdp) * 1000;
  const stabilityScore = (10 - game.playerCountry.unemployment) * 10;
  const tradeScore = game.playerCountry.tradeSurplus * 0.5;
  const roundScore = Math.round(growthScore + stabilityScore + tradeScore);
  game.score += roundScore;

  // Save to history
  game.history.push({
    round: game.round,
    gdp: game.playerCountry.gdp,
    unemployment: game.playerCountry.unemployment,
    tradeSurplus: game.playerCountry.tradeSurplus,
    score: roundScore,
    feedback
  });

  // Advance round
  game.round += 1;

  // Update leaderboard
  const existingEntry = leaderboard.find(e => e.gameId === game.id);
  if (existingEntry) {
    existingEntry.score = game.score;
    existingEntry.round = game.round;
  } else {
    leaderboard.push({
      gameId: game.id,
      playerName: game.playerName,
      country: game.playerCountry.name,
      score: game.score,
      round: game.round
    });
  }
  leaderboard.sort((a, b) => b.score - a.score);

  res.json({
    game,
    roundResult: {
      gdpChange: Math.round(gdpChange),
      unemploymentChange: unemploymentChange.toFixed(2),
      tradeChange: Math.round(tradeChange),
      roundScore,
      feedback
    }
  });
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard.slice(0, 10));
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🌍 Econo-Me Server läuft auf Port ${PORT}`);
});
