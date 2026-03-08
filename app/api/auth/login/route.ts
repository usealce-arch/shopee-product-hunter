import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { signInSchema } from "@/lib/validations"
import type { Database } from "@/types/database"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = signInSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { error: "Email ou senha inválidos" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: "Login realizado com sucesso",
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
      },
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
