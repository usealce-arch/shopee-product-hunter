"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const categories = [
  { value: "all", label: "Todas categorias" },
  { value: "eletronicos", label: "Eletronicos" },
  { value: "casa", label: "Casa & Decoracao" },
  { value: "moda", label: "Moda" },
  { value: "beleza", label: "Beleza" },
  { value: "esportes", label: "Esportes" },
  { value: "pets", label: "Pet Shop" },
  { value: "baby", label: "Bebes" },
]

export function SearchBar({
  onSearch,
  isLoading,
}: {
  onSearch: (params: { category: string; maxPrice: number; minScore: number; keyword: string }) => void
  isLoading?: boolean
}) {
  const [category, setCategory] = useState("all")
  const [maxPrice, setMaxPrice] = useState("")
  const [minScore, setMinScore] = useState("")
  const [keyword, setKeyword] = useState("")

  const handleSearch = () => {
    onSearch({
      category,
      maxPrice: maxPrice ? Number(maxPrice) : 99999,
      minScore: minScore ? Number(minScore) : 0,
      keyword,
    })
  }

  return (
    <div className="bg-card rounded-lg p-4 border border-border flex flex-col sm:flex-row gap-3">
      <Input
        type="text"
        placeholder="Buscar produto..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="h-11 sm:w-[200px]"
      />

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="h-11 sm:w-[180px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative sm:w-[130px]">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
        <Input
          type="number"
          placeholder="Preco max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="pl-8 h-11"
        />
      </div>

      <div className="relative sm:w-[120px]">
        <Input
          type="number"
          placeholder="Score min"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
          min={0}
          max={100}
          className="h-11"
        />
      </div>

      <Button
        onClick={handleSearch}
        disabled={isLoading}
        className="bg-primary-500 hover:bg-primary-600 sm:px-6 h-11"
      >
        <Search size={18} className="mr-2" />
        {isLoading ? "Buscando..." : "Buscar"}
      </Button>
    </div>
  )
}
