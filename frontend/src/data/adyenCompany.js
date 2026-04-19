export const company = {
  founded: 2006,
  hq: "Amsterdam, Netherlands",
  exchange: "Euronext Amsterdam",
  ticker: "ADYEN",
  totalEmployees: 4026,
  countries: 40,
  paymentMethods: 250,
  currencies: 135,
  uptime: 99.999,
  processedVolume: 970.1,   // €B in 2023
  netRevenue: 1.686,        // €B in 2023
  ebitdaMargin: 43,         // %
  takeRate: 0.17,           // %
  merchantsServed: 900,     // enterprise merchants approx
  yearOverYearGrowth: 23,   // % net revenue growth 2023
};

export const leadership = [
  { name: "Pieter van der Does", title: "CEO & Co-Founder", since: 2006, initials: "PD", color: "#0ABF53" },
  { name: "Ingo Uytdehaage",     title: "CFO",              since: 2015, initials: "IU", color: "#1A1F36" },
  { name: "Alexander Breiter",   title: "CTO",              since: 2018, initials: "AB", color: "#0077B6" },
  { name: "Kamran Zaki",         title: "President & COO",  since: 2019, initials: "KZ", color: "#E76F51" },
  { name: "Mariëtte Swart",      title: "Chief People Officer", since: 2020, initials: "MS", color: "#9B5DE5" },
  { name: "Arnout Schuijff",     title: "CTO Emeritus & Co-Founder", since: 2006, initials: "AS", color: "#F77F00" },
];

export const offices = [
  { city: "Amsterdam",    country: "Netherlands", flag: "🇳🇱", employees: 1840, isHQ: true },
  { city: "San Francisco",country: "USA",         flag: "🇺🇸", employees: 420  },
  { city: "Singapore",    country: "Singapore",   flag: "🇸🇬", employees: 310  },
  { city: "London",       country: "UK",          flag: "🇬🇧", employees: 290  },
  { city: "New York",     country: "USA",         flag: "🇺🇸", employees: 210  },
  { city: "São Paulo",    country: "Brazil",      flag: "🇧🇷", employees: 175  },
  { city: "Shanghai",     country: "China",       flag: "🇨🇳", employees: 160  },
  { city: "Sydney",       country: "Australia",   flag: "🇦🇺", employees: 130  },
  { city: "Stockholm",    country: "Sweden",      flag: "🇸🇪", employees: 95   },
  { city: "Dubai",        country: "UAE",         flag: "🇦🇪", employees: 85   },
  { city: "Mumbai",       country: "India",       flag: "🇮🇳", employees: 80   },
  { city: "Mexico City",  country: "Mexico",      flag: "🇲🇽", employees: 75   },
  { city: "Toronto",      country: "Canada",      flag: "🇨🇦", employees: 60   },
  { city: "Berlin",       country: "Germany",     flag: "🇩🇪", employees: 55   },
  { city: "Tokyo",        country: "Japan",       flag: "🇯🇵", employees: 41   },
];

export const departments = [
  { name: "Engineering & Technology", employees: 1420, pct: 35, color: "#0ABF53" },
  { name: "Commercial & Sales",       employees: 726,  pct: 18, color: "#1A1F36" },
  { name: "Operations & Support",     employees: 564,  pct: 14, color: "#0077B6" },
  { name: "Risk & Fraud Prevention",  employees: 403,  pct: 10, color: "#E76F51" },
  { name: "Product & Design",         employees: 322,  pct: 8,  color: "#9B5DE5" },
  { name: "Finance & Legal",          employees: 282,  pct: 7,  color: "#F77F00" },
  { name: "People & Culture",         employees: 201,  pct: 5,  color: "#4CC9F0" },
  { name: "Marketing & Brand",        employees: 108,  pct: 3,  color: "#E63946" },
];

export const topMerchants = [
  { name: "Meta",         sector: "Technology",   logo: "🟦", revenueShare: 8.2,  region: "Global",   since: 2011, volume: "€79.5B" },
  { name: "Spotify",      sector: "Media",        logo: "🟢", revenueShare: 6.8,  region: "Global",   since: 2013, volume: "€65.9B" },
  { name: "Microsoft",    sector: "Technology",   logo: "🟩", revenueShare: 6.1,  region: "Global",   since: 2014, volume: "€59.2B" },
  { name: "eBay",         sector: "E-Commerce",   logo: "🔴", revenueShare: 5.9,  region: "Global",   since: 2018, volume: "€57.2B" },
  { name: "Uber",         sector: "Mobility",     logo: "⬛", revenueShare: 5.4,  region: "Global",   since: 2017, volume: "€52.4B" },
  { name: "Booking.com",  sector: "Travel",       logo: "🔵", revenueShare: 4.8,  region: "EMEA",     since: 2015, volume: "€46.6B" },
  { name: "Netflix",      sector: "Media",        logo: "🟥", revenueShare: 4.2,  region: "Global",   since: 2016, volume: "€40.7B" },
  { name: "Airbnb",       sector: "Travel",       logo: "🔶", revenueShare: 3.9,  region: "Global",   since: 2017, volume: "€37.8B" },
  { name: "McDonald's",   sector: "Retail",       logo: "🟡", revenueShare: 3.5,  region: "EMEA/APAC",since: 2019, volume: "€33.9B" },
  { name: "H&M",          sector: "Retail",       logo: "🟥", revenueShare: 3.1,  region: "Global",   since: 2016, volume: "€30.1B" },
  { name: "Nike",         sector: "Retail",       logo: "⬛", revenueShare: 2.8,  region: "Global",   since: 2018, volume: "€27.2B" },
  { name: "LinkedIn",     sector: "Technology",   logo: "🔷", revenueShare: 2.5,  region: "Global",   since: 2019, volume: "€24.3B" },
  { name: "Etsy",         sector: "E-Commerce",   logo: "🟠", revenueShare: 2.2,  region: "AMER",     since: 2020, volume: "€21.3B" },
  { name: "L'Oréal",      sector: "Beauty",       logo: "🟣", revenueShare: 1.9,  region: "EMEA",     since: 2018, volume: "€18.4B" },
  { name: "JetBlue",      sector: "Travel",       logo: "🔵", revenueShare: 1.6,  region: "AMER",     since: 2021, volume: "€15.5B" },
];

export const milestones = [
  { year: 2006, event: "Founded in Amsterdam by Pieter van der Does and Arnout Schuijff" },
  { year: 2011, event: "First major global merchant signed: Meta (Facebook Ads)" },
  { year: 2013, event: "Processed first €1B in a single month" },
  { year: 2015, event: "Launched Adyen for Platforms — now a key product pillar" },
  { year: 2018, event: "IPO on Euronext Amsterdam; shares rose 90% on first day" },
  { year: 2020, event: "Launched Adyen Issuing — enabling customers to issue branded cards" },
  { year: 2021, event: "Crossed €300B in annual processing volume" },
  { year: 2023, event: "Processed €970B — on track to cross €1 trillion by 2025" },
];
