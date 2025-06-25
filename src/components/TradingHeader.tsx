
import { Wifi, WifiOff, Settings } from 'lucide-react';

interface TradingHeaderProps {
  isConnected: boolean;
  lastUpdate: Date;
  onConfigClick: () => void;
}

export const TradingHeader = ({ isConnected, lastUpdate, onConfigClick }: TradingHeaderProps) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-green-400">
            CRYPTO RISK ENGINE
          </h1>
          <div className="text-sm text-gray-400">
            v1.0.0 | REAL-TIME
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Market Data:</span>
            {isConnected ? (
              <div className="flex items-center space-x-1 text-green-400">
                <Wifi size={16} />
                <span className="text-sm">LIVE</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-red-400">
                <WifiOff size={16} />
                <span className="text-sm">DISCONNECTED</span>
              </div>
            )}
          </div>
          
          <div className="text-sm text-gray-400">
            {lastUpdate.toLocaleTimeString()}
          </div>

          <button
            onClick={onConfigClick}
            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Settings size={16} />
            <span className="text-sm">Configuration</span>
          </button>
        </div>
      </div>
    </header>
  );
};
