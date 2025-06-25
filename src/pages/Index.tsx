import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { MarketDataFeed } from '@/components/MarketDataFeed';
import { RiskMetrics } from '@/components/RiskMetrics';
import { PortfolioOverview } from '@/components/PortfolioOverview';
import { AlertSystem } from '@/components/AlertSystem';
import { TradingHeader } from '@/components/TradingHeader';
import { ConfigurationPanel, ConfigData } from '@/components/ConfigurationPanel';
import { DetailModal } from '@/components/DetailModal';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showConfig, setShowConfig] = useState(false);
  const [detailModal, setDetailModal] = useState<{ isOpen: boolean; type: 'market' | 'risk' | null }>({
    isOpen: false,
    type: null
  });

  const [config, setConfig] = useState<ConfigData>({
    accountBalance: 25000,
    selectedSymbols: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'ADAUSDT'],
    refreshRate: 2000
  });

  useEffect(() => {
    // Simulate connection status
    const timer = setTimeout(() => setIsConnected(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update timestamp every second
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConfigChange = (newConfig: ConfigData) => {
    setConfig(newConfig);
  };

  const showMarketDetails = () => {
    setDetailModal({ isOpen: true, type: 'market' });
  };

  const showRiskDetails = () => {
    setDetailModal({ isOpen: true, type: 'risk' });
  };

  const closeDetailModal = () => {
    setDetailModal({ isOpen: false, type: null });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono">
      <TradingHeader 
        isConnected={isConnected} 
        lastUpdate={lastUpdate}
        onConfigClick={() => setShowConfig(true)}
      />
      
      <div className="p-4 space-y-4">
        <div className="w-full">
          <AlertSystem />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <MarketDataFeed 
              selectedSymbols={config.selectedSymbols}
              refreshRate={config.refreshRate}
              onShowDetails={showMarketDetails}
            />
            <RiskMetrics 
              accountBalance={config.accountBalance}
              onShowDetails={showRiskDetails}
            />
          </div>
          
          <div className="space-y-4">
            <PortfolioOverview 
              accountBalance={config.accountBalance}
              selectedSymbols={config.selectedSymbols}
            />
          </div>
        </div>
      </div>

      <ConfigurationPanel
        isOpen={showConfig}
        onClose={() => setShowConfig(false)}
        onConfigChange={handleConfigChange}
        currentConfig={config}
      />

      <DetailModal
        isOpen={detailModal.isOpen}
        onClose={closeDetailModal}
        type={detailModal.type}
        data={{ symbolCount: config.selectedSymbols.length }}
      />
    </div>
  );
};

export default Index;
