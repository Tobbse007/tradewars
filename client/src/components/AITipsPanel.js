import React from 'react';

function AITipsPanel({ tips }) {
  if (!tips || tips.length === 0) {
    return (
      <div className="card-apple bg-apple-green/5 border-2 border-apple-green/20">
        <div className="flex items-start gap-4">
          <span className="text-4xl">🤖</span>
          <div>
            <h3 className="text-xl font-semibold text-apple-gray-900 mb-2">
              KI-Berater
            </h3>
            <p className="text-apple-gray-400">
              Du machst einen guten Job! Deine Wirtschaft läuft stabil. Weiter so!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-apple bg-gradient-to-br from-apple-blue/5 to-purple-50 border-2 border-apple-blue/20">
      <div className="flex items-start gap-4 mb-6">
        <span className="text-4xl">🤖</span>
        <div>
          <h3 className="text-xl font-semibold text-apple-gray-900 mb-2">
            KI-Strategieberater
          </h3>
          <p className="text-sm text-apple-gray-400">
            Personalisierte Empfehlungen basierend auf deiner aktuellen Situation
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-apple-sm border border-apple-blue/10 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <p className="text-apple-gray-900 leading-relaxed flex-1">
                {tip.replace('💡 Tipp: ', '')}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white/50 rounded-apple-sm border border-apple-blue/10">
        <p className="text-xs text-apple-gray-400 text-center">
          Die KI analysiert deine Entscheidungen und gibt dir hilfreiche Tipps für bessere Ergebnisse
        </p>
      </div>
    </div>
  );
}

export default AITipsPanel;
