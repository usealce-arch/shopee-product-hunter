# Story 2.1 — Setup do Banco de Dados Supabase

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 2 — Database Foundation
**Responsavel:** @dev (Dex) + @devops (Gage)
**Status:** Draft
**Prioridade:** HIGH
**Estimativa:** 16h (2 dias)
**Dependencia:** Story 0.1 (Infra Setup)

---

## Story

**Como** sistema backend,
**Eu quero** ter todas as 9 tabelas criadas no Supabase com indices e RLS,
**Para que** as APIs possam armazenar e consultar dados de produtos, scores e ROI.

---

## Dev Notes

### Referencia
- DATABASE_SCHEMA.md — Script SQL completo (copiar e executar)
- ARCHITECTURE.md secao 2.3 — Lista das 9 tabelas

### Tabelas (9 total)
1. `users` — Dados basicos
2. `searches` — Historico de buscas
3. `products_current` — Snapshot atual com scores
4. `products_history` — Serie temporal 30 dias
5. `competitor_tracking` — Afiliados por produto
6. `roi_estimates` — Previsoes do sistema
7. `roi_actuals` — Resultados reais
8. `seasonal_patterns` — Performance por mes
9. `search_results` — Resultados por busca

### Conexao
- Supabase URL: `https://ddotdwcmpbhlkmhrrlxf.supabase.co`
- Criar `lib/db.ts` com Supabase client (server + browser)

---

## Tasks

- [ ] **T1:** Criar `lib/db.ts` — Supabase client
  - `createClient()` para server-side (service role key)
  - `createBrowserClient()` para client-side (anon key)
  - Usar `@supabase/supabase-js`
- [ ] **T2:** Executar migration SQL completo no Supabase SQL Editor
  - Copiar "COMPLETE MIGRATION SCRIPT" de DATABASE_SCHEMA.md
  - Executar no Supabase Dashboard > SQL Editor
  - Verificar que todas as 9 tabelas foram criadas
- [ ] **T3:** Verificar indices de performance
  - `idx_users_email` em users
  - `idx_searches_user_id`, `idx_searches_created_at` em searches
  - Indices em products_current (shopee_product_id, opportunity_score, category)
  - Indices em products_history (shopee_product_id, snapshot_date)
  - Indices em competitor_tracking, roi_estimates, roi_actuals, seasonal_patterns
- [ ] **T4:** Ativar e testar RLS policies
  - Cada tabela tem policy `user_id = auth.uid()`
  - Testar: usuario A nao ve dados do usuario B
  - Testar: insert so com user_id correto
- [ ] **T5:** Testar conexao via lib/db.ts
  - Criar script de teste: inserir user, buscar, deletar
  - Verificar que conexao funciona tanto server quanto client

---

## Acceptance Criteria

- [ ] 9 tabelas criadas no Supabase (verificar no Dashboard > Table Editor)
- [ ] Todos os indices criados e visiveis no Dashboard
- [ ] RLS policies ativas em todas as tabelas
- [ ] `lib/db.ts` funcional — conexao testada server-side e client-side
- [ ] Nenhum erro de SQL na migration

---

## File List

| Arquivo | Acao |
|---------|------|
| `lib/db.ts` | Criado — Supabase client |
| `types/database.ts` | Criado — tipos TypeScript das tabelas |

---

## Testing

- [ ] Conexao server-side retorna dados
- [ ] Conexao client-side retorna dados
- [ ] RLS bloqueia acesso cross-user
- [ ] Insert em todas as 9 tabelas funciona

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
