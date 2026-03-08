"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { signUp } from "@/lib/auth"
import { signUpSchema } from "@/lib/validations"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [affiliateId, setAffiliateId] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const parsed = signUpSchema.safeParse({ email, password, confirmPassword })
    if (!parsed.success) {
      setError(parsed.error.issues[0].message)
      setIsLoading(false)
      return
    }

    try {
      await signUp(email, password)
      router.push("/dashboard")
    } catch {
      setError("Erro ao criar conta. Email pode já estar cadastrado.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Logo size="lg" className="justify-center mb-4" />
        <p className="text-muted-foreground">Comece a encontrar lucro real</p>
      </div>

      <Card>
        <CardHeader />
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirmar Senha</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Shopee Affiliate ID{" "}
                <span className="text-muted-foreground">(opcional)</span>
              </label>
              <Input
                value={affiliateId}
                onChange={(e) => setAffiliateId(e.target.value)}
                placeholder="Seu ID de afiliado Shopee"
                disabled={isLoading}
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-600"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link href="/login" className="text-primary-500 hover:text-primary-400">
              Fazer login →
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
