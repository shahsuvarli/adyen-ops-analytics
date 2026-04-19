-- ============================================================
-- Adyen Ops Analytics — Core SQL Queries
-- Demonstrates: CTEs, window functions, LAG(), NTILE(),
-- ROWS BETWEEN, conditional aggregation
-- ============================================================


-- 1. Monthly ticket volume with MoM change (LAG + window)
WITH monthly AS (
    SELECT
        strftime('%Y-%m', created_at)  AS month,
        COUNT(*)                        AS total_tickets,
        SUM(CASE WHEN priority = 'critical' THEN 1 ELSE 0 END) AS critical_tickets,
        ROUND(AVG(resolution_hours), 2) AS avg_resolution_hrs,
        ROUND(100.0 * SUM(met_sla) / COUNT(*), 1) AS sla_pct
    FROM tickets
    GROUP BY 1
)
SELECT
    month,
    total_tickets,
    critical_tickets,
    avg_resolution_hrs,
    sla_pct,
    LAG(total_tickets) OVER (ORDER BY month)  AS prev_month_tickets,
    ROUND(
        100.0 * (total_tickets - LAG(total_tickets) OVER (ORDER BY month))
              / NULLIF(LAG(total_tickets) OVER (ORDER BY month), 0),
        1
    ) AS mom_change_pct
FROM monthly
ORDER BY month;


-- 2. SLA compliance by priority and merchant tier
SELECT
    merchant_tier,
    priority,
    COUNT(*)                                        AS total,
    SUM(met_sla)                                    AS met,
    ROUND(100.0 * SUM(met_sla) / COUNT(*), 1)       AS sla_compliance_pct,
    ROUND(AVG(resolution_hours), 2)                 AS avg_resolution_hrs,
    ROUND(MIN(resolution_hours), 2)                 AS min_resolution_hrs,
    ROUND(MAX(resolution_hours), 2)                 AS max_resolution_hrs
FROM tickets
GROUP BY 1, 2
ORDER BY merchant_tier, priority;


-- 3. Merchant segmentation by ticket load (NTILE quartiles)
WITH merchant_load AS (
    SELECT
        merchant_id,
        COUNT(*)                                       AS total_tickets,
        SUM(CASE WHEN status = 'escalated' THEN 1 ELSE 0 END) AS escalations,
        ROUND(100.0 * SUM(met_sla) / COUNT(*), 1)     AS sla_pct,
        ROUND(AVG(resolution_hours), 2)                AS avg_resolution_hrs
    FROM tickets
    GROUP BY merchant_id
),
segmented AS (
    SELECT
        m.*,
        mer.tier,
        mer.region,
        NTILE(4) OVER (ORDER BY total_tickets DESC) AS load_quartile
    FROM merchant_load m
    JOIN merchants mer USING (merchant_id)
)
SELECT
    load_quartile,
    COUNT(*)                         AS merchants,
    ROUND(AVG(total_tickets), 1)     AS avg_tickets,
    ROUND(AVG(escalations), 2)       AS avg_escalations,
    ROUND(AVG(sla_pct), 1)           AS avg_sla_pct
FROM segmented
GROUP BY 1
ORDER BY 1;


-- 4. 7-day rolling average of daily ticket volume (ROWS BETWEEN)
WITH daily AS (
    SELECT
        DATE(created_at)  AS day,
        COUNT(*)          AS tickets
    FROM tickets
    GROUP BY 1
)
SELECT
    day,
    tickets,
    ROUND(
        AVG(tickets) OVER (
            ORDER BY day
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ), 1
    ) AS rolling_7d_avg
FROM daily
ORDER BY day;


-- 5. Transaction health by month — failure rate + processing p95
WITH tx_monthly AS (
    SELECT
        strftime('%Y-%m', timestamp)   AS month,
        COUNT(*)                        AS total_txn,
        SUM(CASE WHEN outcome = 'failed'      THEN 1 ELSE 0 END) AS failed,
        SUM(CASE WHEN outcome = 'chargedback' THEN 1 ELSE 0 END) AS chargedbacks,
        SUM(CASE WHEN outcome = 'refunded'    THEN 1 ELSE 0 END) AS refunds,
        ROUND(SUM(amount_eur), 2)       AS total_volume_eur
    FROM transactions
    GROUP BY 1
)
SELECT
    month,
    total_txn,
    failed,
    chargedbacks,
    ROUND(100.0 * failed / total_txn, 2)        AS failure_rate_pct,
    ROUND(100.0 * chargedbacks / total_txn, 3)  AS chargeback_rate_pct,
    total_volume_eur
FROM tx_monthly
ORDER BY month;


-- 6. Escalation rate by category with 3-month trend (LAG x2)
WITH monthly_cat AS (
    SELECT
        strftime('%Y-%m', created_at)  AS month,
        category,
        COUNT(*)                        AS tickets,
        SUM(CASE WHEN status = 'escalated' THEN 1 ELSE 0 END) AS escalated
    FROM tickets
    GROUP BY 1, 2
)
SELECT
    month,
    category,
    tickets,
    escalated,
    ROUND(100.0 * escalated / tickets, 1)  AS escalation_pct,
    LAG(ROUND(100.0 * escalated / tickets, 1), 1) OVER (PARTITION BY category ORDER BY month) AS prev1m_pct,
    LAG(ROUND(100.0 * escalated / tickets, 1), 2) OVER (PARTITION BY category ORDER BY month) AS prev2m_pct
FROM monthly_cat
ORDER BY month, category;


-- 7. Top merchants by escalation risk (composite score)
WITH merchant_stats AS (
    SELECT
        t.merchant_id,
        m.merchant_name,
        m.tier,
        m.region,
        COUNT(*)                                              AS total_tickets,
        SUM(CASE WHEN t.status = 'escalated' THEN 1 ELSE 0 END) AS escalations,
        ROUND(100.0 * SUM(CASE WHEN t.status = 'escalated' THEN 1 ELSE 0 END) / COUNT(*), 1) AS escalation_pct,
        ROUND(100.0 * SUM(t.met_sla) / COUNT(*), 1)          AS sla_compliance_pct,
        ROUND(AVG(t.resolution_hours), 2)                     AS avg_resolution_hrs
    FROM tickets t
    JOIN merchants m USING (merchant_id)
    GROUP BY 1, 2, 3, 4
    HAVING total_tickets >= 10
),
scored AS (
    SELECT *,
        ROUND(
            (escalation_pct * 0.4)
            + ((100 - sla_compliance_pct) * 0.4)
            + (NTILE(5) OVER (ORDER BY avg_resolution_hrs DESC) * 4.0),
        1) AS risk_score
    FROM merchant_stats
)
SELECT *
FROM scored
ORDER BY risk_score DESC
LIMIT 20;
