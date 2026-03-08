"use client"

import { Star, ShoppingCart, Users, Copy, Calculator } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScoreBreakdown } from "@/components/ScoreBreakdown"
import { PriceHistoryChart } from "@/components/PriceHistoryChart"
import type { Product } from "@/components/OpportunityTable"

type ScoreBreakdownData = {
  rentability?: number
  trend?: number
  competition?: number
  seasonality?: number
  history?: number
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onCalculatorClick,
}: {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onCalculatorClick?: () => void
}) {
  if (!product) return null

  const breakdown: ScoreBreakdownData =
    (product as Record<string, unknown>).score_breakdown as ScoreBreakdownData ?? {}

  const dimensions = [
    { label: "Rentabilidade", value: breakdown.rentability ?? 0 },
    { label: "Tendência", value: breakdown.trend ?? 0 },
    { label: "Competição", value: breakdown.competition ?? 0 },
    { label: "Sazonalidade", value: breakdown.seasonality ?? 0 },
    { label: "Histórico", value: breakdown.history ?? 0 },
  ]

  const mockHistory = Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}/03`,
    price: product.price * (0.9 + Math.random() * 0.2),
    sales: Math.floor((product.sales_per_month ?? 100) / 30 * (0.7 + Math.random() * 0.6)),
  }))

  const handleCopyLink = async () => {
    const link = product.affiliate_link ?? `https://shopee.com.br/product/${product.id}`
    await navigator.clipboard.writeText(link)
  }

  const adSpend = 100
  const estimatedProfit = (product.estimated_roi_percent ?? 0) / 100 * adSpend

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-xl text-white pr-8">
            {product.title}
          </DialogTitle>
        </DialogHeader>

        {/* Info básica */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-mono text-lg text-white">
              R$ {product.price.toFixed(2)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-muted-foreground line-through text-xs">
                R$ {product.original_price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span className="font-mono">{((product as Record<string, unknown>).rating as number)?.toFixed(1) ?? "—"}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <ShoppingCart size={14} />
            <span className="font-mono">{product.sales_per_month ?? 0}/mês</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Users size={14} />
            <span className="font-mono">{product.commission_percentage ?? 0}% comissão</span>
          </div>
        </div>

        {/* Score */}
        <ScoreBreakdown
          totalScore={product.opportunity_score ?? 0}
          dimensions={dimensions}
        />

        {/* Gráfico */}
        <PriceHistoryChart data={mockHistory} />

        {/* Recomendação */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="text-sm font-medium text-muted-foreground uppercase mb-3">
            Recomendação
          </h3>
          <p className="text-white mb-2">
            Invista{" "}
            <span className="font-mono text-primary-500">R$ {adSpend}</span> e ganhe{" "}
            <span className="font-mono text-green-400">
              R$ {(adSpend + estimatedProfit).toFixed(0)}
            </span>
          </p>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              {((product as Record<string, unknown>).competition_level as string) === "low"
                ? "Competição BAIXA"
                : ((product as Record<string, unknown>).competition_level as string) === "high"
                  ? "Competição ALTA"
                  : "Competição MÉDIA"}
            </Badge>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-3">
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="flex-1"
          >
            <Copy size={16} className="mr-2" />
            Copiar Link Afiliado
          </Button>
          <Button
            onClick={onCalculatorClick}
            className="flex-1 bg-primary-500 hover:bg-primary-600"
          >
            <Calculator size={16} className="mr-2" />
            Calculadora ROI
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
