import { Progress } from "@/components/ui/progress"
import { ScorePill } from "@/components/ScorePill"
import { cn } from "@/lib/utils"

type Dimension = {
  label: string
  value: number
}

export function ScoreBreakdown({
  totalScore,
  dimensions,
}: {
  totalScore: number
  dimensions: Dimension[]
}) {
  const label =
    totalScore >= 80
      ? "EXCELENTE"
      : totalScore >= 60
        ? "MUITO BOM"
        : totalScore >= 40
          ? "REGULAR"
          : "FRACO"

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase">Score Total</h3>
        <div className="flex items-center gap-2">
          <ScorePill score={totalScore} size="lg" />
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
      </div>

      <div className="space-y-4">
        {dimensions.map((dim) => (
          <div key={dim.label} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">{dim.label}</span>
              <span className="font-mono text-sm text-slate-400">{dim.value}</span>
            </div>
            <Progress
              value={dim.value}
              className={cn(
                "h-2",
                dim.value > 70
                  ? "[&>div]:bg-green-500"
                  : dim.value > 40
                    ? "[&>div]:bg-yellow-500"
                    : "[&>div]:bg-red-500"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
