
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { AIAnalysis } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const mockChartData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  value: 100 + Math.random() * 20 - 10,
}));

export const AnalysisPanel: React.FC<{ symbol: string }> = ({ symbol }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        // Fix: Call analyzeBISTStockDeep instead of analyzeBISTStock
        const result = await geminiService.analyzeBISTStockDeep(symbol, "Fiyat 15 dakikalık grafikte RSI 60 seviyesinde, hacim ortalamanın üzerinde.");
        setAnalysis(result);
      } catch (error) {
        console.error("Analysis failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [symbol]);

  return (
    <div className="space-y-6">
      {/* Chart Header */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{symbol} Analiz Merkezi</h2>
            <p className="text-gray-500 text-sm">Gemini 3 Pro Canlı Veri Analizi</p>
          </div>
          <div className="px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-full text-xs font-bold border border-indigo-600/30">
            RASYONEL MOD AKTİF
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} />
              <YAxis stroke="#9CA3AF" fontSize={10} hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#818CF8' }}
              />
              <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 p-12 bg-gray-900 rounded-2xl border border-gray-800 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-indigo-400 animate-pulse">Gemini piyasayı okuyor ve rasyonelleştiriyor...</p>
          </div>
        ) : analysis && (
          <>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">Piyasa Özeti</h3>
              <p className="text-sm leading-relaxed text-gray-300">{analysis.rationalSummary}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">Risk Değerlendirmesi</h3>
              <div className="flex items-end gap-4">
                <div className="text-5xl font-bold text-white">{analysis.riskRating}/10</div>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full transition-all duration-1000 ${analysis.riskRating > 7 ? 'bg-red-500' : analysis.riskRating > 4 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${analysis.riskRating * 10}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 italic">Düşük puanlar öğrenci bütçesi için daha rasyoneldir.</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">Teknik Görünüm</h3>
              <p className="text-sm leading-relaxed text-gray-300">{analysis.technicalOutlook}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl border border-indigo-500/30 bg-indigo-500/5">
              <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">Öğrenci Strateji Tavsiyesi</h3>
              <p className="text-sm font-medium leading-relaxed text-indigo-100">{analysis.strategicAdvice}</p>
            </div>

            {analysis.sources.length > 0 && (
              <div className="col-span-2 bg-gray-900 p-4 rounded-xl border border-gray-800">
                <h4 className="text-xs text-gray-500 mb-2">Grounding Kaynakları (Google Search)</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.sources.map((src, i) => (
                    <a key={i} href={src.uri} target="_blank" className="text-[10px] bg-gray-800 px-2 py-1 rounded hover:bg-gray-700 transition underline">
                      {src.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
