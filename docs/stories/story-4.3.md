# Story 4.3 — Dashboard de Oportunidades

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 4 — Frontend Dashboard
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** CRITICAL
**Estimativa:** 16h (2 dias)
**Dependencia:** Story 4.2 (App Shell) + Story 3.5 (Search API)

---

## Story

**Como** afiliado Shopee,
**Eu quero** buscar produtos por categoria e ver uma tabela com scores de oportunidade,
**Para que** eu identifique rapidamente os melhores produtos pra promover.

---

## Dev Notes

### Referencia Design
- DESIGN_SYSTEM.md secao 9.2 — Dashboard Page wireframe (SEGUIR EXATAMENTE)
- DESIGN_SYSTEM.md secao 7.1 — SearchBar molecule
- DESIGN_SYSTEM.md secao 7.4 — StatCard molecule
- DESIGN_SYSTEM.md secao 8.2 — OpportunityTable organism
- DESIGN_SYSTEM.md secao 6.3 — Score Pill / Badge
- DESIGN_SYSTEM.md secao 12 — Loading States, Empty States

### Layout (Desktop)
```
Page Header: "Dashboard" + [Buscar Oportunidades]
KPI Row: 3 StatCards (Buscas, Score Medio, Melhor ROI)
SearchBar: Categoria + Preco max + Score min + [Buscar]
OpportunityTable: Nome | Preco | ROI | Score | Trend | Acao
Pagination: < Anterior | Pagina X de Y | Proxima >
```

### Score Pills (cores)
- 75-100: bg-green-500/10, text-green-400 (BOM)
- 50-74: bg-yellow-500/10, text-yellow-400 (OK)
- 0-49: bg-red-500/10, text-red-400 (RUIM)

### Trend Badges
- UP: bg-green-500/10, text-green-400, ArrowUpRight icon
- STABLE: bg-slate-500/10, text-slate-400, ArrowRight icon
- DOWN: bg-red-500/10, text-red-400, ArrowDownRight icon

### Componentes Shadcn
- Table, Badge, Button, Skeleton, Select, Input, Card, DropdownMenu, Toast

---

## Tasks

- [ ] **T1:** Criar `components/SearchBar.tsx`
  - Container: bg-slate-800, rounded-lg, p-4, flex gap-3
  - Select "Categoria" (Shadcn Select) — opcoes: eletronicos, casa, moda, beleza, esportes
  - Input "Preco max" — tipo number, prefix "R$"
  - Input "Score min" — tipo number, range 0-100
  - Button "Buscar" — primary LG (cor Shopee)
  - Integrar com POST /api/products/search
- [ ] **T2:** Criar `components/StatCard.tsx`
  - Container: bg-slate-800, rounded-lg, p-4
  - Label: text-12px, text-slate-400
  - Value: font-mono, text-24px, text-slate-50
  - Optional: Progress bar (h-1.5, bg-primary-500)
- [ ] **T3:** Criar `components/ScorePill.tsx`
  - Props: score (number)
  - 75+: verde, 50-74: amarelo, <50: vermelho
  - Font mono, text-sm, rounded-full, px-2
- [ ] **T4:** Criar `components/TrendBadge.tsx`
  - Props: trend ("UP" | "STABLE" | "DOWN")
  - Icone + texto + cor conforme DESIGN_SYSTEM.md secao 6.3
- [ ] **T5:** Criar `components/OpportunityTable.tsx`
  - Shadcn Table como base
  - Header: bg-slate-900, text-slate-400, text-12px, uppercase, sticky
  - Colunas: Produto (titulo + imagem), Preco, ROI, Score (ScorePill), Tendencia (TrendBadge), Acao
  - Row: hover:bg-slate-700, cursor-pointer
  - Acao: DropdownMenu (Detalhes, Copiar Link, Calculadora)
  - Sortable: clicar no header ordena por coluna
  - Props: products[], onProductClick, onCopyLink
- [ ] **T6:** Implementar loading states
  - Skeleton loader na tabela (6 rows de Skeleton, pulse animation)
  - Texto "Buscando produtos..." durante scraping
  - Progress "Analisando com IA..." durante Gemini
- [ ] **T7:** Implementar empty states
  - Primeira vez: icone foguete + "Bem-vindo ao Product Hunter!" + CTA "Buscar Produtos"
  - Sem resultados: icone lupa + "Nenhum produto encontrado" + "Tente ajustar os filtros"
- [ ] **T8:** Criar `/app/(dashboard)/dashboard/page.tsx`
  - PageHeader "Dashboard"
  - Row de 3 StatCards (Buscas este mes, Score Medio, Melhor ROI)
  - SearchBar
  - OpportunityTable com dados da API
  - Paginacao (< Anterior | Pagina X de Y | Proxima >)
  - Polling logic: buscar status a cada 3s quando search em andamento
- [ ] **T9:** Integrar com APIs
  - Fetch GET /api/products/current para listagem inicial
  - POST /api/products/search ao clicar Buscar
  - Polling GET /api/products/search/:id para resultado
  - Refresh tabela quando busca completa

---

## Acceptance Criteria

- [ ] SearchBar funcional — busca por categoria com filtros
- [ ] 3 StatCards com metricas (buscas, score medio, melhor ROI)
- [ ] OpportunityTable exibe produtos com Score Pill colorido
- [ ] Score pills com cores corretas (verde 75+, amarelo 50-74, vermelho <50)
- [ ] TrendBadge com setas e cores (UP verde, STABLE cinza, DOWN vermelho)
- [ ] Dropdown de acoes funcional (Detalhes, Copiar Link, Calculadora)
- [ ] Loading states com Skeleton durante busca
- [ ] Empty state amigavel na primeira visita e sem resultados
- [ ] Paginacao funcional
- [ ] Visual conforme DESIGN_SYSTEM.md secao 9.2

---

## File List

| Arquivo | Acao |
|---------|------|
| `app/(dashboard)/dashboard/page.tsx` | Criado |
| `components/SearchBar.tsx` | Criado |
| `components/StatCard.tsx` | Criado |
| `components/ScorePill.tsx` | Criado |
| `components/TrendBadge.tsx` | Criado |
| `components/OpportunityTable.tsx` | Criado |

---

## Testing

- [ ] Dashboard renderiza sem erros
- [ ] Busca inicia e exibe loading
- [ ] Resultados aparecem na tabela apos busca
- [ ] Score pills tem cores corretas
- [ ] Paginacao funciona (paginas, navegacao)
- [ ] Empty state exibido quando sem dados
- [ ] Responsivo em 768px (tabela ainda visivel)

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
