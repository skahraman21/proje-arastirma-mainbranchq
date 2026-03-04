
import React, { useState, useEffect } from 'react';
import { CommodityData, MacroPulse } from '../types';
import { geminiService } from '../services/geminiService';

export const CommodityAnalysis: React.FC = () => {
  const [commodities, setCommodities] = useState<CommodityData[]>([]);
  const [pulse, setPulse] = useState<MacroPulse | null>(null);
  const [loading, setLoading] = useState(false);
  const [savingsTarget, setSavingsTarget] = useState(() => {
    const saved = localStorage.getItem('gold_target');
    return saved ? JSON.parse(saved) : { current: 0, target: 50 };
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [resC, resP] = await Promise.all([
        geminiService.fetchCommodityAnalysis(),
        geminiService.fetchMacroPulse()
      ]);
      setCommodities(resC);
      setPulse(resP);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateSavings = (val: number) => {
    const newS = { ...savingsTarget, current: val };
    setSavingsTarget(newS);
    localStorage.setItem('gold_target', JSON.stringify(newS));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      {/* Global Macro & Political Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-gray-900 p-8 rounded-3xl border border-gray-800 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌍</span>
              <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest">Global Makro & Siyasi Nabız</h3>
            </div>
            {pulse && (
               <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded text-[10px] font-black ${pulse.geopoliticalRisk > 70 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                    RİSK: {pulse.geopoliticalRisk}%
                  </span>
                  <span className="px-2 py-1 bg-indigo-600/20 text-indigo-400 rounded text-[10px] font-black uppercase">
                    BRICS: {pulse.centralBankActivity}
                  </span>
               </div>
            )}
          </div>
          
          {loading ? (
            <div className="animate-pulse space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-800 rounded-2xl"></div>)}
              </div>
              <div className="h-16 bg-gray-800 rounded-2xl"></div>
            </div>
          ) : pulse && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 flex flex-col items-center">
                    <div className="text-[10px] text-gray-500 font-bold mb-2 uppercase">Dolar Endeksi (DXY)</div>
                    <div className="text-2xl font-black text-white">{pulse.dxy}</div>
                    <div className="text-[8px] text-gray-600 mt-2 text-center uppercase">Emtiaya Baskı Gücü</div>
                 </div>
                 <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 flex flex-col items-center">
                    <div className="text-[10px] text-gray-500 font-bold mb-2 uppercase">ABD 10Y Tahvil</div>
                    <div className="text-2xl font-black text-red-400">%{pulse.us10y}</div>
                    <div className="text-[8px] text-gray-600 mt-2 text-center uppercase">Fırsat Maliyeti</div>
                 </div>
                 <div className="bg-gray-950 p-6 rounded-2xl border border-indigo-500/20 flex flex-col items-center">
                    <div className="text-[10px] text-indigo-400 font-bold mb-2 uppercase">GSR (Gümüş/Altın)</div>
                    <div className="text-2xl font-black text-indigo-400">{pulse.goldSilverRatio}</div>
                    <div className="text-[8px] text-indigo-500/50 mt-2 text-center uppercase">Rasyonel Ucuzluk</div>
                 </div>
              </div>
              
              <div className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-600/10">
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-xl">🤖</span>
                   <span className="text-xs font-black uppercase tracking-widest text-white/70">Politik & Ekonomik Strateji</span>
                </div>
                <p className="text-sm font-bold leading-relaxed">{pulse.rationalAdvice}</p>
              </div>

              {pulse.sources && (
                 <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800">
                    {pulse.sources.map((s, i) => (
                       <a key={i} href={s.uri} target="_blank" className="text-[9px] text-gray-500 hover:text-indigo-400 underline">
                          🔗 {s.title}
                       </a>
                    ))}
                 </div>
              )}
            </div>
          )}
          <div className="absolute -right-10 -bottom-10 text-9xl opacity-5 grayscale group-hover:grayscale-0 transition-all duration-700">🌍</div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           {/* Jeopolitik Risk Metresi */}
           <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 text-center">Jeopolitik Tansiyon</h3>
              <div className="relative h-32 w-full flex items-end justify-center">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-5xl font-black ${pulse?.geopoliticalRisk! > 70 ? 'text-red-500' : 'text-indigo-400'}`}>
                      {pulse?.geopoliticalRisk || '--'}
                    </div>
                 </div>
                 <div className="w-full h-4 bg-gray-950 rounded-full overflow-hidden flex">
                    <div className="h-full bg-green-500" style={{ width: '30%' }}></div>
                    <div className="h-full bg-yellow-500" style={{ width: '40%' }}></div>
                    <div className="h-full bg-red-500" style={{ width: '30%' }}></div>
                 </div>
                 {pulse && (
                    <div 
                       className="absolute bottom-0 w-1 h-8 bg-white shadow-xl transition-all duration-1000"
                       style={{ left: `${pulse.geopoliticalRisk}%` }}
                    ></div>
                 )}
              </div>
              <p className="text-[10px] text-gray-500 mt-4 text-center italic">
                "Risk arttıkça fiziksel altın talebi rasyonel olarak yükselir."
              </p>
           </div>

           {/* Birikim Hedefi */}
           <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Üniversite Birikim Planı</h3>
              <div className="text-3xl font-black text-white tracking-tighter mb-4">
                {savingsTarget.current} <span className="text-sm text-gray-500">/ {savingsTarget.target} gr</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max={savingsTarget.target} 
                value={savingsTarget.current} 
                onChange={(e) => updateSavings(Number(e.target.value))}
                className="w-full accent-indigo-600 h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer mb-6"
              />
              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
                 <p className="text-[9px] text-gray-400 leading-tight">
                    Mezuniyetine rasyonel bir koruma kalkanı örüyorsun. Fiziksel varlık, politik belirsizlikte en büyük dostundur.
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* Emtia Detay Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {commodities.map((item) => (
          <div key={item.symbol} className="bg-gray-900 p-8 rounded-3xl border border-gray-800 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">{item.name}</h3>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{item.symbol} / {item.unit}</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black">₺{item.price.toLocaleString()}</div>
                <div className={`text-xs font-bold ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change >= 0 ? '▲' : '▼'} %{Math.abs(item.change)}
                </div>
              </div>
            </div>

            <div className="mb-6 p-5 bg-indigo-600/5 rounded-2xl border border-indigo-500/10">
               <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Piyasa Yapıcı Güç:</span>
                  <span className="text-xs font-bold text-gray-200">{item.drivingForce}</span>
               </div>
               <p className="text-[11px] text-gray-400 leading-relaxed italic">"{item.rationalOutlook}"</p>
            </div>

            {/* Siyasi & Ekonomik Etki Faktörleri */}
            <div className="space-y-3 mb-6">
               <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Etki Faktörleri Analizi</h4>
               {item.influenceFactor?.map((factor, i) => (
                  <div key={i} className="space-y-1">
                     <div className="flex justify-between text-[10px] font-bold">
                        <span>{factor.label}</span>
                        <span className={factor.impact > 0 ? 'text-green-400' : 'text-red-400'}>
                           {factor.impact > 0 ? '+' : ''}{factor.impact}%
                        </span>
                     </div>
                     <div className="h-1 w-full bg-gray-950 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${factor.impact > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.abs(factor.impact)}%` }}
                        ></div>
                     </div>
                  </div>
               ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800">
                <h4 className="text-[10px] font-black text-green-500 uppercase mb-2">Destek</h4>
                <div className="flex flex-wrap gap-2">
                  {item.supportLevels?.map(s => <span key={s} className="text-[10px] font-black">₺{s}</span>)}
                </div>
              </div>
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800">
                <h4 className="text-[10px] font-black text-red-500 uppercase mb-2">Direnç</h4>
                <div className="flex flex-wrap gap-2">
                  {item.resistanceLevels?.map(r => <span key={r} className="text-[10px] font-black">₺{r}</span>)}
                </div>
              </div>
            </div>
            
            <div className="absolute -right-6 -bottom-6 text-8xl opacity-5 group-hover:scale-110 transition-transform">💎</div>
          </div>
        ))}
      </div>
    </div>
  );
};
