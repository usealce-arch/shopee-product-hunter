# Story 5.1 — Seasonal Pattern Detection

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 5 — Intelligence & Tracking
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** MEDIUM
**Estimativa:** 12h (1.5 dias)
**Dependencia:** Story 2.2 (Seed Data) + Story 3.5 (Search API)

---

## Story

**Como** afiliado Shopee,
**Eu quero** saber qual e o melhor mes para vender cada produto,
**Para que** eu invista no momento certo e maximize meu lucro.

---

## Dev Notes

### Referencia
- PRD.md secao 4.5 — Historical Analysis & Trends
- ARCHITECTURE.md secao 2.2 — Historical Tracker
- DATABASE_SCHEMA.md — tabela seasonal_patterns

### Logica de Sazonalidade
- Analisar products_history agrupando por mes
- Calcular score de performance por mes (vendas x rating x preco)
- Identificar: melhor mes, pior mes, tendencia anual
- Salvar em seasonal_patterns (product_id, month, performance_score)

### Tabela seasonal_patterns
- product_id (FK → products_current)
- month (1-12)
- avg_sales, avg_price, avg_score
- performance_score (0-100)

---

## Tasks

- [ ] **T1:** Criar `lib/seasonality.ts`
  - Funcao `detectSeasonalPatterns(productId)` — analisa historico por mes
  - Funcao `getBestMonth(productId)` — retorna melhor mes pra vender
  - Funcao `getSeasonalScore(productId, month)` — score do mes atual
- [ ] **T2:** Implementar algoritmo de deteccao
  - Agrupar dados de products_history por mes
  - Calcular media de vendas, preco, rating por mes
  - Performance = (vendas_relativas x 0.5) + (preco_relativo x 0.3) + (rating x 0.2)
  - Normalizar para 0-100
- [ ] **T3:** Implementar `GET /api/analysis/seasonal/:productId`
  - Retornar: 12 meses com performance_score
  - Retornar: best_month, worst_month
  - Retornar: current_month_score, is_good_time_to_sell
- [ ] **T4:** Popular tabela seasonal_patterns
  - Background job que roda apos cada busca
  - Atualizar patterns com novos dados
  - Manter historico (nao sobrescrever)

---

## Acceptance Criteria

- [ ] Padroes sazonais detectados por produto (12 meses)
- [ ] API retorna melhor e pior mes para cada produto
- [ ] Score de performance por mes salvo em seasonal_patterns
- [ ] Dados integrados no Product Detail (Story 4.4)

---

## File List

| Arquivo | Acao |
|---------|------|
| `lib/seasonality.ts` | Criado |
| `app/api/analysis/seasonal/[productId]/route.ts` | Criado |

---

## Testing

- [ ] detectSeasonalPatterns retorna 12 meses de dados
- [ ] getBestMonth retorna mes com maior score
- [ ] API retorna dados corretos
- [ ] Dados salvos em seasonal_patterns

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
