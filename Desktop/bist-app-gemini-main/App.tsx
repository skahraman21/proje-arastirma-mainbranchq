
import React, { useState, useEffect } from 'react';
import { MarketOverview } from './components/MarketOverview';
import { AnalysisPanel } from './components/AnalysisPanel';
import { WarrantScanner } from './components/WarrantScanner';
import { RiskCalculator } from './components/RiskCalculator';
import { PortfolioTracker } from './components/PortfolioTracker';
import { BacktestModule } from './components/BacktestModule';
import { NewsSentiment } from './components/NewsSentiment';
import { StockDetail } from './components/StockDetail';
import { MarketMakerInsights } from './components/MarketMakerInsights';
import { CommodityAnalysis } from './components/CommodityAnalysis';
import { DeepAnalysis } from './components/DeepAnalysis';
import { MarketStatus, StockData, MacroData } from './types';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'market' | 'scanner' | 'risk' | 'portfolio' | 'backtest' | 'news' | 'mm' | 'commodities' | 'deep'>('market');
  const [selectedStock, setSelectedStock] = useState<string>('THYAO');
  const [viewMode, setViewMode] = useState<'dashboard' | 'detail'>('dashboard');
  const [detailedStock, setDetailedStock] = useState<StockData | null>(null);
  const [macro, setMacro] = useState<MacroData | null>(null);

  useEffect(() => {
    const loadMacro = async () => {
      try {
        const data = await geminiService.fetchMacroData();
        setMacro(data);
      } catch (e) { console.error(e); }
    };
    loadMacro();
    const interval = setInterval(loadMacro, 300000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenDetail = (stock: StockData) => {
    setDetailedStock(stock);
    setViewMode('detail');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Macro Ticker Bar */}
      <div className="bg-indigo-600/10 border-b border-indigo-500/20 px-4 py-2 flex overflow-x-auto whitespace-nowrap gap-8 scrollbar-hide text-[10px] font-bold">
        {macro ? (
          <>
            <div className="flex gap-2"><span>📈 BIST100:</span> <span className="text-white">{macro.bist100.toLocaleString()}</span></div>
            <div className="flex gap-2"><span>💵 USD/TRY:</span> <span className={macro.usdChange >= 0 ? 'text-green-400' : 'text-red-400'}>{macro.usdTry.toFixed(4)}</span></div>
            <div className="flex gap-2"><span>🟡 ALTIN:</span> <span className="text-yellow-500">₺{macro.gold.toLocaleString()}</span></div>
            <div className="flex gap-2"><span>🏛️ FAİZ:</span> <span className="text-indigo-400">%{macro.interestRate}</span></div>
          </>
        ) : (
          <div className="animate-pulse text-gray-600">Makro veriler yükleniyor...</div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar Navigation */}
        <nav className="w-full lg:w-64 bg-gray-900 border-b lg:border-r border-gray-800 p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/20">AI</div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tighter">BIST ELITE</h1>
              <p className="text-[10px] text-indigo-400 font-bold uppercase">Rasyonel Terminal</p>
            </div>
          </div>

          <NavItem active={activeTab === 'market'} onClick={() => { setActiveTab('market'); setViewMode('dashboard'); }} label="Piyasa" icon="📊" />
          <NavItem active={activeTab === 'deep'} onClick={() => setActiveTab('deep')} label="Derin Analiz" icon="🔍" />
          <NavItem active={activeTab === 'mm'} onClick={() => setActiveTab('mm')} label="Whale & Likidite" icon="🐋" />
          <NavItem active={activeTab === 'commodities'} onClick={() => setActiveTab('commodities')} label="Altın & Gümüş" icon="💎" />
          <NavItem active={activeTab === 'news'} onClick={() => setActiveTab('news')} label="Haberler" icon="📰" />
          <NavItem active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} label="Portföyüm" icon="💼" />
          <NavItem active={activeTab === 'scanner'} onClick={() => setActiveTab('scanner')} label="Varant Sniper" icon="🎯" />
          <NavItem active={activeTab === 'backtest'} onClick={() => setActiveTab('backtest')} label="Backtest" icon="⌛" />
          <NavItem active={activeTab === 'risk'} onClick={() => setActiveTab('risk')} label="Risk Hesabı" icon="🛡️" />

          <div className="mt-auto pt-6 border-t border-gray-800 space-y-4 text-center">
            <div className="bg-gray-950 p-3 rounded-xl border border-gray-800">
              <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase">Bakiyem</div>
              <div className="text-sm font-bold">₺12,450.00</div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 bg-gray-950">
          {activeTab === 'market' && viewMode === 'dashboard' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-4">
                <MarketOverview
                  onSelectStock={setSelectedStock}
                  selectedStock={selectedStock}
                  onOpenDetail={handleOpenDetail}
                />
              </div>
              <div className="xl:col-span-8">
                <AnalysisPanel symbol={selectedStock} />
              </div>
            </div>
          )}

          {activeTab === 'market' && viewMode === 'detail' && detailedStock && (
            <StockDetail stock={detailedStock} onBack={() => setViewMode('dashboard')} />
          )}

          {activeTab === 'deep' && <DeepAnalysis />}
          {activeTab === 'mm' && <MarketMakerInsights />}
          {activeTab === 'commodities' && <CommodityAnalysis />}
          {activeTab === 'news' && <NewsSentiment />}
          {activeTab === 'portfolio' && <PortfolioTracker />}
          {activeTab === 'scanner' && <WarrantScanner />}
          {activeTab === 'backtest' && <BacktestModule />}
          {activeTab === 'risk' && <RiskCalculator />}
        </main>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; label: string; icon: string }> = ({ active, onClick, label, icon }) => (
  <button onClick={onClick} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}>
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

export default App;
