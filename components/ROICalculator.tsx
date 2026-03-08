"use client"

import { useState, useMemo } from "react"
import { Calculator } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ROIScenarioCard } from "@/components/ROIScenarioCard"
import { calculateROI } from "@/lib/roi-calculator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ProductData = {
  title: string
  price: number
  commission_percentage?: number | null
  sales_per_month?: number | null
}

export function ROICalculator({
  product,
  isOpen,
  onClose,
}: {
  product: ProductData | null
  isOpen: boolean
  onClose: () => void
}) {
  const [customSpend, setCustomSpend] = useState("")

  const quickAmounts = [100, 500, 1000]

  const scenarios = useMemo(() => {
    if (!product) return []
    const amounts = [...quickAmounts]
    if (customSpend && Number(customSpend) > 0) {
      amounts.push(Number(customSpend))
    }
    return amounts.map((amount) => calculateROI(amount, product))
  }, [product, customSpend])

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Calculator size={20} className="text-primary-500" />
            Calculadora de ROI
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Produto: <span className="text-slate-300">{product.title}</span>
        </p>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Quanto quer investir em anúncios?
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                R$
              </span>
              <Input
                type="number"
                value={customSpend}
                onChange={(e) => setCustomSpend(e.target.value)}
                placeholder="Valor personalizado"
                className="pl-8"
              />
            </div>
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => setCustomSpend(String(amount))}
                className="whitespace-nowrap"
              >
                R$ {amount}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scenario, i) => (
            <ROIScenarioCard key={i} scenario={scenario} />
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Dados baseados em análise histórica. Resultados reais podem variar.
        </p>
      </DialogContent>
    </Dialog>
  )
}
