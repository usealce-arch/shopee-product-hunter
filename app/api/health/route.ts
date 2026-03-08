import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"

export async function GET() {
  const status = {
    app: "ok",
    timestamp: new Date().toISOString(),
    database: "unknown" as string,
    version: "0.1.0",
  }

  try {
    const db = createServerClient()
    const { error } = await db.from("users").select("id").limit(1)
    status.database = error ? "error" : "connected"
  } catch {
    status.database = "unavailable"
  }

  return NextResponse.json(status)
}
