import { NextResponse } from "next/server"
import { calculateROI } from "@/lib/roi-calculator"
import { MOCK_PRODUCTS } from "@/lib/mock-data"
import { createServerClient } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, adSpend } = body

    if (!productId || !adSpend || adSpend <= 0) {
      return NextResponse.json(
        { error: "productId e adSpend sao obrigatorios" },
        { status: 400 }
      )
    }

    let product = null

    // Try real DB
    try {
      const db = createServerClient()
      const { data } = await db
        .from("products_current")
        .select("price, commission_percentage, sales_per_month")
        .eq("id", productId)
        .single()

      if (data) product = data
    } catch {
      // DB unavailable
    }

    // Fallback to mock
    if (!product) {
      const mock = MOCK_PRODUCTS.find((p) => p.id === productId)
      if (!mock) {
        return NextResponse.json(
          { error: "Produto nao encontrado" },
          { status: 404 }
        )
      }
      product = mock
    }

    const scenarios = [
      calculateROI(Number(adSpend) * 0.5, product),
      calculateROI(Number(adSpend), product),
      calculateROI(Number(adSpend) * 2, product),
    ]

    return NextResponse.json({ scenarios })
  } catch {
    return NextResponse.json(
      { error: "Erro ao calcular ROI" },
      { status: 500 }
    )
  }
}
