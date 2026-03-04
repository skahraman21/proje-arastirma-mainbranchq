
import React, { useState, useEffect } from 'react';
import { StockData, AIAnalysis } from '../types';
import { geminiService } from '../services/geminiService';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const mockHistoricalData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i+1} May`,
  price: 280 + Math.random() * 40,
}));

export const StockDetail: React.FC<{ stock: StockData; onBack: () => void }> = ({ stock, onBack }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFullAnalysis = async () => {
      setLoading(true);
      try {
        const context = `Hisse: ${stock.symbol}, Fiyat: ${stock.price}, PD/DD: ${stock.pbRatio}, Borç/Özsermaye: ${stock.debtToEquity}, RSI: ${stock.rsi}, KAP: ${stock.lastKapNews}`;
        // Fix: Call analyzeBISTStockDeep instead of analyzeBISTStock
        const result = await geminiService.analyzeBISTStockDeep(stock.symbol, context);
        setAnalysis(result);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchFullAnalysis();
  }, [stock.symbol]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-gray-900 rounded-3xl border border-gray-800 gap-6">
        <div className="flex items-center gap-6">
           <button onClick={onBack} className="w-12 h-12 bg-gray-950 border border-gray-800 rounded-2xl flex items-center justify-center hover:bg-gray-800 transition shadow-inner">←</button>
           <div>
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-black tracking-tighter">{stock.symbol}</h2>
                <span className="px-3 py-1 bg-indigo-600/10 text-indigo-400 text-[10px] font-black rounded-lg border border-indigo-600/20 uppercase tracking-widest">{stock.sector}</span>
              </div>
              <p className="text-gray-500 text-xs mt-1 font-medium">Derin Temel & Teknik Analiz</p>
           </div>
        </div>
        <div className="flex items-center gap-12">
           <div className="text-right">
              <div className="text-4xl font-black text-white tracking-tighter">₺{stock.price.toLocaleString('tr-TR')}</div>
              <div className={`text-sm font-bold ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stock.change >= 0 ? '▲' : '▼'} %{Math.abs(stock.change)}
              </div>
           </div>
           <div className="flex flex-col items-center">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">AI Risk</div>
              <div className={`text-2xl font-black ${analysis?.riskRating! > 7 ? 'text-red-500' : 'text-green-400'}`}>
                {analysis ? `${analysis.riskRating}/10` : '--'}
              </div>
           </div>
        </div>
      </div>

      {/* Market Maker & Whale Insight */}
      <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 relative overflow-hidden group">
         <div className="flex items-center gap-3 mb-4 relative z-10">
            <span className="text-2xl">🐋</span>
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest">Piyasa Yapıcı & Whale Aktivitesi</h3>
         </div>
         <p className="text-lg font-medium text-gray-200 leading-tight relative z-10">
            {loading ? "Tahtadaki kurumsal emirler analiz ediliyor..." : analysis?.mmInsights}
         </p>
         <div className="absolute -right-10 -bottom-10 text-9xl opacity-5 grayscale group-hover:grayscale-0 transition-all duration-700">🐋</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
           {/* Chart */}
           <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockHistoricalData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} opacity={0.2} />
                  <XAxis dataKey="date" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="price" stroke="#6366F1" strokeWidth={4} fill="url(#colorPrice)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>

           <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl shadow-indigo-600/10 text-white">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4">AI Rasyonel Strateji</h3>
              <p className="text-lg font-medium leading-tight mb-6">
                 {loading ? "Gemini strateji üretiyor..." : analysis?.strategicAdvice}
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/10 p-4 rounded-xl">
                    <div className="text-[10px] font-black uppercase opacity-60">Hedef (Kar Al)</div>
                    <div className="text-xl font-black">₺{analysis?.exitLevels?.takeProfit || '--'}</div>
                 </div>
                 <div className="bg-white/10 p-4 rounded-xl">
                    <div className="text-[10px] font-black uppercase opacity-60">Koruma (Stop Loss)</div>
                    <div className="text-xl font-black">₺{analysis?.exitLevels?.stopLoss || '--'}</div>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Derin Temel Analiz</h3>
              <div className="space-y-4">
                 <MetricRow label="PD/DD Oranı" value={stock.pbRatio || '--'} color={stock.pbRatio! < 1.5 ? 'text-green-400' : 'text-white'} />
                 <MetricRow label="Borç / Özsermaye" value={stock.debtToEquity || '--'} color={stock.debtToEquity! > 2 ? 'text-red-400' : 'text-green-400'} />
                 <MetricRow label="F/K Oranı" value={stock.peRatio || '--'} />
                 <MetricRow label="Özsermaye Karlılığı" value={`%${stock.roe || '--'}`} />
                 <MetricRow label="Cari Oran" value={stock.currentRatio || '--'} sub="Likitlik" />
                 <MetricRow label="Net Borç / FAVÖK" value={stock.netDebtToEbitda || '--'} />
              </div>
           </div>

           <div className="bg-gray-950 p-6 rounded-3xl border border-gray-800 border-dashed">
              <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">Rasyonel Kontrol</h3>
              <ul className="space-y-3">
                 <li className="flex gap-2 text-[10px] text-gray-400">
                    <span className="text-indigo-400">✓</span> PD/DD 1'den küçükse şirket defter değerinin altında işlem görüyor olabilir.
                 </li>
                 <li className="flex gap-2 text-[10px] text-gray-400">
                    <span className="text-indigo-400">✓</span> Borç/Özsermaye 2'nin üzerindeyse finansal risk rasyonelliği bozabilir.
                 </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

const MetricRow = ({ label, value, sub, color = "text-white" }: any) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
     <div>
        <div className="text-[10px] text-gray-500 font-bold uppercase">{label}</div>
        {sub && <div className="text-[8px] text-gray-700 font-bold">{sub}</div>}
     </div>
     <div className={`text-lg font-black ${color}`}>{value}</div>
  </div>
);
