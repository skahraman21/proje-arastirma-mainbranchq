
export interface MacroData {
  usdTry: number;
  usdChange: number;
  gold: number;
  bist100: number;
  interestRate: number;
  sources?: { title: string; uri: string }[];
}

export interface CommodityData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  unit: string;
  rationalOutlook: string;
  riskLevel: number;
  supportLevels: number[];
  resistanceLevels: number[];
  drivingForce: string; // Fiyatı asıl hareket ettiren güç (Örn: Merkez Bankası alımları)
  influenceFactor: {
    label: string;
    impact: number; // -100 ile +100 arası etki skoru
  }[];
  sources?: { title: string; uri: string }[];
}

export interface MacroPulse {
  dxy: number;
  us10y: number;
  goldSilverRatio: number;
  sentiment: string;
  rationalAdvice: string;
  geopoliticalRisk: number; // 0-100 arası jeopolitik tansiyon
  centralBankActivity: 'ACCUMULATING' | 'NEUTRAL' | 'SELLING';
  industrialDemand: 'HIGH' | 'STABLE' | 'LOW';
  sources?: { title: string; uri: string }[];
}

export interface AIAnalysis {
  rationalSummary: string;
  riskRating: number;
  technicalOutlook: string;
  fundamentalOutlook: string;
  strategicAdvice: string;
  exitLevels?: { takeProfit: number; stopLoss: number };
  mmInsights?: string; 
  sources: { title: string; uri: string }[];
  literatureReference?: string; 
}

export interface BookReference {
  title: string;
  author: string;
  topic: 'TECHNICAL' | 'FUNDAMENTAL' | 'PSYCHOLOGY';
  description: string;
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  volume: string;
  peRatio?: number; 
  pbRatio?: number; 
  sector?: string; 
  sectorPeAverage?: number; 
  roe?: number; 
  netProfitMargin?: number; 
  pegRatio?: number; 
  dividendYield?: number; 
  rsi?: number; 
  macd?: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  ma50?: number;
  ma200?: number;
  lastKapNews?: string;
  debtToEquity?: number;
  netDebtToEbitda?: number;
  currentRatio?: number;
  freeCashFlow?: string;
  beta?: number;
  spread?: number;             
  depthScore?: number;        
  vwap?: number;              
  orderImbalance?: number;    
  mmParticipation?: number;   
  sources?: { title: string; uri: string }[];
}

export enum MarketStatus {
  OPEN = 'AÇIK',
  CLOSED = 'KAPALI'
}

export interface Transaction {
  id: string;
  symbol: string;
  entryPrice: number;
  quantity: number;
  currentPrice: number;
  date: string;
  note?: string;
  mood: 'CALM' | 'FOMO' | 'PANIC';
  sector?: string;
}

export interface SimulatedTrade {
  date: string;
  kod: string;
  entry: number;
  exit: number;
  pnl: number;
  status: 'WIN' | 'LOSS';
  reason: string;
}

export interface BacktestResult {
  totalTrades: number;
  winRate: number;
  totalProfitLoss: number;
  maxDrawdown: number;
  signals: SimulatedTrade[];
  aiReport?: string;
}

export interface WarrantSignal {
  kod: string;
  dayanak: string;
  price: number;
  trend: 'YUKARI' | 'ASAGI';
  score: number;
  vade: number;
  delta: number;
  timestamp: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  summary: string;
}
