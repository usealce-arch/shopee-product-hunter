export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          affiliate_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          affiliate_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          affiliate_id?: string | null
          updated_at?: string
        }
      }
      searches: {
        Row: {
          id: string
          user_id: string
          category_id: string | null
          max_price: number | null
          min_roi_percent: number
          search_params: Record<string, unknown> | null
          status: string
          product_count: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id?: string | null
          max_price?: number | null
          min_roi_percent?: number
          search_params?: Record<string, unknown> | null
          status?: string
          product_count?: number
          created_at?: string
        }
        Update: {
          category_id?: string | null
          max_price?: number | null
          min_roi_percent?: number
          search_params?: Record<string, unknown> | null
          status?: string
          product_count?: number
        }
      }
      products_current: {
        Row: {
          id: string
          shopee_product_id: string
          title: string
          price: number
          original_price: number | null
          rating: number | null
          sales_per_month: number | null
          commission_percentage: number | null
          affiliate_link: string | null
          rentability_score: number | null
          trend_score: number | null
          competition_level: "low" | "medium" | "high" | null
          competitors_count: number | null
          opportunity_score: number | null
          score_breakdown: Record<string, unknown> | null
          recommended_ad_spend: number | null
          estimated_roi_percent: number | null
          estimated_monthly_profit: number | null
          last_scraped_at: string | null
          last_analyzed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          shopee_product_id: string
          title: string
          price: number
          original_price?: number | null
          rating?: number | null
          sales_per_month?: number | null
          commission_percentage?: number | null
          affiliate_link?: string | null
          rentability_score?: number | null
          trend_score?: number | null
          competition_level?: "low" | "medium" | "high" | null
          competitors_count?: number | null
          opportunity_score?: number | null
          score_breakdown?: Record<string, unknown> | null
          recommended_ad_spend?: number | null
          estimated_roi_percent?: number | null
          estimated_monthly_profit?: number | null
          last_scraped_at?: string | null
          last_analyzed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          price?: number
          original_price?: number | null
          rating?: number | null
          sales_per_month?: number | null
          commission_percentage?: number | null
          affiliate_link?: string | null
          rentability_score?: number | null
          trend_score?: number | null
          competition_level?: "low" | "medium" | "high" | null
          competitors_count?: number | null
          opportunity_score?: number | null
          score_breakdown?: Record<string, unknown> | null
          recommended_ad_spend?: number | null
          estimated_roi_percent?: number | null
          estimated_monthly_profit?: number | null
          last_scraped_at?: string | null
          last_analyzed_at?: string | null
          updated_at?: string
        }
      }
      products_history: {
        Row: {
          id: string
          product_id: string
          shopee_product_id: string
          price: number
          rating: number | null
          sales_per_month: number | null
          competitors_count: number | null
          trend_direction: "up" | "stable" | "down" | null
          market_sentiment: "hot" | "warm" | "cold" | null
          snapshot_date: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          shopee_product_id: string
          price: number
          rating?: number | null
          sales_per_month?: number | null
          competitors_count?: number | null
          trend_direction?: "up" | "stable" | "down" | null
          market_sentiment?: "hot" | "warm" | "cold" | null
          snapshot_date: string
          created_at?: string
        }
        Update: {
          price?: number
          rating?: number | null
          sales_per_month?: number | null
          competitors_count?: number | null
          trend_direction?: "up" | "stable" | "down" | null
          market_sentiment?: "hot" | "warm" | "cold" | null
        }
      }
      competitor_tracking: {
        Row: {
          id: string
          product_id: string
          shopee_product_id: string
          affiliate_count: number | null
          average_commission: number | null
          market_saturation_percent: number | null
          tracked_at: string
        }
        Insert: {
          id?: string
          product_id: string
          shopee_product_id: string
          affiliate_count?: number | null
          average_commission?: number | null
          market_saturation_percent?: number | null
          tracked_at?: string
        }
        Update: {
          affiliate_count?: number | null
          average_commission?: number | null
          market_saturation_percent?: number | null
        }
      }
      roi_estimates: {
        Row: {
          id: string
          product_id: string
          search_id: string | null
          user_id: string
          estimated_conversion_rate: number | null
          estimated_monthly_sales: number | null
          estimated_total_revenue: number | null
          estimated_commission: number | null
          estimated_profit_margin: number | null
          estimated_roi_percent: number | null
          confidence_score: number | null
          ad_spend_scenarios: Record<string, unknown> | null
          predicted_at: string
        }
        Insert: {
          id?: string
          product_id: string
          search_id?: string | null
          user_id: string
          estimated_conversion_rate?: number | null
          estimated_monthly_sales?: number | null
          estimated_total_revenue?: number | null
          estimated_commission?: number | null
          estimated_profit_margin?: number | null
          estimated_roi_percent?: number | null
          confidence_score?: number | null
          ad_spend_scenarios?: Record<string, unknown> | null
          predicted_at?: string
        }
        Update: {
          estimated_conversion_rate?: number | null
          estimated_monthly_sales?: number | null
          estimated_total_revenue?: number | null
          estimated_commission?: number | null
          estimated_profit_margin?: number | null
          estimated_roi_percent?: number | null
          confidence_score?: number | null
          ad_spend_scenarios?: Record<string, unknown> | null
        }
      }
      roi_actuals: {
        Row: {
          id: string
          product_id: string
          user_id: string
          actual_ad_spend: number | null
          actual_duration_days: number | null
          actual_conversions: number | null
          actual_revenue: number | null
          actual_commission: number | null
          actual_profit: number | null
          actual_roi_percent: number | null
          estimate_id: string | null
          prediction_accuracy_percent: number | null
          notes: string | null
          reported_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          actual_ad_spend?: number | null
          actual_duration_days?: number | null
          actual_conversions?: number | null
          actual_revenue?: number | null
          actual_commission?: number | null
          actual_profit?: number | null
          actual_roi_percent?: number | null
          estimate_id?: string | null
          prediction_accuracy_percent?: number | null
          notes?: string | null
          reported_at?: string
        }
        Update: {
          actual_ad_spend?: number | null
          actual_duration_days?: number | null
          actual_conversions?: number | null
          actual_revenue?: number | null
          actual_commission?: number | null
          actual_profit?: number | null
          actual_roi_percent?: number | null
          prediction_accuracy_percent?: number | null
          notes?: string | null
        }
      }
      seasonal_patterns: {
        Row: {
          id: string
          product_id: string
          month: number | null
          performance_score: number | null
          average_sales_this_month: number | null
          average_roi_this_month: number | null
          year_analyzed: number | null
          confidence_level: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          month?: number | null
          performance_score?: number | null
          average_sales_this_month?: number | null
          average_roi_this_month?: number | null
          year_analyzed?: number | null
          confidence_level?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          month?: number | null
          performance_score?: number | null
          average_sales_this_month?: number | null
          average_roi_this_month?: number | null
          year_analyzed?: number | null
          confidence_level?: number | null
          updated_at?: string
        }
      }
      search_results: {
        Row: {
          id: string
          search_id: string
          product_id: string
          opportunity_score_at_search: number | null
          estimated_roi_at_search: number | null
          user_clicked: boolean
          clicked_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          search_id: string
          product_id: string
          opportunity_score_at_search?: number | null
          estimated_roi_at_search?: number | null
          user_clicked?: boolean
          clicked_at?: string | null
          created_at?: string
        }
        Update: {
          opportunity_score_at_search?: number | null
          estimated_roi_at_search?: number | null
          user_clicked?: boolean
          clicked_at?: string | null
        }
      }
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"]
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"]
