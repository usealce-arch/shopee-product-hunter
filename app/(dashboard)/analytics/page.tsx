"use client"

import { PageHeader } from "@/components/PageHeader"
import { ROIComparisonChart } from "@/components/ROIComparisonChart"
import { MarketTrendChart } from "@/components/MarketTrendChart"
import { SeasonalityHeatmap } from "@/components/SeasonalityHeatmap"
import { SearchHistoryTable } from "@/components/SearchHistoryTable"

const MOCK_ROI_COMPARISON = [
  { date: "01/03", estimated: 185, actual: 162 },
  { date: "05/03", estimated: 142, actual: 155 },
  { date: "10/03", estimated: 95, actual: 78 },
  { date: "15/03", estimated: 72, actual: 89 },
  { date: "20/03", estimated: 120, actual: 105 },
]

const MOCK_TRENDS = [
  { week: "Sem 1", avgScore: 62 },
  { week: "Sem 2", avgScore: 68 },
  { week: "Sem 3", avgScore: 71 },
  { week: "Sem 4", avgScore: 74 },
]

const MOCK_SEASONALITY = [
  { month: 1, monthName: "Janeiro", performanceScore: 45 },
  { month: 2, monthName: "Fevereiro", performanceScore: 52 },
  { month: 3, monthName: "Março", performanceScore: 68 },
  { month: 4, monthName: "Abril", performanceScore: 55 },
  { month: 5, monthName: "Maio", performanceScore: 72 },
  { month: 6, monthName: "Junho", performanceScore: 78 },
  { month: 7, monthName: "Julho", performanceScore: 65 },
  { month: 8, monthName: "Agosto", performanceScore: 58 },
  { month: 9, monthName: "Setembro", performanceScore: 62 },
  { month: 10, monthName: "Outubro", performanceScore: 70 },
  { month: 11, monthName: "Novembro", performanceScore: 92 },
  { month: 12, monthName: "Dezembro", performanceScore: 98 },
]

const MOCK_SEARCH_HISTORY = [
  { id: "1", date: "07/03/2026", category: "Eletrônicos", productCount: 24, topScore: 87 },
  { id: "2", date: "06/03/2026", category: "Moda", productCount: 18, topScore: 72 },
  { id: "3", date: "05/03/2026", category: "Beleza", productCount: 31, topScore: 91 },
  { id: "4", date: "04/03/2026", category: "Casa", productCount: 12, topScore: 65 },
]

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" />

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ROIComparisonChart data={MOCK_ROI_COMPARISON} />
          <MarketTrendChart data={MOCK_TRENDS} />
        </div>

        <SeasonalityHeatmap data={MOCK_SEASONALITY} />

        <SearchHistoryTable data={MOCK_SEARCH_HISTORY} />
      </div>
    </>
  )
}
