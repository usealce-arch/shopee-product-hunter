import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"
import { analyzeProduct, saveSeasonalPatterns } from "@/lib/seasonality"

export async function GET(request: NextRequest) {
  try {
    const productId = request.nextUrl.searchParams.get("productId")

    if (!productId) {
      return NextResponse.json(
        { error: "productId e obrigatorio" },
        { status: 400 }
      )
    }

    const db = createServerClient()

    // 1. Try cached patterns from DB
    const { data: cached } = await db
      .from("seasonal_patterns")
      .select("*")
      .eq("product_id", productId)
      .order("month", { ascending: true })

    if (cached && cached.length === 12) {
      return NextResponse.json({
        productId,
        patterns: cached.map((p) => ({
          month: p.month,
          performanceScore: p.performance_score,
          avgSales: p.average_sales_this_month,
          avgROI: p.average_roi_this_month,
          confidence: p.confidence_level,
        })),
        source: "database",
      })
    }

    // 2. Get product data to generate patterns
    const { data: product } = await db
      .from("products_current")
      .select("id, category, sales_per_month, estimated_roi_percent")
      .eq("id", productId)
      .single()

    if (!product) {
      return NextResponse.json(
        { error: "Produto nao encontrado" },
        { status: 404 }
      )
    }

    // 3. Generate analysis
    const analysis = analyzeProduct(
      productId,
      (product.category as string) || "all",
      product.sales_per_month || 100,
      product.estimated_roi_percent || 50
    )

    // 4. Save to DB for caching
    await saveSeasonalPatterns(productId, analysis.patterns)

    return NextResponse.json({
      ...analysis,
      source: "generated",
    })
  } catch {
    return NextResponse.json(
      { error: "Erro ao analisar sazonalidade" },
      { status: 500 }
    )
  }
}
