import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, userId, adSpend, revenue } = body

    if (!productId || !adSpend) {
      return NextResponse.json(
        { error: "productId e adSpend sao obrigatorios" },
        { status: 400 }
      )
    }

    const actualRevenue = Number(revenue) || 0
    const actualAdSpend = Number(adSpend)
    const profit = actualRevenue - actualAdSpend
    const roi = actualAdSpend > 0 ? (profit / actualAdSpend) * 100 : 0

    // Try real DB
    try {
      const db = createServerClient()
      const { data, error } = await db.from("roi_actuals").insert({
        product_id: productId,
        user_id: userId || "00000000-0000-0000-0000-000000000000",
        actual_ad_spend: actualAdSpend,
        actual_revenue: actualRevenue,
        actual_profit: profit,
        actual_roi_percent: roi,
      }).select().single()

      if (!error && data) {
        return NextResponse.json({ report: data, source: "database" })
      }
    } catch {
      // DB unavailable
    }

    // Fallback mock response
    return NextResponse.json({
      report: {
        id: `mock-report-${Date.now()}`,
        product_id: productId,
        actual_ad_spend: actualAdSpend,
        actual_revenue: actualRevenue,
        actual_profit: profit,
        actual_roi_percent: Math.round(roi * 100) / 100,
        reported_at: new Date().toISOString(),
      },
      source: "mock",
    })
  } catch {
    return NextResponse.json(
      { error: "Erro ao salvar report" },
      { status: 500 }
    )
  }
}
