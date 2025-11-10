import React from 'react';

function EventLog({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="card-apple">
        <h3 className="text-2xl font-semibold text-apple-gray-900 mb-4 tracking-tight">
          📋 Ereignislog
        </h3>
        <p className="text-apple-gray-400">Noch keine Ereignisse eingetreten.</p>
      </div>
    );
  }

  return (
    <div className="card-apple">
      <h3 className="text-2xl font-semibold text-apple-gray-900 mb-6 tracking-tight">
        📋 Ereignislog
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.slice().reverse().map((event, index) => (
          <div
            key={index}
            className={`p-4 rounded-apple-sm border-l-4 ${
              event.type === 'positive'
                ? 'bg-apple-green/5 border-apple-green'
                : 'bg-apple-red/5 border-apple-red'
            } animate-slide-down`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-apple-gray-900 font-medium">{event.message}</p>
                <p className="text-sm text-apple-gray-400 mt-1">Runde {event.round}</p>
              </div>
              <span className={`text-2xl ${event.type === 'positive' ? '' : 'opacity-70'}`}>
                {event.type === 'positive' ? '✨' : '⚠️'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventLog;
