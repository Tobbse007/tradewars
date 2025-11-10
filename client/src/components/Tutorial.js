import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Play, Target, TrendingUp, TrendingDown, DollarSign, Building2, Ship, Beaker, Handshake, Trophy, Zap, Globe2, Heart, Lightbulb, GraduationCap, Check } from 'lucide-react';

function Tutorial({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState('forward'); // for animations

  const tutorialSteps = [
    {
      icon: <Target className="w-20 h-20 text-apple-blue" />,
      title: "Willkommen bei Econo-Me!",
      subtitle: "Deine Wirtschaftssimulation",
      description: "Führe dein Land zum wirtschaftlichen Erfolg durch kluge Entscheidungen.",
      highlights: [
        { icon: <DollarSign className="w-6 h-6" />, title: "Wirtschaftspolitik", text: "Steuere Zölle & Steuern" },
        { icon: <Building2 className="w-6 h-6" />, title: "Infrastruktur", text: "Investiere in 5 Kategorien" },
        { icon: <Ship className="w-6 h-6" />, title: "Handel", text: "Schließe Abkommen" },
        { icon: <Trophy className="w-6 h-6" />, title: "Wettbewerbe", text: "Werde der Beste" }
      ]
    },
    {
      icon: <TrendingUp className="w-20 h-20 text-apple-green" />,
      title: "Rundenbasiertes Gameplay",
      subtitle: "Jede Runde = 1 Jahr",
      description: "Treffe Entscheidungen, beobachte die Auswirkungen und passe deine Strategie an.",
      highlights: [
        { icon: <Check className="w-6 h-6" />, title: "1. Analysieren", text: "BIP, Arbeitslosigkeit, Handelsbilanz prüfen" },
        { icon: <Check className="w-6 h-6" />, title: "2. Entscheiden", text: "Zölle, Steuern, Infrastruktur anpassen" },
        { icon: <Check className="w-6 h-6" />, title: "3. Handeln", text: "Technologien erforschen, Handel treiben" },
        { icon: <Check className="w-6 h-6" />, title: "4. Lernen", text: "Feedback erhalten, KI-Tipps bekommen" }
      ]
    },
    {
      icon: <DollarSign className="w-20 h-20 text-apple-blue" />,
      title: "Wirtschaftspolitik",
      subtitle: "Zölle & Steuern",
      description: "Deine Hauptwerkzeuge zur Steuerung der Wirtschaft. Jede Änderung hat Konsequenzen.",
      highlights: [
        { icon: <TrendingUp className="w-6 h-6 text-apple-green" />, title: "Zölle senken", text: "Mehr Handel, bessere Beziehungen" },
        { icon: <TrendingDown className="w-6 h-6 text-apple-red" />, title: "Zölle erhöhen", text: "Schutz für heimische Industrie" },
        { icon: <TrendingUp className="w-6 h-6 text-apple-green" />, title: "Steuern senken", text: "Wirtschaftswachstum fördern" },
        { icon: <TrendingDown className="w-6 h-6 text-apple-orange" />, title: "Steuern erhöhen", text: "Mehr Staatseinnahmen" }
      ]
    },
    {
      icon: <Building2 className="w-20 h-20 text-apple-orange" />,
      title: "Infrastruktur-Investitionen",
      subtitle: "5 Kategorien für langfristiges Wachstum",
      description: "Investiere gezielt in verschiedene Bereiche und erhalte spezifische Boni.",
      highlights: [
        { icon: <Ship className="w-6 h-6 text-apple-blue" />, title: "Straßen & Verkehr", text: "Handel +5%, BIP +3%" },
        { icon: <GraduationCap className="w-6 h-6 text-apple-green" />, title: "Bildungssystem", text: "BIP +4%, Arbeitslosigkeit -0.2%" },
        { icon: <Globe2 className="w-6 h-6 text-apple-blue" />, title: "Digitale Infrastruktur", text: "BIP +5%, Innovation +10%" },
        { icon: <Zap className="w-6 h-6 text-apple-orange" />, title: "Energieversorgung", text: "BIP +3%, Nachhaltigkeit +10%" }
      ]
    },
    {
      icon: <Beaker className="w-20 h-20 text-apple-blue" />,
      title: "Technologie-Forschung",
      subtitle: "6 Technologien mit massiven Boni",
      description: "Erforsche neue Technologien zwischen den Runden. Manche erfordern Vorgänger.",
      highlights: [
        { icon: <Zap className="w-6 h-6 text-apple-green" />, title: "Erneuerbare Energien", text: "$200 Mrd. → +5% BIP" },
        { icon: <Beaker className="w-6 h-6 text-apple-blue" />, title: "KI-Forschung", text: "$300 Mrd. → +8% BIP" },
        { icon: <Trophy className="w-6 h-6 text-apple-orange" />, title: "Quantencomputing", text: "$500 Mrd. → +12% BIP" },
        { icon: <Zap className="w-6 h-6 text-apple-red" />, title: "Fusionsenergie", text: "$600 Mrd. → +15% BIP" }
      ]
    },
    {
      icon: <Ship className="w-20 h-20 text-apple-orange" />,
      title: "Handel & Diplomatie",
      subtitle: "Internationale Beziehungen",
      description: "Baue Beziehungen auf und profitiere von Handelsabkommen mit anderen Nationen.",
      highlights: [
        { icon: <Ship className="w-6 h-6 text-apple-blue" />, title: "Export-Abkommen", text: "Handelsbilanz +$30-80 Mrd." },
        { icon: <Handshake className="w-6 h-6 text-apple-green" />, title: "Beziehungen verbessern", text: "-$20 Mrd. → +10% Beziehung" },
        { icon: <Heart className="w-6 h-6 text-apple-orange" />, title: "Entwicklungshilfe", text: "-$50 Mrd. → +15% Beziehung" },
        { icon: <Target className="w-6 h-6 text-apple-gray-400" />, title: "Voraussetzung", text: "Beziehung ≥40% zum Handeln" }
      ]
    },
    {
      icon: <Trophy className="w-20 h-20 text-apple-orange" />,
      title: "Wettbewerbe & Ranglisten",
      subtitle: "Messe dich mit anderen",
      description: "Tritt zeitbasierten Turnieren bei und kämpfe um die Spitze der Bestenliste.",
      highlights: [
        { icon: <Trophy className="w-6 h-6 text-apple-orange" />, title: "Zeitbasierte Turniere", text: "7-14 Tage mit spezifischen Zielen" },
        { icon: <Target className="w-6 h-6 text-apple-blue" />, title: "Echtzeit-Rangliste", text: "Sieh deine Position live" },
        { icon: <TrendingUp className="w-6 h-6 text-apple-green" />, title: "Punkteberechnung", text: "BIP + Arbeitslosigkeit + Handel" },
        { icon: <Check className="w-6 h-6 text-apple-green" />, title: "Globale Bestenliste", text: "Top 10 Spieler aller Zeiten" }
      ]
    },
    {
      icon: <Lightbulb className="w-20 h-20 text-apple-yellow" />,
      title: "Bereit zum Start!",
      subtitle: "KI-Strategie-Tipps helfen dir",
      description: "Nach jeder Runde erhältst du personalisierte Empfehlungen von deinem KI-Berater.",
      highlights: [
        { icon: <Lightbulb className="w-6 h-6 text-apple-yellow" />, title: "Personalisierte Tipps", text: "Basierend auf deiner Situation" },
        { icon: <TrendingUp className="w-6 h-6 text-apple-green" />, title: "Strategiehinweise", text: "Lerne aus deinen Entscheidungen" },
        { icon: <Target className="w-6 h-6 text-apple-blue" />, title: "Verbesserungsvorschläge", text: "Optimiere deine Wirtschaft" },
        { icon: <Play className="w-6 h-6 text-apple-blue" />, title: "Jetzt starten!", text: "Wähle dein Land im nächsten Schritt" }
      ]
    }
  ];

  const currentStepData = tutorialSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tutorialSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setDirection('forward');
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setDirection('backward');
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-blue/5 via-white to-apple-green/5 flex items-center justify-center p-6">
      <div className="max-w-7xl w-full">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="h-2 bg-apple-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-apple-blue to-apple-green transition-all duration-700 ease-out"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm font-medium text-apple-gray-400">
              Schritt {currentStep + 1} von {tutorialSteps.length}
            </div>
            <div className="flex gap-2">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-8 bg-apple-blue'
                      : index < currentStep
                      ? 'w-2 bg-apple-green'
                      : 'w-2 bg-apple-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Split Screen */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-500 ${
          direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'
        }`} key={currentStep}>
          
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-apple-blue/10 to-apple-green/10 rounded-3xl shadow-apple-lg">
              {currentStepData.icon}
            </div>

            {/* Title & Subtitle */}
            <div>
              <h1 className="text-6xl font-bold text-apple-gray-900 mb-3 tracking-tight leading-tight">
                {currentStepData.title}
              </h1>
              <p className="text-2xl text-apple-blue font-medium">
                {currentStepData.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-xl text-apple-gray-600 leading-relaxed">
              {currentStepData.description}
            </p>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4 pt-6">
              <button
                onClick={handlePrev}
                disabled={isFirstStep}
                className={`flex items-center gap-2 px-6 py-4 rounded-pill font-medium transition-all ${
                  isFirstStep
                    ? 'bg-apple-gray-200 text-apple-gray-400 cursor-not-allowed opacity-50'
                    : 'bg-white text-apple-gray-900 hover:bg-apple-gray-100 hover:-translate-x-1 shadow-apple'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Zurück</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 btn-apple px-8 py-4 text-lg shadow-apple-lg hover:scale-105"
              >
                <span>{isLastStep ? 'Los geht\'s!' : 'Weiter'}</span>
                {isLastStep ? <Play className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Right Side - Visual Highlights */}
          <div className="space-y-4">
            {currentStepData.highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white rounded-apple-sm p-6 shadow-apple border border-black/5 hover:shadow-apple-lg hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-apple-blue/10 to-apple-green/10 rounded-2xl flex-shrink-0">
                    {highlight.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-1">
                      {highlight.title}
                    </h3>
                    <p className="text-apple-gray-600">
                      {highlight.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
