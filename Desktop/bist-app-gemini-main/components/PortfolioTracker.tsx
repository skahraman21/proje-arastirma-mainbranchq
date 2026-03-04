
import React, { useState, useEffect } from 'react';
import { Transaction } from '../types';

export const PortfolioTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('bist_portfolio_v3');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ 
    symbol: '', 
    entryPrice: '', 
    quantity: '', 
    currentPrice: '',
    note: '',
    mood: 'CALM',
    sector: 'Diğer'
  });

  useEffect(() => {
    localStorage.setItem('bist_portfolio_v3', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.symbol || !form.entryPrice || !form.quantity) return;

    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      symbol: form.symbol.toUpperCase(),
      entryPrice: Number(form.entryPrice),
      quantity: Number(form.quantity),
      currentPrice: Number(form.currentPrice) || Number(form.entryPrice),
      date: new Date().toLocaleDateString('tr-TR'),
      note: form.note,
      mood: form.mood as any,
      sector: form.sector
    };

    setTransactions([...transactions, newTx]);
    setForm({ symbol: '', entryPrice: '', quantity: '', currentPrice: '', note: '', mood: 'CALM', sector: 'Diğer' });
  };

  const deleteTransaction = (id: string) => {
    if(window.confirm('Bu kaydı silmek istediğine emin misin?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const totalCost = transactions.reduce((acc, t) => acc + (t.entryPrice * t.quantity), 0);
  const totalValue = transactions.reduce((acc, t) => acc + (t.currentPrice * t.quantity), 0);
  const totalPnL = totalValue - totalCost;
  const pnlPercent = totalCost > 0 ? (totalPnL / totalCost) * 100 : 0;

  // Sektörel Dağılım Hesaplama
  const sectorMap: Record<string, number> = {};
  transactions.forEach(t => {
    const value = t.currentPrice * t.quantity;
    sectorMap[t.sector!] = (sectorMap[t.sector!] || 0) + value;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Toplam Portföy" value={`₺${totalValue.toLocaleString()}`} color="text-indigo-400" />
        <SummaryCard title="Kâr / Zarar" value={`₺${totalPnL.toLocaleString()}`} subValue={`%${pnlPercent.toFixed(2)}`} color={totalPnL >= 0 ? 'text-green-400' : 'text-red-400'} />
        <SummaryCard title="Açık Pozisyon" value={transactions.length} color="text-white" />
        <SummaryCard title="Nakit Dengesi" value="₺450" subValue="Harçlık payı" color="text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Diversifikasyon Barı */}
         <div className="lg:col-span-2 bg-gray-900 p-8 rounded-3xl border border-gray-800">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Sektörel Dağılım & Risk</h3>
            <div className="h-4 w-full bg-gray-950 rounded-full overflow-hidden flex mb-6">
               {Object.entries(sectorMap).map(([sector, val], idx) => (
                  <div 
                    key={sector} 
                    style={{ width: `${(val / totalValue) * 100}%` }}
                    className={`h-full ${['bg-indigo-600', 'bg-green-600', 'bg-yellow-600', 'bg-red-600'][idx % 4]}`}
                    title={sector}
                  ></div>
               ))}
            </div>
            <div className="flex flex-wrap gap-6">
               {Object.entries(sectorMap).map(([sector, val], idx) => (
                  <div key={sector} className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${['bg-indigo-600', 'bg-green-600', 'bg-yellow-600', 'bg-red-600'][idx % 4]}`}></div>
                     <span className="text-[10px] font-bold text-gray-400 uppercase">{sector}: <b className="text-white">%{((val / totalValue) * 100).toFixed(1)}</b></span>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl">
            <h4 className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-widest">Rasyonel Analiz</h4>
            <p className="text-[10px] text-gray-400 leading-relaxed italic">
               "Bir öğrenci olarak tek bir sektöre (örn: sadece Banka) odaklanmak yüksek risk taşır. Sektörel çeşitlilik, piyasadaki ani dalgalanmalara karşı kalkanındır."
            </p>
         </div>
      </div>

      <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
        <h3 className="text-sm font-bold mb-6 uppercase text-gray-400 tracking-widest">Yeni İşlem Kaydı</h3>
        <form onSubmit={addTransaction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <input type="text" placeholder="Sembol (THYAO)" value={form.symbol} onChange={e => setForm({...form, symbol: e.target.value})} className="bg-gray-950 border border-gray-800 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-600" />
            <input type="number" placeholder="Alış Fiyatı" value={form.entryPrice} onChange={e => setForm({...form, entryPrice: e.target.value})} className="bg-gray-950 border border-gray-800 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-600" />
            <input type="number" placeholder="Adet" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} className="bg-gray-950 border border-gray-800 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-600" />
            <select value={form.sector} onChange={e => setForm({...form, sector: e.target.value})} className="bg-gray-950 border border-gray-800 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-600">
               <option value="Ulaştırma">Ulaştırma</option>
               <option value="Bankacılık">Bankacılık</option>
               <option value="Holding">Holding</option>
               <option value="Enerji">Enerji</option>
               <option value="Demir Çelik">Demir Çelik</option>
               <option value="Perakende">Perakende</option>
               <option value="Diğer">Diğer</option>
            </select>
            <select value={form.mood} onChange={e => setForm({...form, mood: e.target.value})} className="bg-gray-950 border border-gray-800 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-600">
              <option value="CALM">Sakin / Rasyonel</option>
              <option value="FOMO">Fırsat Kaçıyor (FOMO)</option>
              <option value="PANIC">Panik / Korku</option>
            </select>
          </div>
          <div className="flex gap-4">
            <input type="text" placeholder="İşlem nedeni nedir? Rasyonel bir açıklama yaz..." value={form.note} onChange={e => setForm({...form, note: e.target.value})} className="flex-1 bg-gray-950 border border-gray-800 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-600" />
            <button type="submit" className="bg-indigo-600 px-10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">Kaydet</button>
          </div>
        </form>
      </div>

      <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-gray-800/50 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            <tr>
              <th className="p-6">Varlık & Strateji</th>
              <th className="p-6">Sektör</th>
              <th className="p-6 text-right">Maliyet/Güncel</th>
              <th className="p-6 text-right">Performans</th>
              <th className="p-6 text-center">Yönet</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {transactions.map(t => {
              const pnl = (t.currentPrice - t.entryPrice) * t.quantity;
              const pnlPct = ((t.currentPrice - t.entryPrice) / t.entryPrice) * 100;
              return (
                <tr key={t.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-6">
                    <div className="font-black text-sm">{t.symbol}</div>
                    <div className="text-[10px] text-gray-500 italic mt-1">{t.note || 'Rasyonel not bırakılmadı.'}</div>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] font-black px-2 py-1 bg-gray-950 border border-gray-800 rounded-lg text-gray-400">
                      {t.sector}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="text-[10px] text-gray-600">₺{t.entryPrice}</div>
                    <div className="font-bold text-sm">₺{t.currentPrice}</div>
                  </td>
                  <td className={`p-6 text-right`}>
                    <div className={`font-black text-sm ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>₺{pnl.toLocaleString()}</div>
                    <div className={`text-[10px] font-bold ${pnl >= 0 ? 'text-green-500/50' : 'text-red-500/50'}`}>%{pnlPct.toFixed(2)}</div>
                  </td>
                  <td className="p-6 text-center">
                    <button onClick={() => deleteTransaction(t.id)} className="w-8 h-8 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-500 transition-all">🗑️</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{ title: string; value: string | number; subValue?: string; color: string }> = ({ title, value, subValue, color }) => (
  <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-xl">
    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{title}</div>
    <div className={`text-2xl font-black tracking-tighter ${color}`}>{value}</div>
    {subValue && <div className={`text-[10px] font-bold ${color} opacity-60 mt-1`}>{subValue}</div>}
  </div>
);
