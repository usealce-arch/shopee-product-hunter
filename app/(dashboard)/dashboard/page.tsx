"use client"

import { useState } from "react"
import { Rocket, SearchX } from "lucide-react"
import { PageHeader } from "@/components/PageHeader"
import { StatCard } from "@/components/StatCard"
import { SearchBar } from "@/components/SearchBar"
import { OpportunityTable, type Product } from "@/components/OpportunityTable"
import { ProductDetailModal } from "@/components/ProductDetailModal"
import { ROICalculator } from "@/components/ROICalculator"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [calculatorOpen, setCalculatorOpen] = useState(false)
  const [searchInfo, setSearchInfo] = useState("")

  const handleSearch = async (params: {
    category: string
    maxPrice: number
    minScore: number
    keyword: string
  }) => {
    setIsSearching(true)
    setHasSearched(true)
    setSearchInfo("")

    try {
      const res = await fetch("/api/products/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: params.category,
          maxPrice: params.maxPrice < 99999 ? params.maxPrice : undefined,
          minScore: params.minScore > 0 ? params.minScore : undefined,
          keyword: params.keyword || undefined,
        }),
      })

      const data = await res.json()

      if (data.products) {
        const mapped: Product[] = data.products.map((p: Record<string, unknown>) => ({
          id: p.id as string,
          title: p.title as string,
          price: p.price as number,
          original_price: (p.original_price as number) ?? undefined,
          estimated_roi_percent: (p.estimated_roi_percent as number) ?? 0,
          opportunity_score: (p.opportunity_score as number) ?? 0,
          trend_direction: (p.trend_direction as string) ?? "stable",
          sales_per_month: (p.sales_per_month as number) ?? 0,
          commission_percentage: (p.commission_percentage as number) ?? 10,
          affiliate_link: (p.affiliate_link as string) ?? "",
        }))
        setProducts(mapped)
        const sourceLabel = data.source === "database" ? "" : " (simulado)"
        setSearchInfo(`${mapped.length} produtos encontrados${sourceLabel}`)
      } else {
        setProducts([])
      }
    } catch {
      setProducts([])
      setSearchInfo("Erro ao buscar produtos")
    } finally {
      setIsSearching(false)
    }
  }

  const handleQuickSearch = () => {
    handleSearch({ category: "all", maxPrice: 99999, minScore: 0, keyword: "" })
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setDetailOpen(true)
  }

  const handleCalculatorClick = (product: Product) => {
    setSelectedProduct(product)
    setCalculatorOpen(true)
  }

  const handleCopyLink = async (product: Product) => {
    const link = product.affiliate_link ?? ""
    await navigator.clipboard.writeText(link)
  }

  const avgScore =
    products.length > 0
      ? Math.round(
          products.reduce((sum, p) => sum + (p.opportunity_score ?? 0), 0) /
            products.length
        )
      : 0

  const bestROI =
    products.length > 0
      ? Math.max(...products.map((p) => p.estimated_roi_percent ?? 0))
      : 0

  return (
    <>
      <PageHeader title="Dashboard" />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Produtos Encontrados" value={products.length} />
        <StatCard label="Score Medio" value={avgScore} progress={avgScore} />
        <StatCard label="Melhor ROI" value={`${bestROI}%`} />
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        {searchInfo && (
          <p className="text-xs text-muted-foreground mt-2 ml-1">{searchInfo}</p>
        )}
      </div>

      {/* Content */}
      {!hasSearched ? (
        <div className="bg-card rounded-lg border border-border p-6 sm:p-12 text-center">
          <Rocket size={48} className="mx-auto text-primary-500 mb-4" />
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
            Bem-vindo ao Product Hunter!
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            Encontre os produtos mais rentaveis da Shopee para promover como
            afiliado
          </p>
          <Button
            onClick={handleQuickSearch}
            className="bg-primary-500 hover:bg-primary-600"
          >
            Buscar Produtos
          </Button>
        </div>
      ) : products.length === 0 && !isSearching ? (
        <div className="bg-card rounded-lg border border-border p-6 sm:p-12 text-center">
          <SearchX size={48} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">
            Nenhum produto encontrado
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Tente ajustar os filtros de busca
          </p>
        </div>
      ) : (
        <OpportunityTable
          products={products}
          isLoading={isSearching}
          onProductClick={handleProductClick}
          onCalculatorClick={handleCalculatorClick}
          onCopyLink={handleCopyLink}
        />
      )}

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        onCalculatorClick={() => {
          setDetailOpen(false)
          setCalculatorOpen(true)
        }}
      />

      <ROICalculator
        product={selectedProduct}
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
      />
    </>
  )
}
