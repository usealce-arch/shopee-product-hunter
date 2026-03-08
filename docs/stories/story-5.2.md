# Story 5.2 — ROI Tracking System

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 5 — Intelligence & Tracking
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** MEDIUM
**Estimativa:** 12h (1.5 dias)
**Dependencia:** Story 3.4 (Gemini Analysis)

---

## Story

**Como** afiliado Shopee,
**Eu quero** reportar quanto realmente ganhei apos investir em anuncios,
**Para que** o sistema compare previsao vs realidade e melhore as previsoes futuras.

---

## Dev Notes

### Referencia
- PRD.md secao 4.6 — Performance Tracking
- DATABASE_SCHEMA.md — tabelas roi_estimates e roi_actuals

### Fluxo
1. Sistema preve: "Invista R$100, lucre R$350" (roi_estimates)
2. Usuario promove o produto e investe
3. Usuario volta e reporta: "Investi R$500, ganhei R$2000" (roi_actuals)
4. Sistema compara previsao vs realidade
5. Sistema refina modelo com dados reais

### Tabela roi_actuals
- user_id, product_id
- actual_ad_spend, actual_revenue, actual_profit
- estimate_id (FK → roi_estimates — para comparar)
- reported_at

### Refinamento
- Comparar roi_estimates.estimated_roi vs roi_actuals.actual_roi
- Se previsao errou >30%: ajustar peso das dimensoes
- Acumular dados para melhorar accuracy

---

## Tasks

- [ ] **T1:** Implementar `POST /api/roi/actual`
  - Input Zod: product_id, actual_ad_spend, actual_revenue
  - Calcular: actual_profit = revenue - ad_spend
  - Calcular: actual_roi = (profit / ad_spend) x 100
  - Buscar roi_estimate correspondente (mais recente para o produto)
  - Salvar em roi_actuals com referencia ao estimate
- [ ] **T2:** Implementar `GET /api/roi/comparison/:productId`
  - Retornar: estimated vs actual para cada report
  - Calcular: accuracy = 100 - abs(estimated_roi - actual_roi)
  - Retornar: media de accuracy ao longo do tempo
- [ ] **T3:** Implementar refinamento do modelo
  - Funcao `refineModel(productId, actuals)`
  - Se accuracy < 70%: ajustar pesos do scoring
  - Salvar novos pesos por categoria de produto
  - Recalcular scores dos produtos da mesma categoria
- [ ] **T4:** Criar formulario de report no frontend
  - Modal simples no Product Detail
  - Campos: Quanto investiu (R$), Quanto ganhou (R$)
  - Botao "Reportar Resultado"
  - Toast de sucesso

---

## Acceptance Criteria

- [ ] Usuario pode reportar ROI real (ad_spend + revenue)
- [ ] Sistema calcula e salva profit + ROI real
- [ ] Comparacao previsao vs realidade disponivel via API
- [ ] Accuracy calculada por produto e global
- [ ] Modelo refinado com feedback (pesos ajustados)
- [ ] Formulario de report funcional no frontend

---

## File List

| Arquivo | Acao |
|---------|------|
| `app/api/roi/actual/route.ts` | Criado |
| `app/api/roi/comparison/[productId]/route.ts` | Criado |
| `lib/model-refinement.ts` | Criado |
| `components/ROIReportModal.tsx` | Criado |

---

## Testing

- [ ] POST /api/roi/actual salva dados corretamente
- [ ] Comparacao retorna estimated vs actual
- [ ] Accuracy calculada corretamente
- [ ] Formulario envia dados sem erros
- [ ] Refinamento ajusta pesos quando accuracy < 70%

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
