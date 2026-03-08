"use client"

import { useState } from "react"
import { MoreHorizontal, ExternalLink, Calculator, Copy } from "lucide-react"
import { ProductCardMobile } from "@/components/ProductCardMobile"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ScorePill } from "@/components/ScorePill"
import { TrendBadge } from "@/components/TrendBadge"

export type Product = {
  id: string
  title: string
  price: number
  original_price?: number | null
  estimated_roi_percent?: number | null
  opportunity_score?: number | null
  trend_direction?: "up" | "stable" | "down" | null
  sales_per_month?: number | null
  affiliate_link?: string | null
  commission_percentage?: number | null
}

export function OpportunityTable({
  products,
  isLoading,
  onProductClick,
  onCalculatorClick,
  onCopyLink,
}: {
  products: Product[]
  isLoading?: boolean
  onProductClick?: (product: Product) => void
  onCalculatorClick?: (product: Product) => void
  onCopyLink?: (product: Product) => void
}) {
  const [sortBy, setSortBy] = useState<string>("opportunity_score")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDir(sortDir === "desc" ? "asc" : "desc")
    } else {
      setSortBy(column)
      setSortDir("desc")
    }
  }

  const sorted = [...products].sort((a, b) => {
    const aVal = (a as Record<string, unknown>)[sortBy] as number ?? 0
    const bVal = (b as Record<string, unknown>)[sortBy] as number ?? 0
    return sortDir === "desc" ? bVal - aVal : aVal - bVal
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {/* Mobile skeleton */}
        <div className="md:hidden space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg p-4 border border-border space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        {/* Desktop skeleton */}
        <div className="hidden md:block bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-900 hover:bg-slate-900">
              <TableHead className="text-xs uppercase text-muted-foreground">Produto</TableHead>
              <TableHead className="text-xs uppercase text-muted-foreground">Preço</TableHead>
              <TableHead className="text-xs uppercase text-muted-foreground">ROI</TableHead>
              <TableHead className="text-xs uppercase text-muted-foreground">Score</TableHead>
              <TableHead className="text-xs uppercase text-muted-foreground">Trend</TableHead>
              <TableHead className="text-xs uppercase text-muted-foreground w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[40px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[70px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[30px]" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {sorted.map((product) => (
          <ProductCardMobile
            key={product.id}
            product={product}
            onClick={() => onProductClick?.(product)}
          />
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-card rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-900 hover:bg-slate-900">
            <TableHead
              className="text-xs uppercase text-muted-foreground cursor-pointer hover:text-slate-200"
              onClick={() => handleSort("title")}
            >
              Produto
            </TableHead>
            <TableHead
              className="text-xs uppercase text-muted-foreground cursor-pointer hover:text-slate-200"
              onClick={() => handleSort("price")}
            >
              Preço
            </TableHead>
            <TableHead
              className="text-xs uppercase text-muted-foreground cursor-pointer hover:text-slate-200"
              onClick={() => handleSort("estimated_roi_percent")}
            >
              ROI
            </TableHead>
            <TableHead
              className="text-xs uppercase text-muted-foreground cursor-pointer hover:text-slate-200"
              onClick={() => handleSort("opportunity_score")}
            >
              Score
            </TableHead>
            <TableHead className="text-xs uppercase text-muted-foreground">Trend</TableHead>
            <TableHead className="text-xs uppercase text-muted-foreground w-[50px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((product) => (
            <TableRow
              key={product.id}
              className="hover:bg-slate-800/50 cursor-pointer"
              onClick={() => onProductClick?.(product)}
            >
              <TableCell className="font-medium text-slate-200 max-w-[250px] truncate">
                {product.title}
              </TableCell>
              <TableCell className="font-mono text-slate-300">
                R$ {product.price.toFixed(2)}
              </TableCell>
              <TableCell className="font-mono text-green-400">
                {product.estimated_roi_percent?.toFixed(0) ?? "—"}%
              </TableCell>
              <TableCell>
                <ScorePill score={product.opportunity_score ?? 0} />
              </TableCell>
              <TableCell>
                <TrendBadge trend={product.trend_direction ?? "stable"} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onProductClick?.(product) }}>
                      <ExternalLink size={14} className="mr-2" /> Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onCopyLink?.(product) }}>
                      <Copy size={14} className="mr-2" /> Copiar Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onCalculatorClick?.(product) }}>
                      <Calculator size={14} className="mr-2" /> Calculadora
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </>
  )
}
