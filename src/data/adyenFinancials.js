export const annualRevenue = [
  { year: "2020", revenue: 0.868, growth: null,  ebitda: 0.355, ebitdaMargin: 41, netIncome: 0.310 },
  { year: "2021", revenue: 1.187, growth: 36.7,  ebitda: 0.501, ebitdaMargin: 42, netIncome: 0.388 },
  { year: "2022", revenue: 1.316, growth: 10.9,  ebitda: 0.533, ebitdaMargin: 40, netIncome: 0.429 },
  { year: "2023", revenue: 1.686, growth: 28.1,  ebitda: 0.727, ebitdaMargin: 43, netIncome: 0.496 },
];

export const processedVolume = [
  { year: "2020", volume: 303.0, revenueM: 868  },
  { year: "2021", volume: 516.0, revenueM: 1187 },
  { year: "2022", volume: 767.5, revenueM: 1316 },
  { year: "2023", volume: 970.1, revenueM: 1686 },
];

export const takeRate = [
  { year: "2020", rate: 0.286 },
  { year: "2021", rate: 0.230 },
  { year: "2022", rate: 0.172 },
  { year: "2023", rate: 0.174 },
];

export const revenueByRegion = [
  { region: "Europe",        amount: 0.894, pct: 53, color: "#0ABF53" },
  { region: "North America", amount: 0.422, pct: 25, color: "#1A1F36" },
  { region: "Asia-Pacific",  amount: 0.253, pct: 15, color: "#0077B6" },
  { region: "Latin America", amount: 0.118, pct: 7,  color: "#E76F51" },
];

export const revenueByChannel = [
  { channel: "Digital",          amount: 0.860, pct: 51, color: "#0ABF53",
    description: "E-commerce merchants — Spotify, Netflix, LinkedIn" },
  { channel: "Unified Commerce", amount: 0.523, pct: 31, color: "#1A1F36",
    description: "Online + physical retail — H&M, McDonald's, Nike" },
  { channel: "Platforms",        amount: 0.304, pct: 18, color: "#0077B6",
    description: "Marketplaces & platforms — eBay, Etsy, Booking.com" },
];

export const costStructure = [
  { year: "2020", employees: 48, technology: 18, salesMarketing: 12, other: 22 },
  { year: "2021", employees: 46, technology: 17, salesMarketing: 13, other: 24 },
  { year: "2022", employees: 52, technology: 16, salesMarketing: 11, other: 21 },
  { year: "2023", employees: 44, technology: 17, salesMarketing: 10, other: 29 },
];

export const stockMilestones = [
  { date: "Jun 2018", price: 240,  label: "IPO",             note: "Raised €1.0B, listed at €240" },
  { date: "Jan 2020", price: 870,  label: "Pre-COVID peak",  note: "Strong volume growth" },
  { date: "Aug 2021", price: 2770, label: "All-time high",   note: "Post-COVID e-commerce boom" },
  { date: "Aug 2023", price: 680,  label: "−75% crash",      note: "Revenue miss + hiring slowdown warning" },
  { date: "Dec 2023", price: 1200, label: "Recovery begins", note: "Cost discipline restored confidence" },
  { date: "Apr 2024", price: 1480, label: "Current",         note: "Steady recovery, margins intact" },
];

export const efficiencyKpis = [
  { label: "Revenue per Employee",  value: "€419K",  sub: "vs ~€180K fintech avg",   color: "#0ABF53" },
  { label: "EBITDA Margin",         value: "43%",    sub: "top-tier in payments",     color: "#1A1F36" },
  { label: "Net Revenue CAGR",      value: "25%",    sub: "2020–2023",                color: "#0077B6" },
  { label: "Volume CAGR",           value: "47%",    sub: "2020–2023",                color: "#E76F51" },
  { label: "Take Rate",             value: "0.17%",  sub: "per €100 processed",       color: "#9B5DE5" },
  { label: "Net Income Margin",     value: "29%",    sub: "of net revenue",           color: "#F77F00" },
];
