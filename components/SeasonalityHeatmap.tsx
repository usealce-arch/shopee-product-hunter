import { cn } from "@/lib/utils"

type MonthData = {
  month: number
  monthName: string
  performanceScore: number
}

export function SeasonalityHeatmap({ data }: { data: MonthData[] }) {
  const best = data.reduce((b, m) => (m.performanceScore > (b?.performanceScore ?? 0) ? m : b), data[0])
  const worst = data.reduce((w, m) => (m.performanceScore < (w?.performanceScore ?? 100) ? m : w), data[0])

  const getColor = (score: number) => {
    if (score >= 70) return "bg-green-500/20 text-green-400"
    if (score >= 40) return "bg-yellow-500/20 text-yellow-400"
    return "bg-red-500/20 text-red-400"
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-sm font-medium text-muted-foreground uppercase mb-4">
        Sazonalidade
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {data.map((m) => (
          <div
            key={m.month}
            className={cn(
              "rounded-lg p-3 text-center",
              getColor(m.performanceScore),
              m.month === best?.month && "ring-2 ring-green-500",
              m.month === worst?.month && "ring-2 ring-red-500"
            )}
          >
            <p className="text-xs font-medium">{m.monthName.slice(0, 3)}</p>
            <p className="font-mono text-lg font-bold">{m.performanceScore}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
        <span>🟢 Melhor: {best?.monthName}</span>
        <span>🔴 Pior: {worst?.monthName}</span>
      </div>
    </div>
  )
}
