
import React, { useState } from 'react';

export const RiskCalculator: React.FC = () => {
  const [capital, setCapital] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopPrice, setStopPrice] = useState(95);

  const amountToRisk = (capital * riskPercent) / 100;
  const riskPerShare = entryPrice - stopPrice;
  const quantity = riskPerShare > 0 ? Math.floor(amountToRisk / riskPerShare) : 0;
  const totalCost = quantity * entryPrice;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6">Rasyonel Pozisyon Büyüklüğü Hesaplayıcı</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Toplam Sermaye (₺)</label>
              <input 
                type="number" 
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">İşlem Başı Risk (%)</label>
              <input 
                type="number" 
                value={riskPercent}
                onChange={(e) => setRiskPercent(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
              />
              <p className="text-[10px] text-gray-500 mt-1">Öğrenciler için tavsiye: %1-2</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Giriş Fiyatı</label>
                <input 
                  type="number" 
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Number(e.target.value))}
                  className="w-full bg-gray-950 border border-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Stop Loss</label>
                <input 
                  type="number" 
                  value={stopPrice}
                  onChange={(e) => setStopPrice(Number(e.target.value))}
                  className="w-full bg-gray-950 border border-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-indigo-600/10 border border-indigo-600/30 p-8 rounded-2xl flex flex-col justify-center items-center text-center">
            <div className="text-indigo-400 text-sm font-bold uppercase mb-2">Alman Gereken Miktar</div>
            <div className="text-6xl font-black mb-2">{quantity} <span className="text-xl">Adet</span></div>
            <div className="text-gray-400 text-xs mb-6">Toplam Maliyet: ₺{totalCost.toLocaleString()}</div>
            
            <div className="w-full p-4 bg-gray-950/50 rounded-xl border border-gray-800">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Riske Edilen Tutar:</span>
                <span className="font-bold text-red-400">₺{amountToRisk}</span>
              </div>
              <p className="text-[10px] text-gray-600">Eğer stop-loss çalışırsa sadece bu kadar kaybedersin.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h3 className="font-bold mb-4">Üniversite Öğrencisi İçin Borsa İpuçları</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
          <li className="flex gap-3">
            <span className="text-indigo-500 font-bold">01.</span>
            <span><b>Duygu Yönetimi:</b> Paraya ihtiyacın olduğu anlarda borsa kumarhaneye dönüşür. Sadece 'ekstra' paranla işlem yap.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500 font-bold">02.</span>
            <span><b>Varant Riski:</b> Varantlarda kaldıraç 10-20x olabilir. Tüm sermayeni tek bir varant sinyaline bağlama.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500 font-bold">03.</span>
            <span><b>KAP Takibi:</b> Yazdığın Python koduna KAP (Kamuyu Aydınlatma Platformu) bildirimlerini Gemini ile özetleme özelliği ekle.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500 font-bold">04.</span>
            <span><b>Eğitim:</b> Borsa okulun yerine geçmesin. Bu dashboard'u yardımcı bir araç olarak kullan, kararlarını her zaman sen onayla.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
