"use client"

import { useState } from "react"
import { FileCheck } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ROIReportModal({
  productTitle,
  isOpen,
  onClose,
  onSubmit,
}: {
  productTitle: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { adSpend: number; revenue: number }) => void
}) {
  const [adSpend, setAdSpend] = useState("")
  const [revenue, setRevenue] = useState("")

  const handleSubmit = () => {
    if (!adSpend || !revenue) return
    onSubmit({ adSpend: Number(adSpend), revenue: Number(revenue) })
    setAdSpend("")
    setRevenue("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <FileCheck size={20} className="text-green-400" />
            Reportar Resultado
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">{productTitle}</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Quanto investiu em anúncios?</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
              <Input
                type="number"
                value={adSpend}
                onChange={(e) => setAdSpend(e.target.value)}
                placeholder="500.00"
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Quanto ganhou em comissões?</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
              <Input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="2000.00"
                className="pl-8"
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!adSpend || !revenue}
          >
            Reportar Resultado
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
