import { useNavigate } from "react-router-dom";

const GREEN  = "#0ABF53";
const DARK   = "#1A1F36";
const BLUE   = "#0077B6";

const allPages = [
  { id: "company", label: "Company Overview",     icon: "🏢", color: BLUE,   desc: "Headcount, global offices, leadership team, top merchants, and key milestones." },
  { id: "finance", label: "Financial Highlights", icon: "📈", color: "#16A34A", desc: "Revenue, EBITDA, processed volume, take rate, and stock performance." },
  { id: "market",  label: "Market & Competition", icon: "🌍", color: "#0077B6", desc: "How Adyen compares to Stripe, PayPal, Worldline, and Block." },
  { id: "people",  label: "People & Culture",     icon: "👥", color: "#9B5DE5", desc: "Workforce diversity, attrition, Glassdoor ratings, and employer awards." },
  { id: "about",   label: "Why Me?",              icon: "👤", color: GREEN,   desc: "My career history, skills, side projects, and why I'm applying for this role.", featured: true },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>

      {/* ── Hero ─────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(135deg, ${DARK} 0%, #2D3561 100%)`, borderRadius: 16, padding: "40px 44px", marginBottom: 24, color: "white" }}>
        <div style={{ fontSize: 12, color: GREEN, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 12 }}>
          Senior Data Analyst · Operations Analytics
        </div>
        <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 10, lineHeight: 1.2 }}>
          Welcome to my Adyen Portfolio
        </div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 24 }}>
          I built this interactive dashboard to give you a complete picture — both of Adyen as a business and of who I am
          as a data professional. Use the menu on the left to explore each section.
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ background: "rgba(10,191,83,0.15)", border: "1px solid rgba(10,191,83,0.35)", borderRadius: 8, padding: "10px 18px", fontSize: 12 }}>
            <span style={{ color: GREEN, fontWeight: 700 }}>Role: </span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Senior Data Analyst — Operations Analytics</span>
          </div>
          <div style={{ background: "rgba(10,191,83,0.15)", border: "1px solid rgba(10,191,83,0.35)", borderRadius: 8, padding: "10px 18px", fontSize: 12 }}>
            <span style={{ color: GREEN, fontWeight: 700 }}>Location: </span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Amsterdam, Netherlands</span>
          </div>
          <div style={{ background: "rgba(10,191,83,0.15)", border: "1px solid rgba(10,191,83,0.35)", borderRadius: 8, padding: "10px 18px", fontSize: 12 }}>
            <span style={{ color: GREEN, fontWeight: 700 }}>Candidate: </span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Elvin Shahsuvarli</span>
          </div>
        </div>
      </div>

      {/* ── Why Adyen Why Now ────────────────────────── */}
      <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 14, padding: "28px 32px", marginBottom: 24, display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ fontSize: 36, flexShrink: 0 }}>💬</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: GREEN, marginBottom: 10 }}>Why Adyen, why now</div>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.8 }}>
            I built this entire dashboard — from the data architecture and Python pipelines to the React frontend —
            specifically to demonstrate what I would do in this role. Not because I was asked to, but because I believe
            the best way to show you I can turn complex data into stories that shape business decisions is to actually do it.
            Adyen's platform sits at the intersection of technology, operations, and global commerce — exactly the environment
            where I do my best work. I am ready to start on day one.
          </div>
        </div>
      </div>

      {/* ── Menu guide ───────────────────────────────── */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 4 }}>What's inside</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 18 }}>
          Click any card to jump straight to that section.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {allPages.map(p => p.featured ? (
            <div
              key={p.id}
              onClick={() => navigate(`/${p.id}`)}
              style={{ background: `linear-gradient(135deg, ${DARK} 0%, #2D3561 100%)`, border: `1px solid ${GREEN}`, borderRadius: 12, padding: "20px 18px", cursor: "pointer", transition: "box-shadow 0.15s, transform 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 6px 24px rgba(10,191,83,0.25)`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>{p.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: GREEN, marginBottom: 6 }}>{p.label}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ) : (
            <div
              key={p.id}
              onClick={() => navigate(`/${p.id}`)}
              style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: "20px 18px", cursor: "pointer", transition: "box-shadow 0.15s, border-color 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = p.color; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#E2E8F0"; }}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>{p.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.color, marginBottom: 6 }}>{p.label}</div>
              <div style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
