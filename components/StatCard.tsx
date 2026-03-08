import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  progress,
  className,
}: {
  label: string
  value: string | number
  progress?: number
  className?: string
}) {
  return (
    <div className={cn("bg-card rounded-lg p-4 border border-border", className)}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-mono text-2xl text-slate-50">{value}</p>
      {progress !== undefined && (
        <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
    </div>
  )
}
