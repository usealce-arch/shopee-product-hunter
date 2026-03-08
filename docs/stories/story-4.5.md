# Story 4.5 — ROI Calculator

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 4 — Frontend Dashboard
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** HIGH
**Estimativa:** 8h (1 dia)
**Dependencia:** Story 4.4 (Product Detail)

---

## Story

**Como** afiliado Shopee,
**Eu quero** simular quanto vou lucrar investindo em anuncios para um produto,
**Para que** eu saiba exatamente se vale a pena investir R$100, R$500 ou R$1000.

---

## Dev Notes

### Referencia Design
- DESIGN_SYSTEM.md secao 8.4 — ROI Calculator Panel wireframe (SEGUIR EXATAMENTE)
- DESIGN_SYSTEM.md secao 7.3 — ROI Scenario Card molecule

### Layout
```
CALCULADORA DE ROI
Quanto quer investir em anuncios?
[R$ ________]  ou escolha:
[R$100] [R$500] [R$1000]  <- Quick buttons

┌─────────┐ ┌─────────┐ ┌─────────┐
│ R$ 100  │ │ R$ 500  │ │ R$1000  │
│ Conv: X │ │ Conv: X │ │ Conv: X │
│ Rev: X  │ │ Rev: X  │ │ Rev: X  │
│ Com: X  │ │ Com: X  │ │ Com: X  │
│ Ad: -X  │ │ Ad: -X  │ │ Ad: -X  │
│ Lucro:X │ │ Lucro:X │ │ Lucro:X │
└─────────┘ └─────────┘ └─────────┘

Dados baseados em analise historica.
```

### Calculo ROI
- Conversoes = ad_spend / CPA (custo por aquisicao estimado)
- Revenue = conversoes x preco_produto
- Comissao = revenue x comissao_percentual
- Lucro = comissao - ad_spend
- ROI% = (lucro / ad_spend) x 100

### Visual dos Cards
- Lucro positivo: border-green-500/30, shadow-glow-green
- Lucro negativo: border-red-500/30
- Font mono para todos os numeros

### Componentes Shadcn
- Card, Input, Button, Badge, Separator

---

## Tasks

- [ ] **T1:** Criar `components/ROIScenarioCard.tsx`
  - Props: adSpend, conversions, revenue, commission, profit, roi
  - Container: bg-slate-800, rounded-lg, p-6, border
  - Borda verde se lucro positivo, vermelha se negativo
  - Rows: flex justify-between, text-14px
  - Resultado final: Mono LG, cor do status
  - Verdict badge: "VALE" (verde), "NAO VALE" (vermelho), "AVALIE" (amarelo)
- [ ] **T2:** Criar `components/ROICalculator.tsx`
  - Titulo "Calculadora de ROI" com icone Calculator
  - Input customizavel "Quanto quer investir?" (R$ prefix)
  - Quick buttons: R$100, R$500, R$1000
  - 3 ROIScenarioCards lado a lado (grid 3 colunas)
  - Disclaimer: "Dados baseados em analise historica"
  - Props: product (com dados de comissao, vendas, CPA)
- [ ] **T3:** Implementar logica de calculo
  - Funcao calculateROI(adSpend, product) retorna cenario completo
  - Usar dados do produto: comissao%, vendas/mes, preco, CPA estimado
  - Calcular: conversoes, revenue, comissao, lucro, ROI%
- [ ] **T4:** Integrar como modal/secao no Product Detail
  - Botao "Abrir Calculadora" no ProductDetailModal abre ROI Calculator
  - Pode ser tab separada ou secao expandivel
  - Pre-preencher com dados do produto selecionado

---

## Acceptance Criteria

- [ ] 3 cenarios pre-definidos exibidos (R$100, R$500, R$1000)
- [ ] Input customizavel funcional (usuario digita valor, quarto cenario aparece)
- [ ] Breakdown completo por cenario (conversoes, revenue, comissao, custo, lucro)
- [ ] Cards com borda verde para lucro positivo, vermelha para negativo
- [ ] Verdict badge correto (VALE/NAO VALE/AVALIE)
- [ ] Font mono para numeros
- [ ] Visual conforme DESIGN_SYSTEM.md secao 8.4

---

## File List

| Arquivo | Acao |
|---------|------|
| `components/ROICalculator.tsx` | Criado |
| `components/ROIScenarioCard.tsx` | Criado |
| `lib/roi-calculator.ts` | Criado — logica de calculo |

---

## Testing

- [ ] 3 cenarios renderizam corretamente
- [ ] Calculo de ROI correto (verificar manualmente)
- [ ] Input customizavel gera novo cenario
- [ ] Cores dos cards corretas (verde/vermelho)
- [ ] Responsivo: cards empilham no mobile

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
