import { useRef } from "react";
import { useNavigate, useLocation, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ExportPdfButton from "./components/ExportPdfButton";
import CompanyOverview from "./pages/CompanyOverview";
import FinancialHighlights from "./pages/FinancialHighlights";
import MarketCompetition from "./pages/MarketCompetition";
import PeopleAndCulture from "./pages/PeopleAndCulture";
import AboutMe from "./pages/AboutMe";

const NAV_SECTIONS = [
  {
    label: "START HERE",
    items: [
      { id: "home", label: "Home", icon: "🏠" },
    ],
  },
  {
    label: "ABOUT ADYEN",
    items: [
      { id: "company", label: "Company Overview",    icon: "🏢" },
      { id: "finance", label: "Financial Highlights", icon: "📈" },
      { id: "market",  label: "Market & Competition", icon: "🌍" },
      { id: "people",  label: "People & Culture",     icon: "👥" },
    ],
  },
  {
    label: "ABOUT ME",
    items: [
      { id: "about", label: "Why Me?", icon: "👤" },
    ],
  },
];

const PAGE_TITLES = {
  home:    { title: "Welcome",                sub: "An interactive portfolio built for Adyen — explore the company, the market, and why I am the right fit" },
  company: { title: "Company Overview",       sub: "Adyen at a glance — people, offices, leadership, key clients, and the journey so far" },
  finance: { title: "Financial Highlights",   sub: "Revenue, profitability, processed volume, and stock milestones — the numbers that define Adyen's business" },
  market:  { title: "Market & Competition",   sub: "How Adyen stands against Stripe, PayPal, Worldline and Block — market share, margins, regional strengths, and analyst consensus" },
  people:  { title: "People & Culture",       sub: "Who works at Adyen, how they are supported, and what makes it one of the top fintech employers in the world" },
  about:   { title: "Elvin Shahsuvarli",      sub: "Senior Data Analyst · Operations Analytics · Why Me?" },
};

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const page = pathname.replace("/", "") || "home";
  const { title, sub } = PAGE_TITLES[page] ?? PAGE_TITLES["home"];
  const contentRef = useRef(null);

  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="sidebar-logo" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>adyen<span> ops</span></div>

        {NAV_SECTIONS.map((section, si) => (
          <div key={section.label}>
            <div style={{ ...(si > 0 ? { borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 14, paddingTop: 14 } : {}), fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: 1.2, textTransform: "uppercase", paddingLeft: 12, marginBottom: 6 }}>
              {section.label}
            </div>
            {section.items.map(n => (
              <button
                key={n.id}
                className={`nav-item ${page === n.id ? "active" : ""}`}
                onClick={() => navigate(`/${n.id}`)}
              >
                <span>{n.icon}</span>
                {n.label}
              </button>
            ))}
          </div>
        ))}

        <div style={{ marginTop: "auto", fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>
          Operations Analytics<br />Senior DA Portfolio
        </div>
      </nav>

      <main className="main">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
          <div className="page-title" style={{ margin: 0 }}>{title}</div>
          {page !== "home" && <ExportPdfButton targetRef={contentRef} filename={`adyen-${page}-summary`} />}
        </div>
        <div className="page-sub">{sub}</div>
        <div ref={contentRef}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home"    element={<Home />} />
          <Route path="/company" element={<CompanyOverview />} />
          <Route path="/finance" element={<FinancialHighlights />} />
          <Route path="/market"  element={<MarketCompetition />} />
          <Route path="/people"  element={<PeopleAndCulture />} />
          <Route path="/about"   element={<AboutMe />} />
        </Routes>
        </div>
      </main>
    </div>
  );
}
