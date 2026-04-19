const GREEN  = "#0ABF53";
const DARK   = "#1A1F36";
const BLUE   = "#0077B6";
const ORANGE = "#E76F51";
const PURPLE = "#9B5DE5";

const experience = [
  {
    company: "Morgan Stanley",
    url: "https://www.morganstanley.com",
    role: "Associate Data Governance Specialist · Market Risk",
    period: "Feb 2023 – Present · 3 yrs 3 mos",
    location: "Budapest, Hungary · Hybrid",
    color: "#0077B6",
    bullets: [
      "Lead the Data Quality Controls team — overseeing cataloging, documentation, and implementation of controls ensuring reliability and compliance across systems",
      "Direct data lineage documentation, mapping feeds from raw sources through multiple systems to final risk reports and dashboards",
      "Automate data extraction, transformation, and reporting workflows using Python, SQL, and internal APIs — reducing manual effort significantly",
      "Member of the AI Idea Generators team, contributing to generative AI use cases as part of the firm's AI Strategy",
      "Python Developer & Data Analyst on the Veritas GenAI project — ingesting market news and internal data feeds to produce actionable insights for risk managers",
    ],
  },
  {
    company: "LAPP Group",
    url: "https://www.lappgroup.com",
    role: "Analytics Engineer",
    period: "Jan 2023 – Present · 3 yrs 4 mos",
    location: "Remote · Freelance",
    color: GREEN,
    bullets: [
      "Designed and delivered an end-to-end analytics architecture covering data ingestion, modelling, and visualisation for a project management platform",
      "Developed and optimised a relational data warehouse in Azure SQL — normalised schemas, indexes, and stored procedures supporting efficient querying and advanced analytics",
      "Built ETL pipelines in Azure Data Factory to integrate, clean, and transform vendor and customer datasets ensuring high data quality and auditability",
      "Created analytical data models supporting KPIs, trend analysis, and predictive insights for stakeholders",
      "Delivered interactive dashboards and visualisations supporting decision-making for customers and vendors",
    ],
  },
  {
    company: "Azersun Holding",
    url: "https://www.azersun.com",
    role: "Senior IT Business Data Analyst · Logistics & Distribution",
    period: "Apr 2021 – Feb 2023 · 1 yr 11 mos",
    location: "Baku, Azerbaijan · On-site",
    color: ORANGE,
    bullets: [
      "Prepared Business Requirement Documents and supported leadership with data-driven insights to guide budgeting and resource allocation",
      "Established and streamlined policies across logistics and distribution, ensuring best practices in forecasting, reporting, and communication",
      "Conducted data analysis, market research, competitive benchmarking, and process optimisation within logistics and supply chain operations",
      "Collaborated with Business Solutions team on SAP integration and process alignment across business units",
    ],
  },
  {
    company: "OBA Retail Company",
    url: "https://www.oba.az",
    role: "Data Analyst · Warehouse & Distribution",
    period: "Jan 2021 – Apr 2022 · 1 yr 4 mos",
    location: "Baku, Azerbaijan · Hybrid",
    color: PURPLE,
    bullets: [
      "Analysed daily, monthly, and annual warehouse data — conducted stock analysis and monitored product distribution across regions and stores",
      "Performed sales data analysis to identify trends and support business decisions; consolidated reports for management use",
      "Automated reporting processes using Python and SQL, reducing manual workload and improving timeliness",
      "Supported development of an internal order management web application",
    ],
  },
  {
    company: "Career Break",
    role: "Deliberate Transition into Data",
    period: "Nov 2020 – Jan 2021 · 3 mos",
    location: "",
    color: "#CBD5E1",
    bullets: [
      "Used a background in project management — coordination, reporting, process optimisation — as a bridge into data-focused roles, combining analytical skills with hands-on business experience.",
    ],
  },
  {
    company: "Azerbaijan Railways (ADY)",
    url: "https://www.ady.az",
    role: "KPI Module Manager · Leading Strategic Development Specialist",
    period: "Feb 2020 – Nov 2020 · 10 mos",
    location: "Baku, Azerbaijan · Hybrid",
    color: "#E63946",
    bullets: [
      "Defined, implemented, and calculated core KPIs to measure operational performance across railway processes",
      "Conducted data analysis to support decision-making; prepared and presented detailed reports to senior management",
      "Drove continuous process improvement initiatives and delivered regular KPI and performance reports to leadership",
    ],
  },
  {
    company: "Port of Baku",
    url: "https://www.portofbaku.az",
    role: "Deputy Head of Ro-Ro Terminal · Operations Specialist",
    period: "Nov 2017 – Feb 2020 · 2 yrs 4 mos",
    location: "Baku, Azerbaijan · On-site",
    color: "#888",
    bullets: [
      "Managed safe and timely transfer of cargo, ensured accurate documentation, and maintained safety and compliance across the operational area",
      "Prepared and consolidated operational and management reports; monitored effective use of the Port Management System (PMS)",
      "Assessed training needs, designed development programmes for staff, and oversaw fair workload distribution among team members",
    ],
  },
];

const fitPoints = [
  {
    icon: "🎯",
    title: "Strategic partner to leadership",
    desc: "Direct experience working with Risk and Finance leadership at Morgan Stanley — defining what gets measured, not just building what's asked.",
    color: GREEN,
  },
  {
    icon: "⚙️",
    title: "Operations is my core domain",
    desc: "8+ years across Supply Chain, Retail, and Transport — logistics KPIs, warehouse analytics, distribution reporting.",
    color: BLUE,
  },
  {
    icon: "📊",
    title: "SQL & Python — daily tools",
    desc: "Production-grade pipelines, validation frameworks, and end-to-end analytics architecture built at LAPP with Azure Data Factory and Azure SQL.",
    color: PURPLE,
  },
  {
    icon: "🤖",
    title: "AI in production — not on a slide",
    desc: "Python Developer on Morgan Stanley's Veritas GenAI project. Member of the firm's AI Idea Generators team.",
    color: ORANGE,
  },
  {
    icon: "🌍",
    title: "Available now — no sponsorship",
    desc: "EU Blue Card holder. No visa process, no waiting period, no risk.",
    color: GREEN,
  },
  {
    icon: "🗣️",
    title: "Data that drives action",
    desc: "Presented to C-suite and operations managers across every role. I do not hand over a dashboard — I make sure it lands.",
    color: DARK,
  },
];

const skills = [
  { name: "SQL",                   level: 95, color: GREEN  },
  { name: "Python",                level: 82, color: BLUE   },
  { name: "Power BI / Tableau",    level: 88, color: PURPLE },
  { name: "Data Governance",       level: 92, color: ORANGE },
  { name: "KPI Development",       level: 93, color: GREEN  },
  { name: "Stakeholder Management",level: 90, color: DARK   },
  { name: "ETL / ELT Pipelines",   level: 80, color: BLUE   },
  { name: "Requirements Analysis",  level: 91, color: PURPLE },
];

const techStack = [
  { label: "SQL",               icon: "🗄️" },
  { label: "Python",            icon: "🐍" },
  { label: "Power BI",          icon: "📉" },
  { label: "Tableau",           icon: "📊" },
  { label: "Azure SQL",         icon: "☁️" },
  { label: "Azure Data Factory",icon: "🔧" },
  { label: "Apache Airflow",    icon: "🌬️" },
  { label: "Databricks",        icon: "⚡" },
  { label: "Snowflake",         icon: "❄️" },
  { label: "BCBS239 / GDPR",    icon: "📋" },
  { label: "Metadata Mgmt",     icon: "🏷️" },
];

const KEYWORDS = [
  "SQL","Python","KPI","KPIs","ETL","ELT","GenAI","AI","SAP","Azure","Power BI","Tableau",
  "Databricks","Snowflake","Airflow","APIs","API",
  "data quality","data lineage","data governance","data analysis","data analyst","data pipeline",
  "data warehouse","data model","data modeling","data modelling","data factory","data lake",
  "reporting","analytics","analysis","pipeline","pipelines","dashboard","dashboards",
  "forecasting","metrics","automation","automated","automate","automating",
  "risk","compliance","governance","lineage","cataloging","documentation",
  "stakeholder","C-suite","leadership","management","performance",
  "warehouse","distribution","logistics","supply chain","retail","operations",
];

const KW_REGEX = new RegExp(
  `(\\b(?:${KEYWORDS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b)`,
  "gi"
);

const KW_EXACT = new RegExp(
  `^(${KEYWORDS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})$`,
  "i"
);

function hl(text) {
  const parts = text.split(KW_REGEX);
  return parts.map((part, i) =>
    KW_EXACT.test(part)
      ? <span key={i} style={{ color: GREEN, fontWeight: 600 }}>{part}</span>
      : part
  );
}

export default function AboutMe() {

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(135deg, ${DARK} 0%, #2D3561 100%)`, borderRadius: 16, padding: "32px 36px", marginBottom: 22, color: "white", display: "flex", gap: 32, alignItems: "center" }}>
        <img
          src="https://avatars.githubusercontent.com/u/46631807?v=4"
          alt="Elvin Shahsuvarli"
          style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: `3px solid ${GREEN}`, flexShrink: 0 }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Elvin Shahsuvarli</div>
          <div style={{ fontSize: 14, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
            Senior Data Analyst · Operations Analytics
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: "rgba(255,255,255,0.65)", flexWrap: "wrap" }}>
            <span>✉️ shahsuvarli.elvin@gmail.com</span>
            <span>📞 +36 20 248 4628</span>
            <a href="https://linkedin.com/in/shahsuvarli" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "#0ABF53"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}>
              🔗 linkedin.com/in/shahsuvarli
            </a>
            <a href="https://github.com/shahsuvarli" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.65)", textDecoration: "none" }}
              onMouseEnter={ev => { ev.currentTarget.style.color = "#0ABF53"; ev.currentTarget.querySelector("svg").style.fill = "#0ABF53"; }}
              onMouseLeave={ev => { ev.currentTarget.style.color = "rgba(255,255,255,0.65)"; ev.currentTarget.querySelector("svg").style.fill = "currentColor"; }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              github.com/shahsuvarli
            </a>
          </div>
        </div>
        <div style={{ background: "rgba(10,191,83,0.15)", border: "1px solid rgba(10,191,83,0.4)", borderRadius: 10, padding: "14px 20px", textAlign: "center", flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Work Status</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: GREEN }}>EU Blue Card Holder</div>
          <div style={{ fontSize: 11, color: GREEN, marginTop: 2, fontWeight: 600 }}>Available immediately</div>
        </div>
      </div>

      {/* ── Bio ──────────────────────────────────────── */}
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: "14px 22px", marginBottom: 12, fontSize: 13, color: "#374151", lineHeight: 1.7 }}>
        Data analyst with <strong>7+ years</strong> across operations, logistics, retail, and financial services — currently at <strong>Morgan Stanley</strong> and <strong>LAPP Group</strong>. I turn messy data into decisions that actually stick.
      </div>

      {/* ── Summary ──────────────────────────────────── */}
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: "18px 24px", marginBottom: 18, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        {[
          { label: "Proactive",     icon: "⚡", sub: "Acts before being asked" },
          { label: "Creative",      icon: "💡", sub: "Finds unconventional angles" },
          { label: "Enthusiastic",  icon: "🔥", sub: "Genuinely loves the craft" },
          { label: "Accountable",   icon: "🎯", sub: "Owns outcomes, not just tasks" },
        ].map(t => (
          <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 10, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 16px", flex: 1, minWidth: 160 }}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{t.label}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{t.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Why a good fit ────────────────────────────── */}
      <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 22px", marginBottom: 22 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 4 }}>Why I am a strong fit for this role</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14, lineHeight: 1.5 }}>
          Adyen is looking for a strategic partner who can embed data-driven insights across Support, Professional Services, and Supply Chain.
          Here is how my background maps directly to that.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {fitPoints.map((f, i) => (
            <div key={f.title} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i < fitPoints.length - 1 ? "1px solid #F1F5F9" : "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${f.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                {f.icon}
              </div>
              <div style={{ flex: 1, paddingTop: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: f.color }}>{f.title}</span>
                <span style={{ fontSize: 12, color: "#4B5563", marginLeft: 8 }}>— {f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 18, marginBottom: 18 }}>

        {/* ── Experience ────────────────────────────── */}
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: "20px 22px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 16 }}>Work Experience</div>
          <div style={{ position: "relative", paddingLeft: 16 }}>
            <div style={{ position: "absolute", left: 10, top: 0, bottom: 0, width: 2, background: "#E2E8F0", borderRadius: 2 }} />
            {experience.map((e, i) => (
              <div key={e.company} style={{ marginBottom: i < experience.length - 1 ? 22 : 0, position: "relative" }}>
                <div style={{ position: "absolute", left: -20, top: 6, width: 14, height: 14, borderRadius: "50%", background: e.color, border: "2px solid white", boxShadow: "0 0 0 2px #E2E8F0", zIndex: 1 }} />
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{e.role}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: e.color }}>
                      {e.url
                        ? <a href={e.url} target="_blank" rel="noreferrer" style={{ color: e.color, textDecoration: "none" }}
                            onMouseEnter={ev => ev.target.style.textDecoration = "underline"}
                            onMouseLeave={ev => ev.target.style.textDecoration = "none"}>
                            {e.company}
                          </a>
                        : e.company}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{e.period}{e.location ? ` · ${e.location}` : ""}</div>
                  </div>
                </div>
                <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                  {e.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.5 }}>{hl(b)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column ──────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Skills */}
          <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 14 }}>Skills & Proficiency</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {skills.map(s => (
                <div key={s.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                    <span style={{ fontWeight: 500, color: DARK }}>{s.name}</span>
                    <span style={{ color: s.color, fontWeight: 700 }}>{s.level}%</span>
                  </div>
                  <div style={{ background: "#f0f0f0", borderRadius: 6, height: 7 }}>
                    <div style={{ width: `${s.level}%`, height: "100%", background: s.color, borderRadius: 6 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 12 }}>Tech Stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {techStack.map(t => (
                <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 5, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 7, padding: "5px 10px", fontSize: 12 }}>
                  <span>{t.icon}</span>
                  <span style={{ fontWeight: 500, color: DARK }}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 12 }}>Education</div>
            {[
              { degree: "MBA, Business Administration", school: "Azerbaijan State University of Economics", url: "http://unec.edu.az/en/", year: "2017–2019" },
              { degree: "BSc, Business Management (Distinction)", school: "Academy of Public Administration", url: "https://dia.edu.az", year: "2013–2017" },
            ].map(e => (
              <div key={e.degree} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: DARK }}>{e.degree}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>
                  <a href={e.url} target="_blank" rel="noreferrer" style={{ color: "var(--muted)", textDecoration: "none" }}
                    onMouseEnter={ev => ev.target.style.textDecoration = "underline"}
                    onMouseLeave={ev => ev.target.style.textDecoration = "none"}>
                    {e.school}
                  </a>
                  {" "}· {e.year}
                </div>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 12 }}>Languages</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { lang: "English",    level: "Fluent",  flag: "🇬🇧" },
                { lang: "Azerbaijani",level: "Native",  flag: "🇦🇿" },
                { lang: "German",     level: "Beginner", flag: "🇩🇪" },
              ].map(l => (
                <div key={l.lang} style={{ flex: 1, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 18 }}>{l.flag}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: DARK, marginTop: 4 }}>{l.lang}</div>
                  <div style={{ fontSize: 10, color: GREEN, fontWeight: 600 }}>{l.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Hobbies + Side Projects ───────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>

        {/* Hobbies */}
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: "20px 22px" }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: DARK }}>Hobbies & Interests</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { icon: "👨‍👩‍👦", title: "Family & Friends", desc: "Spending quality time with family and friends — including helping with my wife's YouTube channel on ideas, filming, and production.", link: "https://www.youtube.com/@ayselshah/videos", linkLabel: "Watch channel →" },
              { icon: "📚", title: "Reading", desc: "Primarily interested in books about the human body, medicine, and history — always curious about how things work at a deeper level.", link: "https://www.goodreads.com/user/show/35623570-elvin-shahsuvarli", linkLabel: "My Goodreads →" },
              { icon: "🤖", title: "Home Automations", desc: "Build and maintain automations around the house — smart home setups, scripts, and workflows that make everyday life more efficient." },
              { icon: "🏋️", title: "Gym & Outdoors", desc: "Regular gym sessions and outdoor activities — how I recharge, stay focused, and keep the energy up." },
            ].map(h => (
              <div key={h.title} style={{ background: "#F8FAFC", borderRadius: 10, padding: "14px 14px", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{h.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: DARK, marginBottom: 4 }}>{h.title}</div>
                <div style={{ fontSize: 11, color: "#4B5563", lineHeight: 1.6 }}>{h.desc}</div>
                {h.link && (
                  <a href={h.link} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: GREEN, fontWeight: 600, textDecoration: "none", marginTop: 6, display: "inline-block" }}
                    onMouseEnter={e => e.target.style.textDecoration = "underline"}
                    onMouseLeave={e => e.target.style.textDecoration = "none"}>
                    {h.linkLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Side Projects */}
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: "20px 22px" }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: DARK }}>Side Projects</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                icon: "🃏",
                title: "Game On — Mafia / Werewolf App",
                tag: "Mobile · Personal",
                tagColor: PURPLE,
                url: "https://github.com/shahsuvarli/game-on",
                desc: "A digital Mafia / Werewolf game for when there are no cards around — but there is always a phone. Designed for groups of friends.",
              },
              {
                icon: "🌳",
                title: "Family Roots — Bloodline Tracker",
                tag: "Mobile · Personal",
                tagColor: BLUE,
                url: "https://github.com/shahsuvarli/family-tree-mobile",
                desc: "A personal mobile app to map and preserve my entire family tree — adding relatives, connections, and lineage across generations.",
              },
              {
                icon: "✂️",
                title: "LocalBook — Reservation Platform",
                tag: "Web App · Startup",
                tagColor: GREEN,
                url: null,
                desc: "Building a reservation and booking web app with a friend to support hairdressers and local small businesses — an early-stage startup idea focused on helping independents compete digitally.",
              },
            ].map(p => (
              <div key={p.title} style={{ display: "flex", gap: 14, padding: "14px", background: "#F8FAFC", borderRadius: 10, border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{p.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: DARK }}>{p.title}</div>
                    <span style={{ fontSize: 9, fontWeight: 700, color: p.tagColor, background: `${p.tagColor}18`, borderRadius: 4, padding: "2px 6px" }}>{p.tag}</span>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--muted)", textDecoration: "none" }}
                        onMouseEnter={ev => { ev.currentTarget.style.color = GREEN; ev.currentTarget.querySelector("svg").style.fill = GREEN; }}
                        onMouseLeave={ev => { ev.currentTarget.style.color = "var(--muted)"; ev.currentTarget.querySelector("svg").style.fill = "currentColor"; }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "#4B5563", lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
