
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { AIAnalysis, BookReference } from '../types';

const library: BookReference[] = [
  { title: "Teknik Analiz mi Dediniz?", author: "Ali Perşembe", topic: "TECHNICAL", description: "Trend takibi ve indikatörlerin rasyonel kullanımı üzerine başyapıt." },
  { title: "Borsada Temel Analiz", author: "Yaşar Erdinç", topic: "FUNDAMENTAL", description: "Şirket değerleme ve bilanço okuma sanatının rasyonel rehberi." },
  { title: "Yatırımın 4 Sütunu", author: "William Bernstein", topic: "PSYCHOLOGY", description: "Piyasa tarihçesi ve rasyonel portföy yönetimi üzerine derin analiz." },
];

export const DeepAnalysis: React.FC = () => {
  const [symbol, setSymbol] = useState('');
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDeepSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol) return;
    setLoading(true);
    try {
      const res = await geminiService.analyzeBISTStockDeep(symbol.toUpperCase());
      setAnalysis(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      {/* Search Header */}
      <div className="bg-gray-900 p-10 rounded-3xl border border-gray-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tighter mb-4">Derin Literatür Analizi</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Şirketin sembolünü yazın; Gemini, Türkiye'deki saygın finans otoritelerinin (Erdinç, Perşembe) prensipleriyle derin bir teknik ve temel röntgen çeksin.
          </p>
          <form onSubmit={handleDeepSearch} className="flex gap-4">
             <input 
               type="text" 
               placeholder="Örn: THYAO, EREGL, FROTO..." 
               value={symbol}
               onChange={(e) => setSymbol(e.target.value)}
               className="flex-1 bg-gray-950 border border-gray-800 p-5 rounded-2xl text-lg font-bold outline-none focus:ring-2 focus:ring-indigo-600 transition"
             />
             <button 
               type="submit" 
               disabled={loading}
               className="bg-indigo-600 px-8 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20 disabled:opacity-50"
             >
               {loading ? 'ANALİZ EDİLİYOR...' : 'DERİN SORGULA'}
             </button>
          </form>
        </div>
        <div className="absolute top-0 right-0 p-12 text-8xl opacity-5 grayscale select-none">🔍</div>
      </div>

      {analysis && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in slide-in-from-bottom-4 duration-700">
          <div className="lg:col-span-8 space-y-6">
            {/* Fundamental Section */}
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📋</span>
                <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest">Rasyonel Temel Analiz</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
                {analysis.fundamentalOutlook}
              </p>
            </div>

            {/* Technical Section */}
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📈</span>
                <h3 className="text-xs font-black text-green-400 uppercase tracking-widest">Rasyonel Teknik Analiz</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
                {analysis.technicalOutlook}
              </p>
            </div>

            {/* Literature Reference Box */}
            {analysis.literatureReference && (
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(analysis.literatureReference)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-600/10 hover:bg-indigo-500 transition-all group cursor-pointer"
              >
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                       <span className="text-2xl">📚</span>
                       <h3 className="text-lg font-black uppercase tracking-tighter">Literatür & Kitap Atıfı</h3>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg group-hover:bg-white/20 transition">
                      <span className="text-[10px] font-bold uppercase">Kaynağı İncele</span>
                      <span className="text-xs">↗</span>
                    </div>
                 </div>
                 <p className="text-lg font-medium italic leading-tight">
                    "{analysis.literatureReference}"
                 </p>
                 <p className="text-[10px] opacity-60 mt-4 uppercase font-bold tracking-widest group-hover:opacity-100 transition">
                    Daha fazla bilgi için tıklayın
                 </p>
              </a>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Risk & Kar Skorları</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2"><span>Risk Seviyesi</span><span>{analysis.riskRating}/10</span></div>
                  <div className="h-1.5 w-full bg-gray-950 rounded-full overflow-hidden">
                    <div className={`h-full ${analysis.riskRating > 7 ? 'bg-red-500' : 'bg-indigo-600'}`} style={{ width: `${analysis.riskRating * 10}%` }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-2">Hedef Seviyeler</div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-gray-400">Kar Al (TP)</span>
                    <span className="text-lg font-black text-green-400">₺{analysis.exitLevels?.takeProfit}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-gray-400">Stop Loss (SL)</span>
                    <span className="text-lg font-black text-red-400">₺{analysis.exitLevels?.stopLoss}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-950 p-8 rounded-3xl border border-gray-800 border-dashed">
               <h3 className="text-xs font-black text-gray-400 uppercase mb-4">Analiz Kaynakları</h3>
               <div className="space-y-3">
                 {analysis.sources.map((src, i) => (
                   <a key={i} href={src.uri} target="_blank" className="block text-[10px] text-indigo-400 hover:underline">
                     🔗 {src.title}
                   </a>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Rasyonel Kütüphane Panel */}
      <div className="mt-12">
        <h3 className="text-xl font-black tracking-tighter mb-8 px-2 flex items-center gap-3">
          <span>📖</span> Rasyonel Yatırımcı Kütüphanesi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {library.map((book) => (
             <div key={book.title} className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-indigo-500/30 transition-all group">
                <div className="text-[10px] font-black text-indigo-400 uppercase mb-2">{book.topic}</div>
                <h4 className="text-lg font-black mb-1 group-hover:text-white transition">{book.title}</h4>
                <div className="text-xs text-gray-500 font-bold mb-4">{book.author}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{book.description}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
