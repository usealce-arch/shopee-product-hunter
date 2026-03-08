# Story 3.4 — Gemini Deep Analysis

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 3 — Backend APIs
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** HIGH
**Estimativa:** 16h (2 dias)
**Dependencia:** Story 3.3 (Apify Integration)

---

## Story

**Como** sistema de inteligencia,
**Eu quero** analisar cada produto com IA (Gemini) e gerar score + recomendacao de investimento,
**Para que** o afiliado saiba exatamente quanto investir e quanto vai lucrar.

---

## Dev Notes

### Gemini API
- Token: pendente (GEMINI_API_KEY no .env)
- Modelo: gemini-pro
- Custo: ~$0.075/1K input tokens

### Algoritmo de Scoring (ARCHITECTURE.md secao 4)
```
Score (0-100) =
    (Rentabilidade x 0.35) +
    (Tendencia x 0.25) +
    (Competicao x 0.20) +
    (Sazonalidade x 0.10) +
    (HistoricoPerformance x 0.10)
```

### Dimensoes
- **Rentabilidade:** (comissao x vendas/mes x taxa_conversao) / custo_anuncio
- **Tendencia:** Comparacao 30-7 dias (crescendo?)
- **Competicao:** 100 - (affiliate_count / 1000 * 100)
- **Sazonalidade:** Performance no mes atual vs historico
- **Historico:** Taxa de sucesso anterior (roi_actuals)

### Output esperado do Gemini (por produto)
```json
{
  "opportunity_score": 87,
  "rentability_score": 85,
  "trend_score": 72,
  "competition_score": 65,
  "seasonality_score": 92,
  "history_score": 80,
  "recommended_ad_spend": 100,
  "expected_conversions": 10,
  "expected_revenue": 890,
  "expected_profit": 350,
  "roi_percentage": 250,
  "analysis_summary": "Produto com alta demanda e baixa competicao..."
}
```

---

## Tasks

- [ ] **T1:** Instalar SDK do Gemini
  - `npm install @google/generative-ai`
- [ ] **T2:** Criar `lib/gemini.ts` — client Gemini
  - Configurar com API key do .env
  - Configurar modelo gemini-pro
  - Configurar safety settings
- [ ] **T3:** Implementar `analyzeProductDeep(product, historicalData)`
  - Montar prompt com dados do produto + historico
  - Chamar Gemini API
  - Parsear resposta JSON estruturada
  - Error handling: timeout, rate limit, resposta invalida
- [ ] **T4:** Implementar `lib/scoring.ts` — algoritmo de scoring
  - Funcao `calculateOpportunityScore(dimensions)` — weighted sum
  - Funcao `calculateRentability(product)` — score 0-100
  - Funcao `calculateTrend(history)` — score 0-100
  - Funcao `calculateCompetition(affiliateCount)` — score 0-100
  - Funcao `calculateSeasonality(patterns, currentMonth)` — score 0-100
  - Funcao `calculateHistory(actuals)` — score 0-100
  - Validacao: score >= 0 e <= 100
- [ ] **T5:** Implementar `generateAdSpendRecommendation(product, score)`
  - Baseado no score e dados do produto
  - Calcular: ad_spend recomendado, conversoes esperadas, revenue, lucro
  - Cenarios: R$100, R$500, R$1000
- [ ] **T6:** Salvar resultados em roi_estimates
  - Insert com dados da analise
  - Campos: product_id, estimated_roi, ad_spend, expected_profit, confidence
- [ ] **T7:** Atualizar products_current com scores
  - SET opportunity_score, trend_score, competition_score, seasonality_score
  - SET gemini_analysis (JSONB com summary completo)

---

## Acceptance Criteria

- [ ] Gemini retorna analise estruturada por produto (JSON parseavel)
- [ ] Score calculado corretamente (0-100, weighted sum conforme formula)
- [ ] ROI estimates salvos em roi_estimates
- [ ] Recomendacao de ad spend gerada (3 cenarios)
- [ ] products_current atualizado com scores
- [ ] Error handling: Gemini timeout, resposta invalida, rate limit

---

## File List

| Arquivo | Acao |
|---------|------|
| `lib/gemini.ts` | Criado — Gemini client |
| `lib/scoring.ts` | Criado — algoritmo de scoring |
| `types/analysis.ts` | Criado — tipos da analise |

---

## Testing

- [ ] analyzeProductDeep retorna analise valida
- [ ] calculateOpportunityScore retorna 0-100
- [ ] Cada dimensao retorna score 0-100
- [ ] ROI estimates salvos corretamente no BD
- [ ] Cenarios de ad spend calculados corretamente
- [ ] Fallback funciona quando Gemini falha

---

## QA Results

_Pendente_

---

## Dev Agent Record

### Checkboxes
_Atualizar conforme execucao_

### Debug Log
_N/A_

### Completion Notes
_N/A_

### Change Log
| Data | Mudanca |
|------|---------|
| 07/03/2026 | Story criada por @sm (River) |
