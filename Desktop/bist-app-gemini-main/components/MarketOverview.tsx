
import React, { useState, useEffect } from 'react';
import { StockData } from '../types';
import { geminiService } from '../services/geminiService';

interface Props {
  onSelectStock: (symbol: string) => void;
  selectedStock: string;
  onOpenDetail: (stock: StockData) => void;
}

export const MarketOverview: React.FC<Props> = ({ onSelectStock, selectedStock, onOpenDetail }) => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const updateMarketData = async () => {
    setIsUpdating(true);
    try {
      const liveData = await geminiService.fetchLiveMarketData();
      setStocks(liveData as StockData[]);
    } catch (e) {
      console.error("Güncelleme başarısız", e);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    // İlk yüklemede çalıştır
    updateMarketData();

    // 5 dakikada bir (300000 ms) otomatik güncelle
    const interval = setInterval(() => {
      updateMarketData();
    }, 300000);

    // Component unmount olduğunda interval'i temizle
    return () => clearInterval(interval);
  }, []);

  const filteredStocks = stocks.filter(s => 
    s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.sector?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className={`bg-indigo-600/10 border border-indigo-500/30 rounded-2xl overflow-hidden transition-all duration-300 ${showGuide ? 'max-h-[500px]' : 'max-h-[60px]'}`}>
        <button 
          onClick={() => setShowGuide(!showGuide)}
          className="w-full p-4 flex items-center justify-between text-indigo-400 font-bold text-sm"
        >
          <div className="flex items-center gap-2">
            <span>💡</span>
            <span>Rasyonel Hisse Seçim Rehberi</span>
          </div>
          <span className="text-xl">{showGuide ? '−' : '+'}</span>
        </button>
        <div className="p-4 pt-0 space-y-4 text-xs text-gray-300 leading-relaxed border-t border-indigo-500/20">
          <div>
            <span className="text-indigo-400 font-bold block mb-1">Veri Kaynağı:</span>
            Bu veriler Gemini AI Arama aracılığıyla halka açık finans portallarından anlık çekilir. PD/DD oranı, bir şirketin özkaynaklarına göre ne kadar pahalı olduğunu gösterir.
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 flex flex-col flex-1 overflow-hidden min-h-[500px]">
        <div className="p-4 border-b border-gray-800 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm">BIST 30 İzleme Listesi</h2>
            <button 
              onClick={updateMarketData}
              disabled={isUpdating}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border border-indigo-500/30 transition flex items-center gap-2 ${isUpdating ? 'bg-indigo-600/20 text-indigo-400 animate-pulse' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
            >
              {isUpdating ? 'GÜNCELLENİYOR...' : 'Verileri Güncelle'}
            </button>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Hisse veya Sektör ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 p-2 pl-8 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-600"
            />
            <span className="absolute left-2.5 top-2.5 opacity-30 text-xs">🔍</span>
          </div>
        </div>

        <div className="overflow-y-auto custom-scrollbar flex-1">
          {isUpdating && stocks.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-xs animate-pulse">
              Piyasa verileri rasyonelleştiriliyor...
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {filteredStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className={`w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition group cursor-pointer ${selectedStock === stock.symbol ? 'bg-indigo-600/5' : ''}`}
                  onClick={() => onSelectStock(stock.symbol)}
                >
                  <div className="text-left flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold ${stock.change >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {stock.symbol.substring(0,2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                         <div className="font-bold text-sm group-hover:text-indigo-400 transition">{stock.symbol}</div>
                         <span className="text-[9px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">{stock.sector}</span>
                      </div>
                      <div className="text-[9px] text-gray-500 mt-1 flex gap-3">
                         <span>F/K: <b className="text-gray-300">{stock.peRatio || '--'}</b></span>
                         <span>PD/DD: <b className="text-gray-300">{stock.pbRatio || '--'}</b></span>
                         <span>RSI: <b className={stock.rsi! > 70 ? 'text-red-400' : stock.rsi! < 30 ? 'text-green-400' : 'text-indigo-400'}>{stock.rsi || '--'}</b></span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-black text-sm">₺{stock.price?.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) || '0.00'}</div>
                      <div className={`text-[10px] font-bold ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change || 0)}%
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetail(stock);
                      }}
                      className="p-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg transition-all"
                    >
                      🚀
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
