import { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ScatterChart, Scatter, ZAxis, LineChart, Line,
} from "recharts";
import {
  competitors, revenueTimeline, marginComparison,
  marketShare, regionalStrength, verticalStrength,
  analystRatings, positioning,
} from "../data/adyenMarket";

const GREEN = "#0ABF53";
const DARK  = "#1A1F36";

/* ── helpers ─────────────────────────────────────────────── */
function Panel({ title, description, children, style }) {
  return (
    <div style={{ background: "white", borderRadius: 12, padding: "20px 22px", border: "1px solid #E2E8F0", ...style }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: description ? 4 : 14 }}>{title}</div>
      {description && (
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14, lineHeight: 1.6 }}>{description}</div>
      )}
      {children}
    </div>
  );
}

const COMP_COLORS = { Adyen: "#0ABF53", Stripe: "#635BFF", PayPal: "#003087", Worldline: "#E30613", Block: "#1A1A1A" };

const StrengthDot = ({ value }) => {
  const filled = Math.round(value);
  return (
    <div style={{ display: "flex", gap: 3, justifyContent: "center" }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= filled ? GREEN : "#E2E8F0" }} />
      ))}
    </div>
  );
};

/* ── main ─────────────────────────────────────────────────── */
export default function MarketCompetition() {
  const isMobile = useIsMobile();
  const [strengthView, setStrengthView] = useState("region");
  const strengthData = strengthView === "region" ? regionalStrength : verticalStrength;
  const strengthKey  = strengthView === "region" ? "region" : "vertical";

  const RADIAN = Math.PI / 180;
  const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, share, name }) => {
    if (share < 8) return null;
    const r = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
        {share}%
      </text>
    );
  };

  return (
    <div>

      {/* ── 1. Competitor card strip ───────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5,1fr)", gap: 12, marginBottom: 22 }}>
        {competitors.map(c => (
          <div key={c.name} style={{
            background: c.isAdyen ? `linear-gradient(135deg, ${DARK} 0%, #2D3561 100%)` : "white",
            borderRadius: 12, padding: "16px 18px",
            border: c.isAdyen ? "none" : "1px solid #E2E8F0",
            color: c.isAdyen ? "white" : DARK,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "white", flexShrink: 0 }}>
                {c.logo}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</div>
                <div style={{ fontSize: 10, color: c.isAdyen ? "rgba(255,255,255,0.55)" : "var(--muted)" }}>{c.hq}</div>
              </div>
            </div>
            {[
              ["Revenue",    `$${c.revenueB}B`],
              ["Volume",     `$${c.volumeT}T`],
              ["Mkt Cap",    `$${c.marketCapB}B`],
              ["EBITDA",     `${c.ebitdaMargin}%`],
              ["Employees",  c.employees.toLocaleString()],
            ].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                <span style={{ color: c.isAdyen ? "rgba(255,255,255,0.55)" : "var(--muted)" }}>{label}</span>
                <strong style={{ color: label === "EBITDA" && c.isAdyen ? GREEN : "inherit" }}>{val}</strong>
              </div>
            ))}
            <div style={{ marginTop: 10, fontSize: 10, color: c.isAdyen ? "rgba(255,255,255,0.45)" : "var(--muted)", lineHeight: 1.5 }}>{c.model}</div>
          </div>
        ))}
      </div>

      {/* ── 2. Market share + EBITDA margin ───────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <Panel
          title="Global Enterprise Payment Processing — Market Share"
          description="Adyen holds approximately 14% of enterprise payment processing volume globally, third behind PayPal and Stripe. The key distinction: Adyen focuses exclusively on large businesses, while PayPal and Stripe serve a much broader mix including consumers and small merchants."
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <ResponsiveContainer width={190} height={190}>
              <PieChart>
                <Pie data={marketShare} dataKey="share" nameKey="name" cx="50%" cy="50%"
                  outerRadius={88} innerRadius={46} labelLine={false} label={renderPieLabel}>
                  {marketShare.map((m, i) => <Cell key={i} fill={m.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, "Market Share"]} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
              {marketShare.map(m => (
                <div key={m.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: m.color, display: "inline-block" }} />
                      <strong>{m.name}</strong>
                    </span>
                    <span style={{ color: "var(--muted)" }}>{m.share}%</span>
                  </div>
                  <div style={{ background: "#f0f0f0", borderRadius: 4, height: 6 }}>
                    <div style={{ width: `${m.share}%`, height: "100%", background: m.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel
          title="EBITDA Margin — Who Is Most Profitable?"
          description="Adyen has the highest EBITDA margin in the competitive set at 43%. This reflects its deliberate choice to stay enterprise-only, avoid consumer subsidies, and own its full technology stack. Block's low margin reflects heavy investment in CashApp growth."
        >
          <ResponsiveContainer width="100%" height={195}>
            <BarChart data={marginComparison} layout="vertical" margin={{ top: 0, right: 50, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} domain={[0, 50]} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={70} />
              <Tooltip formatter={(v) => [`${v}%`, "EBITDA Margin"]} />
              <Bar dataKey="margin" radius={[0, 6, 6, 0]} label={{ position: "right", fontSize: 12, fontWeight: 700, formatter: v => `${v}%` }}>
                {marginComparison.map((m, i) => <Cell key={i} fill={m.color} opacity={m.name === "Adyen" ? 1 : 0.65} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* ── 3. Revenue timeline ────────────────────────── */}
      <Panel
        title="Net Revenue Growth — Adyen vs Peers (USD Billions)"
        description="Adyen's revenue is smaller in absolute terms than PayPal or Block, but those companies serve very different markets — PayPal includes Venmo consumer transactions, Block includes CashApp. When compared on payment-only revenue, Adyen's growth trajectory and margin profile are significantly stronger."
        style={{ marginBottom: 18 }}
      >
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={revenueTimeline} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v}B`} />
            <Tooltip formatter={(v, n) => [`$${v}B`, n]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {Object.keys(COMP_COLORS).map(name => (
              <Line key={name} type="monotone" dataKey={name}
                stroke={COMP_COLORS[name]}
                strokeWidth={name === "Adyen" ? 3 : 1.5}
                strokeDasharray={name === "Adyen" ? "none" : "4 3"}
                dot={{ r: name === "Adyen" ? 5 : 3, fill: COMP_COLORS[name] }}
                name={name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Panel>

      {/* ── 4. Strength matrix + Analyst ──────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "3fr 2fr", gap: 18, marginBottom: 18 }}>
        <Panel
          title="Where Each Company Is Strongest"
          description="Adyen dominates in enterprise retail, travel, and marketplaces — high-volume, complex merchants that need a global single platform. Stripe owns the developer and SaaS world. Block and PayPal are strongest with smaller businesses and consumer-facing products."
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {["region", "vertical"].map(v => (
              <button key={v} onClick={() => setStrengthView(v)}
                style={{ padding: "4px 14px", borderRadius: 6, border: "1px solid #E2E8F0", background: strengthView === v ? DARK : "white", color: strengthView === v ? "white" : "var(--muted)", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                {v === "region" ? "By Region" : "By Vertical"}
              </button>
            ))}
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
                  <th style={{ textAlign: "left", padding: "8px 10px", color: "var(--muted)", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.4 }}>
                    {strengthView === "region" ? "Region" : "Vertical"}
                  </th>
                  {competitors.map(c => (
                    <th key={c.name} style={{ padding: "8px 10px", textAlign: "center", fontWeight: 700, color: c.color, fontSize: 12 }}>
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {strengthData.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #F0F0F0", background: i % 2 === 0 ? "#FAFAFA" : "white" }}>
                    <td style={{ padding: "10px 10px", fontWeight: 600, color: DARK, whiteSpace: "nowrap" }}>
                      {row[strengthKey]}
                    </td>
                    {competitors.map(c => (
                      <td key={c.name} style={{ padding: "10px 10px", textAlign: "center" }}>
                        <StrengthDot value={row[c.name]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)" }}>
            ● = stronger presence &nbsp;○ = weaker or absent
          </div>
        </Panel>

        <Panel
          title="Analyst Consensus — Buy / Hold / Sell"
          description="Wall Street analysts are broadly bullish on Adyen despite the 2023 stock decline. The average price target implies meaningful upside from current levels, reflecting confidence in the long-term platform thesis."
        >
          {analystRatings.map(a => {
            const total = a.buy + a.hold + a.sell;
            const buyPct  = Math.round(a.buy  / total * 100);
            const holdPct = Math.round(a.hold / total * 100);
            const sellPct = Math.round(a.sell / total * 100);
            const upside  = Math.round((a.avgTarget - a.currentPrice) / a.currentPrice * 100);
            return (
              <div key={a.name} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <strong style={{ color: COMP_COLORS[a.name] || DARK }}>{a.name}</strong>
                  <span style={{ fontSize: 12, color: upside > 0 ? GREEN : "#FF4B4B", fontWeight: 600 }}>
                    Target {a.currency}{a.avgTarget.toLocaleString()} &nbsp;
                    <span style={{ fontWeight: 400, color: "var(--muted)" }}>({upside > 0 ? "+" : ""}{upside}%)</span>
                  </span>
                </div>
                <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 22, fontSize: 11, fontWeight: 700 }}>
                  <div style={{ width: `${buyPct}%`, background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>{buyPct}%</div>
                  <div style={{ width: `${holdPct}%`, background: "#CBD5E1", display: "flex", alignItems: "center", justifyContent: "center", color: DARK }}>{holdPct}%</div>
                  <div style={{ width: `${sellPct}%`, background: "#FF4B4B", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>{sellPct > 5 ? `${sellPct}%` : ""}</div>
                </div>
                <div style={{ display: "flex", gap: 14, marginTop: 4, fontSize: 10, color: "var(--muted)" }}>
                  <span>🟢 Buy {a.buy}</span><span>⬜ Hold {a.hold}</span><span>🔴 Sell {a.sell}</span>
                </div>
              </div>
            );
          })}
        </Panel>
      </div>

      {/* ── 5. Positioning scatter ─────────────────────── */}
      <Panel
        title="Competitive Positioning — Volume Processed vs Profitability"
        description="The ideal position is top-right: high volume AND high margins. Adyen is the only company in the set that sits there. PayPal and Block process more volume but sacrifice margins to do it. Worldline has reasonable margins but low volume. Stripe is improving but still less profitable than Adyen."
      >
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 24 }}>
          <ResponsiveContainer width={isMobile ? "100%" : "70%"} height={280}>
            <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="volume" type="number" name="Volume ($T)" tick={{ fontSize: 11 }}
                label={{ value: "Volume Processed ($T)", position: "insideBottom", offset: -10, fontSize: 11, fill: "var(--muted)" }}
                domain={[0, 1.8]} tickFormatter={v => `$${v}T`} />
              <YAxis dataKey="margin" type="number" name="EBITDA Margin" tick={{ fontSize: 11 }}
                label={{ value: "EBITDA Margin %", angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--muted)" }}
                domain={[0, 55]} tickFormatter={v => `${v}%`} />
              <ZAxis dataKey="revenue" range={[400, 2000]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 8, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                      <div style={{ fontWeight: 700, color: COMP_COLORS[d.name] || DARK, marginBottom: 4 }}>{d.name}</div>
                      <div>Volume: <strong>${d.volume}T</strong></div>
                      <div>EBITDA Margin: <strong>{d.margin}%</strong></div>
                      <div>Revenue: <strong>${d.revenue}B</strong></div>
                    </div>
                  );
                }}
              />
              <Scatter data={positioning} name="Companies">
                {positioning.map((p, i) => (
                  <Cell key={i} fill={p.color} opacity={p.name === "Adyen" ? 1 : 0.7} />
                ))}
              </Scatter>
              {/* labels */}
              {positioning.map((p, i) => null)}
            </ScatterChart>
          </ResponsiveContainer>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: DARK, marginBottom: 4 }}>Reading the chart</div>
            {[
              { label: "Top-right",  desc: "High volume, high margin — the best position",    color: GREEN },
              { label: "Top-left",   desc: "Profitable but limited scale",                   color: "#F77F00" },
              { label: "Bottom-right",desc: "High volume, low margin — growing but costly",  color: "#635BFF" },
            ].map(q => (
              <div key={q.label} style={{ background: "#F8FAFC", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: q.color }}>{q.label}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, lineHeight: 1.5 }}>{q.desc}</div>
              </div>
            ))}
            <div style={{ background: "#F0FDF4", borderRadius: 8, padding: "10px 14px", border: "1px solid #BBF7D0" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: GREEN }}>Adyen's advantage</div>
              <div style={{ fontSize: 12, color: "#166534", marginTop: 2, lineHeight: 1.5 }}>
                Only company combining €1T+ volume with 43% margins. Achieved by saying no to small merchants and consumer products.
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {positioning.map(p => (
                <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} />
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>

    </div>
  );
}
