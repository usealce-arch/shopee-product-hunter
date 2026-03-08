"use client"

import { useEffect, useState } from "react"
import { Star, ShoppingCart, Users, Copy, Calculator, Sun, Brain, Loader2, ThumbsUp, ThumbsDown, AlertTriangle } from "lucide-react"
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

interface HistoryPoint {
  date: string
  price: number
  sales: number
}

interface SeasonalPattern {
  month: number
  monthName?: string
  performanceScore: number
}

interface AIAnalysis {
  summary: string
  strengths: string[]
  weaknesses: string[]
  recommendation: "forte" | "moderada" | "fraca"
  tips: string[]
  bestStrategy: string
  riskLevel: "baixo" | "medio" | "alto"
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
  const [history, setHistory] = useState<HistoryPoint[]>([])
  const [seasonal, setSeasonal] = useState<SeasonalPattern[]>([])
  const [bestMonth, setBestMonth] = useState("")
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)
  const [aiLoading, setAiLoading] = useState(false)

  useEffect(() => {
    if (!product || !isOpen) return

    // Fetch real history
    fetch(`/api/products/${product.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.history?.length > 0) {
          setHistory(
            data.history.map((h: Record<string, unknown>) => ({
              date: new Date(h.snapshot_date as string).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
              price: h.price as number,
              sales: (h.sales_per_month as number) ?? 0,
            }))
          )
        } else {
          // Fallback mock
          setHistory(
            Array.from({ length: 30 }, (_, i) => ({
              date: `${String(i + 1).padStart(2, "0")}/03`,
              price: (product.price ?? 50) * (0.9 + Math.random() * 0.2),
              sales: Math.floor(((product.sales_per_month ?? 100) / 30) * (0.7 + Math.random() * 0.6)),
            }))
          )
        }
      })
      .catch(() => {
        setHistory(
          Array.from({ length: 30 }, (_, i) => ({
            date: `${String(i + 1).padStart(2, "0")}/03`,
            price: (product.price ?? 50) * (0.9 + Math.random() * 0.2),
            sales: Math.floor(((product.sales_per_month ?? 100) / 30) * (0.7 + Math.random() * 0.6)),
          }))
        )
      })

    // Fetch seasonal data
    fetch(`/api/analysis/seasonal?productId=${product.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.patterns) {
          setSeasonal(data.patterns)
          setBestMonth(data.bestMonthName || "")
        }
      })
      .catch(() => {})

    // Fetch AI analysis
    setAiAnalysis(null)
    setAiLoading(true)
    fetch(`/api/analysis/product?productId=${product.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.analysis) {
          setAiAnalysis(data.analysis)
        }
      })
      .catch(() => {})
      .finally(() => setAiLoading(false))
  }, [product, isOpen])

  if (!product) return null

  const breakdown: ScoreBreakdownData =
    (product as Record<string, unknown>).score_breakdown as ScoreBreakdownData ?? {}

  const dimensions = [
    { label: "Rentabilidade", value: breakdown.rentability ?? 0 },
    { label: "Tendencia", value: breakdown.trend ?? 0 },
    { label: "Competicao", value: breakdown.competition ?? 0 },
    { label: "Sazonalidade", value: breakdown.seasonality ?? 0 },
    { label: "Historico", value: breakdown.history ?? 0 },
  ]

  const handleCopyLink = async () => {
    const link = product.affiliate_link ?? `https://shopee.com.br/product/${product.id}`
    await navigator.clipboard.writeText(link)
  }

  const adSpend = 100
  const estimatedProfit = (product.estimated_roi_percent ?? 0) / 100 * adSpend

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl sm:max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
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
        <PriceHistoryChart data={history} />

        {/* Sazonalidade */}
        {seasonal.length > 0 && (
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Sun size={16} className="text-yellow-400" />
              <h3 className="text-sm font-medium text-muted-foreground uppercase">
                Sazonalidade
              </h3>
              {bestMonth && (
                <Badge variant="outline" className="text-xs text-green-400 border-green-400/30">
                  Melhor: {bestMonth}
                </Badge>
              )}
            </div>
            <div className="flex gap-1 items-end h-16">
              {seasonal.map((s) => {
                const height = Math.max(8, (s.performanceScore / 100) * 64)
                const isHigh = s.performanceScore >= 70
                const isLow = s.performanceScore < 40
                return (
                  <div
                    key={s.month}
                    className="flex-1 flex flex-col items-center gap-1"
                    title={`${s.monthName || `Mes ${s.month}`}: ${s.performanceScore}`}
                  >
                    <div
                      className={`w-full rounded-sm ${
                        isHigh ? "bg-green-500" : isLow ? "bg-red-400" : "bg-primary-500/60"
                      }`}
                      style={{ height: `${height}px` }}
                    />
                    <span className="text-[9px] text-muted-foreground">
                      {(s.monthName || "").slice(0, 3) || s.month}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Analise IA */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Brain size={16} className="text-purple-400" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase">
              Analise IA (Gemini)
            </h3>
            {aiAnalysis && (
              <Badge
                variant="outline"
                className={`text-xs ${
                  aiAnalysis.recommendation === "forte"
                    ? "text-green-400 border-green-400/30"
                    : aiAnalysis.recommendation === "fraca"
                      ? "text-red-400 border-red-400/30"
                      : "text-yellow-400 border-yellow-400/30"
                }`}
              >
                {aiAnalysis.recommendation === "forte" ? "Recomendacao FORTE" :
                  aiAnalysis.recommendation === "fraca" ? "Recomendacao FRACA" : "Recomendacao MODERADA"}
              </Badge>
            )}
          </div>

          {aiLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-4">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm">Analisando com IA...</span>
            </div>
          ) : aiAnalysis ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-300">{aiAnalysis.summary}</p>

              {aiAnalysis.strengths.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <ThumbsUp size={12} className="text-green-400" />
                    <span className="text-xs text-green-400 font-medium">Pontos fortes</span>
                  </div>
                  <ul className="space-y-1">
                    {aiAnalysis.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-slate-400 pl-4">• {s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {aiAnalysis.weaknesses.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <ThumbsDown size={12} className="text-red-400" />
                    <span className="text-xs text-red-400 font-medium">Pontos fracos</span>
                  </div>
                  <ul className="space-y-1">
                    {aiAnalysis.weaknesses.map((w, i) => (
                      <li key={i} className="text-xs text-slate-400 pl-4">• {w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {aiAnalysis.tips.length > 0 && (
                <div>
                  <span className="text-xs text-primary-500 font-medium">Dicas para promover:</span>
                  <ul className="space-y-1 mt-1">
                    {aiAnalysis.tips.map((t, i) => (
                      <li key={i} className="text-xs text-slate-400 pl-4">• {t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {aiAnalysis.bestStrategy && (
                <div className="bg-slate-800/50 rounded p-2 mt-2">
                  <span className="text-xs text-muted-foreground">Melhor estrategia: </span>
                  <span className="text-xs text-white">{aiAnalysis.bestStrategy}</span>
                </div>
              )}

              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className={`text-xs ${
                  aiAnalysis.riskLevel === "baixo" ? "text-green-400" :
                  aiAnalysis.riskLevel === "alto" ? "text-red-400" : "text-yellow-400"
                }`}>
                  <AlertTriangle size={10} className="mr-1" />
                  Risco {aiAnalysis.riskLevel}
                </Badge>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Analise indisponivel</p>
          )}
        </div>

        {/* Recomendacao ROI */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="text-sm font-medium text-muted-foreground uppercase mb-3">
            Estimativa de Retorno
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
                ? "Competicao BAIXA"
                : ((product as Record<string, unknown>).competition_level as string) === "high"
                  ? "Competicao ALTA"
                  : "Competicao MEDIA"}
            </Badge>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="flex-1 h-11"
          >
            <Copy size={16} className="mr-2" />
            Copiar Link Afiliado
          </Button>
          <Button
            onClick={onCalculatorClick}
            className="flex-1 h-11 bg-primary-500 hover:bg-primary-600"
          >
            <Calculator size={16} className="mr-2" />
            Calculadora ROI
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
