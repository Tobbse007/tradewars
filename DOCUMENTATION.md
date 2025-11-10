# Econo-Me: Trade Wars - Vollständige Dokumentation

## 🎮 Übersicht

**Econo-Me** ist eine moderne Wirtschaftssimulation mit Apple-inspiriertem Design, entwickelt mit React, Tailwind CSS und Node.js. Spieler übernehmen die Kontrolle über eine Nation und treffen strategische wirtschaftspolitische Entscheidungen.

---

## ✨ Neue Features

### 🎲 Zufallsereignisse
- **10+ verschiedene Events**: Pandemien, Technologie-Durchbrüche, Naturkatastrophen, Cyberangriffe
- **Dynamische Auswirkungen**: Jedes Event beeinflusst BIP, Arbeitslosigkeit und Beziehungen
- **Echtzeit-Benachrichtigungen**: Events werden im Ereignislog angezeigt

### 🔬 Technologiebaum
- **6 erforschbare Technologien**:
  - Erneuerbare Energien (+5% BIP)
  - KI-Forschung (+8% BIP, -0.3% Arbeitslosigkeit)
  - Biotechnologie (+6% BIP)
  - Quantencomputing (+12% BIP, erfordert KI-Forschung)
  - Fusionsenergie (+15% BIP, erfordert Erneuerbare Energien)
  - Weltraum-Bergbau (+20% BIP)
- **Progressives System**: Spätere Technologien erfordern frühere Forschung
- **Wirtschaftliche Auswirkungen**: Permanente Boni auf BIP und andere Metriken

### 🚢 Internationaler Handel
- **Export/Import-System**: Wähle zwischen Export- und Importabkommen
- **Beziehungsabhängig**: Handel nur mit Ländern mit Beziehung ≥40%
- **Dynamische Werte**: Zufällige Handelswerte zwischen 30-80 Mrd.
- **Handelsbilanz-Effekte**: Exportabkommen erhöhen Handelsbilanz, Importabkommen senken sie

### 🤝 Diplomatie-System
- **3 Diplomatische Aktionen**:
  1. **Beziehungen verbessern** (-$20 Mrd., +10% Beziehung)
  2. **Entwicklungshilfe** (-$50 Mrd., +15% Beziehung)
  3. **Sanktionen** (-$30 Mrd. Handelsbilanz, -20% Beziehung)
- **Visuelle Beziehungsanzeige**: Farbcodierte Balken (Rot/Orange/Grün)
- **Strategische Tiefe**: Beziehungen beeinflussen Handel und Zoll-Vergeltungsmaßnahmen

### 🎨 Apple Design System
- **Tailwind CSS Integration**: Vollständig utility-basiertes Design
- **Custom Theme**: Apple-Farbpalette (Blau #0071e3, Grün #34c759, Rot #ff3b30)
- **Animationen**: Slide-up, Fade-in, Scale-in Effekte
- **Responsive**: Mobile-first Design für alle Bildschirmgrößen
- **Shadows & Blur**: Subtile Schatten und Glasmorphismus-Effekte

---

## 🏗️ Architektur

### Frontend (React + Tailwind)
```
client/
├── src/
│   ├── components/
│   │   ├── Login.js              # Startbildschirm
│   │   ├── CountrySelection.js   # Länderauswahl mit Schwierigkeitsgraden
│   │   ├── Dashboard.js          # Hauptdashboard mit Tabs
│   │   ├── GamePlay.js           # Entscheidungsbildschirm
│   │   ├── EventLog.js           # Ereignisverlauf
│   │   ├── TechnologyTree.js     # Technologieforschung
│   │   ├── TradePanel.js         # Handelsabkommen
│   │   └── DiplomacyPanel.js     # Diplomatische Aktionen
│   ├── App.js
│   └── index.css                 # Tailwind Config
├── tailwind.config.js
└── postcss.config.js
```

### Backend (Node.js + Express)
```
server/
└── index.js                      # API-Server mit allen Endpunkten
```

---

## 🔌 API-Endpunkte

### Spiel-Management
- `GET /api/countries` - Liste aller verfügbaren Länder
- `POST /api/game/create` - Neues Spiel erstellen
- `GET /api/game/:gameId` - Spielstatus abrufen
- `POST /api/game/:gameId/decision` - Entscheidung treffen & Runde vorrücken

### Neue Features
- `POST /api/game/:gameId/research` - Technologie erforschen
- `POST /api/game/:gameId/trade` - Handelsabkommen schließen
- `POST /api/game/:gameId/diplomacy` - Diplomatische Aktion ausführen
- `GET /api/technologies` - Alle verfügbaren Technologien
- `GET /api/game/:gameId/events` - Ereignisverlauf abrufen
- `GET /api/leaderboard` - Top 10 Spieler

---

## 🎯 Spielmechanik

### Wirtschaftssimulation
**BIP-Berechnung:**
- Zölle: ±10 pro Prozentpunkt
- Steuern: ±8 pro Prozentpunkt
- Infrastruktur: +5 pro Level
- Subventionen: +3 pro Level
- Zufallsereignisse: -150 bis +100
- Technologien: +5% bis +20% permanent

**Beziehungen:**
- Zollerhöhung: -2% pro Prozentpunkt
- Zollsenkung: +1.5% pro Prozentpunkt
- Handelsabkommen: +5%
- Diplomatische Aktionen: +10% bis +15%

### Punktesystem
```javascript
Rundenpunkte = (BIP-Wachstum × 1000) + (10 - Arbeitslosigkeit) × 10 + Handelsbilanz × 0.5
```

---

## 🎨 Design-Elemente

### Farbpalette
```css
Primär:     #0071e3 (Apple Blue)
Erfolg:     #34c759 (Apple Green)
Fehler:     #ff3b30 (Apple Red)
Warnung:    #ff9500 (Orange)
Hintergrund: #f5f5f7 (Grau 50)
Text:       #1d1d1f (Grau 900)
Sekundär:   #6e6e73 (Grau 400)
```

### Komponenten
- **Buttons**: Pill-shaped (border-radius: 980px), Hover-Animationen
- **Cards**: 18px border-radius, subtile Schatten
- **Inputs**: Focus-Ring mit Blur-Effekt
- **Sliders**: Custom Thumbs mit Hover-Scale-Effekt

### Animationen
- `animate-slide-up`: Von unten einblenden
- `animate-slide-down`: Von oben einblenden
- `animate-fade-in`: Sanftes Einblenden
- `animate-scale-in`: Mit Scale-Effekt einblenden

---

## 🚀 Installation & Start

### Voraussetzungen
- Node.js 14+
- npm oder yarn

### Installation
```bash
# Repository klonen
git clone <repo-url>
cd tradewars

# Server-Abhängigkeiten installieren
cd server
npm install

# Client-Abhängigkeiten installieren
cd ../client
npm install
```

### Development
```bash
# Terminal 1: Server starten
cd server
node index.js
# Server läuft auf http://localhost:3001

# Terminal 2: Client starten
cd client
npm start
# Client läuft auf http://localhost:3000
```

### Production Build
```bash
cd client
npm run build

# Build-Dateien werden in client/build/ erstellt
# Server serviert diese automatisch
```

---

## 🎲 Zufallsereignisse

### Positive Events (40% Wahrscheinlichkeit)
1. **Tech-Boom** (8%): +100 BIP
2. **Handelsabkommen** (10%): +80 Handelsbilanz, +10% Beziehungen
3. **Börsenboom** (9%): +80 BIP
4. **Exporterfolg** (10%): +100 Handelsbilanz
5. **Tourismus-Boom** (8%): +70 BIP

### Negative Events (26% Wahrscheinlichkeit)
1. **Pandemie** (5%): -150 BIP, +2% Arbeitslosigkeit
2. **Naturkatastrophe** (6%): -120 BIP
3. **Ölkrise** (7%): -90 BIP, +0.5% Arbeitslosigkeit
4. **Brain Drain** (5%): -60 BIP
5. **Cyberangriff** (4%): -85 BIP

---

## 📊 Dashboard-Tabs

### 1. Übersicht
- **Statistik-Karten**: BIP, Arbeitslosigkeit, Handelsbilanz, Steuern, Zölle, Technologien
- **Chart**: BIP und Handelsbilanz über Zeit
- **Internationale Beziehungen**: Status aller AI-Länder
- **Bestenliste**: Top 10 Spieler
- **Letztes Feedback**: Auswirkungen der letzten Entscheidungen

### 2. Technologie
- **Technologiebaum**: Alle verfügbaren Forschungen
- **Forschungsstatus**: Erforscht, Verfügbar, Gesperrt
- **Kosten & Nutzen**: Transparent dargestellt

### 3. Handel
- **Export/Import-Auswahl**: Toggle zwischen Handelsarten
- **Partnerländer**: Nur mit guten Beziehungen
- **Aktive Abkommen**: Historie der letzten 5 Deals

### 4. Diplomatie
- **Länderübersicht**: Beziehungsstatus zu allen Nationen
- **Diplomatische Aktionen**: 3 verschiedene Optionen
- **Visuelle Beziehungsbalken**: Echtzeit-Updates

### 5. Ereignisse
- **Ereignislog**: Chronologische Liste aller Events
- **Farbcodierung**: Grün (positiv), Rot (negativ)
- **Rundenangabe**: Wann jedes Event eintrat

---

## 🛠️ Technologie-Stack

### Frontend
- **React 18**: Komponentenbasiertes UI-Framework
- **Tailwind CSS 3**: Utility-first CSS-Framework
- **Recharts**: Charts und Visualisierungen
- **PostCSS**: CSS-Verarbeitung

### Backend
- **Node.js**: JavaScript-Runtime
- **Express**: Web-Framework
- **CORS**: Cross-Origin Resource Sharing
- **In-Memory Storage**: Schnelle Prototyping-Datenspeicherung

---

## 🔮 Zukünftige Features

### Geplante Erweiterungen
- [ ] **Multiplayer-Modus**: Echtzeit-Spiele gegen andere Spieler
- [ ] **Persistente Datenbank**: MongoDB/PostgreSQL Integration
- [ ] **Erweiterte KI**: Machine Learning für AI-Gegner
- [ ] **Mehr Länder**: 20+ spielbare Nationen
- [ ] **Krisen-Management**: Spezielle Krisenereignisse
- [ ] **Militär-System**: Verteidigungsbudget und Konflikte
- [ ] **Umwelt-Mechanik**: CO2-Emissionen und Klimaschutz
- [ ] **Social Features**: Freundesliste, Achievements

---

## 👨‍💻 Entwicklung

### Code-Struktur
- **Komponenten**: Funktionale React-Components mit Hooks
- **State-Management**: useState und useEffect für lokalen State
- **API-Calls**: Fetch API für Server-Kommunikation
- **Styling**: Tailwind Utility-Classes + Custom Components

### Best Practices
- Responsive Design (Mobile-First)
- Barrierefreiheit (ARIA-Labels, Keyboard-Navigation)
- Performance-Optimierung (Lazy Loading, Memoization)
- Clean Code (ESLint, Prettier)

---

## 📄 Lizenz

MIT License - Frei verwendbar für kommerzielle und private Projekte.

---

## 🙏 Credits

- **Design-Inspiration**: Apple Inc. (Human Interface Guidelines)
- **Icons**: Unicode Emojis
- **Charting**: Recharts Library
- **CSS-Framework**: Tailwind CSS

---

**Version**: 2.0.0  
**Letztes Update**: November 2025  
**Status**: Production Ready ✅
