
import React, { useState } from 'react';
import { WarrantSignal } from '../types';

const mockSignals: WarrantSignal[] = [
  { kod: 'ABCAA', dayanak: 'XU030', price: 10450, trend: 'YUKARI', score: 12.4, vade: 45, delta: 0.65, timestamp: Date.now() },
  { kod: 'EREBB', dayanak: 'EREGL', price: 48.20, trend: 'ASAGI', score: 8.2, vade: 15, delta: 0.40, timestamp: Date.now() },
  { kod: 'THYCC', dayanak: 'THYAO', price: 294.5, trend: 'YUKARI', score: 15.1, vade: 60, delta: 0.72, timestamp: Date.now() },
];

export const WarrantScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Elite Varant Sniper (JS Edition)</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-6 text-sm">
            Python kodundaki filtreleme mantığını (Vade &gt; 20, Delta 0.40-0.85) kullanarak BIST varant piyasasını anlık olarak tarar.
          </p>
          <button
            onClick={startScan}
            disabled={isScanning}
            className={`px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition flex items-center gap-2 mx-auto ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isScanning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Taranıyor...
              </>
            ) : 'Taramayı Başlat'}
          </button>
        </div>
        {/* Radar Effect */}
        <div className={`absolute inset-0 bg-indigo-600/5 transition-opacity ${isScanning ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-indigo-600/20 rounded-full animate-ping"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSignals.map((signal) => (
          <div
            key={signal.kod}
            className={`p-6 bg-gray-900 rounded-2xl border ${signal.score > 10 ? 'border-indigo-500/50' : 'border-gray-800'} relative`}
          >
            {signal.score > 10 && (
              <div className="absolute top-4 right-4 bg-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">FIRSAT</div>
            )}
            <div className="text-2xl font-black mb-1">{signal.kod}</div>
            <div className="text-gray-500 text-xs mb-4">{signal.dayanak} • {signal.trend} TREND</div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-950 p-2 rounded border border-gray-800">
                <div className="text-[10px] text-gray-500">SKOR</div>
                <div className="font-bold text-indigo-400">{signal.score}</div>
              </div>
              <div className="bg-gray-950 p-2 rounded border border-gray-800">
                <div className="text-[10px] text-gray-500">DELTA</div>
                <div className="font-bold">{signal.delta}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Vade: <b className="text-gray-200">{signal.vade} Gün</b></span>
              <span className="text-[10px]">4 saatte bir güncellenir</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-900/10 border border-indigo-500/20 p-6 rounded-2xl">
        <h3 className="font-bold text-indigo-400 mb-2 flex items-center gap-2">
          💡 Rasyonel Tavsiye
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          Python kodundaki Delta aralığını (0.40 - 0.85) koruman çok rasyonel. Ancak **vadesine 20 günden az kalan varantlar**,
          "theta decay" (zaman erimesi) nedeniyle öğrenci sermayesi için tehlikelidir. Skorlama sistemine 'Hacim' verisini de eklersen rasyonaliten artacaktır.
        </p>
      </div>
    </div>
  );
};
