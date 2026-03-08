import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"
import { MOCK_PRODUCTS, MOCK_HISTORY } from "@/lib/mock-data"

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Try real DB first
    try {
      const db = createServerClient()
      const { data: product, error } = await db
        .from("products_current")
        .select("*")
        .eq("id", id)
        .single()

      if (!error && product) {
        const { data: history } = await db
          .from("products_history")
          .select("*")
          .eq("product_id", id)
          .order("snapshot_date", { ascending: true })
          .limit(30)

        return NextResponse.json({
          product,
          history: history ?? [],
          source: "database",
        })
      }
    } catch {
      // DB unavailable
    }

    // Fallback to mock
    const product = MOCK_PRODUCTS.find((p) => p.id === id)
    if (!product) {
      return NextResponse.json(
        { error: "Produto nao encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      product,
      history: MOCK_HISTORY,
      source: "mock",
    })
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar produto" },
      { status: 500 }
    )
  }
}
