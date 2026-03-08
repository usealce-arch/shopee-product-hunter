import { ArrowUpRight, ArrowRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

const config = {
  up: { icon: ArrowUpRight, label: "Alta", className: "bg-green-500/10 text-green-400" },
  stable: { icon: ArrowRight, label: "Estável", className: "bg-slate-500/10 text-slate-400" },
  down: { icon: ArrowDownRight, label: "Queda", className: "bg-red-500/10 text-red-400" },
}

export function TrendBadge({ trend }: { trend: "up" | "stable" | "down" }) {
  const { icon: Icon, label, className } = config[trend]

  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5", className)}>
      <Icon size={14} />
      {label}
    </span>
  )
}
