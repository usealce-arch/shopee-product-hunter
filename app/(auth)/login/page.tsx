"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { signIn } from "@/lib/auth"
import { signInSchema } from "@/lib/validations"
import { Zap } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const parsed = signInSchema.safeParse({ email, password })
    if (!parsed.success) {
      setError(parsed.error.issues[0].message)
      setIsLoading(false)
      return
    }

    try {
      await signIn(email, password)
      router.push("/dashboard")
    } catch {
      setError("Email ou senha invalidos")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoMode = () => {
    document.cookie = "demo_mode=true; path=/; max-age=86400"
    router.push("/dashboard")
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Logo size="lg" className="justify-center mb-4" />
        <p className="text-muted-foreground">Encontre oportunidades reais</p>
      </div>

      <Card>
        <CardHeader />
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="********"
                disabled={isLoading}
                required
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-600"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full border-primary-500/50 text-primary-500 hover:bg-primary-500/10"
            onClick={handleDemoMode}
          >
            <Zap size={16} className="mr-2" />
            Entrar como Demo
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Acesse o dashboard com dados de demonstracao
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Nao tem conta?{" "}
            <Link href="/signup" className="text-primary-500 hover:text-primary-400">
              Criar conta gratis
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
