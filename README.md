# Adyen Ops Analytics Dashboard

A portfolio project built for a Senior Data Analyst interview at Adyen, demonstrating operational analytics across Support, Professional Services, and Supply Chain domains.

## What's inside

| File | Purpose |
|------|---------|
| `data/generate.py` | Synthetic dataset — 120 merchants, 4,800 tickets, 80,000 transactions with a baked-in March 2025 incident |
| `sql/core_queries.sql` | 7 production-grade queries: CTEs, `LAG()`, `NTILE()`, `ROWS BETWEEN`, conditional aggregation |
| `notebooks/anomaly_detection.py` | Z-score + IQR anomaly detection across ticket volume, resolution time, and transaction failure rate |
| `dashboard/app.py` | 4-tab Streamlit dashboard with Adyen-styled Plotly charts and sidebar filters |

## Quick start

```bash
cd adyen-ops-analytics
pip install -r requirements.txt
python data/generate.py          # creates data/adyen_ops.db
streamlit run dashboard/app.py
```

## Dashboard tabs

1. **Ticket Trends** — monthly volume, SLA compliance, priority breakdown, category × tier heatmap
2. **Anomaly Detection** — automated flagging of the March incident with analyst narrative
3. **Transaction Health** — failure/chargeback rates, payment method outcomes, regional breakdown
4. **Merchant Risk** — composite risk score, risk matrix scatter, resolution time distributions

## Key analytical finding

March 2025 shows a **3–5× spike** in `payment_failure` tickets flagged as `critical`. Both Z-score (2.5σ) and IQR methods independently flag the same period. Transaction failure rate has a coincident spike. SLA compliance held at ~67% for critical tickets across all tiers — the structural gap that warrants immediate attention regardless of the incident.

## SQL highlights

- `LAG()` for month-over-month change tracking
- `NTILE(4)` for merchant load segmentation into quartiles
- `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` for 7-day rolling averages
- Composite risk scoring with weighted escalation and SLA signals

## Tech stack

Python · SQLite · Pandas · NumPy · SciPy · Streamlit · Plotly
