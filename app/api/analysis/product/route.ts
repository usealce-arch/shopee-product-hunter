import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"
import { analyzeProduct } from "@/lib/gemini"

export async function GET(request: NextRequest) {
  try {
    const productId = request.nextUrl.searchParams.get("productId")

    if (!productId) {
      return NextResponse.json(
        { error: "productId e obrigatorio" },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API nao configurada" },
        { status: 503 }
      )
    }

    const db = createServerClient()

    const { data: product } = await db
      .from("products_current")
      .select("*")
      .eq("id", productId)
      .single()

    if (!product) {
      return NextResponse.json(
        { error: "Produto nao encontrado" },
        { status: 404 }
      )
    }

    const analysis = await analyzeProduct({
      title: product.title,
      price: product.price,
      original_price: product.original_price,
      sales_per_month: product.sales_per_month,
      rating: product.rating,
      commission_percentage: product.commission_percentage,
      competition_level: product.competition_level,
      competitors_count: product.competitors_count,
      category: (product as Record<string, unknown>).category as string || "all",
      opportunity_score: product.opportunity_score,
      estimated_roi_percent: product.estimated_roi_percent,
    })

    return NextResponse.json({
      productId,
      analysis,
      source: "gemini",
    })
  } catch {
    return NextResponse.json(
      { error: "Erro ao analisar produto" },
      { status: 500 }
    )
  }
}
