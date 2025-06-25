import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Shield, Info } from 'lucide-react';

interface RiskData {
  unrealizedPnL: number;
  leverage: number;
  marginRatio: number;
  var1min: number;
  var5min: number;
  cvar: number;
}

interface RiskMetricsProps {
  accountBalance: number;
  onShowDetails: () => void;
}

export const RiskMetrics = ({ accountBalance, onShowDetails }: RiskMetricsProps) => {
  const [riskData, setRiskData] = useState<RiskData>({
    unrealizedPnL: accountBalance * 0.05, // Start with 5% of balance
    leverage: 3.2,
    marginRatio: 0.15,
    var1min: -accountBalance * 0.035,
    var5min: -accountBalance * 0.086,
    cvar: -accountBalance * 0.128,
  });

  // Update risk metrics when account balance changes
  useEffect(() => {
    setRiskData(prev => ({
      ...prev,
      unrealizedPnL: accountBalance * 0.05,
      var1min: -accountBalance * 0.035,
      var5min: -accountBalance * 0.086,
      cvar: -accountBalance * 0.128,
    }));
  }, [accountBalance]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRiskData(prev => ({
        unrealizedPnL: prev.unrealizedPnL + (Math.random() - 0.5) * accountBalance * 0.008,
        leverage: Math.max(1, prev.leverage + (Math.random() - 0.5) * 0.5),
        marginRatio: Math.max(0.05, Math.min(0.9, prev.marginRatio + (Math.random() - 0.5) * 0.05)),
        var1min: prev.var1min + (Math.random() - 0.5) * accountBalance * 0.004,
        var5min: prev.var5min + (Math.random() - 0.5) * accountBalance * 0.012,
        cvar: prev.cvar + (Math.random() - 0.5) * accountBalance * 0.02,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [accountBalance]);

  const getRiskLevel = (marginRatio: number) => {
    if (marginRatio > 0.5) return { level: 'HIGH', color: 'text-red-400' };
    if (marginRatio > 0.25) return { level: 'MEDIUM', color: 'text-yellow-400' };
    return { level: 'LOW', color: 'text-green-400' };
  };

  const riskLevel = getRiskLevel(riskData.marginRatio);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-green-400">RISK ANALYTICS</h2>
            <p className="text-sm text-gray-400">Real-time risk calculations</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onShowDetails}
              className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors"
            >
              <Info size={16} />
              <span className="text-sm">Details</span>
            </button>
            <div className={`flex items-center space-x-2 ${riskLevel.color}`}>
              <Shield size={20} />
              <span className="font-semibold">{riskLevel.level} RISK</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Unrealized PnL</span>
              {riskData.unrealizedPnL >= 0 ? (
                <TrendingUp className="text-green-400" size={16} />
              ) : (
                <TrendingDown className="text-red-400" size={16} />
              )}
            </div>
            <div className={`text-xl font-mono font-bold ${riskData.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${riskData.unrealizedPnL.toFixed(2)}
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <div className="text-sm text-gray-400 mb-2">Leverage</div>
            <div className="text-xl font-mono font-bold text-white">
              {riskData.leverage.toFixed(1)}x
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {riskData.leverage > 5 ? 'High leverage' : 'Moderate'}
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <div className="text-sm text-gray-400 mb-2">Margin Ratio</div>
            <div className={`text-xl font-mono font-bold ${riskLevel.color}`}>
              {(riskData.marginRatio * 100).toFixed(1)}%
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  riskData.marginRatio > 0.5 ? 'bg-red-400' : 
                  riskData.marginRatio > 0.25 ? 'bg-yellow-400' : 'bg-green-400'
                }`}
                style={{ width: `${Math.min(riskData.marginRatio * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <div className="text-sm text-gray-400 mb-2">VaR (1min)</div>
            <div className="text-xl font-mono font-bold text-red-400">
              ${riskData.var1min.toFixed(2)}
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <div className="text-sm text-gray-400 mb-2">VaR (5min)</div>
            <div className="text-xl font-mono font-bold text-red-400">
              ${riskData.var5min.toFixed(2)}
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <div className="text-sm text-gray-400 mb-2">CVaR</div>
            <div className="text-xl font-mono font-bold text-red-500">
              ${riskData.cvar.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
