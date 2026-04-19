export const competitors = [
  {
    name: "Adyen",
    logo: "A",
    color: "#0ABF53",
    founded: 2006,
    hq: "Amsterdam 🇳🇱",
    model: "Full-stack payments platform",
    revenueB: 1.84,   // USD (converted from €1.686B)
    ebitdaMargin: 43,
    volumeT: 1.06,    // USD trillion
    marketCapB: 38,
    employees: 4026,
    takeRate: 0.17,
    isAdyen: true,
  },
  {
    name: "Stripe",
    logo: "S",
    color: "#635BFF",
    founded: 2010,
    hq: "San Francisco 🇺🇸",
    model: "Developer-first payments API",
    revenueB: 3.4,    // estimated
    ebitdaMargin: 25,
    volumeT: 1.0,     // estimated
    marketCapB: 65,   // last private valuation
    employees: 8000,
    takeRate: 0.29,
    isAdyen: false,
  },
  {
    name: "PayPal",
    logo: "P",
    color: "#003087",
    founded: 1998,
    hq: "San Jose 🇺🇸",
    model: "Consumer wallet + merchant payments",
    revenueB: 29.8,
    ebitdaMargin: 22,
    volumeT: 1.53,
    marketCapB: 65,
    employees: 21800,
    takeRate: 0.49,
    isAdyen: false,
  },
  {
    name: "Worldline",
    logo: "W",
    color: "#E30613",
    founded: 1974,
    hq: "Paris 🇫🇷",
    model: "European payment services & terminals",
    revenueB: 5.0,
    ebitdaMargin: 28,
    volumeT: 0.52,
    marketCapB: 7,
    employees: 18000,
    takeRate: 0.96,
    isAdyen: false,
  },
  {
    name: "Block (Square)",
    logo: "B",
    color: "#1A1A1A",
    founded: 2009,
    hq: "Oakland 🇺🇸",
    model: "SMB payments + CashApp ecosystem",
    revenueB: 21.9,
    ebitdaMargin: 10,
    volumeT: 0.23,
    marketCapB: 40,
    employees: 12000,
    takeRate: 0.58,
    isAdyen: false,
  },
];

// Revenue comparison over time — net/payment revenue only (excl consumer wallets)
export const revenueTimeline = [
  { year: "2020", Adyen: 0.95, Stripe: 1.8,  PayPal: 4.0, Worldline: 2.8, Block: 3.2 },
  { year: "2021", Adyen: 1.30, Stripe: 2.5,  PayPal: 5.8, Worldline: 3.9, Block: 9.5 },
  { year: "2022", Adyen: 1.44, Stripe: 2.9,  PayPal: 6.9, Worldline: 4.4, Block: 17.5 },
  { year: "2023", Adyen: 1.84, Stripe: 3.4,  PayPal: 7.4, Worldline: 5.0, Block: 21.9 },
];

// EBITDA margin comparison
export const marginComparison = [
  { name: "Adyen",   margin: 43, color: "#0ABF53" },
  { name: "Worldline", margin: 28, color: "#E30613" },
  { name: "Stripe",  margin: 25, color: "#635BFF" },
  { name: "PayPal",  margin: 22, color: "#003087" },
  { name: "Block",   margin: 10, color: "#1A1A1A" },
];

// Global payments market share (% of enterprise payment processing volume)
export const marketShare = [
  { name: "PayPal",           share: 22, color: "#003087" },
  { name: "Stripe",           share: 18, color: "#635BFF" },
  { name: "Adyen",            share: 14, color: "#0ABF53" },
  { name: "Worldline",        share: 9,  color: "#E30613" },
  { name: "Block",            share: 7,  color: "#1A1A1A" },
  { name: "Others",           share: 30, color: "#CBD5E1" },
];

// Regional strength — 1 (weak) to 5 (dominant)
export const regionalStrength = [
  { region: "Europe",        Adyen: 5, Stripe: 3, PayPal: 4, Worldline: 4, Block: 2 },
  { region: "North America", Adyen: 3, Stripe: 5, PayPal: 5, Worldline: 1, Block: 4 },
  { region: "Asia-Pacific",  Adyen: 3, Stripe: 3, PayPal: 3, Worldline: 2, Block: 2 },
  { region: "Latin America", Adyen: 2, Stripe: 2, PayPal: 4, Worldline: 1, Block: 2 },
];

// Vertical strength — 1 to 5
export const verticalStrength = [
  { vertical: "Enterprise Retail",  Adyen: 5, Stripe: 3, PayPal: 3, Worldline: 4, Block: 2 },
  { vertical: "Digital / SaaS",     Adyen: 4, Stripe: 5, PayPal: 3, Worldline: 2, Block: 3 },
  { vertical: "Marketplaces",       Adyen: 5, Stripe: 4, PayPal: 4, Worldline: 2, Block: 3 },
  { vertical: "Small Business",     Adyen: 2, Stripe: 4, PayPal: 4, Worldline: 3, Block: 5 },
  { vertical: "Physical Stores",    Adyen: 4, Stripe: 2, PayPal: 2, Worldline: 5, Block: 4 },
  { vertical: "Travel & Airlines",  Adyen: 5, Stripe: 3, PayPal: 3, Worldline: 3, Block: 1 },
];

// Analyst ratings (consensus approx.)
export const analystRatings = [
  { name: "Adyen",    buy: 18, hold: 8,  sell: 2,  avgTarget: 1720, currentPrice: 1480, currency: "€" },
  { name: "PayPal",   buy: 22, hold: 12, sell: 4,  avgTarget: 72,   currentPrice: 63,   currency: "$" },
  { name: "Block",    buy: 28, hold: 10, sell: 3,  avgTarget: 92,   currentPrice: 68,   currency: "$" },
  { name: "Worldline",buy: 10, hold: 14, sell: 8,  avgTarget: 11,   currentPrice: 8,    currency: "€" },
];

// Competitive positioning scatter (volume vs margin)
export const positioning = competitors.map(c => ({
  name: c.name,
  volume: c.volumeT,
  margin: c.ebitdaMargin,
  revenue: c.revenueB,
  color: c.color,
}));
