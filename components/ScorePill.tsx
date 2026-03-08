import { cn } from "@/lib/utils"

export function ScorePill({
  score,
  size = "sm",
}: {
  score: number
  size?: "sm" | "lg"
}) {
  const color =
    score >= 75
      ? "bg-green-500/10 text-green-400"
      : score >= 50
        ? "bg-yellow-500/10 text-yellow-400"
        : "bg-red-500/10 text-red-400"

  return (
    <span
      className={cn(
        "font-mono rounded-full inline-flex items-center justify-center",
        color,
        size === "lg" ? "text-lg px-4 py-1.5" : "text-sm px-2.5 py-0.5"
      )}
    >
      {score}
    </span>
  )
}
