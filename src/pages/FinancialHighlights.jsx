import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, AreaChart, Area, ReferenceLine,
} from "recharts";
import useIsMobile from "../hooks/useIsMobile";
import {
  annualRevenue, processedVolume, takeRate,
  revenueByRegion, revenueByChannel, costStructure,
  stockMilestones, efficiencyKpis,
} from "../data/adyenFinancials";

const GREEN  = "#0ABF53";
const DARK   = "#1A1F36";
const RED    = "#FF4B4B";
const BLUE   = "#0077B6";
const ORANGE = "#E76F51";

/* ── helpers ─────────────────────────────────────────────── */
function Block({ label, value, sub, color }) {
  return (
    <div style={{ background: "white", borderRadius: 12, padding: "18px 22px", border: "1px solid #E2E8F0" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: color || DARK, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Panel({ title, description, children, style }) {
  return (
    <div style={{ background: "white", borderRadius: 12, padding: "20px 22px", border: "1px solid #E2E8F0", ...style }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 4 }}>{title}</div>
      {description && (
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16, lineHeight: 1.6 }}>{description}</div>
      )}
      {children}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label, unit = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 8, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
      <div style={{ fontWeight: 700, marginBottom: 6, color: DARK }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{typeof p.value === "number" ? `${unit}${p.value}` : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

/* ── main ─────────────────────────────────────────────────── */
export default function FinancialHighlights() {
  const isMobile = useIsMobile();

  const RADIAN = Math.PI / 180;
  const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, pct, region }) => {
    const r = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
        {pct}%
      </text>
    );
  };

  return (
    <div>

      {/* ── 1. Efficiency KPI tiles ────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(6,1fr)", gap: 12, marginBottom: 24 }}>
        {efficiencyKpis.map(k => (
          <Block key={k.label} label={k.label} value={k.value} sub={k.sub} color={k.color} />
        ))}
      </div>

      {/* ── 2. Revenue growth + EBITDA ────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: 18, marginBottom: 18 }}>
        <Panel
          title="Annual Revenue & Profitability (€B)"
          description="Net revenue has grown at a 25% CAGR since 2020. The 2022 slowdown — when growth dropped from 37% to 11% — triggered a major stock selloff, but profitability never deteriorated. EBITDA margins held above 40% throughout."
        >
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={annualRevenue} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickFormatter={v => `€${v}B`} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 50]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="revenue"   name="Net Revenue (€B)"  fill={GREEN} opacity={0.85} radius={[4,4,0,0]} />
              <Bar yAxisId="left" dataKey="ebitda"    name="EBITDA (€B)"       fill={DARK}  opacity={0.7}  radius={[4,4,0,0]} />
              <Line yAxisId="right" type="monotone" dataKey="growth" name="YoY Growth %" stroke={ORANGE} strokeWidth={2.5} dot={{ r: 5, fill: ORANGE }} connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 10, padding: "10px 14px", background: "#FEF3C7", borderRadius: 8, fontSize: 12, color: "#92400E", lineHeight: 1.6 }}>
            <strong>2022 context:</strong> Growth dropped to 11% after Adyen warned it was deliberately slowing hiring. The market panicked — the stock fell 39% in one day. But EBITDA margins stayed at 40%, proving it was a strategic choice, not a business problem.
          </div>
        </Panel>

        <Panel
          title="Net Income (€B)"
          description="Adyen converts a high share of revenue into actual profit — a 29% net income margin is exceptional for a company growing this fast."
        >
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={annualRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `€${v}B`} />
              <Tooltip formatter={(v) => [`€${v}B`, "Net Income"]} />
              <Area type="monotone" dataKey="netIncome" name="Net Income (€B)" fill={GREEN} fillOpacity={0.15} stroke={GREEN} strokeWidth={2.5} dot={{ r: 4, fill: GREEN }} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginTop: 12 }}>
            {annualRevenue.map(r => (
              <div key={r.year} style={{ background: "#F8FAFC", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{r.year}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: GREEN }}>€{r.netIncome}B</div>
                <div style={{ fontSize: 10, color: "var(--muted)" }}>{r.ebitdaMargin}% margin</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── 3. Volume vs Revenue + Take rate ─────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "3fr 2fr", gap: 18, marginBottom: 18 }}>
        <Panel
          title="Processed Volume vs Revenue Growth"
          description="Volume (how much money flows through Adyen) grows much faster than revenue. This is because Adyen earns a small percentage of each payment — so doubling volume does not double revenue. The gap between the two lines tells the take-rate compression story."
        >
          <ResponsiveContainer width="100%" height={230}>
            <ComposedChart data={processedVolume} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickFormatter={v => `€${v}B`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} tickFormatter={v => `€${v}M`} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="volume"   name="Volume Processed (€B)" fill={DARK}  opacity={0.7} radius={[4,4,0,0]} />
              <Line yAxisId="right" type="monotone" dataKey="revenueM" name="Net Revenue (€M)" stroke={GREEN} strokeWidth={2.5} dot={{ r: 5, fill: GREEN }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Panel>

        <Panel
          title="Take Rate — Earnings per €100 Processed"
          description="The take rate is how many cents Adyen earns for every €100 processed. It has declined as Adyen wins larger, lower-margin enterprise clients — a deliberate trade-off for volume and stickiness."
        >
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={takeRate} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} domain={[0.10, 0.32]} />
              <Tooltip formatter={(v) => [`${v}%`, "Take Rate"]} />
              <Area type="monotone" dataKey="rate" name="Take Rate %" fill={BLUE} fillOpacity={0.15} stroke={BLUE} strokeWidth={2.5} dot={{ r: 5, fill: BLUE }} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
            From 0.29% in 2020 to 0.17% today — <strong style={{ color: DARK }}>lower rate, much larger pie.</strong> Adyen earns less per transaction but processes far more of them.
          </div>
        </Panel>
      </div>

      {/* ── 4. Region + Channel ───────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <Panel
          title="Revenue by Region"
          description="Europe remains the core market — Adyen's home ground — but North America is the fastest-growing region and the biggest long-term opportunity. Asia-Pacific and Latin America are still early stage."
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={revenueByRegion} dataKey="pct" nameKey="region" cx="50%" cy="50%"
                  outerRadius={82} innerRadius={44} labelLine={false} label={renderPieLabel}>
                  {revenueByRegion.map((r, i) => <Cell key={i} fill={r.color} />)}
                </Pie>
                <Tooltip formatter={(v, n, p) => [`€${p.payload.amount}B (${v}%)`, n]} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              {revenueByRegion.map(r => (
                <div key={r.region}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: r.color, display: "inline-block" }} />
                      <strong>{r.region}</strong>
                    </span>
                    <span style={{ color: "var(--muted)" }}>€{r.amount}B · {r.pct}%</span>
                  </div>
                  <div style={{ background: "#f0f0f0", borderRadius: 4, height: 6 }}>
                    <div style={{ width: `${r.pct}%`, height: "100%", background: r.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel
          title="Revenue by Business Channel"
          description="Digital (pure online) is the biggest channel but Unified Commerce — where the same platform handles both a store's physical checkout and its website — is the fastest growing. It locks merchants in much more deeply than a digital-only relationship."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 4 }}>
            {revenueByChannel.map(c => (
              <div key={c.channel}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                  <div>
                    <strong style={{ color: DARK }}>{c.channel}</strong>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{c.description}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                    <div style={{ fontWeight: 700, color: c.color }}>€{c.amount}B</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{c.pct}%</div>
                  </div>
                </div>
                <div style={{ background: "#f0f0f0", borderRadius: 6, height: 10 }}>
                  <div style={{ width: `${c.pct}%`, height: "100%", background: c.color, borderRadius: 6, transition: "width 0.5s" }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── 5. Cost structure + Stock milestones ──────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 18 }}>
        <Panel
          title="Cost Structure — As % of Revenue"
          description="Employee costs dominate, as expected for a tech company. What stands out is how the total cost base has stayed lean even as headcount grew — a sign of strong operational leverage. Sales & marketing is low because Adyen relies on reputation over advertising."
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={costStructure} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(v) => [`${v}%`]} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="employees"     name="People"         stackId="a" fill={DARK}   radius={[0,0,0,0]} />
              <Bar dataKey="technology"    name="Technology"     stackId="a" fill={BLUE}   />
              <Bar dataKey="salesMarketing" name="Sales & Marketing" stackId="a" fill={ORANGE} />
              <Bar dataKey="other"         name="Other"          stackId="a" fill="#CBD5E1" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel
          title="Stock Price Journey — Key Moments"
          description="Adyen's stock story is a masterclass in market overreaction. The fundamentals never broke — margins stayed intact even through the 2023 crash. The recovery since then reflects renewed confidence in the long-term platform thesis."
        >
          <div style={{ position: "relative", padding: "10px 0 0 0" }}>
            {stockMilestones.map((m, i) => {
              const isLow  = m.label.includes("crash");
              const isHigh = m.label.includes("high");
              const isCurrent = m.label === "Current";
              const color = isLow ? RED : isHigh ? GREEN : isCurrent ? BLUE : DARK;
              const isLast = i === stockMilestones.length - 1;

              return (
                <div key={m.date} style={{ display: "flex", gap: 14, marginBottom: isLast ? 0 : 16, position: "relative" }}>
                  {/* connector line */}
                  {!isLast && (
                    <div style={{ position: "absolute", left: 17, top: 28, width: 2, height: "calc(100% - 4px)", background: "#E2E8F0" }} />
                  )}
                  {/* dot */}
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "white" }}>
                      {m.price >= 1000 ? `${(m.price/1000).toFixed(1)}k` : m.price}
                    </span>
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color }}>{m.label}</span>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>{m.date}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1, lineHeight: 1.5 }}>{m.note}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

    </div>
  );
}
