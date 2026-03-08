export type MonthlyPattern = {
  month: number
  monthName: string
  performanceScore: number
  avgSales: number
  avgPrice: number
}

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

export function detectSeasonalPatterns(
  history: { snapshot_date: string; sales_per_month: number; price: number; rating?: number }[]
): MonthlyPattern[] {
  const byMonth: Record<number, { sales: number[]; prices: number[]; ratings: number[] }> = {}

  for (let m = 1; m <= 12; m++) {
    byMonth[m] = { sales: [], prices: [], ratings: [] }
  }

  for (const h of history) {
    const month = new Date(h.snapshot_date).getMonth() + 1
    byMonth[month].sales.push(h.sales_per_month ?? 0)
    byMonth[month].prices.push(h.price)
    byMonth[month].ratings.push(h.rating ?? 4)
  }

  const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0)

  const patterns = Object.entries(byMonth).map(([m, data]) => {
    const month = Number(m)
    const avgSales = avg(data.sales)
    const avgPrice = avg(data.prices)
    const avgRating = avg(data.ratings)
    const rawScore = avgSales * 0.5 + avgPrice * 0.3 + avgRating * 20 * 0.2
    return { month, avgSales, avgPrice, rawScore }
  })

  const maxRaw = Math.max(...patterns.map((p) => p.rawScore), 1)

  return patterns.map((p) => ({
    month: p.month,
    monthName: MONTH_NAMES[p.month - 1],
    performanceScore: Math.round((p.rawScore / maxRaw) * 100),
    avgSales: Math.round(p.avgSales),
    avgPrice: Math.round(p.avgPrice * 100) / 100,
  }))
}

export function getBestMonth(patterns: MonthlyPattern[]): MonthlyPattern | null {
  return patterns.reduce((best, p) => (p.performanceScore > (best?.performanceScore ?? 0) ? p : best), patterns[0] ?? null)
}

export function getSeasonalScore(patterns: MonthlyPattern[], month: number): number {
  return patterns.find((p) => p.month === month)?.performanceScore ?? 50
}
