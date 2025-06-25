
import { X, TrendingUp, TrendingDown, AlertTriangle, Info } from 'lucide-react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'market' | 'risk' | null;
  data?: any;
}

export const DetailModal = ({ isOpen, onClose, type, data }: DetailModalProps) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-green-400">
            {type === 'market' ? 'Market Data Details' : 'Risk Analytics Details'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {type === 'market' && (
          <div className="space-y-6">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center">
                <Info className="mr-2" size={16} />
                Data Sources
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Binance WebSocket:</span>
                  <span className="text-green-400">wss://fstream.binance.com/ws</span>
                </div>
                <div className="flex justify-between">
                  <span>Deribit WebSocket:</span>
                  <span className="text-green-400">wss://www.deribit.com/ws/api/v2</span>
                </div>
                <div className="flex justify-between">
                  <span>Update Frequency:</span>
                  <span className="text-yellow-400">Real-time</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency:</span>
                  <span className="text-green-400">&lt; 50ms</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
              <h3 className="text-green-400 font-semibold mb-3">Market Statistics</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Average Daily Volume</div>
                  <div className="font-mono text-white">$2.4B</div>
                </div>
                <div>
                  <div className="text-gray-400">Active Symbols</div>
                  <div className="font-mono text-white">{data?.symbolCount || 4}</div>
                </div>
                <div>
                  <div className="text-gray-400">Price Updates/sec</div>
                  <div className="font-mono text-green-400">~1,200</div>
                </div>
                <div>
                  <div className="text-gray-400">Data Accuracy</div>
                  <div className="font-mono text-green-400">99.99%</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
              <h3 className="text-green-400 font-semibold mb-3">Technical Details</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• Real-time WebSocket connections with automatic reconnection</div>
                <div>• Message queuing with Kafka for high-throughput processing</div>
                <div>• Price normalization across multiple exchanges</div>
                <div>• Outlier detection and data validation</div>
              </div>
            </div>
          </div>
        )}

        {type === 'risk' && (
          <div className="space-y-6">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center">
                <AlertTriangle className="mr-2" size={16} />
                Risk Calculation Methods
              </h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <div className="font-semibold text-white">Value at Risk (VaR)</div>
                  <div>Historical simulation method using rolling 1000-period window</div>
                  <div className="text-yellow-400">95% confidence level</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Conditional VaR (CVaR)</div>
                  <div>Expected loss beyond VaR threshold</div>
                  <div className="text-red-400">Tail risk measurement</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Margin Ratio</div>
                  <div>Maintenance Margin / Account Balance</div>
                  <div className="text-orange-400">Liquidation risk indicator</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
              <h3 className="text-green-400 font-semibold mb-3">Risk Thresholds</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Low Risk</div>
                  <div className="text-green-400">Margin Ratio &lt; 25%</div>
                </div>
                <div>
                  <div className="text-gray-400">Medium Risk</div>
                  <div className="text-yellow-400">Margin Ratio 25-50%</div>
                </div>
                <div>
                  <div className="text-gray-400">High Risk</div>
                  <div className="text-red-400">Margin Ratio &gt; 50%</div>
                </div>
                <div>
                  <div className="text-gray-400">Liquidation Risk</div>
                  <div className="text-red-500">Margin Ratio &gt; 80%</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
              <h3 className="text-green-400 font-semibold mb-3">Performance Metrics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Calculation Latency:</span>
                  <span className="text-green-400">&lt; 10ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Update Frequency:</span>
                  <span className="text-green-400">Every 3 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Accuracy:</span>
                  <span className="text-green-400">±1% vs exchange</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
