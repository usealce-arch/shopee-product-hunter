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

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Fone Bluetooth TWS Pro Max Bass",
    price: 45.9,
    original_price: 89.9,
    estimated_roi_percent: 185,
    opportunity_score: 87,
    trend_direction: "up",
    sales_per_month: 3200,
    commission_percentage: 12,
    affiliate_link: "https://shopee.com.br/product/1",
  },
  {
    id: "2",
    title: "Câmera de Segurança WiFi 360° Full HD",
    price: 79.9,
    original_price: 149.9,
    estimated_roi_percent: 142,
    opportunity_score: 78,
    trend_direction: "up",
    sales_per_month: 1800,
    commission_percentage: 15,
    affiliate_link: "https://shopee.com.br/product/2",
  },
  {
    id: "3",
    title: "Kit Maquiagem Completo 24 Peças Profissional",
    price: 34.5,
    original_price: 69.9,
    estimated_roi_percent: 95,
    opportunity_score: 65,
    trend_direction: "stable",
    sales_per_month: 2100,
    commission_percentage: 10,
    affiliate_link: "https://shopee.com.br/product/3",
  },
  {
    id: "4",
    title: "Organizador de Maquiagem Acrílico Giratório",
    price: 52.0,
    original_price: 89.0,
    estimated_roi_percent: 72,
    opportunity_score: 55,
    trend_direction: "stable",
    sales_per_month: 950,
    commission_percentage: 8,
    affiliate_link: "https://shopee.com.br/product/4",
  },
  {
    id: "5",
    title: "Capa iPhone 15 Pro Max Silicone Premium",
    price: 19.9,
    estimated_roi_percent: 35,
    opportunity_score: 42,
    trend_direction: "down",
    sales_per_month: 5400,
    commission_percentage: 6,
    affiliate_link: "https://shopee.com.br/product/5",
  },
]

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [calculatorOpen, setCalculatorOpen] = useState(false)

  const handleSearch = async () => {
    setIsSearching(true)
    setHasSearched(true)
    // Simula busca com delay
    await new Promise((r) => setTimeout(r, 1500))
    setProducts(MOCK_PRODUCTS)
    setIsSearching(false)
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
      ? Math.round(products.reduce((sum, p) => sum + (p.opportunity_score ?? 0), 0) / products.length)
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
        <StatCard label="Score Médio" value={avgScore} progress={avgScore} />
        <StatCard label="Melhor ROI" value={`${bestROI}%`} />
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} isLoading={isSearching} />
      </div>

      {/* Content */}
      {!hasSearched ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Rocket size={48} className="mx-auto text-primary-500 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            Bem-vindo ao Product Hunter!
          </h2>
          <p className="text-muted-foreground mb-6">
            Encontre os produtos mais rentáveis da Shopee para promover como afiliado
          </p>
          <Button
            onClick={handleSearch}
            className="bg-primary-500 hover:bg-primary-600"
          >
            Buscar Produtos
          </Button>
        </div>
      ) : products.length === 0 && !isSearching ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <SearchX size={48} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">
            Nenhum produto encontrado
          </h2>
          <p className="text-muted-foreground">Tente ajustar os filtros de busca</p>
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
