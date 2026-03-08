# Story 5.3 — Analytics Page

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 5 — Intelligence & Tracking
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** MEDIUM
**Estimativa:** 12h (1.5 dias)
**Dependencia:** Story 5.1 (Sazonalidade) + Story 5.2 (ROI Tracking) + Story 4.2 (App Shell)

---

## Story

**Como** afiliado Shopee,
**Eu quero** ver graficos de performance, ROI real vs previsto e tendencias de mercado,
**Para que** eu acompanhe minha evolucao e tome decisoes melhores.

---

## Dev Notes

### Referencia Design
- DESIGN_SYSTEM.md secao 9.3 — Analytics Page wireframe (SEGUIR EXATAMENTE)

### Layout
```
Analytics
├── ROI: Previsao vs Real (BarChart agrupado, azul=previsto, verde=real)
├── Tendencias do Mercado (LineChart, score medio por semana)
├── Sazonalidade (Heatmap 12 meses)
└── Historico de Buscas (Table: data, categoria, qtd produtos, top score)
```

### Graficos (Recharts)
1. **ROI Previsao vs Real:** BarChart agrupado
   - Eixo X: datas dos reports
   - Barra azul: ROI previsto
   - Barra verde: ROI real
2. **Tendencias:** LineChart
   - Score medio por semana (ultimos 30 dias)
   - Linha Shopee orange (#EE4D2D)
3. **Sazonalidade:** Grid 12 meses
   - Cada celula colorida por performance_score
   - Verde = bom, amarelo = ok, vermelho = ruim
4. **Historico de Buscas:** Shadcn Table
   - Data, categoria, produtos encontrados, top score

### Componentes Shadcn
- Card, Tabs, Table, Badge

---

## Tasks

- [ ] **T1:** Criar `/app/(dashboard)/analytics/page.tsx`
  - PageHeader "Analytics"
  - 4 secoes em cards (Recharts + Table)
  - Tabs para navegar entre secoes (opcional)
- [ ] **T2:** Criar `components/ROIComparisonChart.tsx`
  - Recharts BarChart agrupado
  - Dados: GET /api/roi/comparison (todos os reports do usuario)
  - Barras: azul (previsto) + verde (real)
  - Tooltip com detalhes
  - ResponsiveContainer para mobile
- [ ] **T3:** Criar `components/MarketTrendChart.tsx`
  - Recharts LineChart
  - Dados: score medio por semana dos ultimos 30 dias
  - Linha cor Shopee #EE4D2D
  - Tooltip + grid
  - ResponsiveContainer
- [ ] **T4:** Criar `components/SeasonalityHeatmap.tsx`
  - Grid 3x4 (12 meses)
  - Cada celula colorida pelo performance_score
  - Label: nome do mes + score
  - Highlight: melhor mes (borda verde) + pior mes (borda vermelha)
- [ ] **T5:** Criar `components/SearchHistoryTable.tsx`
  - Shadcn Table
  - Colunas: Data, Categoria, Produtos, Top Score
  - Dados: GET /api/products/search (historico do usuario)
  - Ordenado por data desc
  - ScorePill para Top Score
- [ ] **T6:** Implementar APIs de analytics
  - `GET /api/analytics/trends` — score medio por semana
  - `GET /api/analytics/search-history` — buscas do usuario
  - Reusar: GET /api/roi/comparison (Story 5.2)
  - Reusar: GET /api/analysis/seasonal (Story 5.1)

---

## Acceptance Criteria

- [ ] Pagina analytics funcional com 4 secoes
- [ ] Grafico ROI real vs previsto exibe dados corretamente
- [ ] Grafico de tendencias mostra score medio por semana
- [ ] Heatmap de sazonalidade com 12 meses coloridos
- [ ] Tabela de historico de buscas com ScorePill
- [ ] Graficos responsivos no mobile
- [ ] Visual conforme DESIGN_SYSTEM.md secao 9.3

---

## File List

| Arquivo | Acao |
|---------|------|
| `app/(dashboard)/analytics/page.tsx` | Criado |
| `components/ROIComparisonChart.tsx` | Criado |
| `components/MarketTrendChart.tsx` | Criado |
| `components/SeasonalityHeatmap.tsx` | Criado |
| `components/SearchHistoryTable.tsx` | Criado |
| `app/api/analytics/trends/route.ts` | Criado |
| `app/api/analytics/search-history/route.ts` | Criado |

---

## Testing

- [ ] Pagina renderiza sem erros
- [ ] Graficos renderizam com dados do seed
- [ ] Heatmap mostra 12 meses com cores corretas
- [ ] Tabela de historico exibe buscas
- [ ] Responsivo no mobile (graficos redimensionam)

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
