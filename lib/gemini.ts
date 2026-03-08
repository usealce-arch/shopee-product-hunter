import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

interface ProductData {
  title: string
  price: number
  original_price?: number | null
  sales_per_month?: number | null
  rating?: number | null
  commission_percentage?: number | null
  competition_level?: string | null
  competitors_count?: number | null
  category?: string | null
  opportunity_score?: number | null
  estimated_roi_percent?: number | null
}

export interface GeminiAnalysis {
  summary: string
  strengths: string[]
  weaknesses: string[]
  recommendation: "forte" | "moderada" | "fraca"
  tips: string[]
  bestStrategy: string
  riskLevel: "baixo" | "medio" | "alto"
  estimatedEffort: string
}

const CATEGORY_LABELS: Record<string, string> = {
  eletronicos: "Eletronicos",
  casa: "Casa & Decoracao",
  moda: "Moda & Acessorios",
  beleza: "Beleza & Cuidados",
  esportes: "Esportes & Lazer",
  pets: "Pet Shop",
  baby: "Bebes & Criancas",
  all: "Geral",
}

export async function analyzeProduct(product: ProductData): Promise<GeminiAnalysis> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const categoryLabel = CATEGORY_LABELS[product.category || "all"] || product.category || "Geral"
  const margin = product.original_price && product.original_price > product.price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null

  const prompt = `Voce e um analista de e-commerce especialista em marketing de afiliados Shopee Brasil.

Analise este produto e de recomendacoes para um afiliado que quer promove-lo:

PRODUTO:
- Nome: ${product.title}
- Preco: R$ ${product.price.toFixed(2)}
${product.original_price ? `- Preco original: R$ ${product.original_price.toFixed(2)} (${margin}% desconto)` : ""}
- Categoria: ${categoryLabel}
- Vendas/mes: ${product.sales_per_month || "N/A"}
- Rating: ${product.rating || "N/A"}/5
- Comissao: ${product.commission_percentage || 10}%
- Competicao: ${product.competition_level || "media"} (${product.competitors_count || "N/A"} afiliados)
- Score de oportunidade: ${product.opportunity_score || "N/A"}/100
- ROI estimado: ${product.estimated_roi_percent || "N/A"}%

Responda EXCLUSIVAMENTE neste formato JSON (sem markdown, sem backticks):
{
  "summary": "resumo de 2 frases sobre o potencial do produto",
  "strengths": ["ponto forte 1", "ponto forte 2", "ponto forte 3"],
  "weaknesses": ["ponto fraco 1", "ponto fraco 2"],
  "recommendation": "forte|moderada|fraca",
  "tips": ["dica pratica 1 para promover", "dica pratica 2", "dica pratica 3"],
  "bestStrategy": "melhor estrategia de divulgacao em 1-2 frases",
  "riskLevel": "baixo|medio|alto",
  "estimatedEffort": "tempo estimado para ver resultados"
}`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()

    // Clean potential markdown wrapping
    const jsonStr = text
      .replace(/^```json?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim()

    const parsed = JSON.parse(jsonStr) as GeminiAnalysis

    // Validate required fields
    if (!parsed.summary || !parsed.strengths || !parsed.recommendation) {
      throw new Error("Resposta incompleta do Gemini")
    }

    return parsed
  } catch (error) {
    // Return a sensible fallback
    return generateFallbackAnalysis(product)
  }
}

export async function analyzeProductBatch(products: ProductData[]): Promise<Record<string, GeminiAnalysis>> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const productList = products.slice(0, 5).map((p, i) => {
    const categoryLabel = CATEGORY_LABELS[p.category || "all"] || "Geral"
    return `${i + 1}. "${p.title}" - R$${p.price.toFixed(2)} | ${categoryLabel} | ${p.sales_per_month || 0} vendas/mes | Score: ${p.opportunity_score || 0} | ROI: ${p.estimated_roi_percent || 0}%`
  }).join("\n")

  const prompt = `Voce e um analista de e-commerce Shopee Brasil. Analise estes ${products.length} produtos para um afiliado:

${productList}

Para CADA produto, de um resumo curto (1 frase) e uma recomendacao (forte/moderada/fraca).

Responda EXCLUSIVAMENTE neste formato JSON (sem markdown, sem backticks):
[
  {"index": 1, "summary": "resumo curto", "recommendation": "forte|moderada|fraca", "tip": "dica rapida"}
]`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()
    const jsonStr = text.replace(/^```json?\s*/i, "").replace(/\s*```$/i, "").trim()
    const parsed = JSON.parse(jsonStr) as Array<{ index: number; summary: string; recommendation: string; tip: string }>

    const analyses: Record<string, GeminiAnalysis> = {}
    for (const item of parsed) {
      const product = products[item.index - 1]
      if (product) {
        analyses[product.title] = {
          summary: item.summary,
          strengths: [],
          weaknesses: [],
          recommendation: (item.recommendation as GeminiAnalysis["recommendation"]) || "moderada",
          tips: [item.tip],
          bestStrategy: item.tip,
          riskLevel: "medio",
          estimatedEffort: "2-4 semanas",
        }
      }
    }
    return analyses
  } catch {
    return {}
  }
}

function generateFallbackAnalysis(product: ProductData): GeminiAnalysis {
  const score = product.opportunity_score || 50
  const roi = product.estimated_roi_percent || 30
  const isGood = score >= 70
  const isBad = score < 40

  return {
    summary: isGood
      ? `Produto com alto potencial de retorno. Score ${score}/100 indica boa oportunidade para afiliados.`
      : isBad
        ? `Produto com potencial limitado. Score ${score}/100 sugere cautela antes de investir.`
        : `Produto com potencial moderado. Score ${score}/100 pode dar retorno com a estrategia certa.`,
    strengths: [
      product.sales_per_month && product.sales_per_month > 500 ? "Alto volume de vendas" : "Produto com demanda estavel",
      roi > 50 ? `ROI estimado atrativo de ${roi}%` : "Comissao padrao da categoria",
      product.rating && product.rating >= 4 ? `Avaliacao positiva (${product.rating}/5)` : "Produto estabelecido no mercado",
    ],
    weaknesses: [
      product.competition_level === "high" ? "Alta concorrencia entre afiliados" : "Mercado com competicao moderada",
      product.price < 30 ? "Ticket baixo - comissao por venda sera pequena" : "Preco pode limitar conversao impulsiva",
    ],
    recommendation: isGood ? "forte" : isBad ? "fraca" : "moderada",
    tips: [
      "Crie conteudo em video mostrando o produto em uso",
      "Use grupos de WhatsApp e Telegram para divulgar",
      "Compare com concorrentes para destacar o preco",
    ],
    bestStrategy: isGood
      ? "Invista em conteudo de review e comparativo nas redes sociais"
      : "Foque em nichos especificos e micro-influenciadores",
    riskLevel: isBad ? "alto" : isGood ? "baixo" : "medio",
    estimatedEffort: isGood ? "1-2 semanas" : "3-4 semanas",
  }
}
