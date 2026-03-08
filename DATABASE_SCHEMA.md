# SHOPEE PRODUCT HUNTER — DATABASE SCHEMA

**Database:** Supabase PostgreSQL
**Version:** 2.0 (Enterprise Analytics)
**Date:** 07/03/2026

---

## TABLES

### 1. users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  affiliate_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_users_email ON users(email);
```

---

### 2. searches

```sql
CREATE TABLE searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id TEXT,
  max_price NUMERIC,
  min_roi_percent NUMERIC DEFAULT 0,
  search_params JSONB,
  status TEXT DEFAULT 'pending',
  product_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_searches_user_id ON searches(user_id);
CREATE INDEX idx_searches_created_at ON searches(created_at DESC);
```

---

### 3. products_current

```sql
CREATE TABLE products_current (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopee_product_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  rating NUMERIC CHECK (rating >= 0 AND rating <= 5),
  sales_per_month INTEGER,
  commission_percentage NUMERIC,
  affiliate_link TEXT,
  rentability_score NUMERIC CHECK (rentability_score >= 0 AND rentability_score <= 100),
  trend_score NUMERIC CHECK (trend_score >= 0 AND trend_score <= 100),
  competition_level TEXT CHECK (competition_level IN ('low', 'medium', 'high')),
  competitors_count INTEGER,
  opportunity_score NUMERIC CHECK (opportunity_score >= 0 AND opportunity_score <= 100),
  score_breakdown JSONB,
  recommended_ad_spend NUMERIC,
  estimated_roi_percent NUMERIC,
  estimated_monthly_profit NUMERIC,
  last_scraped_at TIMESTAMP WITH TIME ZONE,
  last_analyzed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_products_opportunity_score ON products_current(opportunity_score DESC);
CREATE INDEX idx_products_trend_score ON products_current(trend_score DESC);
CREATE INDEX idx_products_last_scraped ON products_current(last_scraped_at DESC);
```

---

### 4. products_history

```sql
CREATE TABLE products_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  shopee_product_id TEXT NOT NULL,
  price NUMERIC NOT NULL,
  rating NUMERIC,
  sales_per_month INTEGER,
  competitors_count INTEGER,
  trend_direction TEXT CHECK (trend_direction IN ('up', 'stable', 'down')),
  market_sentiment TEXT CHECK (market_sentiment IN ('hot', 'warm', 'cold')),
  snapshot_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_history_product ON products_history(product_id, snapshot_date DESC);
CREATE INDEX idx_history_shopee ON products_history(shopee_product_id, snapshot_date DESC);
CREATE INDEX idx_history_date ON products_history(snapshot_date);
```

---

### 5. competitor_tracking

```sql
CREATE TABLE competitor_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  shopee_product_id TEXT NOT NULL,
  affiliate_count INTEGER,
  average_commission NUMERIC,
  market_saturation_percent NUMERIC CHECK (market_saturation_percent >= 0 AND market_saturation_percent <= 100),
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_competitor_product ON competitor_tracking(product_id, tracked_at DESC);
CREATE INDEX idx_competitor_date ON competitor_tracking(tracked_at DESC);
```

---

### 6. roi_estimates

```sql
CREATE TABLE roi_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  search_id UUID REFERENCES searches(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  estimated_conversion_rate NUMERIC,
  estimated_monthly_sales INTEGER,
  estimated_total_revenue NUMERIC,
  estimated_commission NUMERIC,
  estimated_profit_margin NUMERIC,
  estimated_roi_percent NUMERIC,
  confidence_score NUMERIC CHECK (confidence_score >= 0 AND confidence_score <= 100),
  ad_spend_scenarios JSONB,
  predicted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_roi_estimates_product ON roi_estimates(product_id, predicted_at DESC);
CREATE INDEX idx_roi_estimates_user ON roi_estimates(user_id);
```

---

### 7. roi_actuals

```sql
CREATE TABLE roi_actuals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  actual_ad_spend NUMERIC,
  actual_duration_days INTEGER,
  actual_conversions INTEGER,
  actual_revenue NUMERIC,
  actual_commission NUMERIC,
  actual_profit NUMERIC,
  actual_roi_percent NUMERIC,
  estimate_id UUID REFERENCES roi_estimates(id),
  prediction_accuracy_percent NUMERIC,
  notes TEXT,
  reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_actuals_product ON roi_actuals(product_id);
CREATE INDEX idx_actuals_user ON roi_actuals(user_id);
CREATE INDEX idx_actuals_reported ON roi_actuals(reported_at DESC);
```

---

### 8. seasonal_patterns

```sql
CREATE TABLE seasonal_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  month INTEGER CHECK (month >= 1 AND month <= 12),
  performance_score NUMERIC CHECK (performance_score >= 0 AND performance_score <= 100),
  average_sales_this_month INTEGER,
  average_roi_this_month NUMERIC,
  year_analyzed INTEGER,
  confidence_level NUMERIC CHECK (confidence_level >= 0 AND confidence_level <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_seasonal_product ON seasonal_patterns(product_id, month);
```

---

### 9. search_results

```sql
CREATE TABLE search_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id UUID NOT NULL REFERENCES searches(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  opportunity_score_at_search NUMERIC,
  estimated_roi_at_search NUMERIC,
  user_clicked BOOLEAN DEFAULT FALSE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_search_results_search ON search_results(search_id);
```

---

## ROW LEVEL SECURITY (RLS)

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE products_current ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_actuals ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_results ENABLE ROW LEVEL SECURITY;

-- Users: Can only see their own data
CREATE POLICY users_policy_select ON users
FOR SELECT USING (auth.uid() = id);

-- Searches: Can only see their own searches
CREATE POLICY searches_policy_select ON searches
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY searches_policy_insert ON searches
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Products (current): Public read
CREATE POLICY products_policy_select ON products_current
FOR SELECT USING (TRUE);

-- ROI estimates: Users see their own
CREATE POLICY roi_estimates_policy_select ON roi_estimates
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY roi_estimates_policy_insert ON roi_estimates
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ROI actuals: Users see their own
CREATE POLICY roi_actuals_policy_select ON roi_actuals
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY roi_actuals_policy_insert ON roi_actuals
FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## COMPLETE MIGRATION SCRIPT

Execute this entire block in Supabase SQL Editor to create all tables:

```sql
BEGIN;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  affiliate_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id TEXT,
  max_price NUMERIC,
  min_roi_percent NUMERIC DEFAULT 0,
  search_params JSONB,
  status TEXT DEFAULT 'pending',
  product_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE products_current (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopee_product_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  rating NUMERIC,
  sales_per_month INTEGER,
  commission_percentage NUMERIC,
  affiliate_link TEXT,
  rentability_score NUMERIC,
  trend_score NUMERIC,
  competition_level TEXT,
  competitors_count INTEGER,
  opportunity_score NUMERIC,
  score_breakdown JSONB,
  recommended_ad_spend NUMERIC,
  estimated_roi_percent NUMERIC,
  estimated_monthly_profit NUMERIC,
  last_scraped_at TIMESTAMP WITH TIME ZONE,
  last_analyzed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE products_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  shopee_product_id TEXT NOT NULL,
  price NUMERIC NOT NULL,
  rating NUMERIC,
  sales_per_month INTEGER,
  competitors_count INTEGER,
  trend_direction TEXT,
  market_sentiment TEXT,
  snapshot_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE competitor_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  shopee_product_id TEXT NOT NULL,
  affiliate_count INTEGER,
  average_commission NUMERIC,
  market_saturation_percent NUMERIC,
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE roi_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  search_id UUID REFERENCES searches(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  estimated_conversion_rate NUMERIC,
  estimated_monthly_sales INTEGER,
  estimated_total_revenue NUMERIC,
  estimated_commission NUMERIC,
  estimated_profit_margin NUMERIC,
  estimated_roi_percent NUMERIC,
  confidence_score NUMERIC,
  ad_spend_scenarios JSONB,
  predicted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE roi_actuals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  actual_ad_spend NUMERIC,
  actual_duration_days INTEGER,
  actual_conversions INTEGER,
  actual_revenue NUMERIC,
  actual_commission NUMERIC,
  actual_profit NUMERIC,
  actual_roi_percent NUMERIC,
  estimate_id UUID REFERENCES roi_estimates(id),
  prediction_accuracy_percent NUMERIC,
  notes TEXT,
  reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE seasonal_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  month INTEGER,
  performance_score NUMERIC,
  average_sales_this_month INTEGER,
  average_roi_this_month NUMERIC,
  year_analyzed INTEGER,
  confidence_level NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE search_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id UUID NOT NULL REFERENCES searches(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  opportunity_score_at_search NUMERIC,
  estimated_roi_at_search NUMERIC,
  user_clicked BOOLEAN DEFAULT FALSE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_searches_user ON searches(user_id);
CREATE INDEX idx_searches_created ON searches(created_at DESC);
CREATE INDEX idx_products_opportunity ON products_current(opportunity_score DESC);
CREATE INDEX idx_products_trend ON products_current(trend_score DESC);
CREATE INDEX idx_history_product ON products_history(product_id, snapshot_date DESC);
CREATE INDEX idx_competitor_product ON competitor_tracking(product_id, tracked_at DESC);
CREATE INDEX idx_roi_estimates_product ON roi_estimates(product_id, predicted_at DESC);
CREATE INDEX idx_roi_actuals_product ON roi_actuals(product_id);
CREATE INDEX idx_seasonal_product ON seasonal_patterns(product_id, month);
CREATE INDEX idx_search_results_search ON search_results(search_id);

-- RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE products_current ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_actuals ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY users_policy_select ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY searches_policy_select ON searches FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY searches_policy_insert ON searches FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY products_policy_select ON products_current FOR SELECT USING (TRUE);
CREATE POLICY roi_estimates_policy_select ON roi_estimates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY roi_estimates_policy_insert ON roi_estimates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY roi_actuals_policy_select ON roi_actuals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY roi_actuals_policy_insert ON roi_actuals FOR INSERT WITH CHECK (auth.uid() = user_id);

COMMIT;
```

---

**Table Relationships:**

```
users
├── searches (1:N)
│   └── search_results (1:N) → products_current
├── roi_estimates (1:N) → products_current
└── roi_actuals (1:N) → products_current

products_current (1:N)
├── products_history
├── competitor_tracking
├── roi_estimates
├── roi_actuals
└── search_results
```

---

**Partitioning Strategy (Optional - for production scale):**

```sql
-- Partition products_history by year for performance
CREATE TABLE products_history_2026 PARTITION OF products_history
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE TABLE products_history_2027 PARTITION OF products_history
  FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');
```

---

**Next:** See `IMPLEMENTATION_PLAN.md` for setup steps.
