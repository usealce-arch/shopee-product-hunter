import { createServerClient } from "@/lib/db"

interface MonthlyPattern {
  month: number
  monthName: string
  performanceScore: number
  avgSales: number
  avgROI: number
  confidence: number
}

interface SeasonalAnalysis {
  productId: string
  bestMonth: number
  bestMonthName: string
  worstMonth: number
  worstMonthName: string
  patterns: MonthlyPattern[]
  overallSeasonality: "high" | "moderate" | "low"
}

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

const CATEGORY_SEASONALITY: Record<string, number[]> = {
  eletronicos:  [0.7, 0.6, 0.8, 0.7, 0.9, 1.0, 0.8, 0.7, 0.8, 0.9, 1.3, 1.5],
  casa:         [0.8, 0.7, 0.9, 0.8, 1.0, 1.1, 0.9, 0.8, 0.9, 1.0, 1.2, 1.3],
  moda:         [0.6, 0.7, 1.0, 0.9, 0.8, 1.2, 1.1, 0.8, 0.9, 0.8, 1.2, 1.4],
  beleza:       [0.7, 0.8, 1.1, 0.9, 1.2, 1.0, 0.8, 0.9, 0.8, 0.9, 1.1, 1.3],
  esportes:     [1.2, 1.1, 1.0, 0.9, 0.7, 0.6, 0.8, 0.9, 1.0, 1.1, 1.0, 0.8],
  pets:         [0.9, 0.9, 0.9, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.1, 1.2],
  baby:         [0.9, 0.8, 0.9, 1.0, 1.1, 1.0, 0.9, 0.9, 1.0, 1.1, 1.1, 1.3],
  all:          [0.8, 0.7, 0.9, 0.8, 0.9, 1.0, 0.9, 0.8, 0.9, 1.0, 1.2, 1.4],
}

export function detectSeasonalPatterns(
  category: string,
  baseSales: number,
  baseROI: number,
  productSeed: number
): MonthlyPattern[] {
  const multipliers = CATEGORY_SEASONALITY[category] || CATEGORY_SEASONALITY.all

  return multipliers.map((mult, i) => {
    const variation = 1 + (Math.sin(productSeed * (i + 1) * 0.7) * 0.15)
    const adjustedMult = mult * variation

    const avgSales = Math.round(baseSales * adjustedMult)
    const avgROI = Math.round(baseROI * adjustedMult * 10) / 10

    const salesRelative = adjustedMult
    const priceRelative = 1 + (adjustedMult - 1) * 0.3
    const performanceScore = Math.round(
      (salesRelative * 0.5 + priceRelative * 0.3 + (adjustedMult > 1 ? 0.8 : 0.5) * 0.2) * 70
    )

    const confidence = Math.min(95, Math.max(40, 70 + Math.round(Math.sin(productSeed + i) * 20)))

    return {
      month: i + 1,
      monthName: MONTH_NAMES[i],
      performanceScore: Math.min(100, Math.max(10, performanceScore)),
      avgSales,
      avgROI,
      confidence,
    }
  })
}

export function analyzeProduct(
  productId: string,
  category: string,
  salesPerMonth: number,
  roiPercent: number
): SeasonalAnalysis {
  const seed = productId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const patterns = detectSeasonalPatterns(category, salesPerMonth, roiPercent, seed)

  const bestPattern = patterns.reduce((best, p) =>
    p.performanceScore > best.performanceScore ? p : best
  )
  const worstPattern = patterns.reduce((worst, p) =>
    p.performanceScore < worst.performanceScore ? p : worst
  )

  const scoreRange = bestPattern.performanceScore - worstPattern.performanceScore
  const overallSeasonality: "high" | "moderate" | "low" =
    scoreRange > 30 ? "high" : scoreRange > 15 ? "moderate" : "low"

  return {
    productId,
    bestMonth: bestPattern.month,
    bestMonthName: bestPattern.monthName,
    worstMonth: worstPattern.month,
    worstMonthName: worstPattern.monthName,
    patterns,
    overallSeasonality,
  }
}

export async function saveSeasonalPatterns(
  productId: string,
  patterns: MonthlyPattern[]
): Promise<void> {
  try {
    const db = createServerClient()
    await db.from("seasonal_patterns").delete().eq("product_id", productId)

    const rows = patterns.map((p) => ({
      product_id: productId,
      month: p.month,
      performance_score: p.performanceScore,
      average_sales_this_month: p.avgSales,
      average_roi_this_month: p.avgROI,
      year_analyzed: new Date().getFullYear(),
      confidence_level: p.confidence,
    }))

    await db.from("seasonal_patterns").insert(rows)
  } catch {
    // Silent fail - seasonal data is not critical
  }
}

export { type MonthlyPattern, type SeasonalAnalysis }
