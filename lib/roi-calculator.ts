export type ROIScenario = {
  adSpend: number
  conversions: number
  revenue: number
  commission: number
  profit: number
  roi: number
  verdict: "vale" | "avalie" | "nao_vale"
}

export function calculateROI(
  adSpend: number,
  product: {
    price: number
    commission_percentage?: number | null
    sales_per_month?: number | null
  }
): ROIScenario {
  const commissionRate = (product.commission_percentage ?? 10) / 100
  const estimatedCPA = product.price * 0.15
  const conversions = Math.floor(adSpend / Math.max(estimatedCPA, 1))
  const revenue = conversions * product.price
  const commission = revenue * commissionRate
  const profit = commission - adSpend
  const roi = adSpend > 0 ? (profit / adSpend) * 100 : 0

  const verdict: ROIScenario["verdict"] =
    roi >= 50 ? "vale" : roi >= 0 ? "avalie" : "nao_vale"

  return { adSpend, conversions, revenue, commission, profit, roi, verdict }
}
