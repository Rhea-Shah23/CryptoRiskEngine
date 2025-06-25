
import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

interface Position {
  symbol: string;
  size: number;
  entryPrice: number;
  markPrice: number;
  unrealizedPnL: number;
  marginUsed: number;
}

interface PortfolioOverviewProps {
  accountBalance: number;
  selectedSymbols: string[];
}

export const PortfolioOverview = ({ accountBalance, selectedSymbols }: PortfolioOverviewProps) => {
  const [availableMargin, setAvailableMargin] = useState(accountBalance * 0.75);
  const [totalUnrealizedPnL, setTotalUnrealizedPnL] = useState(accountBalance * 0.05);
  const [positions, setPositions] = useState<Position[]>([]);

  // Initialize positions based on selected symbols
  useEffect(() => {
    const newPositions = selectedSymbols.slice(0, 3).map((symbol, index) => {
      const basePrice = symbol.includes('BTC') ? 43000 : 
                       symbol.includes('ETH') ? 2900 : 
                       symbol.includes('SOL') ? 126 : 
                       symbol.includes('ADA') ? 0.65 : 100;
      
      const size = index === 1 ? -2.0 : (index === 2 ? 50.0 : 0.5);
      const entryPrice = basePrice * (0.98 + Math.random() * 0.04);
      const markPrice = basePrice * (0.99 + Math.random() * 0.02);
      
      return {
        symbol,
        size,
        entryPrice,
        markPrice,
        unrealizedPnL: (markPrice - entryPrice) * size,
        marginUsed: Math.abs(size * markPrice * 0.1),
      };
    });
    setPositions(newPositions);
  }, [selectedSymbols]);

  // Update available margin when account balance changes
  useEffect(() => {
    setAvailableMargin(accountBalance * 0.75);
    setTotalUnrealizedPnL(accountBalance * 0.05);
  }, [accountBalance]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev => prev.map(pos => {
        const priceChange = (Math.random() - 0.5) * pos.markPrice * 0.001;
        const newMarkPrice = pos.markPrice + priceChange;
        const newUnrealizedPnL = (newMarkPrice - pos.entryPrice) * pos.size;
        
        return {
          ...pos,
          markPrice: newMarkPrice,
          unrealizedPnL: newUnrealizedPnL,
        };
      }));
      
      setTotalUnrealizedPnL(prev => prev + (Math.random() - 0.5) * accountBalance * 0.002);
    }, 2000);

    return () => clearInterval(interval);
  }, [accountBalance]);

  return (
    <div className="space-y-4">
      {/* Account Summary */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="px-4 py-3 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Wallet className="text-green-400" size={20} />
            <h2 className="text-lg font-semibold text-green-400">ACCOUNT</h2>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Balance:</span>
            <span className="font-mono text-white">${accountBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Available Margin:</span>
            <span className="font-mono text-green-400">${availableMargin.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Unrealized PnL:</span>
            <div className="flex items-center space-x-1">
              {totalUnrealizedPnL >= 0 ? (
                <TrendingUp className="text-green-400" size={16} />
              ) : (
                <TrendingDown className="text-red-400" size={16} />
              )}
              <span className={`font-mono ${totalUnrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${totalUnrealizedPnL.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="px-4 py-3 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-green-400">OPEN POSITIONS</h2>
          <p className="text-sm text-gray-400">{positions.length} active positions</p>
        </div>
        
        <div className="p-4">
          <div className="space-y-3">
            {positions.map((position, index) => (
              <div key={index} className="bg-gray-900 p-3 rounded-lg border border-gray-600">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-white">{position.symbol}</div>
                    <div className="text-sm text-gray-400">
                      Size: {position.size > 0 ? '+' : ''}{position.size}
                    </div>
                  </div>
                  <div className={`text-sm font-mono ${position.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${position.unrealizedPnL.toFixed(2)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <div>Entry: ${position.entryPrice.toFixed(2)}</div>
                  <div>Mark: ${position.markPrice.toFixed(2)}</div>
                  <div>Margin: ${position.marginUsed.toFixed(0)}</div>
                  <div className={position.size > 0 ? 'text-green-400' : 'text-red-400'}>
                    {position.size > 0 ? 'LONG' : 'SHORT'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
