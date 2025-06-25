
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  lastUpdate: Date;
}

interface MarketDataFeedProps {
  selectedSymbols: string[];
  refreshRate: number;
  onShowDetails: () => void;
}

const SYMBOL_BASE_PRICES: Record<string, number> = {
  'BTCUSDT': 43250.50,
  'ETHUSDT': 2890.25,
  'SOLUSDT': 125.80,
  'ADAUSDT': 0.6520,
  'BNBUSDT': 315.75,
  'XRPUSDT': 0.5234,
  'DOGEUSDT': 0.0823,
  'AVAXUSDT': 36.42,
  'MATICUSDT': 0.8945,
  'LINKUSDT': 14.67
};

export const MarketDataFeed = ({ selectedSymbols, refreshRate, onShowDetails }: MarketDataFeedProps) => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  // Initialize market data based on selected symbols
  useEffect(() => {
    const initialData = selectedSymbols.map(symbol => ({
      symbol,
      price: SYMBOL_BASE_PRICES[symbol] || 100,
      change24h: (Math.random() - 0.5) * 10,
      volume: Math.random() * 1000000 + 200000,
      lastUpdate: new Date(),
    }));
    setMarketData(initialData);
  }, [selectedSymbols]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * item.price * 0.002,
        change24h: item.change24h + (Math.random() - 0.5) * 0.5,
        lastUpdate: new Date(),
      })));
    }, refreshRate);

    return () => clearInterval(interval);
  }, [refreshRate]);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-green-400">MARKET DATA FEED</h2>
            <p className="text-sm text-gray-400">Live prices from Binance & Deribit</p>
          </div>
          <button 
            onClick={onShowDetails}
            className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors"
          >
            <Info size={16} />
            <span className="text-sm">Details</span>
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4 mb-3 text-sm font-semibold text-gray-400 border-b border-gray-700 pb-2">
          <div>SYMBOL</div>
          <div>PRICE</div>
          <div>24H CHANGE</div>
          <div>VOLUME</div>
        </div>
        
        <div className="space-y-2">
          {marketData.map((item) => (
            <div key={item.symbol} className="grid grid-cols-4 gap-4 py-2 text-sm hover:bg-gray-750 rounded">
              <div className="font-semibold text-white">{item.symbol}</div>
              <div className="font-mono text-white">
                ${item.price.toFixed(item.price > 100 ? 2 : 4)}
              </div>
              <div className={`flex items-center space-x-1 ${item.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{item.change24h.toFixed(2)}%</span>
              </div>
              <div className="text-gray-400 font-mono">
                {(item.volume / 1000).toFixed(0)}K
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
