import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"
import { generateProducts } from "@/lib/product-generator"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { category, maxPrice, minScore, keyword } = body

    // 1. Try real DB first
    try {
      const db = createServerClient()
      let query = db
        .from("products_current")
        .select("*")
        .order("opportunity_score", { ascending: false })
        .limit(50)

      if (category && category !== "all") {
        query = query.eq("category", category)
      }
      if (maxPrice) {
        query = query.lte("price", maxPrice)
      }
      if (minScore) {
        query = query.gte("opportunity_score", minScore)
      }
      if (keyword) {
        query = query.ilike("title", `%${keyword}%`)
      }

      const { data, error } = await query

      if (!error && data && data.length > 0) {
        return NextResponse.json({ products: data, source: "database" })
      }
    } catch {
      // DB unavailable, fall through
    }

    // 2. Generate realistic products as smart demo
    const generated = generateProducts(
      category || "all",
      maxPrice ? Number(maxPrice) : undefined,
      minScore ? Number(minScore) : undefined,
      30
    )

    return NextResponse.json({ products: generated, source: "generated" })
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    )
  }
}
