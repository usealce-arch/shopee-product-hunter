# Story 4.6 — Mobile Responsive

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 4 — Frontend Dashboard
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** HIGH
**Estimativa:** 8h (1 dia)
**Dependencia:** Stories 4.1-4.5 (todas as paginas frontend)

---

## Story

**Como** afiliado Shopee usando celular,
**Eu quero** acessar o dashboard no meu smartphone,
**Para que** eu possa encontrar oportunidades em qualquer lugar.

---

## Dev Notes

### Referencia Design
- DESIGN_SYSTEM.md secao 11 — Mobile Responsive (SEGUIR EXATAMENTE)
- DESIGN_SYSTEM.md secao 9.1 — App Shell mobile
- DESIGN_SYSTEM.md secao 4 — Breakpoints e Grid

### Breakpoints
- sm: 640px (mobile landscape)
- md: 768px (tablet)
- lg: 1024px (desktop)

### Adaptacoes Mobile (< 768px)
- Sidebar → Sheet (hamburger, ja implementado na Story 4.2)
- OpportunityTable → Cards empilhados (ProductCard mobile)
- StatCards → Stack vertical (1 coluna)
- ROI Calculator → Cards empilhados (1 coluna)
- Product Detail → Full screen modal
- Filtros → Collapsible (toggle show/hide)
- Bottom nav opcional: Dashboard, Analytics, Settings (3 icones)

### Touch targets
- Minimo 44px x 44px para botoes e links
- Padding adequado em todos os elementos interativos

---

## Tasks

- [ ] **T1:** Adaptar Dashboard page para mobile
  - StatCards: grid-cols-1 no mobile (sm:grid-cols-3 desktop)
  - SearchBar: stack vertical (campos empilhados)
  - Filtros: collapsible com toggle "Filtros ▼"
- [ ] **T2:** Criar `components/ProductCardMobile.tsx`
  - Versao card do produto para mobile (substituir tabela)
  - Layout: titulo + score pill + preco + ROI + trend badge
  - Botao "Detalhes" full width
  - bg-slate-800, rounded-lg, p-4
  - Mostrar quando viewport < md (768px)
- [ ] **T3:** Adaptar OpportunityTable
  - Desktop (>= md): Table normal
  - Mobile (< md): Lista de ProductCardMobile
  - Usar hook useMediaQuery ou Tailwind responsive classes
- [ ] **T4:** Adaptar Product Detail para mobile
  - Full screen modal no mobile (DialogContent full screen)
  - Graficos redimensionaveis (ResponsiveContainer Recharts)
  - Score bars full width
  - Botoes full width e stacked
- [ ] **T5:** Adaptar ROI Calculator para mobile
  - Cards empilhados (grid-cols-1)
  - Quick buttons em row (flex, scrollable horizontal)
  - Input full width
- [ ] **T6:** Adaptar Analytics page para mobile
  - Graficos full width com ResponsiveContainer
  - Tabela de historico → cards
- [ ] **T7:** Verificar touch targets
  - Todos os botoes >= 44px de altura
  - Links com padding adequado
  - Inputs com altura >= 44px no mobile
- [ ] **T8:** Testar em diferentes viewports
  - 375px (iPhone SE)
  - 390px (iPhone 14)
  - 768px (iPad)
  - 1024px (desktop small)
  - Verificar sem scroll horizontal indesejado

---

## Acceptance Criteria

- [ ] Dashboard funcional em tela 375px (iPhone SE)
- [ ] Sidebar vira Sheet no mobile (< 768px)
- [ ] Tabela vira cards no mobile (< 768px)
- [ ] Graficos redimensionam corretamente
- [ ] ROI Calculator cards empilham no mobile
- [ ] Sem scroll horizontal indesejado em nenhuma viewport
- [ ] Tap targets >= 44px em todos os elementos interativos
- [ ] Product Detail full screen no mobile

---

## File List

| Arquivo | Acao |
|---------|------|
| `components/ProductCardMobile.tsx` | Criado |
| `components/OpportunityTable.tsx` | Modificado — responsive |
| `app/(dashboard)/dashboard/page.tsx` | Modificado — responsive |
| `components/ROICalculator.tsx` | Modificado — responsive |
| `components/ProductDetailModal.tsx` | Modificado — responsive |
| `components/SearchBar.tsx` | Modificado — responsive |

---

## Testing

- [ ] Dashboard renderiza sem erros em 375px
- [ ] Cards mobile exibidos em vez de tabela
- [ ] Sem overflow horizontal em nenhuma pagina
- [ ] Touch targets >= 44px
- [ ] Sheet sidebar funcional no mobile
- [ ] Graficos redimensionam sem distorcao

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
