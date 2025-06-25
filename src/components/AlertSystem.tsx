
import { useState, useEffect } from 'react';
import { AlertTriangle, X, Bell } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  message: string;
  timestamp: Date;
}

export const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Simulate random alerts
    const alertMessages = [
      { type: 'warning' as const, message: 'Leverage approaching 5x threshold on BTCUSDT position' },
      { type: 'danger' as const, message: 'Margin ratio exceeds 40% - liquidation risk increased' },
      { type: 'info' as const, message: 'VaR increased by 15% in last 5 minutes' },
      { type: 'warning' as const, message: 'High volatility detected in ETH markets' },
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 5 seconds
        const randomAlert = alertMessages[Math.floor(Math.random() * alertMessages.length)];
        const newAlert: Alert = {
          id: Date.now().toString(),
          ...randomAlert,
          timestamp: new Date(),
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]); // Keep only 5 most recent
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'danger': return 'border-red-500 bg-red-500/10 text-red-400';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10 text-yellow-400';
      case 'info': return 'border-blue-500 bg-blue-500/10 text-blue-400';
      default: return 'border-gray-500 bg-gray-500/10 text-gray-400';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex items-center space-x-2 text-gray-400">
          <Bell size={20} />
          <span>No active alerts - all systems normal</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`rounded-lg border p-4 flex items-start justify-between ${getAlertColor(alert.type)}`}
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle size={20} className="mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm">
                {alert.type.toUpperCase()} ALERT
              </div>
              <div className="text-sm mt-1">{alert.message}</div>
              <div className="text-xs opacity-75 mt-1">
                {alert.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
          <button
            onClick={() => dismissAlert(alert.id)}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
