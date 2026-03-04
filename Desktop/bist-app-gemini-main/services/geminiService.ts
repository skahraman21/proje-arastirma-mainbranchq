import { AIAnalysis, StockData, MacroData, CommodityData, MacroPulse, NewsItem } from "../types";

export class GeminiService {
  constructor() {
    // API Key initialization removed for UI-only mode
  }

  async fetchNews(): Promise<NewsItem[]> {
    return [
      { id: "1", title: "THYAO Beklenenden İyi Kâr Açıkladı", source: "KAP", time: "10:00", sentiment: "POSITIVE", summary: "Türk Hava Yolları, 3. çeyrekte pazar beklentilerinin %15 üzerinde net kâr açıkladı." },
      { id: "2", title: "TCMB Faiz Kararını Açıkladı", source: "TCMB", time: "14:00", sentiment: "NEUTRAL", summary: "Merkez Bankası politika faizini piyasa beklentilerine paralel olarak %50 seviyesinde sabit tuttu." },
      { id: "3", title: "Çelik İhracatında Daralma", source: "Sektör Raporu", time: "16:30", sentiment: "NEGATIVE", summary: "Avrupa'daki resesyon endişeleri nedeniyle çelik ihracatında %5 daralma gözlendi." }
    ];
  }

  async fetchMacroData(): Promise<MacroData> {
    return {
      usdTry: 35.82,
      usdChange: 0.15,
      gold: 3254,
      bist100: 9850,
      interestRate: 50.00,
      sources: []
    };
  }

  async fetchLiveMarketData(): Promise<Partial<StockData>[]> {
    return [
      { symbol: "THYAO", price: 312.50, change: 2.4, peRatio: 4.5, pbRatio: 1.2, sector: "Ulaştırma", rsi: 65 },
      { symbol: "EREGL", price: 52.10, change: -1.2, peRatio: 8.2, pbRatio: 0.9, sector: "Demir-Çelik", rsi: 42 },
      { symbol: "TUPRS", price: 168.40, change: 0.5, peRatio: 5.1, pbRatio: 1.8, sector: "Enerji", rsi: 55 },
      { symbol: "GARAN", price: 114.20, change: 1.8, peRatio: 3.8, pbRatio: 1.1, sector: "Bankacılık", rsi: 71 },
      { symbol: "ASELS", price: 68.30, change: 0.2, peRatio: 12.4, pbRatio: 4.5, sector: "Savunma", rsi: 50 }
    ];
  }

  async fetchMacroPulse(): Promise<MacroPulse> {
    return {
      dxy: 104.2,
      us10y: 4.25,
      goldSilverRatio: 84.5,
      sentiment: "Temkinli İyimser",
      rationalAdvice: "Küresel risk iştahı dengeli. ABD tahvil faizlerindeki yükseliş gelişmekte olan piyasaları baskılasa da BIST özelinde seçici hisse hareketleri (havacılık, bankacılık) devam edebilir. Nakit akışı güçlü şirketlere odaklanın.",
      geopoliticalRisk: 65,
      centralBankActivity: "NEUTRAL",
      industrialDemand: "STABLE",
      sources: []
    };
  }

  async fetchCommodityAnalysis(): Promise<CommodityData[]> {
    return [
      {
        name: "Ons Altın", symbol: "XAU", price: 2650, change: 0.8, unit: "USD",
        rationalOutlook: "Jeopolitik riskler ve enflasyonist baskılar altını destekliyor.",
        drivingForce: "Merkez Bankası Alımları",
        influenceFactor: [{ label: "Jeopolitik", impact: 15 }, { label: "FED Faiz Oranı", impact: -10 }],
        supportLevels: [2600, 2580], resistanceLevels: [2680, 2700], riskLevel: 80
      },
      {
        name: "Ons Gümüş", symbol: "XAG", price: 31.4, change: 1.5, unit: "USD",
        rationalOutlook: "Endüstriyel talep beklentileri gümüşü altın karşısında avantajlı kılıyor.",
        drivingForce: "Endüstriyel Üretim Verileri",
        influenceFactor: [{ label: "Güneş Paneli Üretimi", impact: 12 }, { label: "Çin Büyümesi", impact: 8 }],
        supportLevels: [30.5, 29.8], resistanceLevels: [32.0, 33.5], riskLevel: 65
      }
    ];
  }

  async analyzeBISTStockDeep(symbol: string, context?: string): Promise<AIAnalysis> {
    return {
      rationalSummary: `${symbol} için rasyonel görünüm mevcut konjonktürde dengeli. Makroekonomik sıkılaşma ortamında nakit yaratma kapasitesi belirleyici olacaktır.`,
      riskRating: 4.5,
      technicalOutlook: "Kısa vadeli hareketli ortalamalar üzerinde tutunma çabası sürüyor. RSI aşırı alım bölgesine yakın.",
      fundamentalOutlook: "Sektörel çarpanlara göre iskontolu işlem görmesine rağmen, borçluluk oranları yakından izlenmeli.",
      strategicAdvice: "Kademeli alım stratejisi rasyoneldir. Panik alımlardan kaçının ve destek seviyelerini test etmesini bekleyin.",
      mmInsights: "Tahtada yabancı takasında kısmi bir artış gözleniyor. Blok işlemler dikkat çekici.",
      literatureReference: "Yaşar Erdinç: 'Fiyat her şeyi içerir ama değeri şirketin ta kendisi belirler.'",
      exitLevels: { takeProfit: 350, stopLoss: 285 },
      sources: []
    };
  }
}

export const geminiService = new GeminiService();
