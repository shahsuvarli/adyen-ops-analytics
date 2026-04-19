import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie,
} from "recharts";
import {
  company, leadership, offices, departments, topMerchants, milestones,
} from "../data/adyenCompany";

const GREEN = "#0ABF53";
const DARK = "#1A1F36";

/* ── tiny helpers ───────────────────────────────────────── */
function Stat({ label, value, sub, color }) {
  return (
    <div style={{ background: "white", borderRadius: 12, padding: "18px 22px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: color || DARK, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--muted)" }}>{sub}</div>}
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 4, fontSize: 16, fontWeight: 700, color: DARK }}>{title}</div>
      {description && <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14, lineHeight: 1.5 }}>{description}</div>}
      {children}
    </div>
  );
}

const SECTOR_COLORS = {
  Technology: "#0077B6", Media: "#9B5DE5", "E-Commerce": "#F77F00",
  Retail: "#0ABF53", Travel: "#E76F51", Mobility: "#1A1F36",
  Beauty: "#E63946",
};

/* ── main component ─────────────────────────────────────── */
export default function CompanyOverview() {
  const [officeView, setOfficeView] = useState("list"); // list | chart
  const [merchantSort, setMerchantSort] = useState("revenueShare");
  const age = new Date().getFullYear() - company.founded;
  const sorted = [...topMerchants].sort((a, b) => b[merchantSort] - a[merchantSort]);

  return (
    <div>
      {/* ── 1. Company identity strip ──────────────────── */}
      <div style={{ background: `linear-gradient(135deg, ${DARK} 0%, #2D3561 100%)`, borderRadius: 16, padding: "28px 32px", marginBottom: 24, color: "white", display: "flex", gap: 32, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: GREEN, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>About the company</div>
          <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Adyen N.V.</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
            Adyen is a global financial technology platform that enables businesses to accept payments anywhere in the
            world. Founded in Amsterdam in {company.founded}, it offers an end-to-end payments solution — from gateway
            and risk management to processing and settlement — all on a single platform. Listed on Euronext Amsterdam
            under the ticker <strong style={{ color: GREEN }}>ADYEN</strong>.
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, minWidth: 340 }}>
          {[
            { label: "Founded",          val: company.founded },
            { label: "Years Operating",  val: `${age} years` },
            { label: "HQ",               val: "Amsterdam 🇳🇱" },
            { label: "Stock Exchange",   val: company.exchange },
            { label: "Countries",        val: `${company.countries}+` },
            { label: "Payment Methods",  val: `${company.paymentMethods}+` },
          ].map(({ label, val }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Top KPIs ─────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12, marginBottom: 26 }}>
        <Stat label="Total Employees"      value={company.totalEmployees.toLocaleString()} sub="as of 2024"           color={GREEN} />
        <Stat label="Processed Volume"     value={`€${company.processedVolume}B`}          sub="in 2023"             color={DARK} />
        <Stat label="Net Revenue"          value={`€${company.netRevenue}B`}                sub="2023"                color="#0077B6" />
        <Stat label="Revenue Growth"       value={`+${company.yearOverYearGrowth}%`}        sub="YoY 2023"            color={GREEN} />
        <Stat label="EBITDA Margin"        value={`${company.ebitdaMargin}%`}               sub="industry-leading"    color="#9B5DE5" />
        <Stat label="Currencies Supported" value={`${company.currencies}+`}                 sub="global coverage"     color="#E76F51" />
        <Stat label="Platform Uptime"      value={`${company.uptime}%`}                     sub="five-nines reliability" color={GREEN} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginBottom: 26 }}>

        {/* ── 3. Global offices ──────────────────────────── */}
        <Section
          title="Global Offices & Employee Distribution"
          description="Adyen operates across 40+ countries. Amsterdam remains the engineering and leadership hub, while regional offices drive local merchant relationships and 24/7 support coverage."
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {["list", "chart"].map(v => (
              <button key={v} onClick={() => setOfficeView(v)}
                style={{ padding: "5px 14px", borderRadius: 6, border: "1px solid #E2E8F0", background: officeView === v ? DARK : "white", color: officeView === v ? "white" : "var(--muted)", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                {v === "list" ? "City View" : "Chart View"}
              </button>
            ))}
          </div>

          {officeView === "list" ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {offices.map(o => (
                <div key={o.city} style={{ display: "flex", alignItems: "center", gap: 10, background: o.isHQ ? "#F0FDF4" : "#F8FAFC", border: `1px solid ${o.isHQ ? "#BBF7D0" : "#E2E8F0"}`, borderRadius: 8, padding: "10px 12px" }}>
                  <span style={{ fontSize: 22 }}>{o.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: DARK }}>
                      {o.city} {o.isHQ && <span style={{ fontSize: 10, background: GREEN, color: "white", borderRadius: 4, padding: "1px 6px", marginLeft: 4 }}>HQ</span>}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{o.country}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: o.isHQ ? GREEN : DARK }}>{o.employees.toLocaleString()}</div>
                    <div style={{ fontSize: 10, color: "var(--muted)" }}>employees</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={offices} layout="vertical" margin={{ top: 0, right: 40, left: 90, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="city" type="category" tick={{ fontSize: 11 }} width={90} />
                <Tooltip formatter={(v) => [`${v} employees`]} />
                <Bar dataKey="employees" radius={[0, 4, 4, 0]}>
                  {offices.map((o, i) => <Cell key={i} fill={o.isHQ ? GREEN : DARK} opacity={o.isHQ ? 1 : 0.65} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </Section>

        {/* ── 4. Departments ─────────────────────────────── */}
        <Section
          title="Employees by Department"
          description="Engineering is the backbone of Adyen — over a third of all staff are engineers. This reflects Adyen's belief that owning the full technology stack is a competitive advantage. The Risk team is also disproportionately large compared to most fintechs, reflecting the critical importance of fraud prevention."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {departments.map(d => (
              <div key={d.name}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 500, color: DARK }}>{d.name}</span>
                  <span style={{ color: "var(--muted)", fontWeight: 600 }}>{d.employees.toLocaleString()} <span style={{ fontWeight: 400 }}>({d.pct}%)</span></span>
                </div>
                <div style={{ background: "#f0f0f0", borderRadius: 6, height: 9 }}>
                  <div style={{ width: `${d.pct * 2.86}%`, height: "100%", background: d.color, borderRadius: 6, transition: "width 0.6s ease" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: "12px 14px", background: "#F0FDF4", borderRadius: 8, fontSize: 12, color: "#166534", lineHeight: 1.6 }}>
            <strong>Why this matters:</strong> A tech-heavy org with a strong Risk function signals a company that competes on reliability and security — not just sales.
          </div>
        </Section>
      </div>

      {/* ── 5. Top merchants ───────────────────────────── */}
      <Section
        title="Top Merchants by Revenue Contribution"
        description="Adyen's revenue comes primarily from a take-rate on processed volume. The merchants below are Adyen's highest-volume clients globally. Larger volume means more revenue for Adyen — and stronger platform stickiness, since switching payment providers at this scale is extremely difficult."
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Sort by:</span>
          {[["revenueShare", "Revenue Share"], ["volume", "Volume"]].map(([key, label]) => (
            <button key={key} onClick={() => setMerchantSort(key)}
              style={{ padding: "4px 12px", borderRadius: 6, border: "1px solid #E2E8F0", background: merchantSort === key ? DARK : "white", color: merchantSort === key ? "white" : "var(--muted)", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#F8FAFC" }}>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #E2E8F0" }}>#</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #E2E8F0" }}>Merchant</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #E2E8F0" }}>Sector</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #E2E8F0" }}>Region</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #E2E8F0" }}>Est. Volume</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #E2E8F0" }}>Revenue Share</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #E2E8F0" }}>Client Since</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((m, i) => (
                <tr key={m.name} style={{ borderBottom: "1px solid #F0F0F0" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
                  onMouseLeave={e => e.currentTarget.style.background = "white"}>
                  <td style={{ padding: "11px 16px", color: "var(--muted)", fontWeight: 700 }}>
                    {i < 3
                      ? <span style={{ color: ["#FFD700","#C0C0C0","#CD7F32"][i], fontWeight: 800, fontSize: 15 }}>{["🥇","🥈","🥉"][i]}</span>
                      : i + 1}
                  </td>
                  <td style={{ padding: "11px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: SECTOR_COLORS[m.sector] || "#888", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "white" }}>
                        {m.name[0]}
                      </div>
                      <strong>{m.name}</strong>
                    </div>
                  </td>
                  <td style={{ padding: "11px 16px" }}>
                    <span style={{ background: `${SECTOR_COLORS[m.sector]}18`, color: SECTOR_COLORS[m.sector], padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                      {m.sector}
                    </span>
                  </td>
                  <td style={{ padding: "11px 16px", color: "var(--muted)", fontSize: 12 }}>{m.region}</td>
                  <td style={{ padding: "11px 16px", fontWeight: 600 }}>{m.volume}</td>
                  <td style={{ padding: "11px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 80, background: "#f0f0f0", borderRadius: 4, height: 7 }}>
                        <div style={{ width: `${(m.revenueShare / 8.2) * 100}%`, height: "100%", background: GREEN, borderRadius: 4 }} />
                      </div>
                      <span style={{ fontWeight: 700, color: GREEN }}>{m.revenueShare}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "11px 16px", color: "var(--muted)", fontSize: 12 }}>{m.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── 6. Leadership + Timeline in 2 columns ──────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>

        <Section
          title="Senior Leadership"
          description="Adyen is founder-led — both the CEO and CTO who built the company from scratch are still in senior roles. This provides strategic continuity uncommon among fintechs of this scale."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {leadership.map(p => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 14, background: "white", borderRadius: 10, padding: "12px 16px", border: "1px solid #E2E8F0" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "white", flexShrink: 0 }}>
                  {p.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: DARK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.title}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>at Adyen since</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: p.color }}>{p.since}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Company Milestones"
          description="Key moments in Adyen's journey from a small Amsterdam startup to one of the world's most valuable fintech companies."
        >
          <div style={{ position: "relative", paddingLeft: 24 }}>
            <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: "#E2E8F0", borderRadius: 2 }} />
            {milestones.map((m, i) => (
              <div key={m.year} style={{ display: "flex", gap: 14, marginBottom: 18, position: "relative" }}>
                <div style={{ position: "absolute", left: -20, top: 4, width: 12, height: 12, borderRadius: "50%", background: i === milestones.length - 1 ? GREEN : DARK, border: "2px solid white", boxShadow: "0 0 0 2px #E2E8F0" }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: GREEN, marginBottom: 2 }}>{m.year}</div>
                  <div style={{ fontSize: 12, color: DARK, lineHeight: 1.5 }}>{m.event}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
