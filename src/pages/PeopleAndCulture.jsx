import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
  Cell, BarChart,
} from "recharts";
import useIsMobile from "../hooks/useIsMobile";
import {
  headcountGrowth, genderBreakdown, glassdoorRatings,
  topRoles, attrition, tenure, linkedinGrowth,
  awards, diversity, deptGrowth,
} from "../data/adyenPeople";

const GREEN  = "#0ABF53";
const DARK   = "#1A1F36";
const BLUE   = "#0077B6";
const ORANGE = "#E76F51";
const PURPLE = "#9B5DE5";

const DEPT_COLORS = {
  Engineering: GREEN, Commercial: DARK, Operations: BLUE,
  Risk: ORANGE, Product: PURPLE, "Finance/Legal": "#F77F00",
  People: "#4CC9F0", Marketing: "#E63946",
};

const ROLE_DEPT_COLORS = {
  Engineering: GREEN, Risk: ORANGE, Commercial: DARK,
  Product: PURPLE, Operations: BLUE, Legal: "#F77F00",
};

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

function StatTile({ metric, value, sub, color }) {
  return (
    <div style={{ background: "white", borderRadius: 12, padding: "16px 20px", border: "1px solid #E2E8F0" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{metric}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: color || DARK, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{sub}</div>
    </div>
  );
}

/* ── main ─────────────────────────────────────────────────── */
export default function PeopleAndCulture() {
  const isMobile = useIsMobile();

  const currentYear = headcountGrowth[headcountGrowth.length - 1];
  const firstYear   = headcountGrowth[0];
  const growthPct   = Math.round((currentYear.employees - firstYear.employees) / firstYear.employees * 100);

  return (
    <div>

      {/* ── 1. Diversity stat strip ───────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(6,1fr)", gap: 12, marginBottom: 22 }}>
        {diversity.map(d => (
          <StatTile key={d.metric} metric={d.metric} value={d.value} sub={d.sub}
            color={d.metric.includes("Women in lead") ? ORANGE : d.metric.includes("NPS") ? PURPLE : GREEN} />
        ))}
      </div>

      {/* ── 2. Headcount + department growth ─────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "3fr 2fr", gap: 18, marginBottom: 18 }}>
        <Panel
          title="Headcount Growth 2019 – 2024"
          description={`Adyen has grown ${growthPct}% in headcount since 2019. The 2022 hiring surge — 850 new joiners in a single year — was followed by a deliberate slowdown in 2023 to protect margins. New hiring resumed at a measured pace in 2024.`}
        >
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={headcountGrowth} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area yAxisId="left" type="monotone" dataKey="employees" fill={GREEN} fillOpacity={0.12}
                stroke={GREEN} strokeWidth={2.5} dot={{ r: 4, fill: GREEN }} name="Total Employees" />
              <Bar yAxisId="right" dataKey="newHires" fill={DARK} opacity={0.6} radius={[3,3,0,0]} name="New Hires" />
            </ComposedChart>
          </ResponsiveContainer>
        </Panel>

        <Panel
          title="Department Headcount — 2022 vs 2024"
          description="Every department has grown, but Risk and Product have grown the fastest proportionally — reflecting Adyen's push into new verticals and its investment in fraud prevention infrastructure."
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deptGrowth} layout="vertical" margin={{ top: 0, right: 30, left: 60, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="dept" type="category" tick={{ fontSize: 11 }} width={60} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="y2022" name="2022" fill="#CBD5E1" radius={[0,3,3,0]} barSize={8} />
              <Bar dataKey="y2024" name="2024" radius={[0,3,3,0]} barSize={8}>
                {deptGrowth.map((d, i) => <Cell key={i} fill={DEPT_COLORS[d.dept] || DARK} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* ── 3. Gender + Glassdoor ─────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <Panel
          title="Gender Balance Across Levels"
          description="Adyen sits above the fintech average for women in the workforce (38% vs 28% industry average). Operations and Commercial teams are close to parity. Tech roles remain a known industry-wide gap that Adyen is actively working to close through graduate programs and partnerships."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
            {genderBreakdown.map(g => (
              <div key={g.level}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <strong style={{ color: DARK }}>{g.level}</strong>
                  <span style={{ color: "var(--muted)", fontSize: 11 }}>
                    <span style={{ color: PURPLE, fontWeight: 600 }}>{g.women}% women</span>
                    {" · "}
                    <span style={{ color: DARK }}>{g.men}% men</span>
                  </span>
                </div>
                <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 14 }}>
                  <div style={{ width: `${g.women}%`, background: PURPLE, transition: "width 0.5s" }} />
                  <div style={{ width: `${g.men}%`, background: "#E2E8F0" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 14px", background: "#F5F3FF", borderRadius: 8, fontSize: 12, color: "#6D28D9", lineHeight: 1.5 }}>
            <strong>Industry context:</strong> The average tech company has 28% women in its workforce. Adyen at 38% is ahead — but leadership representation at 30% shows there is still a pipeline gap to close.
          </div>
        </Panel>

        <Panel
          title="Employee Satisfaction — Glassdoor Ratings vs Peers"
          description="Adyen leads the competitive set on overall Glassdoor rating and has the highest CEO approval among companies with a tenured founder-CEO. High 'recommend to a friend' scores signal genuine employee satisfaction rather than passive indifference."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {glassdoorRatings.map(g => (
              <div key={g.company} style={{
                background: g.isAdyen ? "#F0FDF4" : "#F8FAFC",
                border: `1px solid ${g.isAdyen ? "#BBF7D0" : "#E2E8F0"}`,
                borderRadius: 10, padding: "12px 14px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: g.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white" }}>
                      {g.company[0]}
                    </div>
                    <strong style={{ fontSize: 13 }}>{g.company}</strong>
                    {g.isAdyen && <span style={{ fontSize: 10, background: GREEN, color: "white", borderRadius: 4, padding: "1px 6px" }}>us</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: g.isAdyen ? GREEN : DARK }}>{g.rating}</span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>/5</span>
                    <span style={{ fontSize: 14, marginLeft: 2 }}>⭐</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--muted)" }}>
                  <span>👍 Recommend: <strong style={{ color: DARK }}>{g.recommend}%</strong></span>
                  <span>🏢 CEO Approval: <strong style={{ color: DARK }}>{g.ceo}%</strong></span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── 4. Attrition + Tenure ─────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "3fr 2fr", gap: 18, marginBottom: 18 }}>
        <Panel
          title="Staff Attrition — Adyen vs Fintech & Tech Industry Averages"
          description="Adyen consistently retains people better than both the fintech and broader tech industry averages. The 2022 spike coincided with the 'Great Resignation' wave across the industry — Adyen was affected but recovered faster. A low attrition rate reduces recruiting costs and protects institutional knowledge."
        >
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={attrition} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} domain={[0, 22]} />
              <Tooltip formatter={(v) => [`${v}%`]} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="techAvg"     fill="#E2E8F0" fillOpacity={0.5} stroke="#CBD5E1" strokeWidth={1.5} strokeDasharray="4 3" dot={false} name="Tech Industry Avg" />
              <Area type="monotone" dataKey="fintechAvg"  fill={ORANGE}  fillOpacity={0.1} stroke={ORANGE}  strokeWidth={1.5} strokeDasharray="4 3" dot={false} name="Fintech Avg" />
              <Area type="monotone" dataKey="adyen"       fill={GREEN}   fillOpacity={0.15} stroke={GREEN}  strokeWidth={2.5} dot={{ r: 4, fill: GREEN }} name="Adyen" />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel
          title="Average Tenure by Seniority"
          description="Founders and C-suite have been at the company for over 8 years on average — a very strong signal of stability and belief in the long-term vision. Individual contributors averaging 2.6 years is healthy for a fast-growing tech company."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 4 }}>
            {tenure.map(t => (
              <div key={t.level}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <span style={{ fontWeight: 600, color: DARK }}>{t.level}</span>
                  <span style={{ fontWeight: 800, color: t.color }}>{t.avgYears} yrs</span>
                </div>
                <div style={{ background: "#f0f0f0", borderRadius: 6, height: 10 }}>
                  <div style={{ width: `${(t.avgYears / 10) * 100}%`, height: "100%", background: t.color, borderRadius: 6, transition: "width 0.5s" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: "10px 14px", background: "#F0FDF4", borderRadius: 8, fontSize: 12, color: "#166534", lineHeight: 1.5 }}>
            62% of senior roles are filled through internal promotions — a strong indicator of career development culture.
          </div>
        </Panel>
      </div>

      {/* ── 5. Hot roles + LinkedIn + Awards ─────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: 18 }}>
        <Panel
          title="Fastest-Growing Roles — Open Positions & YoY Growth"
          description="Data Analyst and Data Engineer openings have grown the fastest year-over-year, reflecting Adyen's investment in building internal analytics capability. Risk Analyst hiring is also accelerating as the product expands into new markets."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {topRoles.sort((a, b) => b.growth - a.growth).map(r => (
              <div key={r.role} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: ROLE_DEPT_COLORS[r.dept] || DARK, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 12, fontWeight: 500, color: DARK }}>{r.role}</div>
                <span style={{ fontSize: 11, color: "var(--muted)", minWidth: 60 }}>{r.openings} open</span>
                <div style={{ width: 80, background: "#f0f0f0", borderRadius: 4, height: 7 }}>
                  <div style={{ width: `${r.growth}%`, height: "100%", background: ROLE_DEPT_COLORS[r.dept] || GREEN, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: ROLE_DEPT_COLORS[r.dept] || GREEN, minWidth: 36, textAlign: "right" }}>+{r.growth}%</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="LinkedIn Following Growth"
          description="Employer brand strength, measured by LinkedIn follower growth. A growing audience signals trust and makes talent acquisition easier over time."
        >
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={linkedinGrowth} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}K`} />
              <Tooltip formatter={(v) => [`${v}K followers`]} />
              <Area type="monotone" dataKey="followers" fill={BLUE} fillOpacity={0.12} stroke={BLUE} strokeWidth={2.5} dot={{ r: 3, fill: BLUE }} name="Followers (K)" />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 10, textAlign: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: BLUE }}>624K</span>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>LinkedIn followers in 2024</div>
            <div style={{ fontSize: 11, color: GREEN, fontWeight: 600, marginTop: 2 }}>+241% since 2020</div>
          </div>
        </Panel>

        <Panel
          title="Awards & Recognition"
          description="Independent validation of Adyen as an employer and innovator, from employees, industry bodies, and media."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {awards.map(a => (
              <div key={a.title} style={{ display: "flex", gap: 10, padding: "9px 12px", background: "#F8FAFC", borderRadius: 8, border: "1px solid #E2E8F0", alignItems: "flex-start" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: DARK, lineHeight: 1.4 }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{a.region} · {a.year}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

    </div>
  );
}
