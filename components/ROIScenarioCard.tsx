import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ROIScenario } from "@/lib/roi-calculator"

const verdictConfig = {
  vale: { label: "VALE", className: "bg-green-500/10 text-green-400 border-green-500/30" },
  avalie: { label: "AVALIE", className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" },
  nao_vale: { label: "NÃO VALE", className: "bg-red-500/10 text-red-400 border-red-500/30" },
}

export function ROIScenarioCard({ scenario }: { scenario: ROIScenario }) {
  const v = verdictConfig[scenario.verdict]
  const isPositive = scenario.profit >= 0

  return (
    <div
      className={cn(
        "bg-card rounded-lg p-6 border",
        isPositive ? "border-green-500/30" : "border-red-500/30"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-lg text-white">
          R$ {scenario.adSpend.toFixed(0)}
        </span>
        <Badge className={cn("text-xs", v.className)}>{v.label}</Badge>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Conversões</span>
          <span className="font-mono text-slate-300">{scenario.conversions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Revenue</span>
          <span className="font-mono text-slate-300">R$ {scenario.revenue.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Comissão</span>
          <span className="font-mono text-slate-300">R$ {scenario.commission.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Ad Spend</span>
          <span className="font-mono text-red-400">-R$ {scenario.adSpend.toFixed(2)}</span>
        </div>

        <div className="border-t border-border pt-2 mt-2">
          <div className="flex justify-between">
            <span className="font-medium text-white">Lucro</span>
            <span
              className={cn(
                "font-mono text-lg font-bold",
                isPositive ? "text-green-400" : "text-red-400"
              )}
            >
              R$ {scenario.profit.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-muted-foreground">ROI</span>
            <span
              className={cn(
                "font-mono",
                isPositive ? "text-green-400" : "text-red-400"
              )}
            >
              {scenario.roi.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
