"""
Adyen Ops Analytics Dashboard
Senior Data Analyst portfolio project — Operations Analytics
"""

import sqlite3
import sys
import os
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from notebooks.anomaly_detection import (
    detect_ticket_volume_anomalies,
    detect_resolution_anomalies,
    detect_transaction_anomalies,
)

# ── Adyen brand palette ──────────────────────────────────────
ADYEN_GREEN = "#0ABF53"
ADYEN_DARK = "#1A1F36"
ADYEN_LIGHT = "#F5F5F5"
PLOTLY_TEMPLATE = "plotly_white"

st.set_page_config(
    page_title="Adyen Ops Analytics",
    page_icon="💳",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── Custom CSS ───────────────────────────────────────────────
st.markdown(f"""
<style>
  .stApp {{ background-color: {ADYEN_LIGHT}; }}
  .block-container {{ padding-top: 1.5rem; }}
  h1, h2, h3 {{ color: {ADYEN_DARK}; }}
  .metric-card {{
    background: white; border-radius: 10px; padding: 18px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  }}
  .anomaly-badge {{
    background: #FF4B4B; color: white; border-radius: 4px;
    padding: 2px 8px; font-size: 0.75rem; font-weight: 600;
  }}
</style>
""", unsafe_allow_html=True)


@st.cache_data
def load_all():
    conn = sqlite3.connect("data/adyen_ops.db")
    tickets = pd.read_sql("SELECT * FROM tickets", conn, parse_dates=["created_at"])
    transactions = pd.read_sql("SELECT * FROM transactions", conn, parse_dates=["timestamp"])
    merchants = pd.read_sql("SELECT * FROM merchants", conn)
    conn.close()

    ticket_daily = detect_ticket_volume_anomalies(tickets)
    resolution_monthly = detect_resolution_anomalies(tickets)
    tx_daily = detect_transaction_anomalies(transactions)

    return tickets, transactions, merchants, ticket_daily, resolution_monthly, tx_daily


tickets, transactions, merchants, ticket_daily, resolution_monthly, tx_daily = load_all()

# ── Sidebar filters ──────────────────────────────────────────
st.sidebar.image("https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Adyen_Corporate_Logo.svg/320px-Adyen_Corporate_Logo.svg.png", width=140)
st.sidebar.markdown("## Filters")

all_tiers = ["All"] + sorted(tickets["merchant_tier"].unique().tolist())
sel_tier = st.sidebar.selectbox("Merchant Tier", all_tiers)

all_regions = ["All"] + sorted(tickets["region"].unique().tolist())
sel_region = st.sidebar.selectbox("Region", all_regions)

months = sorted(tickets["created_at"].dt.to_period("M").astype(str).unique())
sel_months = st.sidebar.select_slider(
    "Month range",
    options=months,
    value=(months[0], months[-1]),
)

def apply_filters(df, date_col="created_at"):
    out = df.copy()
    if sel_tier != "All":
        col = "merchant_tier" if "merchant_tier" in out.columns else "tier"
        out = out[out[col] == sel_tier]
    if sel_region != "All" and "region" in out.columns:
        out = out[out["region"] == sel_region]
    m_start = pd.Period(sel_months[0], "M")
    m_end = pd.Period(sel_months[1], "M")
    out = out[out[date_col].dt.to_period("M").between(m_start, m_end)]
    return out

t = apply_filters(tickets)
tx = apply_filters(transactions, "timestamp")

# ── Header ───────────────────────────────────────────────────
st.title("Operations Analytics Dashboard")
st.caption("Support · Professional Services · Supply Chain | Powered by synthetic Adyen-flavored data")

# ── KPI Row ──────────────────────────────────────────────────
k1, k2, k3, k4, k5 = st.columns(5)
sla_pct = round(t["met_sla"].mean() * 100, 1)
failure_rate = round((tx["outcome"] == "failed").mean() * 100, 2)
esc_rate = round((t["status"] == "escalated").mean() * 100, 1)
avg_res = round(t["resolution_hours"].mean(), 1)
total_vol = round(tx["amount_eur"].sum() / 1e6, 2)

k1.metric("Total Tickets", f"{len(t):,}")
k2.metric("SLA Compliance", f"{sla_pct}%", delta=f"{sla_pct - 75:.1f}pp vs target")
k3.metric("Failure Rate", f"{failure_rate}%")
k4.metric("Escalation Rate", f"{esc_rate}%")
k5.metric("Volume Processed", f"€{total_vol}M")

st.divider()

# ── Tabs ─────────────────────────────────────────────────────
tab1, tab2, tab3, tab4 = st.tabs(["📈 Ticket Trends", "⚠️ Anomaly Detection", "💳 Transaction Health", "🏦 Merchant Risk"])

# ─────────────────────────────────────────────────────────────
# TAB 1 — Ticket Trends
# ─────────────────────────────────────────────────────────────
with tab1:
    col1, col2 = st.columns([2, 1])

    with col1:
        monthly = (
            t.groupby(t["created_at"].dt.to_period("M").astype(str))
            .agg(tickets=("ticket_id", "count"),
                 sla_pct=("met_sla", lambda x: round(x.mean() * 100, 1)),
                 avg_resolution=("resolution_hours", "mean"))
            .reset_index()
            .rename(columns={"created_at": "month"})
        )
        fig = go.Figure()
        fig.add_bar(x=monthly["month"], y=monthly["tickets"],
                    marker_color=ADYEN_GREEN, name="Tickets", opacity=0.8)
        fig.add_scatter(x=monthly["month"], y=monthly["sla_pct"],
                        mode="lines+markers", name="SLA %",
                        yaxis="y2", line=dict(color=ADYEN_DARK, width=2))
        fig.update_layout(
            title="Monthly Ticket Volume & SLA Compliance",
            template=PLOTLY_TEMPLATE,
            yaxis=dict(title="Tickets"),
            yaxis2=dict(title="SLA %", overlaying="y", side="right", range=[0, 110]),
            legend=dict(orientation="h"),
        )
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        priority_counts = t["priority"].value_counts().reset_index()
        fig2 = px.pie(priority_counts, names="priority", values="count",
                      color_discrete_sequence=[ADYEN_GREEN, "#1A1F36", "#888", "#ccc"],
                      title="Tickets by Priority", hole=0.4)
        st.plotly_chart(fig2, use_container_width=True)

    col3, col4 = st.columns(2)
    with col3:
        cat_tier = (
            t.groupby(["category", "merchant_tier"])
            .size().reset_index(name="count")
        )
        fig3 = px.bar(cat_tier, x="category", y="count", color="merchant_tier",
                      barmode="group", title="Tickets by Category & Tier",
                      color_discrete_sequence=[ADYEN_GREEN, ADYEN_DARK, "#888"])
        st.plotly_chart(fig3, use_container_width=True)

    with col4:
        sla_heatmap = (
            t.groupby(["priority", "merchant_tier"])["met_sla"]
            .mean().mul(100).round(1).reset_index()
        )
        fig4 = px.density_heatmap(
            sla_heatmap, x="merchant_tier", y="priority", z="met_sla",
            color_continuous_scale=["#FF4B4B", "#FFA500", ADYEN_GREEN],
            title="SLA Compliance % Heatmap", text_auto=True,
        )
        st.plotly_chart(fig4, use_container_width=True)

# ─────────────────────────────────────────────────────────────
# TAB 2 — Anomaly Detection
# ─────────────────────────────────────────────────────────────
with tab2:
    st.subheader("Automated Anomaly Detection (Z-score + IQR)")

    n_anomalies = ticket_daily["anomaly"].sum()
    st.markdown(f"**{n_anomalies} anomalous days detected** in ticket volume. "
                "The March 2025 incident shows a clear 3–5× spike consistent with a payment processing outage.")

    fig5 = go.Figure()
    fig5.add_scatter(x=ticket_daily["date"], y=ticket_daily["total"],
                     mode="lines", name="Daily Tickets",
                     line=dict(color=ADYEN_DARK, width=1.5))
    fig5.add_scatter(x=ticket_daily["date"], y=ticket_daily["rolling_7d"],
                     mode="lines", name="7-day Rolling Avg",
                     line=dict(color=ADYEN_GREEN, width=2, dash="dot"))

    anomaly_points = ticket_daily[ticket_daily["anomaly"]]
    fig5.add_scatter(x=anomaly_points["date"], y=anomaly_points["total"],
                     mode="markers", name="Anomaly",
                     marker=dict(color="#FF4B4B", size=10, symbol="x"))
    fig5.update_layout(title="Daily Ticket Volume with Anomalies",
                       template=PLOTLY_TEMPLATE, xaxis_title="Date", yaxis_title="Tickets")
    st.plotly_chart(fig5, use_container_width=True)

    col_a, col_b = st.columns(2)
    with col_a:
        fig6 = px.line(resolution_monthly, x="created_at", y="avg_resolution",
                       title="Avg Resolution Time by Month",
                       color_discrete_sequence=[ADYEN_GREEN],
                       markers=True)
        anomaly_res = resolution_monthly[resolution_monthly["resolution_anomaly"]]
        fig6.add_scatter(x=anomaly_res["created_at"], y=anomaly_res["avg_resolution"],
                         mode="markers", name="Anomaly",
                         marker=dict(color="#FF4B4B", size=12, symbol="x"))
        st.plotly_chart(fig6, use_container_width=True)

    with col_b:
        fig7 = px.line(tx_daily, x="date", y="failure_rate",
                       title="Daily Transaction Failure Rate",
                       color_discrete_sequence=[ADYEN_DARK], markers=False)
        tx_anom = tx_daily[tx_daily["failure_anomaly"]]
        fig7.add_scatter(x=tx_anom["date"], y=tx_anom["failure_rate"],
                         mode="markers", name="Anomaly",
                         marker=dict(color="#FF4B4B", size=9, symbol="x"))
        fig7.update_layout(yaxis_tickformat=".1%")
        st.plotly_chart(fig7, use_container_width=True)

    with st.expander("📋 Analyst Narrative — March 2025 Incident"):
        st.markdown("""
**Finding:** Ticket volume spiked 3–5× in March 2025, driven primarily by `payment_failure` tickets
flagged as `critical`. Both Z-score (threshold 2.5σ) and IQR methods independently flagged the same period.

**Impact:** SLA compliance dropped for critical tier tickets despite resolution time holding approximately
steady — suggesting the ops team maintained throughput but volume overwhelmed capacity buffers.

**Hypothesis:** The incident likely correlates with an infrastructure or payment gateway event.
Three signals support this:
1. `payment_failure` category accounted for ~60% of March tickets vs ~20% baseline.
2. Escalation rate rose ~2.5× in the same window.
3. Transaction failure rate showed a coincident spike in the anomaly detector.

**Recommendation:** Implement automated alerting when daily ticket volume exceeds 2σ above the
30-day rolling mean, with a priority breakdown to distinguish systemic (payment_failure) from
operational (onboarding, reporting) spikes. This would reduce detection lag from days to hours.
        """)

# ─────────────────────────────────────────────────────────────
# TAB 3 — Transaction Health
# ─────────────────────────────────────────────────────────────
with tab3:
    monthly_tx = (
        tx.groupby(tx["timestamp"].dt.to_period("M").astype(str))
        .agg(
            total=("transaction_id", "count"),
            failed=("outcome", lambda x: (x == "failed").sum()),
            volume=("amount_eur", "sum"),
            chargedback=("outcome", lambda x: (x == "chargedback").sum()),
        )
        .reset_index()
        .rename(columns={"timestamp": "month"})
    )
    monthly_tx["failure_rate"] = monthly_tx["failed"] / monthly_tx["total"] * 100
    monthly_tx["chargeback_rate"] = monthly_tx["chargedback"] / monthly_tx["total"] * 100

    col1, col2 = st.columns(2)
    with col1:
        fig8 = go.Figure()
        fig8.add_bar(x=monthly_tx["month"], y=monthly_tx["volume"] / 1e6,
                     marker_color=ADYEN_GREEN, name="Volume (€M)")
        fig8.update_layout(title="Monthly Transaction Volume (€M)",
                           template=PLOTLY_TEMPLATE)
        st.plotly_chart(fig8, use_container_width=True)

    with col2:
        fig9 = go.Figure()
        fig9.add_scatter(x=monthly_tx["month"], y=monthly_tx["failure_rate"],
                         name="Failure Rate %", line=dict(color="#FF4B4B", width=2), mode="lines+markers")
        fig9.add_scatter(x=monthly_tx["month"], y=monthly_tx["chargeback_rate"],
                         name="Chargeback Rate %", line=dict(color=ADYEN_DARK, width=2, dash="dot"), mode="lines+markers")
        fig9.update_layout(title="Failure & Chargeback Rates by Month",
                           template=PLOTLY_TEMPLATE, yaxis_title="%")
        st.plotly_chart(fig9, use_container_width=True)

    col3, col4 = st.columns(2)
    with col3:
        pm_outcomes = (
            tx.groupby(["payment_method", "outcome"])
            .size().reset_index(name="count")
        )
        fig10 = px.bar(pm_outcomes, x="payment_method", y="count", color="outcome",
                       barmode="stack", title="Outcomes by Payment Method",
                       color_discrete_map={
                           "success": ADYEN_GREEN, "failed": "#FF4B4B",
                           "refunded": "#FFA500", "chargedback": ADYEN_DARK
                       })
        st.plotly_chart(fig10, use_container_width=True)

    with col4:
        region_tx = (
            tx.groupby("region")
            .agg(total=("transaction_id", "count"),
                 failed=("outcome", lambda x: (x == "failed").sum()),
                 volume=("amount_eur", "sum"))
            .reset_index()
        )
        region_tx["failure_rate"] = region_tx["failed"] / region_tx["total"] * 100
        fig11 = px.scatter(region_tx, x="volume", y="failure_rate",
                           size="total", color="region",
                           title="Volume vs Failure Rate by Region",
                           color_discrete_sequence=[ADYEN_GREEN, ADYEN_DARK, "#888"])
        st.plotly_chart(fig11, use_container_width=True)

# ─────────────────────────────────────────────────────────────
# TAB 4 — Merchant Risk
# ─────────────────────────────────────────────────────────────
with tab4:
    merchant_stats = (
        t.groupby("merchant_id")
        .agg(
            total_tickets=("ticket_id", "count"),
            escalations=("status", lambda x: (x == "escalated").sum()),
            sla_pct=("met_sla", lambda x: round(x.mean() * 100, 1)),
            avg_resolution=("resolution_hours", "mean"),
        )
        .reset_index()
    )
    merchant_stats = merchant_stats.merge(merchants[["merchant_id", "merchant_name", "tier", "region", "monthly_volume_eur"]], on="merchant_id")
    merchant_stats["escalation_pct"] = merchant_stats["escalations"] / merchant_stats["total_tickets"] * 100

    from scipy.stats import rankdata
    merchant_stats["risk_score"] = (
        merchant_stats["escalation_pct"] * 0.4
        + (100 - merchant_stats["sla_pct"]) * 0.4
        + rankdata(merchant_stats["avg_resolution"]) / len(merchant_stats) * 20
    ).round(1)

    col1, col2 = st.columns([3, 1])
    with col1:
        fig12 = px.scatter(
            merchant_stats,
            x="sla_pct", y="escalation_pct",
            size="total_tickets", color="risk_score",
            hover_name="merchant_name",
            hover_data={"tier": True, "region": True, "total_tickets": True},
            color_continuous_scale=["#0ABF53", "#FFA500", "#FF4B4B"],
            title="Merchant Risk Matrix — SLA vs Escalation Rate",
            labels={"sla_pct": "SLA Compliance %", "escalation_pct": "Escalation Rate %"},
        )
        fig12.add_vline(x=75, line_dash="dash", line_color="gray", annotation_text="SLA target")
        st.plotly_chart(fig12, use_container_width=True)

    with col2:
        st.markdown("**Top 10 At-Risk Merchants**")
        top_risk = merchant_stats.nlargest(10, "risk_score")[
            ["merchant_name", "tier", "risk_score", "sla_pct", "escalation_pct"]
        ].rename(columns={
            "merchant_name": "Merchant",
            "tier": "Tier",
            "risk_score": "Risk",
            "sla_pct": "SLA%",
            "escalation_pct": "Esc%"
        })
        top_risk["Risk"] = top_risk["Risk"].round(1)
        top_risk["Esc%"] = top_risk["Esc%"].round(1)
        st.dataframe(top_risk, hide_index=True, use_container_width=True)

    col3, col4 = st.columns(2)
    with col3:
        tier_risk = merchant_stats.groupby("tier")["risk_score"].mean().reset_index()
        fig13 = px.bar(tier_risk, x="tier", y="risk_score",
                       color="tier", title="Avg Risk Score by Tier",
                       color_discrete_sequence=[ADYEN_GREEN, ADYEN_DARK, "#888"])
        st.plotly_chart(fig13, use_container_width=True)

    with col4:
        fig14 = px.box(merchant_stats, x="tier", y="avg_resolution",
                       color="tier", title="Resolution Time Distribution by Tier",
                       color_discrete_sequence=[ADYEN_GREEN, ADYEN_DARK, "#888"])
        st.plotly_chart(fig14, use_container_width=True)

st.divider()
st.caption("Built for Adyen Operations Analytics — Senior Data Analyst portfolio · Data is synthetic")
