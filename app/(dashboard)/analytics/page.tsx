"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/PageHeader"
import { ROIComparisonChart } from "@/components/ROIComparisonChart"
import { MarketTrendChart } from "@/components/MarketTrendChart"
import { SeasonalityHeatmap } from "@/components/SeasonalityHeatmap"
import { StatCard } from "@/components/StatCard"

interface AnalyticsData {
  trends: { week: string; avgScore: number }[]
  seasonality: { month: number; monthName: string; performanceScore: number }[]
  categories: { name: string; count: number; avgScore: number }[]
  topProducts: {
    title: string
    opportunity_score: number
    price: number
    estimated_roi_percent: number
    category: string
  }[]
  totalProducts: number
}

const CATEGORY_LABELS: Record<string, string> = {
  eletronicos: "Eletronicos",
  casa: "Casa",
  moda: "Moda",
  beleza: "Beleza",
  esportes: "Esportes",
  pets: "Pet Shop",
  baby: "Bebes",
  all: "Geral",
}

const FALLBACK_ROI = [
  { date: "01/03", estimated: 185, actual: 162 },
  { date: "05/03", estimated: 142, actual: 155 },
  { date: "10/03", estimated: 95, actual: 78 },
  { date: "15/03", estimated: 72, actual: 89 },
  { date: "20/03", estimated: 120, actual: 105 },
]

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then(setData)
      .catch(() => null)
      .finally(() => setLoading(false))
  }, [])

  const trends = data?.trends ?? []
  const seasonality = data?.seasonality ?? []
  const categories = data?.categories ?? []
  const topProducts = data?.topProducts ?? []

  const bestCategory = categories.reduce(
    (best, c) => (c.avgScore > (best?.avgScore ?? 0) ? c : best),
    categories[0]
  )

  return (
    <>
      <PageHeader title="Analytics" />

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Carregando dados...</div>
      ) : (
        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Produtos" value={data?.totalProducts ?? 0} />
            <StatCard label="Categorias" value={categories.length} />
            <StatCard
              label="Melhor Categoria"
              value={CATEGORY_LABELS[bestCategory?.name ?? ""] ?? bestCategory?.name ?? "-"}
            />
            <StatCard
              label="Score Medio Geral"
              value={
                categories.length > 0
                  ? Math.round(
                      categories.reduce((s, c) => s + c.avgScore * c.count, 0) /
                        categories.reduce((s, c) => s + c.count, 0)
                    )
                  : 0
              }
              progress={
                categories.length > 0
                  ? Math.round(
                      categories.reduce((s, c) => s + c.avgScore * c.count, 0) /
                        categories.reduce((s, c) => s + c.count, 0)
                    )
                  : 0
              }
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ROIComparisonChart data={FALLBACK_ROI} />
            <MarketTrendChart data={trends} />
          </div>

          <SeasonalityHeatmap data={seasonality} />

          {/* Category breakdown + Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category table */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="font-semibold text-white mb-4">Score por Categoria</h3>
              <div className="space-y-3">
                {categories
                  .sort((a, b) => b.avgScore - a.avgScore)
                  .map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-foreground">
                          {CATEGORY_LABELS[cat.name] ?? cat.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({cat.count} produtos)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${cat.avgScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-white w-8 text-right">
                          {cat.avgScore}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Top products */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="font-semibold text-white mb-4">Top 5 Oportunidades</h3>
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-primary-500 font-bold text-sm">#{i + 1}</span>
                      <div className="min-w-0">
                        <p className="text-sm text-foreground truncate">{p.title}</p>
                        <p className="text-xs text-muted-foreground">
                          R${Number(p.price).toFixed(2)} | {CATEGORY_LABELS[p.category] ?? p.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-sm font-bold text-primary-500">
                        {Number(p.opportunity_score)}
                      </p>
                      <p className="text-xs text-green-400">
                        ROI {Number(p.estimated_roi_percent)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
