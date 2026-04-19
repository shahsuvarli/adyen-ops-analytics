# Adyen Ops Analytics — Senior DA Portfolio

An interactive portfolio dashboard built for a **Senior Data Analyst (Operations Analytics)** interview at Adyen. It covers Adyen as a business and makes the case for why I am the right person for the role.

**Live candidate:** Elvin Shahsuvarli · [linkedin.com/in/shahsuvarli](https://linkedin.com/in/shahsuvarli) · [github.com/shahsuvarli](https://github.com/shahsuvarli)

---

## What's inside

| Page | Description |
|------|-------------|
| **Home** | Welcome page with a menu guide and the "Why Adyen, why now" statement |
| **Company Overview** | Headcount, global offices, leadership, top merchants, and key milestones |
| **Financial Highlights** | Revenue, EBITDA, processed volume, take rate, and stock performance |
| **Market & Competition** | Adyen vs Stripe, PayPal, Worldline, and Block — margins, market share, regional strength |
| **People & Culture** | Workforce diversity, attrition, Glassdoor ratings, and employer awards |
| **Why Me?** | Career timeline, skills, side projects, hobbies, and fit for the role |

Each page includes an **Export PDF** button that captures the content and downloads a one-page summary.

---

## Tech stack

| Layer | Tools |
|-------|-------|
| Frontend | React 18 + Vite |
| Charts | Recharts |
| Routing | React Router v6 |
| PDF export | jsPDF + html2canvas |
| Data | Hardcoded public Adyen data in `/src/data/` |
| Styling | Inline styles (no CSS framework) |

---

## Quick start

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Project structure

```
frontend/
├── src/
│   ├── App.jsx                  # Layout, routing, sidebar, PDF button
│   ├── components/
│   │   └── ExportPdfButton.jsx  # Reusable PDF export component
│   ├── data/
│   │   ├── adyenCompany.js
│   │   ├── adyenFinancials.js
│   │   ├── adyenMarket.js
│   │   └── adyenPeople.js
│   └── pages/
│       ├── Home.jsx
│       ├── CompanyOverview.jsx
│       ├── FinancialHighlights.jsx
│       ├── MarketCompetition.jsx
│       ├── PeopleAndCulture.jsx
│       └── AboutMe.jsx
└── package.json
```

---

Built specifically for this application — not because it was asked for, but because the best way to show I can turn data into decisions is to actually do it.
