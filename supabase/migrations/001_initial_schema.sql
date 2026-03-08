BEGIN;

-- 1. users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  affiliate_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. searches
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

-- 3. products_current
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

-- 4. products_history
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

-- 5. competitor_tracking
CREATE TABLE competitor_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products_current(id) ON DELETE CASCADE,
  shopee_product_id TEXT NOT NULL,
  affiliate_count INTEGER,
  average_commission NUMERIC,
  market_saturation_percent NUMERIC,
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. roi_estimates
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

-- 7. roi_actuals
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

-- 8. seasonal_patterns
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

-- 9. search_results
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
CREATE INDEX idx_history_shopee ON products_history(shopee_product_id, snapshot_date DESC);
CREATE INDEX idx_history_date ON products_history(snapshot_date);
CREATE INDEX idx_competitor_product ON competitor_tracking(product_id, tracked_at DESC);
CREATE INDEX idx_competitor_date ON competitor_tracking(tracked_at DESC);
CREATE INDEX idx_roi_estimates_product ON roi_estimates(product_id, predicted_at DESC);
CREATE INDEX idx_roi_estimates_user ON roi_estimates(user_id);
CREATE INDEX idx_roi_actuals_product ON roi_actuals(product_id);
CREATE INDEX idx_roi_actuals_user ON roi_actuals(user_id);
CREATE INDEX idx_roi_actuals_reported ON roi_actuals(reported_at DESC);
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
