import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"
import { MOCK_PRODUCTS } from "@/lib/mock-data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { category, maxPrice, minScore } = body

    // Try real DB first
    try {
      const db = createServerClient()
      let query = db
        .from("products_current")
        .select("*")
        .order("opportunity_score", { ascending: false })
        .limit(50)

      if (maxPrice) {
        query = query.lte("price", maxPrice)
      }
      if (minScore) {
        query = query.gte("opportunity_score", minScore)
      }

      const { data, error } = await query

      if (!error && data && data.length > 0) {
        return NextResponse.json({ products: data, source: "database" })
      }
    } catch {
      // DB unavailable, fall through to mock
    }

    // Fallback to mock data with filters
    let filtered = [...MOCK_PRODUCTS]

    if (category && category !== "all") {
      filtered = filtered.filter((p) => p.category === category)
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice))
    }
    if (minScore) {
      filtered = filtered.filter(
        (p) => (p.opportunity_score ?? 0) >= Number(minScore)
      )
    }

    filtered.sort(
      (a, b) => (b.opportunity_score ?? 0) - (a.opportunity_score ?? 0)
    )

    return NextResponse.json({ products: filtered, source: "mock" })
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    )
  }
}
