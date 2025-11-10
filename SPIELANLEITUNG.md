# 🌍 Econo-Me - Trade Wars Prototyp

Eine browserbasierte Wirtschaftssimulation, in der du ein Land führst und wirtschaftliche Entscheidungen triffst.

## ✨ Features

- **6 spielbare Länder**: Deutschland, USA, China, Japan, UK, Frankreich
- **Rundenbasiertes Gameplay**: Treffe wirtschaftspolitische Entscheidungen
- **Echtzeit-Wirtschaftssimulation**: Sehe direkt die Auswirkungen deiner Entscheidungen
- **KI-Gegner**: Andere Länder reagieren intelligent auf deine Politik
- **Bestenliste**: Vergleiche deine Leistung mit anderen Spielern
- **Interaktive Diagramme**: Visualisierung der wirtschaftlichen Entwicklung

## 🎮 Spielmechanik

Pro Runde kannst du entscheiden:
- 📊 **Zölle** erhöhen oder senken
- 💰 **Steuern** anpassen
- 🏗️ **Infrastruktur** investieren
- 🏭 **Subventionen** verteilen

Jede Entscheidung wirkt sich aus auf:
- BIP (Bruttoinlandsprodukt)
- Arbeitslosenquote
- Handelsbilanz
- Internationale Beziehungen

## 🚀 Installation & Start

### Voraussetzungen
- Node.js (v14 oder höher)
- npm

### Backend starten
```bash
cd /workspaces/tradewars
npm install
npm start
```

Server läuft auf: http://localhost:3001

### Frontend starten (in neuem Terminal)
```bash
cd /workspaces/tradewars/client
npm install
npm start
```

Frontend läuft auf: http://localhost:3000

## 📱 Nutzung

1. **Login**: Gib deinen Spielernamen ein
2. **Land wählen**: Wähle dein Land aus den verfügbaren Optionen
3. **Dashboard**: Überblick über deine Wirtschaftsdaten
4. **Runde spielen**: Treffe Entscheidungen über Zölle, Steuern, Investitionen
5. **Feedback**: Erhalte Rückmeldung über die Auswirkungen deiner Entscheidungen
6. **Bestenliste**: Verfolge deine Platzierung im Ranking

## 🎯 Punktesystem

Punkte werden vergeben für:
- Wirtschaftswachstum (BIP-Entwicklung)
- Niedrige Arbeitslosigkeit
- Positive Handelsbilanz
- Stabile internationale Beziehungen

## 🛠️ Technologie-Stack

- **Backend**: Node.js + Express
- **Frontend**: React
- **Charts**: Recharts
- **Styling**: Custom CSS mit Gradients

## 📊 API-Endpunkte

- `GET /api/countries` - Verfügbare Länder abrufen
- `POST /api/game/create` - Neues Spiel erstellen
- `GET /api/game/:gameId` - Spielstand abrufen
- `POST /api/game/:gameId/decision` - Entscheidung treffen & Runde vorrücken
- `GET /api/leaderboard` - Bestenliste abrufen

## 🎓 Lernziele

- Verständnis für Wirtschaftszusammenhänge
- Auswirkungen von Handelspolitik
- Balancierung von kurzfristigem und langfristigem Wachstum
- Internationale Wirtschaftsbeziehungen

## 🔮 Zukünftige Features (Ideen)

- Multiplayer-Modus mit echten Spielern
- Handelabkommen verhandeln
- Mehr Länder und Ressourcen
- Persistente Datenbank
- Authentifizierung & Benutzerkonten
- Mobile App
- Erweiterte KI mit Machine Learning
- Historische Ereignisse und Szenarien

## 📝 Lizenz

MIT License - Frei verwendbar für Bildung und Forschung

---

**Viel Erfolg beim Aufbau deiner Wirtschaftsmacht! 🏆**
