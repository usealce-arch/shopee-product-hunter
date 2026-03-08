import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

export async function POST() {
  try {
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json(
        { error: "Erro ao fazer logout" },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: "Logout realizado com sucesso" })
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
