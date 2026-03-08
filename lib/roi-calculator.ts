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
  const commissionPerSale = product.price * commissionRate

  // CPA realista para afiliados Shopee (baseado em dados de mercado)
  // Fonte: benchmarks de e-commerce BR, taxa de conversao media 1-3%
  // CPC medio Shopee Ads: R$0.30-0.80
  // Taxa de conversao afiliado: ~2-4% (produto barato) / ~1-2% (produto caro)
  // CPA = CPC / taxa de conversao
  const estimatedCPA = product.price < 30
    ? Math.max(3, product.price * 0.12)    // CPA ~R$3-4 (impulse buy, conv ~3%)
    : product.price < 80
      ? Math.max(5, product.price * 0.08)  // CPA ~R$5-7 (conv ~2.5%)
      : product.price < 200
        ? Math.max(8, product.price * 0.06) // CPA ~R$8-12 (conv ~2%)
        : Math.max(15, product.price * 0.05) // CPA ~R$15+ (conv ~1.5%)

  const conversions = Math.floor(adSpend / Math.max(estimatedCPA, 1))
  const revenue = conversions * product.price
  const commission = conversions * commissionPerSale
  const profit = commission - adSpend
  const roi = adSpend > 0 ? (profit / adSpend) * 100 : 0

  const verdict: ROIScenario["verdict"] =
    roi >= 50 ? "vale" : roi >= 0 ? "avalie" : "nao_vale"

  return { adSpend, conversions, revenue, commission, profit, roi, verdict }
}
