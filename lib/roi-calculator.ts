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

  // CPA baseado no preco — considera que afiliado usa conteudo organico + ads
  // Produtos baratos (<R$50): CPA baixo (compra por impulso)
  // Produtos medios (R$50-200): CPA moderado
  // Produtos caros (>R$200): CPA alto (decisao mais lenta)
  const estimatedCPA = product.price < 50
    ? Math.max(1.5, product.price * 0.05)
    : product.price < 200
      ? Math.max(4, product.price * 0.05)
      : Math.max(8, product.price * 0.04)

  const conversions = Math.floor(adSpend / Math.max(estimatedCPA, 1))
  const revenue = conversions * product.price
  const commission = conversions * commissionPerSale
  const profit = commission - adSpend
  const roi = adSpend > 0 ? (profit / adSpend) * 100 : 0

  const verdict: ROIScenario["verdict"] =
    roi >= 50 ? "vale" : roi >= 0 ? "avalie" : "nao_vale"

  return { adSpend, conversions, revenue, commission, profit, roi, verdict }
}
