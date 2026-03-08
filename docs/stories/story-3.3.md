# Story 3.3 — Apify Integration (Scraping)

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 3 — Backend APIs
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** HIGH
**Estimativa:** 16h (2 dias)
**Dependencia:** Story 2.1 (Setup BD)

---

## Story

**Como** sistema de busca,
**Eu quero** fazer scraping de produtos da Shopee via Apify em tempo real,
**Para que** os dados de preco, vendas e rating sejam sempre atualizados.

---

## Dev Notes

### Apify API
- Token: `[SEE .env.local]`
- Endpoint: `https://api.apify.com/v2/`
- Actor: usar actor de scraping Shopee (pesquisar no Apify Store)
- Modelo async: iniciar job → polling → coletar resultados

### Fluxo
1. User busca "eletronicos, max R$200"
2. Backend inicia job no Apify com parametros
3. Polling a cada 5s ate completar
4. Processar resultados: normalizar dados
5. Salvar em products_current + products_history + competitor_tracking
6. Detectar tendencias comparando com historico

### Tabelas afetadas
- `products_current` — upsert (shopee_product_id como chave)
- `products_history` — insert (snapshot diario)
- `competitor_tracking` — insert (contagem de afiliados)

---

## Tasks

- [ ] **T1:** Criar `lib/apify.ts` — client Apify
  - Configurar com API token do .env
  - Headers: Authorization, Content-Type
- [ ] **T2:** Implementar `initializeScraping(category, maxPrice)`
  - Chamar Apify Actor Run API
  - Passar parametros: categoria, preco maximo, limite de resultados
  - Retornar runId para polling
  - Error handling: rate limit, actor not found
- [ ] **T3:** Implementar `checkScrapingStatus(runId)`
  - Polling via Apify Actor Run GET endpoint
  - Status: RUNNING, SUCCEEDED, FAILED, TIMED-OUT
  - Retornar status + progresso
- [ ] **T4:** Implementar `processScrapingResults(runId)`
  - Buscar resultados do dataset do Apify
  - Normalizar dados: titulo, preco, preco_original, rating, vendas/mes, comissao
  - Limpar dados invalidos (preco 0, titulo vazio)
  - Retornar array de produtos normalizados
- [ ] **T5:** Implementar salvamento em products_current
  - Upsert por shopee_product_id
  - Atualizar: preco, rating, vendas, updated_at
- [ ] **T6:** Implementar salvamento em products_history
  - Insert snapshot com data atual
  - Manter historico (nao sobrescrever)
- [ ] **T7:** Implementar salvamento em competitor_tracking
  - Extrair affiliate_count dos resultados (se disponivel)
  - Insert com data atual
- [ ] **T8:** Implementar deteccao de tendencias
  - Comparar dados dos ultimos 7 dias vs ultimos 30 dias
  - Classificar: UP (crescendo >10%), STABLE (+-10%), DOWN (caindo >10%)
  - Atualizar campo trend em products_current

---

## Acceptance Criteria

- [ ] Apify scraping inicia e retorna runId
- [ ] Polling funcional ate conclusao do job
- [ ] Dados normalizados e salvos em products_current (upsert)
- [ ] Historico salvo em products_history (insert diario)
- [ ] Competicao rastreada em competitor_tracking
- [ ] Tendencias detectadas (UP/STABLE/DOWN) e salvas
- [ ] Error handling: timeout, rate limit, dados invalidos

---

## File List

| Arquivo | Acao |
|---------|------|
| `lib/apify.ts` | Criado — Apify client + funcoes |
| `types/apify.ts` | Criado — tipos dos dados Apify |

---

## Testing

- [ ] initializeScraping retorna runId valido
- [ ] checkScrapingStatus retorna status correto
- [ ] processScrapingResults normaliza dados corretamente
- [ ] Upsert em products_current funciona (insert novo + update existente)
- [ ] Historico nao sobrescreve dados anteriores
- [ ] Tendencias calculadas corretamente

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
