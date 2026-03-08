import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Math.max(1, Number(searchParams.get("page") || 1))
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || 20)))
    const category = searchParams.get("category")
    const minScore = searchParams.get("minScore")
    const maxPrice = searchParams.get("maxPrice")
    const sortBy = searchParams.get("sortBy") || "opportunity_score"
    const order = searchParams.get("order") || "desc"

    const db = createServerClient()

    let query = db
      .from("products_current")
      .select("*", { count: "exact" })

    if (category && category !== "all") {
      query = query.eq("category", category)
    }
    if (minScore) {
      query = query.gte("opportunity_score", Number(minScore))
    }
    if (maxPrice) {
      query = query.lte("price", Number(maxPrice))
    }

    const validSortFields = ["opportunity_score", "price", "estimated_roi_percent", "sales_per_month", "created_at"]
    const sortField = validSortFields.includes(sortBy) ? sortBy : "opportunity_score"

    query = query
      .order(sortField, { ascending: order === "asc" })
      .range((page - 1) * limit, page * limit - 1)

    const { data, count, error } = await query

    if (error) {
      return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 })
    }

    return NextResponse.json({
      products: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Erro ao listar produtos" },
      { status: 500 }
    )
  }
}
