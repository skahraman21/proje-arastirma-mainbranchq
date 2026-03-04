
import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { geminiService } from '../services/geminiService';

export const NewsSentiment: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadNews = async () => {
    setLoading(true);
    try {
      const data = await geminiService.fetchNews();
      setNews(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Yapay Zeka Haber Radarı</h2>
          <p className="text-gray-400 text-sm">Gemini, güncel KAP bildirimlerini ve piyasa haberlerini senin için tarıyor.</p>
        </div>
        <button 
          onClick={loadNews}
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? 'TARANIYOR...' : 'HABERLERİ GÜNCELLE'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading && news.length === 0 ? (
          <div className="p-20 text-center animate-pulse text-gray-500">
            Haber kanalları rasyonelleştiriliyor...
          </div>
        ) : (
          news.map((item) => (
            <div key={item.id} className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex gap-6 group hover:border-indigo-500/30 transition">
              <div className={`w-1 h-auto rounded-full ${item.sentiment === 'POSITIVE' ? 'bg-green-500' : item.sentiment === 'NEGATIVE' ? 'bg-red-500' : 'bg-gray-500'}`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded">{item.source}</span>
                  <span className="text-[10px] text-gray-500">{item.time}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-300 transition">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.summary}</p>
              </div>
              <div className="flex flex-col items-center justify-center border-l border-gray-800 pl-6 min-w-[100px]">
                 <div className={`text-xs font-black mb-1 ${item.sentiment === 'POSITIVE' ? 'text-green-400' : item.sentiment === 'NEGATIVE' ? 'text-red-400' : 'text-gray-400'}`}>
                   {item.sentiment === 'POSITIVE' ? 'BOĞA' : item.sentiment === 'NEGATIVE' ? 'AYI' : 'NÖTR'}
                 </div>
                 <div className="text-[10px] text-gray-600 uppercase">AI ANALİZİ</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h3 className="font-bold text-xs uppercase text-gray-500 mb-4">Öğrenciye Özel Duygu Analiz İpucu</h3>
        <p className="text-sm text-gray-300 italic">"Piyasa haberi fiyatlamış olabilir. Yapay zeka 'Pozitif' dese bile, rasyonel bir yatırımcı olarak fiyattaki gerçekleşmeye bakmalısın."</p>
      </div>
    </div>
  );
};
