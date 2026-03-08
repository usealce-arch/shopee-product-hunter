# Story 2.2 — Seed de Dados Historicos

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 2 — Database Foundation
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** HIGH
**Estimativa:** 16h (2 dias)
**Dependencia:** Story 2.1 (Setup BD)

---

## Story

**Como** sistema de analise,
**Eu quero** ter 30 dias de dados historicos simulados no banco,
**Para que** os graficos de tendencia e sazonalidade tenham dados para exibir desde o inicio.

---

## Dev Notes

### Tabelas a popular
- `products_history` — 30 snapshots diarios por produto (preco, vendas, rating)
- `competitor_tracking` — Contagem de afiliados por produto por dia
- `products_current` — Snapshot atual com scores pre-calculados
- `seasonal_patterns` — Performance por mes (12 meses)

### Dados simulados
- Criar ~20 produtos ficticios (categorias: eletronicos, casa, moda, beleza)
- Simular variacao de preco (+-10% por dia, tendencia realista)
- Simular vendas (crescente/decrescente/estavel)
- Simular competicao (5-500 afiliados)
- Scores pre-calculados (0-100) com distribuicao realista

---

## Tasks

- [ ] **T1:** Criar script `scripts/seed-historical-data.ts`
  - Gerar 20 produtos ficticios com dados realistas
  - Categorias: eletronicos, casa, moda, beleza, esportes
  - Precos: R$15 a R$500
  - Comissao: 5% a 15%
- [ ] **T2:** Popular products_current com 20 produtos
  - Scores variados: 5 produtos score 75+, 8 score 50-74, 7 score <50
  - Tendencias: 7 UP, 6 STABLE, 7 DOWN
- [ ] **T3:** Popular products_history com 30 dias
  - 20 produtos x 30 dias = 600 registros
  - Variacao de preco realista (+-5-10% por dia)
  - Variacao de vendas correlacionada
- [ ] **T4:** Popular competitor_tracking
  - 20 produtos x 30 dias = 600 registros
  - Competicao crescendo gradualmente
- [ ] **T5:** Popular seasonal_patterns
  - 20 produtos x 12 meses = 240 registros
  - Dezembro/novembro = scores altos (Black Friday, Natal)
  - Janeiro/fevereiro = scores baixos
- [ ] **T6:** Executar script e verificar dados
  - `npx tsx scripts/seed-historical-data.ts`
  - Verificar contagem de registros em cada tabela
  - Verificar integridade referencial

---

## Acceptance Criteria

- [ ] Script `scripts/seed-historical-data.ts` funcional
- [ ] 20 produtos em products_current com scores variados
- [ ] 600 registros em products_history (30 dias x 20 produtos)
- [ ] 600 registros em competitor_tracking
- [ ] 240 registros em seasonal_patterns (12 meses x 20 produtos)
- [ ] Dados realistas (precos, scores, tendencias fazem sentido)

---

## File List

| Arquivo | Acao |
|---------|------|
| `scripts/seed-historical-data.ts` | Criado |

---

## Testing

- [ ] Script roda sem erros
- [ ] Contagem de registros correta em todas as tabelas
- [ ] Nenhum dado orfao (foreign keys validas)
- [ ] Distribuicao de scores realista

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
