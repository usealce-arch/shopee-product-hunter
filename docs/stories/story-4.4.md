# Story 4.4 — Product Detail Panel

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 4 — Frontend Dashboard
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** HIGH
**Estimativa:** 12h (1.5 dias)
**Dependencia:** Story 4.3 (Dashboard)

---

## Story

**Como** afiliado Shopee,
**Eu quero** ver detalhes completos de um produto com graficos de historico e score breakdown,
**Para que** eu tome decisoes informadas sobre qual produto promover.

---

## Dev Notes

### Referencia Design
- DESIGN_SYSTEM.md secao 8.3 — Product Detail Panel wireframe (SEGUIR EXATAMENTE)
- DESIGN_SYSTEM.md secao 12 — Loading States

### Layout do Panel
```
[X] Fechar
[img] Titulo do Produto
     Preco (era R$X) | Rating | Vendas/mes | Comissao

SCORE (card)
  Score total: 87/100 MUITO BOM
  Rentabilidade:  ████████░░  85
  Tendencia:      ███████░░░  72
  Competicao:     ██████░░░░  65
  Sazonalidade:   █████████░  92
  Historico:      ████████░░  80

HISTORICO 30 DIAS (grafico)
  Recharts LineChart: preco + vendas (dual Y axis)

RECOMENDACAO (card)
  "Invista R$100 e ganhe R$350"
  Melhor mes: Dezembro (score 95)
  Competicao: BAIXA (23 afiliados)

[Copiar Link Afiliado] [Abrir Calculadora]
```

### Componentes Shadcn
- Dialog (modal), Tabs, Progress (score bars), Badge, Button, Card

### Graficos
- Recharts LineChart (historico de preco 30 dias)
- Recharts BarChart (vendas por semana)
- Dual Y axis (preco + vendas)

---

## Tasks

- [ ] **T1:** Criar `components/ProductDetailModal.tsx`
  - Shadcn Dialog como base (Dialog, DialogContent, DialogHeader)
  - Width: max-w-2xl
  - Scrollable content
  - Props: product, isOpen, onClose
- [ ] **T2:** Implementar secao de info basica
  - Imagem do produto (se disponivel, senao placeholder)
  - Titulo, preco atual (+ preco original riscado se desconto)
  - Rating com estrelas, vendas/mes, comissao %
  - Font mono para numeros
- [ ] **T3:** Implementar Score Breakdown
  - Card com score total (ScorePill grande, Mono LG)
  - 5 barras de dimensao com Shadcn Progress
  - Labels: Rentabilidade, Tendencia, Competicao, Sazonalidade, Historico
  - Valor numerico ao lado de cada barra
  - Cores da barra baseadas no valor (verde >70, amarelo >40, vermelho <=40)
- [ ] **T4:** Implementar grafico de historico (Recharts)
  - `npm install recharts`
  - LineChart com dados de products_history (30 dias)
  - Linha 1: Preco (cor Shopee #EE4D2D)
  - Linha 2: Vendas (cor verde #22C55E)
  - Dual Y axis
  - Tooltip no hover
  - Responsive container
- [ ] **T5:** Implementar secao de recomendacao
  - Card com recomendacao de ad spend
  - "Invista R$X e ganhe R$Y" (destaque visual)
  - Melhor mes para vender (sazonalidade)
  - Nivel de competicao (LOW/MED/HIGH badge)
- [ ] **T6:** Implementar acoes
  - Botao "Copiar Link Afiliado" — copia link para clipboard, toast de sucesso
  - Botao "Abrir Calculadora" — abre ROI Calculator (Story 4.5)
- [ ] **T7:** Integrar com API
  - Fetch GET /api/products/current/:id ao abrir
  - Loading state com Skeleton enquanto carrega

---

## Acceptance Criteria

- [ ] Modal abre ao clicar em produto na tabela
- [ ] Info basica exibida (titulo, preco, rating, vendas, comissao)
- [ ] Score breakdown com 5 barras de progresso
- [ ] Grafico de historico 30 dias funcional (Recharts)
- [ ] Recomendacao de ad spend exibida
- [ ] Botao "Copiar Link" copia para clipboard + toast
- [ ] Loading state com Skeleton
- [ ] Visual conforme DESIGN_SYSTEM.md secao 8.3

---

## File List

| Arquivo | Acao |
|---------|------|
| `components/ProductDetailModal.tsx` | Criado |
| `components/ScoreBreakdown.tsx` | Criado |
| `components/PriceHistoryChart.tsx` | Criado |

---

## Testing

- [ ] Modal abre e fecha corretamente
- [ ] Dados do produto exibidos corretamente
- [ ] Grafico renderiza com dados reais
- [ ] Copiar link funciona (clipboard API)
- [ ] Skeleton exibido durante loading
- [ ] Responsivo em mobile (full screen modal)

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
