# 🌍 Econo-Me: Trade Wars

Eine moderne Wirtschaftssimulation mit Apple-inspiriertem Design. Führe deine Nation zum Erfolg durch kluge wirtschaftspolitische Entscheidungen!

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Status](https://img.shields.io/badge/status-production-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

### 🎮 Kern-Gameplay
- **6 spielbare Nationen**: Deutschland, USA, China, Japan, UK, Frankreich
- **Wirtschaftssimulation**: Manage BIP, Arbeitslosigkeit, Handelsbilanz
- **Strategische Entscheidungen**: Zölle, Steuern, Infrastruktur, Subventionen
- **Dynamische KI**: 5 KI-Gegner mit eigenem Verhalten

### 🔬 Erweiterte Mechaniken
- **Technologiebaum**: 6 erforschbare Technologien mit progressivem System
- **Handelssystem**: Export/Import-Abkommen mit anderen Nationen
- **Diplomatie**: Beziehungen verbessern, Sanktionen verhängen, Hilfe leisten
- **Zufallsereignisse**: 10+ Events (Pandemien, Tech-Booms, Naturkatastrophen)

### 🎨 Modernes Design
- **Apple-Design-System**: Clean, minimalistisch, elegant
- **Tailwind CSS**: Utility-first, vollständig responsive
- **Smooth Animations**: Fade-in, Slide-up, Scale-Effekte
- **Dark Mode Ready**: Vorbereitet für Dark Mode

## 🚀 Quick Start

### Installation
```bash
# Server
cd server
npm install

# Client
cd client
npm install
```

### Development
```bash
# Terminal 1: Server starten (Port 3001)
cd server
node index.js

# Terminal 2: Client starten (Port 3000)
cd client
npm start
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## 🎯 Spielanleitung

### 1. Land auswählen
Wähle eine der 6 Nationen. Jedes Land hat unterschiedliche Startwerte:
- **Leicht**: Japan (niedrige Arbeitslosigkeit, positive Handelsbilanz)
- **Mittel**: Deutschland, UK
- **Schwer**: USA (Handelsdefizit), Frankreich (hohe Arbeitslosigkeit)

### 2. Entscheidungen treffen
Jede Runde kannst du:
- **Zölle** anpassen (-10% bis +10%)
- **Steuern** ändern (-10% bis +10%)
- **Infrastruktur** investieren (Level 0-10)
- **Subventionen** verteilen (Level 0-10)

### 3. Dashboard nutzen
5 Tabs mit verschiedenen Funktionen:
- **Übersicht**: Statistiken, Charts, Beziehungen
- **Technologie**: Forschung betreiben
- **Handel**: Abkommen schließen
- **Diplomatie**: Beziehungen managen
- **Ereignisse**: Event-Verlauf

### 4. Punktesystem
Deine Punkte setzen sich zusammen aus:
- BIP-Wachstum (×1000)
- Niedriger Arbeitslosigkeit (×10)
- Positive Handelsbilanz (×0.5)

## 📊 Wirtschaftsmechaniken

### BIP-Faktoren
```
BIP-Änderung = 
  Zölle (±10/%) + 
  Steuern (±8/%) + 
  Infrastruktur (+5/Level) + 
  Subventionen (+3/Level) + 
  Events (±150) +
  Tech-Boni (+5-20%)
```

### Beziehungen
- **70-100%**: Ausgezeichnet (günstige Handelsabkommen)
- **40-69%**: Neutral (Handel möglich)
- **0-39%**: Angespannt (kein Handel, Vergeltungszölle)

### Technologien
| Technologie | Kosten | Bonus | Voraussetzung |
|-------------|--------|-------|---------------|
| Erneuerbare Energien | $200 Mrd. | +5% BIP | - |
| KI-Forschung | $300 Mrd. | +8% BIP | - |
| Biotechnologie | $250 Mrd. | +6% BIP | - |
| Quantencomputing | $500 Mrd. | +12% BIP | KI-Forschung |
| Fusionsenergie | $600 Mrd. | +15% BIP | Erneuerbare Energien |
| Weltraum-Bergbau | $800 Mrd. | +20% BIP | - |

## 🎲 Zufallsereignisse

### Positive (40% Chance)
- 💡 **Tech-Boom**: +$100 Mrd. BIP
- 🤝 **Handelsabkommen**: +$80 Mrd. Handel
- 📈 **Börsenboom**: +$80 Mrd. BIP
- 🚢 **Exporterfolg**: +$100 Mrd. Handel
- ✈️ **Tourismus-Boom**: +$70 Mrd. BIP

### Negative (26% Chance)
- 🦠 **Pandemie**: -$150 Mrd. BIP, +2% Arbeitslosigkeit
- 🌪️ **Naturkatastrophe**: -$120 Mrd. BIP
- ⛽ **Ölkrise**: -$90 Mrd. BIP, +0.5% Arbeitslosigkeit
- 🎓 **Brain Drain**: -$60 Mrd. BIP
- 💻 **Cyberangriff**: -$85 Mrd. BIP

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS 3, Recharts
- **Backend**: Node.js, Express
- **Styling**: Tailwind + Custom Apple-Theme
- **State**: React Hooks (useState, useEffect)

## 🎮 Tipps & Tricks

### Für Anfänger
1. Starte mit Japan oder Deutschland
2. Senke Zölle für bessere Beziehungen
3. Investiere früh in Infrastruktur
4. Erforsche günstige Technologien zuerst

### Für Fortgeschrittene
1. Balance zwischen Wachstum und Stabilität
2. Nutze Diplomatie strategisch
3. Plane Technologie-Pfad im Voraus
4. Reagiere flexibel auf Events

### Für Experten
1. Spiele USA oder Frankreich für Herausforderung
2. Maximiere Technologie-Synergien
3. Optimiere Handelsbeziehungen
4. Erreiche >1000 Punkte in 10 Runden

## 🤝 Contributing

Contributions sind willkommen! Bitte erstelle einen Pull Request.

## 📄 Lizenz

MIT License

## 👨‍💻 Entwickelt von

Tobbse007

---

**Viel Erfolg beim Regieren! 🏆**