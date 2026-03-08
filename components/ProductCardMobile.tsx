"use client"

import { Button } from "@/components/ui/button"
import { ScorePill } from "@/components/ScorePill"
import { TrendBadge } from "@/components/TrendBadge"
import type { Product } from "@/components/OpportunityTable"

export function ProductCardMobile({
  product,
  onClick,
}: {
  product: Product
  onClick: () => void
}) {
  return (
    <div className="bg-card rounded-lg p-4 border border-border space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-white line-clamp-2 flex-1">
          {product.title}
        </h3>
        <ScorePill score={product.opportunity_score ?? 0} />
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="font-mono text-white">
          R$ {product.price.toFixed(2)}
        </span>
        <span className="font-mono text-green-400">
          ROI {product.estimated_roi_percent?.toFixed(0) ?? 0}%
        </span>
        <TrendBadge trend={product.trend_direction ?? "stable"} />
      </div>

      <Button
        onClick={onClick}
        className="w-full h-11 bg-primary-500 hover:bg-primary-600"
      >
        Ver Detalhes
      </Button>
    </div>
  )
}
