# Story 3.5 — Search Orchestration API

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 3 — Backend APIs
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** HIGH
**Estimativa:** 16h (2 dias)
**Dependencia:** Story 3.3 (Apify) + Story 3.4 (Gemini)

---

## Story

**Como** afiliado Shopee,
**Eu quero** buscar produtos por categoria e ver resultados com scores de oportunidade,
**Para que** eu encontre os melhores produtos pra promover.

---

## Dev Notes

### Pipeline de busca
1. User envia: categoria, preco_max, score_min
2. Backend cria registro em searches (status: pending)
3. Inicia Apify scraping (Story 3.3)
4. Quando Apify termina: processa resultados
5. Envia cada produto pro Gemini (Story 3.4)
6. Salva resultados em search_results
7. Atualiza search status: completed

### Endpoints
- `POST /api/products/search` — inicia pipeline completo
- `GET /api/products/search/:id` — polling de resultado (status + resultados parciais)
- `GET /api/products/current` — lista todos com scores (paginacao, ordenacao)
- `GET /api/products/current/:id` — detalhes profundos de um produto

---

## Tasks

- [ ] **T1:** Implementar `POST /api/products/search`
  - Validar input com Zod (category, maxPrice, minScore)
  - Criar registro em searches (status: pending)
  - Iniciar pipeline async: Apify → processamento → Gemini
  - Retornar search_id para polling
  - Limitar: max 5 buscas/dia por usuario (plano gratuito)
- [ ] **T2:** Implementar `GET /api/products/search/:id`
  - Retornar status da busca (pending, scraping, analyzing, completed, failed)
  - Se completed: retornar resultados (produtos com scores)
  - Se em andamento: retornar progresso (X de Y produtos analisados)
- [ ] **T3:** Implementar pipeline orchestration
  - Funcao `executeSearchPipeline(searchId, params)`
  - Etapa 1: Apify scraping (status: scraping)
  - Etapa 2: Processar resultados (status: processing)
  - Etapa 3: Gemini analise por produto (status: analyzing)
  - Etapa 4: Salvar em search_results (status: completed)
  - Error handling em cada etapa (status: failed + error message)
- [ ] **T4:** Implementar `GET /api/products/current`
  - Query products_current com JOIN em roi_estimates
  - Filtros: category, min_score, max_price, trend
  - Ordenacao: opportunity_score (desc), price, trend
  - Paginacao: page, limit (default 20, max 100)
  - Retornar: total_count, page, products[]
- [ ] **T5:** Implementar `GET /api/products/current/:id`
  - Buscar produto por ID com dados completos
  - Incluir: historico 30 dias (products_history)
  - Incluir: competicao (competitor_tracking)
  - Incluir: ROI estimates (roi_estimates)
  - Incluir: sazonalidade (seasonal_patterns)
  - Incluir: analise Gemini (gemini_analysis JSONB)
- [ ] **T6:** Salvar resultados em search_results
  - Vincular produto ao search_id
  - Guardar: score, rank_position, roi_estimate

---

## Acceptance Criteria

- [ ] POST /api/products/search inicia pipeline e retorna search_id
- [ ] GET /api/products/search/:id retorna status correto em cada etapa
- [ ] Pipeline completo: Apify → processamento → Gemini → salvamento
- [ ] GET /api/products/current lista com paginacao e ordenacao por score
- [ ] GET /api/products/current/:id retorna detalhes com historico + analise
- [ ] Error handling em cada etapa do pipeline
- [ ] Limite de buscas por dia aplicado

---

## File List

| Arquivo | Acao |
|---------|------|
| `app/api/products/search/route.ts` | Criado — POST search |
| `app/api/products/search/[id]/route.ts` | Criado — GET polling |
| `app/api/products/current/route.ts` | Criado — GET listagem |
| `app/api/products/current/[id]/route.ts` | Criado — GET detalhes |
| `lib/search-pipeline.ts` | Criado — orquestracao |

---

## Testing

- [ ] Search inicia pipeline corretamente
- [ ] Polling retorna status em cada etapa
- [ ] Pipeline completo executa sem erros
- [ ] Listagem retorna produtos paginados e ordenados
- [ ] Detalhes incluem historico + analise
- [ ] Limite de buscas aplicado corretamente

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
