
import { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface ConfigurationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigChange: (config: ConfigData) => void;
  currentConfig: ConfigData;
}

export interface ConfigData {
  accountBalance: number;
  selectedSymbols: string[];
  refreshRate: number;
}

const AVAILABLE_SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'ADAUSDT', 'BNBUSDT', 
  'XRPUSDT', 'DOGEUSDT', 'AVAXUSDT', 'MATICUSDT', 'LINKUSDT'
];

export const ConfigurationPanel = ({ isOpen, onClose, onConfigChange, currentConfig }: ConfigurationPanelProps) => {
  const [localConfig, setLocalConfig] = useState(currentConfig);

  const handleSymbolToggle = (symbol: string, checked: boolean) => {
    let newSymbols = [...localConfig.selectedSymbols];
    
    if (checked && newSymbols.length < 4) {
      newSymbols.push(symbol);
    } else if (!checked) {
      newSymbols = newSymbols.filter(s => s !== symbol);
    }
    
    const updatedConfig = { ...localConfig, selectedSymbols: newSymbols };
    setLocalConfig(updatedConfig);
    onConfigChange(updatedConfig);
  };

  const handleBalanceChange = (value: string) => {
    const balance = parseFloat(value) || 0;
    const updatedConfig = { ...localConfig, accountBalance: balance };
    setLocalConfig(updatedConfig);
    onConfigChange(updatedConfig);
  };

  const handleRefreshRateChange = (value: string) => {
    const rate = parseInt(value) || 2000;
    const updatedConfig = { ...localConfig, refreshRate: rate };
    setLocalConfig(updatedConfig);
    onConfigChange(updatedConfig);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-green-400">Configuration</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-2 block">Account Balance (USD)</Label>
            <Input
              type="number"
              value={localConfig.accountBalance}
              onChange={(e) => handleBalanceChange(e.target.value)}
              className="bg-gray-900 border-gray-600 text-white"
              min="1000"
              max="1000000"
              step="1000"
            />
          </div>

          <div>
            <Label className="text-gray-300 mb-2 block">
              Select Trading Pairs (max 4) - {localConfig.selectedSymbols.length}/4
            </Label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {AVAILABLE_SYMBOLS.map((symbol) => (
                <div key={symbol} className="flex items-center space-x-2">
                  <Checkbox
                    id={symbol}
                    checked={localConfig.selectedSymbols.includes(symbol)}
                    onCheckedChange={(checked) => handleSymbolToggle(symbol, checked as boolean)}
                    disabled={!localConfig.selectedSymbols.includes(symbol) && localConfig.selectedSymbols.length >= 4}
                    className="border-gray-600"
                  />
                  <Label htmlFor={symbol} className="text-sm text-gray-300">
                    {symbol}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-gray-300 mb-2 block">Update Frequency</Label>
            <Select value={localConfig.refreshRate.toString()} onValueChange={handleRefreshRateChange}>
              <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="1000">1 second</SelectItem>
                <SelectItem value="2000">2 seconds</SelectItem>
                <SelectItem value="5000">5 seconds</SelectItem>
                <SelectItem value="10000">10 seconds</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
