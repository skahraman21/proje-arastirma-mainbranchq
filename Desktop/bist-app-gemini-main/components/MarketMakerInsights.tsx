
import React, { useState, useEffect } from 'react';
import { StockData } from '../types';
import { geminiService } from '../services/geminiService';

export const MarketMakerInsights: React.FC = () => {
  const [data, setData] = useState<Partial<StockData>[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const refreshData = async () => {
    setLoading(true);
    try {
      const result = await geminiService.fetchLiveMarketData();
      setData(result);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black tracking-tighter">Piyasa Yapıcı & Likidite Radarı</h2>
          <p className="text-gray-500 text-sm mt-1">BIST 30 tahtalarındaki kurumsal iştahı ve derinliği analiz et.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <div className="text-[10px] font-bold text-gray-500 uppercase">Son Güncelleme</div>
            <div className="text-xs font-bold text-indigo-400">{lastUpdate || '--:--'}</div>
          </div>
          <button 
            onClick={refreshData}
            disabled={loading}
            className={`px-6 py-3 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 ${loading ? 'opacity-50 animate-pulse' : 'hover:bg-indigo-500'}`}
          >
            {loading ? 'ANALİZ EDİLİYOR...' : 'DERİNLİK SORGULA'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-800/50 text-[10px] font-black text-gray-500 uppercase tracking-widest">
              <tr>
                <th className="p-6">Hisse</th>
                <th className="p-6 text-center">Makas (Spread)</th>
                <th className="p-6 text-center">Emir Dengesi</th>
                <th className="p-6 text-center">Kurumsal Pay</th>
                <th className="p-6 text-right">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {data.map((item) => (
                <tr key={item.symbol} className="hover:bg-gray-800/30 transition-colors group">
                  <td className="p-6">
                    <div className="font-black text-sm group-hover:text-indigo-400 transition">{item.symbol}</div>
                    <div className="text-[10px] text-gray-500 font-bold">₺{item.price}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col items-center">
                      <div className={`text-xs font-black ${item.spread! < 0.05 ? 'text-green-400' : 'text-yellow-500'}`}>
                        %{item.spread?.toFixed(3) || '0.010'}
                      </div>
                      <div className="w-16 h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{ width: `${Math.min(100, (item.spread! || 0.01) * 1000)}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col items-center">
                      <div className={`text-xs font-black ${item.orderImbalance! > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {item.orderImbalance! > 0 ? '+' : ''}{item.orderImbalance || '12.4'}%
                      </div>
                      <span className="text-[8px] text-gray-600 uppercase font-bold">{item.orderImbalance! > 0 ? 'Alış Baskısı' : 'Satış Baskısı'}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-center">
                      <div className="text-xs font-black text-white">%{item.mmParticipation || '45'}</div>
                      <div className="text-[8px] text-gray-600 uppercase font-bold">MM Katılım</div>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <span className={`text-[9px] font-black px-2 py-1 rounded-lg border ${item.spread! < 0.05 ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                      {item.spread! < 0.05 ? 'YÜKSEK LİKİDİTE' : 'NORMAL'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-600/10">
            <h3 className="text-lg font-black uppercase tracking-tighter mb-4 flex items-center gap-2">
              <span>🐋</span> Whale Watcher Analizi
            </h3>
            <p className="text-sm font-medium leading-relaxed opacity-90">
              "BIST 30'da Piyasa Yapıcı (Market Maker) makası %0.05'in altına çektiğinde, büyük kurumsal emirlerin (blok alışlar) gelme ihtimali rasyonel olarak %70 artar."
            </p>
            <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center text-[10px] font-black uppercase">
                <span>Likidite Sağlığı</span>
                <span className="text-green-300">Mükemmel</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase">
                <span>Slippage Riski</span>
                <span className="text-indigo-200">Çok Düşük</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Öğrenci Notu</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed italic">
              "Varantlarda işlem yaparken dayanak varlığın (hissenin) makasına bakmak hayat kurtarır. Hisse makası açılmışsa, varantın likiditesi de risk altındadır."
            </p>
          </div>

          <div className="bg-gray-950 p-6 rounded-3xl border border-gray-800 border-dashed">
             <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">Likidite Kontrolü</h4>
             <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] text-gray-500">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                   <span>Dar makas = Kurumsal destek</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-500">
                   <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                   <span>Geniş makas = Belirsizlik / Risk</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
