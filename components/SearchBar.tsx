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
  { value: "eletronicos", label: "Eletrônicos" },
  { value: "casa", label: "Casa & Decoração" },
  { value: "moda", label: "Moda" },
  { value: "beleza", label: "Beleza" },
  { value: "esportes", label: "Esportes" },
]

export function SearchBar({
  onSearch,
  isLoading,
}: {
  onSearch: (params: { category: string; maxPrice: number; minScore: number }) => void
  isLoading?: boolean
}) {
  const [category, setCategory] = useState("all")
  const [maxPrice, setMaxPrice] = useState("")
  const [minScore, setMinScore] = useState("")

  const handleSearch = () => {
    onSearch({
      category,
      maxPrice: maxPrice ? Number(maxPrice) : 99999,
      minScore: minScore ? Number(minScore) : 0,
    })
  }

  return (
    <div className="bg-card rounded-lg p-4 border border-border flex flex-col sm:flex-row gap-3">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="sm:w-[200px]">
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

      <div className="relative sm:w-[150px]">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
        <Input
          type="number"
          placeholder="Preço max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="relative sm:w-[130px]">
        <Input
          type="number"
          placeholder="Score min"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
          min={0}
          max={100}
        />
      </div>

      <Button
        onClick={handleSearch}
        disabled={isLoading}
        className="bg-primary-500 hover:bg-primary-600 sm:px-6"
      >
        <Search size={18} className="mr-2" />
        {isLoading ? "Buscando..." : "Buscar"}
      </Button>
    </div>
  )
}
