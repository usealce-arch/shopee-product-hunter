import { NextResponse } from "next/server"
import { SHOPEE_CATEGORIES } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ categories: SHOPEE_CATEGORIES })
}
