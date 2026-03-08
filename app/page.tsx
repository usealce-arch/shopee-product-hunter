import Link from "next/link"
import { ShoppingBag, TrendingUp, Calculator, BarChart3, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "Score de Oportunidade",
    description: "Algoritmo que analisa rentabilidade, tendencia e competicao",
  },
  {
    icon: Calculator,
    title: "Calculadora ROI",
    description: "Simule seu investimento em ads e veja o retorno esperado",
  },
  {
    icon: BarChart3,
    title: "Analytics Completo",
    description: "Graficos de tendencia, sazonalidade e historico de buscas",
  },
  {
    icon: Zap,
    title: "Dados em Tempo Real",
    description: "Scraping automatizado de precos, vendas e concorrencia",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EE4D2D]/10 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-[#EE4D2D] p-3 rounded-xl">
              <ShoppingBag size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Shopee Product
            <span className="text-[#EE4D2D]"> Hunter</span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Encontre os produtos mais rentaveis da Shopee para promover como afiliado.
            Analise inteligente com previsao de ROI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-lg font-bold text-lg bg-[#EE4D2D] text-white hover:bg-[#D94429] transition-colors shadow-lg shadow-[#EE4D2D]/25"
            >
              Comecar Gratis
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 rounded-lg font-bold text-lg border-2 border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white transition-colors"
            >
              Ja tenho conta
            </Link>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500">
            <Shield size={14} />
            <span>Sem cartao de credito necessario</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-white text-center mb-12">
          Tudo que voce precisa para lucrar como afiliado
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-[#EE4D2D]/30 transition-colors"
            >
              <f.icon size={28} className="text-[#EE4D2D] mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">{f.title}</h3>
              <p className="text-slate-400 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#EE4D2D]/20 to-[#EE4D2D]/5 border border-[#EE4D2D]/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Pronto pra encontrar oportunidades?
          </h2>
          <p className="text-slate-400 mb-6">
            Crie sua conta em 30 segundos e comece a analisar produtos
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 rounded-lg font-bold text-lg bg-[#EE4D2D] text-white hover:bg-[#D94429] transition-colors"
          >
            Criar Conta Gratis
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Shopee Product Hunter v0.1.0</p>
          <p className="mt-1">Powered by Next.js + Supabase + Apify</p>
        </div>
      </footer>
    </main>
  )
}
