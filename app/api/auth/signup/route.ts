import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"
import { signUpSchema } from "@/lib/validations"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = signUpSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data
    const supabase = createServerClient()

    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      })

    if (authError) {
      if (authError.message.includes("already registered")) {
        return NextResponse.json(
          { error: "Email já cadastrado" },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    const { error: dbError } = await supabase.from("users").insert({
      id: authData.user.id,
      email: authData.user.email!,
    })

    if (dbError) {
      return NextResponse.json(
        { error: "Erro ao criar perfil do usuário" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "Conta criada com sucesso", user: { id: authData.user.id, email } },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
