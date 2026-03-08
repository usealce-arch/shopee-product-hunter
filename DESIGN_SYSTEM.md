# SHOPEE PRODUCT HUNTER — DESIGN SYSTEM

**Versão:** 1.0
**Data:** 07/03/2026
**Criado por:** Uma (@ux-design-expert)
**Stack:** Next.js 14 + Tailwind CSS + Recharts

---

## 1. IDENTIDADE VISUAL

### Brand Personality
- **Tom:** Profissional mas acessível. Confiança com dados.
- **Feeling:** "Eu sei exatamente onde investir meu dinheiro"
- **Referências:** Bloomberg Terminal (dados) + Shopee (identidade) + Stripe (clean)

### UI Framework
- **Componentes:** Shadcn/ui (Radix primitives + Tailwind CSS)
- **Ícones:** Lucide React (já incluso no Shadcn)
- **Gráficos:** Recharts

---

## 2. PALETA DE CORES

### Cores Primárias (Shopee Official)
```
Primary (Laranja Shopee — #EE4D2D):
  --primary-50:   #FEF2F0
  --primary-100:  #FDE0DB
  --primary-200:  #FCBFB3
  --primary-300:  #FA9580
  --primary-400:  #F6714F
  --primary-500:  #EE4D2D  ← Oficial Shopee (botões, CTAs, logo)
  --primary-600:  #D63E20
  --primary-700:  #B33019
  --primary-800:  #912614
  --primary-900:  #6E1D0F

Secondary (Shopee White/Background):
  --secondary:    #FFFFFF  (light mode)
  --secondary-dark: #1E293B (dark mode)
```

### Cores de Status (Score)
```
Score Verde (75-100 = BOM):
  --score-green:  #22C55E  (bg: #F0FDF4)

Score Amarelo (50-74 = OK):
  --score-yellow: #EAB308  (bg: #FEFCE8)

Score Vermelho (0-49 = RUIM):
  --score-red:    #EF4444  (bg: #FEF2F2)
```

### Cores de Tendência
```
Tendência UP:    #22C55E + seta ↗
Tendência STABLE: #6B7280 + seta →
Tendência DOWN:  #EF4444 + seta ↘
```

### Dark Theme (Padrão)
```
Background:
  --bg-primary:   #0F172A  (slate-900)
  --bg-secondary: #1E293B  (slate-800)
  --bg-card:      #1E293B  (slate-800)
  --bg-hover:     #334155  (slate-700)

Text:
  --text-primary:   #F8FAFC  (slate-50)
  --text-secondary: #94A3B8  (slate-400)
  --text-muted:     #64748B  (slate-500)

Borders:
  --border:       #334155  (slate-700)
  --border-focus: #F97316  (primary-500)
```

### Light Theme (Opcional)
```
  --bg-primary:   #FFFFFF
  --bg-secondary: #F8FAFC
  --bg-card:      #FFFFFF
  --text-primary: #0F172A
  --text-secondary: #475569
  --border:       #E2E8F0
```

---

## 3. TIPOGRAFIA

### Font Family
```
Sans:  'Inter', system-ui, sans-serif  (body text)
Mono:  'JetBrains Mono', monospace     (números, dados, scores)
```

### Escala Tipográfica
```
Display:   48px / 700 / -0.02em  (hero headlines)
H1:        36px / 700 / -0.01em  (page titles)
H2:        24px / 600 / 0        (section titles)
H3:        20px / 600 / 0        (card titles)
H4:        16px / 600 / 0        (subsections)
Body:      14px / 400 / 0        (paragraphs)
Body SM:   13px / 400 / 0        (secondary text)
Caption:   12px / 400 / 0.01em   (labels, metadata)
Mono LG:   24px / 700 / 0        (scores, ROI numbers)
Mono SM:   14px / 500 / 0        (prices, percentages)
```

### Uso
- **Scores (87/100):** Mono LG, cor do status
- **Preços (R$89,90):** Mono SM
- **ROI (+250%):** Mono LG, verde
- **Labels (Tendência, Competição):** Caption, text-secondary

---

## 4. ESPAÇAMENTO & GRID

### Base: 4px (rem units)
```
--space-1:  4px   (0.25rem)
--space-2:  8px   (0.5rem)
--space-3:  12px  (0.75rem)
--space-4:  16px  (1rem)
--space-5:  20px  (1.25rem)
--space-6:  24px  (1.5rem)
--space-8:  32px  (2rem)
--space-10: 40px  (2.5rem)
--space-12: 48px  (3rem)
--space-16: 64px  (4rem)
```

### Grid Layout
```
Desktop:  12 colunas, max-width 1280px, gap 24px, padding 32px
Tablet:   8 colunas, gap 16px, padding 24px
Mobile:   4 colunas, gap 12px, padding 16px
```

### Breakpoints
```
sm:  640px   (mobile landscape)
md:  768px   (tablet)
lg:  1024px  (desktop small)
xl:  1280px  (desktop)
2xl: 1536px  (desktop large)
```

---

## 5. BORDER RADIUS & SHADOWS

### Border Radius
```
--radius-sm:  6px   (badges, pills)
--radius-md:  8px   (inputs, buttons)
--radius-lg:  12px  (cards)
--radius-xl:  16px  (modals)
--radius-full: 9999px (avatars, dots)
```

### Shadows (Dark Theme)
```
--shadow-sm:  0 1px 2px rgba(0,0,0,0.3)
--shadow-md:  0 4px 6px rgba(0,0,0,0.3)
--shadow-lg:  0 10px 15px rgba(0,0,0,0.4)
--shadow-glow-green:  0 0 12px rgba(34,197,94,0.3)   (score bom)
--shadow-glow-orange: 0 0 12px rgba(249,115,22,0.3)  (CTA hover)
```

---

## 6. COMPONENTES ATÔMICOS (Atoms)

### 6.1 Button (Shadcn `<Button>`)

```
Variantes (Shadcn built-in + custom):
  default:      bg-primary-500 (#EE4D2D), text-white, hover:bg-primary-600
  secondary:    bg-slate-700, text-slate-200, hover:bg-slate-600
  ghost:        bg-transparent, text-slate-400, hover:bg-slate-800
  destructive:  bg-red-500/10, text-red-400, hover:bg-red-500/20
  outline:      border-slate-700, text-slate-200, hover:bg-slate-800

Tamanhos (Shadcn built-in):
  sm:      h-8,  px-3, text-xs
  default: h-10, px-4, text-sm
  lg:      h-12, px-6, text-base
  icon:    h-10, w-10 (icon-only buttons)

Estados:
  Default → Hover → Active → Disabled → Loading (spinner)
```

### 6.2 Input

```
  Base:     bg-slate-800, border-slate-700, text-slate-50
  Focus:    border-primary-500, ring-2 ring-primary-500/20
  Error:    border-red-500, ring-2 ring-red-500/20
  Height:   h-10 (default), h-12 (large)
  Label:    text-13px, text-slate-400, mb-1
```

### 6.3 Badge / Score Pill

```
  Score BOM (75+):    bg-green-500/10, text-green-400, border-green-500/20
  Score OK (50-74):   bg-yellow-500/10, text-yellow-400, border-yellow-500/20
  Score RUIM (<50):   bg-red-500/10, text-red-400, border-red-500/20
  Tendência UP:       bg-green-500/10, text-green-400, + icon ↗
  Tendência STABLE:   bg-slate-500/10, text-slate-400, + icon →
  Tendência DOWN:     bg-red-500/10, text-red-400, + icon ↘
  Competition LOW:    bg-green-500/10, text-green-400
  Competition MED:    bg-yellow-500/10, text-yellow-400
  Competition HIGH:   bg-red-500/10, text-red-400
```

### 6.4 Avatar / Icon

```
  Avatar:   w-8 h-8, rounded-full, bg-primary-500/10
  Icon:     w-5 h-5, text-slate-400 (Lucide React icons)
```

### 6.5 Tooltip

```
  bg-slate-900, text-slate-200, text-12px, px-3, py-1.5, rounded-md
  shadow-lg, max-w-200px
```

---

## 7. COMPONENTES MOLECULARES (Molecules)

### 7.1 Search Bar

```
┌──────────────────────────────────────────────────────────┐
│ 🔍 | Categoria ▼ | Preço max R$ [___] | Score min [__] │ [Buscar]
└──────────────────────────────────────────────────────────┘

  Container: bg-slate-800, rounded-lg, p-4, flex gap-3
  Select "Categoria": Input + dropdown
  Input "Preço max": Input tipo number, prefix "R$"
  Input "Score min": Input tipo number, range 0-100
  Button "Buscar": Primary LG
```

### 7.2 Product Card (na tabela)

```
┌─────────────────────────────────────────────────────────────┐
│ [img] Fone Bluetooth TWS    R$ 89,90    🟢 87    ↗ UP    │
│       10% comissão          ▓▓▓▓▓▓▓▓░░  │ LOW   R$350   │
│                             score bar    │ comp  profit   │
│                                    [Detalhes] [Copiar Link]│
└─────────────────────────────────────────────────────────────┘

  Container: bg-slate-800, rounded-lg, p-4, hover:bg-slate-700
  Image: w-16 h-16, rounded-md, object-cover
  Title: H4, text-slate-50
  Price: Mono SM, text-slate-200
  Score: Mono LG + Score Pill
  Trend: Badge + arrow icon
  Competition: Badge
  Profit: Mono SM, text-green-400, prefix "R$"
  Actions: Ghost buttons, gap-2
```

### 7.3 ROI Scenario Card

```
┌──────────────────────┐
│ Investimento: R$100  │
│ ─────────────────── │
│ Conversões:    ~10   │
│ Revenue:      R$890  │
│ Comissão:     R$89   │
│ Custo Ad:    -R$100  │
│ ─────────────────── │
│ 💰 Lucro: R$-11     │
│ ROI: -11%            │
│ ⚠️ NÃO VALE         │
└──────────────────────┘

  Container: bg-slate-800, rounded-lg, p-6, border
  Se lucro positivo: border-green-500/30, shadow-glow-green
  Se lucro negativo: border-red-500/30
  Title: H4 + Mono LG
  Rows: flex justify-between, text-14px
  Divider: border-slate-700
  Result: Mono LG, cor do status
  Verdict: Badge com texto
```

### 7.4 Stat Card (Dashboard KPI)

```
┌─────────────────────┐
│ Buscas este mês     │
│ 23 / 50             │
│ ▓▓▓▓▓▓▓░░░ 46%     │
└─────────────────────┘

  Container: bg-slate-800, rounded-lg, p-4
  Label: Caption, text-slate-400
  Value: Mono LG, text-slate-50
  Progress bar: h-1.5, rounded-full, bg-primary-500
```

---

## 8. COMPONENTES ORGANISMOS (Organisms)

### 8.1 Sidebar Navigation

```
┌──────────────┐
│ 🔶 SPH      │  ← Logo
│              │
│ 📊 Dashboard │  ← Active (bg-slate-700, border-l-primary)
│ 📈 Analytics │
│ ⚙️ Settings  │
│              │
│ ─────────── │
│ 👤 Douglas  │
│ [Sair]      │
└──────────────┘

  Width: 240px (desktop), collapsed 64px (mobile)
  bg-slate-900, border-r border-slate-700
  Nav item: h-10, px-4, rounded-md, gap-3
  Active: bg-slate-800, border-l-2 border-primary-500, text-primary-400
  Inactive: text-slate-400, hover:text-slate-200
```

### 8.2 Opportunity Table

```
┌─────────────────────────────────────────────────────────┐
│ Nome          │ Preço   │ ROI    │ Score │ Trend │ Ação │
├───────────────┼─────────┼────────┼───────┼───────┼──────┤
│ Fone BT       │ R$89    │ +250%  │ 🟢 87 │ ↗ UP  │ ... │
│ Capinha iPhone │ R$29    │ +180%  │ 🟢 76 │ → STB │ ... │
│ Mouse Gamer   │ R$120   │ +90%   │ 🟡 62 │ ↘ DN  │ ... │
│ Cabo USB      │ R$15    │ +30%   │ 🔴 35 │ ↘ DN  │ ... │
└─────────────────────────────────────────────────────────┘

  Table: w-full
  Header: bg-slate-900, text-slate-400, text-12px, uppercase, sticky
  Row: bg-slate-800, hover:bg-slate-700, border-b border-slate-700
  Sortable columns: cursor-pointer, icon sort ↕
  Score: Score Pill component
  Trend: Badge + arrow
  Action: IconButton (3 dots → dropdown: Detalhes, Copiar Link, Calculadora)
```

### 8.3 Product Detail Panel (Modal/Slide-over)

```
┌──────────────────────────────────────────────┐
│ ← Voltar                                [X] │
│                                              │
│ [img]  Fone Bluetooth TWS Pro               │
│        R$ 89,90  (era R$129,90)             │
│        ⭐ 4.7 (2.340 avaliações)            │
│        📦 ~1.200 vendas/mês                 │
│        💰 Comissão: 10%                     │
│                                              │
│ ┌─ SCORE ──────────────────────────────────┐ │
│ │  🟢 87/100  MUITO BOM                   │ │
│ │  Rentabilidade  ▓▓▓▓▓▓▓▓░░  85         │ │
│ │  Tendência      ▓▓▓▓▓▓▓░░░  72         │ │
│ │  Competição     ▓▓▓▓▓▓░░░░  65         │ │
│ │  Sazonalidade   ▓▓▓▓▓▓▓▓▓░  92         │ │
│ │  Histórico      ▓▓▓▓▓▓▓▓░░  80         │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ┌─ HISTÓRICO 30 DIAS ─────────────────────┐ │
│ │  [Gráfico de linha: preço + vendas]      │ │
│ │  Recharts, dual Y axis                   │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ┌─ RECOMENDAÇÃO ──────────────────────────┐ │
│ │  💰 "Invista R$100 e ganhe R$350"       │ │
│ │  📈 Melhor mês: Dezembro (score 95)     │ │
│ │  👥 Competição: BAIXA (23 afiliados)    │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│  [Copiar Link Afiliado]  [Abrir Calculadora] │
└──────────────────────────────────────────────┘
```

### 8.4 ROI Calculator Panel

```
┌──────────────────────────────────────────────┐
│ 💰 CALCULADORA DE ROI                        │
│                                              │
│ Quanto quer investir em anúncios?            │
│ [R$ ________]  ou escolha:                   │
│ [R$100] [R$500] [R$1000]  ← Quick buttons   │
│                                              │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│ │ R$ 100  │ │ R$ 500  │ │ R$1000  │        │
│ │─────────│ │─────────│ │─────────│        │
│ │Conv: 10 │ │Conv: 50 │ │Conv: 100│        │
│ │Rev: 890 │ │Rev:4450 │ │Rev:8900 │        │
│ │Com: 89  │ │Com: 445 │ │Com: 890 │        │
│ │Ad: -100 │ │Ad: -500 │ │Ad:-1000 │        │
│ │─────────│ │─────────│ │─────────│        │
│ │🔴 -R$11 │ │🟡 -R$55 │ │🟢 -R$110│        │
│ │ROI:-11% │ │ROI:-11% │ │ROI:-11% │        │
│ └─────────┘ └─────────┘ └─────────┘        │
│                                              │
│ ⚠️ Dados baseados em análise histórica.     │
│    Resultados podem variar.                  │
└──────────────────────────────────────────────┘
```

---

## 9. TEMPLATES (Pages Layout)

### 9.1 Layout Base (App Shell)

```
┌──────────────────────────────────────────────────┐
│ Sidebar │           Content Area                  │
│ (240px) │  ┌─────────────────────────────────┐   │
│         │  │ Page Header (title + actions)    │   │
│ Logo    │  ├─────────────────────────────────┤   │
│         │  │                                  │   │
│ Nav     │  │         Page Content             │   │
│ Items   │  │         (scrollable)             │   │
│         │  │                                  │   │
│         │  │                                  │   │
│ ─────── │  │                                  │   │
│ User    │  └─────────────────────────────────┘   │
│ Logout  │                                         │
└──────────────────────────────────────────────────┘

Mobile:
┌──────────────────────┐
│ ☰ SPH        👤     │  ← Top bar
├──────────────────────┤
│                      │
│   Content Area       │
│   (full width)       │
│                      │
├──────────────────────┤
│ 📊  📈  ⚙️          │  ← Bottom nav
└──────────────────────┘
```

### 9.2 Dashboard Page

```
┌─────────────────────────────────────────────────┐
│ 📊 Dashboard          [Buscar Oportunidades ▼] │
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌── KPIs ──────────────────────────────────────┐│
│ │ Buscas: 23/50 │ Score Médio: 72 │ ROI: +180% ││
│ └──────────────────────────────────────────────┘│
│                                                  │
│ ┌── Search Bar ────────────────────────────────┐│
│ │ 🔍 Categoria ▼ │ Preço max │ Score min │[🔎] ││
│ └──────────────────────────────────────────────┘│
│                                                  │
│ ┌── Opportunity Table ─────────────────────────┐│
│ │ Nome      │Preço │ROI   │Score│Trend │Ação   ││
│ │───────────┼──────┼──────┼─────┼──────┼───────││
│ │ Fone BT   │R$89  │+250% │🟢87 │↗ UP  │[...] ││
│ │ Capinha   │R$29  │+180% │🟢76 │→ STB │[...] ││
│ │ Mouse     │R$120 │+90%  │🟡62 │↘ DN  │[...] ││
│ │ Cabo USB  │R$15  │+30%  │🔴35 │↘ DN  │[...] ││
│ └──────────────────────────────────────────────┘│
│                                                  │
│ ← Anterior  Página 1 de 5  Próxima →           │
└─────────────────────────────────────────────────┘
```

### 9.3 Analytics Page

```
┌─────────────────────────────────────────────────┐
│ 📈 Analytics                                    │
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌── ROI: Previsão vs Real ─────────────────────┐│
│ │  [Gráfico de barras agrupadas]                ││
│ │  Azul = Previsto  |  Verde = Real             ││
│ │  Últimos 30 dias                              ││
│ └──────────────────────────────────────────────┘│
│                                                  │
│ ┌── Tendências do Mercado ─────────────────────┐│
│ │  [Gráfico de linha: score médio por semana]   ││
│ └──────────────────────────────────────────────┘│
│                                                  │
│ ┌── Sazonalidade ──────────────────────────────┐│
│ │  Jan Fev Mar Abr Mai Jun Jul Ago Set Out Nov Dez ││
│ │  [Heatmap: performance_score por mês]         ││
│ │  🟢 Dezembro: Score 95 (MELHOR)               ││
│ │  🔴 Janeiro:  Score 20 (PIOR)                 ││
│ └──────────────────────────────────────────────┘│
│                                                  │
│ ┌── Histórico de Buscas ───────────────────────┐│
│ │  Data      │ Categoria │ Produtos │ Top Score ││
│ │  07/03     │ Eletron.  │ 42       │ 🟢 92    ││
│ │  06/03     │ Casa      │ 28       │ 🟡 71    ││
│ └──────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

### 9.4 Login Page

```
┌──────────────────────────────────────────┐
│                                          │
│            🔶 Shopee Product Hunter      │
│            Encontre oportunidades reais  │
│                                          │
│        ┌──────────────────────────┐      │
│        │ Email                    │      │
│        │ [____________________]   │      │
│        │                          │      │
│        │ Senha                    │      │
│        │ [____________________]   │      │
│        │                          │      │
│        │ [      Entrar        ]   │      │
│        │                          │      │
│        │ Não tem conta?           │      │
│        │ Criar conta grátis →     │      │
│        └──────────────────────────┘      │
│                                          │
│  Background: gradient slate-900→slate-800│
│  Card: bg-slate-800, rounded-xl, shadow  │
│  Logo: primary-500 icon + text           │
└──────────────────────────────────────────┘
```

### 9.5 Signup Page

```
┌──────────────────────────────────────────┐
│                                          │
│            🔶 Shopee Product Hunter      │
│            Comece a encontrar lucro real  │
│                                          │
│        ┌──────────────────────────┐      │
│        │ Email                    │      │
│        │ [____________________]   │      │
│        │                          │      │
│        │ Senha                    │      │
│        │ [____________________]   │      │
│        │                          │      │
│        │ Confirmar Senha          │      │
│        │ [____________________]   │      │
│        │                          │      │
│        │ Shopee Affiliate ID      │      │
│        │ [____________________]   │      │
│        │ (opcional - pode add dps)│      │
│        │                          │      │
│        │ [   Criar Conta      ]   │      │
│        │                          │      │
│        │ Já tem conta?            │      │
│        │ Fazer login →            │      │
│        └──────────────────────────┘      │
└──────────────────────────────────────────┘
```

---

## 10. FLUXO DE NAVEGAÇÃO

```
                    ┌──────────┐
                    │  LOGIN   │
                    └────┬─────┘
                         │ (auth)
               ┌─────────┴─────────┐
               │                    │
          ┌────▼─────┐        ┌────▼─────┐
          │ SIGNUP   │        │DASHBOARD │ ← Página principal
          └──────────┘        └────┬─────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
              ┌─────▼────┐  ┌─────▼────┐  ┌─────▼────┐
              │ PRODUCT  │  │ANALYTICS │  │SETTINGS  │
              │ DETAIL   │  │          │  │          │
              └────┬─────┘  └──────────┘  └──────────┘
                   │
            ┌──────┴──────┐
            │             │
      ┌─────▼────┐  ┌────▼─────┐
      │   ROI    │  │  COPY    │
      │CALCULATOR│  │  LINK    │
      └──────────┘  └──────────┘
```

### Navegação Principal (Sidebar)
1. **Dashboard** — `/dashboard` — Busca + Tabela de oportunidades
2. **Analytics** — `/analytics` — Histórico + Tendências + Sazonalidade
3. **Settings** — `/settings` — Affiliate ID, preferências, plano

### Navegação Secundária (Dentro das páginas)
- **Product Detail** — Modal slide-over (não é página separada)
- **ROI Calculator** — Modal dentro do Product Detail
- **Copy Link** — Action inline (toast de confirmação)

### Estados de Carregamento
```
Buscando:     Skeleton loader na tabela (pulse animation)
Analisando:   Progress bar com % + texto "Analisando com IA..."
Sem dados:    Empty state com ilustração + CTA "Fazer primeira busca"
Erro:         Toast vermelho + retry button
```

---

## 11. MOBILE RESPONSIVE

### Dashboard Mobile (< 768px)
```
┌──────────────────────┐
│ ☰ SPH         👤    │
├──────────────────────┤
│ KPI: 23 buscas       │
│ KPI: Score 72        │
│ KPI: ROI +180%       │
├──────────────────────┤
│ 🔍 Buscar...    [🔎] │
│ Categoria ▼  Preço ▼ │
├──────────────────────┤
│ ┌──────────────────┐ │
│ │ Fone BT    🟢 87 │ │
│ │ R$89  ROI:+250%  │ │
│ │ ↗ UP  LOW comp   │ │
│ │ [Detalhes]       │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ Capinha    🟢 76 │ │
│ │ R$29  ROI:+180%  │ │
│ │ → STB  MED comp  │ │
│ │ [Detalhes]       │ │
│ └──────────────────┘ │
├──────────────────────┤
│  📊    📈    ⚙️     │
└──────────────────────┘

  Tabela → Cards empilhados
  Sidebar → Bottom navigation (3 ícones)
  Filtros → Collapsible (toggle)
  Product Detail → Full screen modal
  ROI Calculator → Full screen modal
```

---

## 12. ESTADOS INTERATIVOS

### Loading States
```
Skeleton:    bg-slate-700, animate-pulse, rounded-md
Spinner:     border-2, border-primary-500, animate-spin
Progress:    h-2, bg-primary-500, transition-all, rounded-full
```

### Empty States
```
Sem resultados:
  Ícone: 🔍 (64px, text-slate-600)
  Título: "Nenhum produto encontrado"
  Subtítulo: "Tente ajustar os filtros ou buscar outra categoria"
  CTA: [Limpar Filtros]

Primeira vez:
  Ícone: 🚀 (64px, text-primary-500)
  Título: "Bem-vindo ao Product Hunter!"
  Subtítulo: "Faça sua primeira busca pra encontrar oportunidades"
  CTA: [Buscar Produtos]
```

### Toasts / Notifications
```
Sucesso:   bg-green-500/10, border-green-500, text-green-400
Info:      bg-blue-500/10, border-blue-500, text-blue-400
Warning:   bg-yellow-500/10, border-yellow-500, text-yellow-400
Error:     bg-red-500/10, border-red-500, text-red-400
Position:  bottom-right, max-w-400px, auto-dismiss 5s
```

---

## 13. ÍCONES

**Library:** Lucide React (open source, tree-shakeable)

```
Navegação:
  Dashboard:   LayoutDashboard
  Analytics:   TrendingUp
  Settings:    Settings

Ações:
  Buscar:      Search
  Copiar:      Copy
  Detalhes:    Eye
  Calculadora: Calculator
  Compartilhar: Share2
  Sair:        LogOut

Status:
  Trend UP:    ArrowUpRight
  Trend STABLE: ArrowRight
  Trend DOWN:  ArrowDownRight
  Score:       Target

Dados:
  Preço:       DollarSign
  Vendas:      ShoppingCart
  Comissão:    Percent
  Competição:  Users
```

---

## 14. TECH: SHADCN/UI + TAILWIND

### Shadcn/ui Setup
```bash
# Inicializar Shadcn
npx shadcn-ui@latest init

# Componentes que vamos usar:
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog        # Product Detail Modal
npx shadcn-ui@latest add dropdown-menu  # Actions menu
npx shadcn-ui@latest add select        # Categoria dropdown
npx shadcn-ui@latest add table         # Opportunity Table
npx shadcn-ui@latest add tabs          # Analytics tabs
npx shadcn-ui@latest add toast         # Notifications
npx shadcn-ui@latest add tooltip       # Info tooltips
npx shadcn-ui@latest add skeleton      # Loading states
npx shadcn-ui@latest add progress      # Score bars
npx shadcn-ui@latest add separator     # Dividers
npx shadcn-ui@latest add avatar        # User avatar
npx shadcn-ui@latest add sheet         # Mobile sidebar
```

### Shadcn Component Mapping
```
Nosso componente         → Shadcn base
─────────────────────────────────────
SearchBar               → Input + Select + Button
OpportunityTable        → Table + Badge + DropdownMenu
ProductDetailModal      → Dialog + Card + Progress + Tabs
ROICalculator           → Card + Input + Button
ROIScenarioCard         → Card + Separator + Badge
Sidebar                 → Sheet (mobile) + custom nav
ScorePill               → Badge (customizado)
StatCard                → Card + Progress
Loading states          → Skeleton
Notifications           → Toast
```

### Tailwind Config (com cores Shopee)

```typescript
// tailwind.config.ts
const config = {
  darkMode: 'class',
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Shopee Official Brand
        primary: {
          50: '#FEF2F0',
          100: '#FDE0DB',
          200: '#FCBFB3',
          300: '#FA9580',
          400: '#F6714F',
          500: '#EE4D2D',  // Shopee official #EE4D2D
          600: '#D63E20',
          700: '#B33019',
          800: '#912614',
          900: '#6E1D0F',
        },
        // Score status
        score: {
          green: '#22C55E',
          yellow: '#EAB308',
          red: '#EF4444',
        },
        // Shadcn/ui CSS variables (auto-configured)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### CSS Variables (globals.css) — Dark Theme

```css
@layer base {
  :root {
    --background: 222.2 84% 4.9%;      /* slate-950 */
    --foreground: 210 40% 98%;          /* slate-50 */
    --card: 217.2 32.6% 17.5%;         /* slate-800 */
    --card-foreground: 210 40% 98%;
    --primary: 14 86% 55%;             /* #EE4D2D Shopee */
    --primary-foreground: 0 0% 100%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 14 86% 55%;               /* Shopee orange ring */
    --radius: 0.5rem;
  }
}
```

---

## 15. ENTREGÁVEIS PARA @dev

### Shadcn Components (já prontos, só instalar)
| Shadcn Component | Comando | Usado em |
|-----------------|---------|----------|
| Button | `npx shadcn-ui add button` | CTAs, ações |
| Input | `npx shadcn-ui add input` | Forms, search |
| Badge | `npx shadcn-ui add badge` | Score pills, trends |
| Card | `npx shadcn-ui add card` | KPIs, ROI scenarios |
| Dialog | `npx shadcn-ui add dialog` | Product detail modal |
| Table | `npx shadcn-ui add table` | Opportunity table |
| Select | `npx shadcn-ui add select` | Categoria dropdown |
| Skeleton | `npx shadcn-ui add skeleton` | Loading states |
| Toast | `npx shadcn-ui add toast` | Notifications |
| Progress | `npx shadcn-ui add progress` | Score bars |
| Sheet | `npx shadcn-ui add sheet` | Mobile sidebar |
| Tabs | `npx shadcn-ui add tabs` | Analytics sections |

### Custom Components (a serem criados pelo @dev)
| Componente | Arquivo | Base Shadcn | Referência |
|-----------|---------|-------------|-----------|
| SearchBar | `components/SearchBar.tsx` | Input + Select + Button | Seção 7.1 |
| ProductCard | `components/ProductCard.tsx` | Card + Badge | Seção 7.2 |
| ROIScenarioCard | `components/ROIScenarioCard.tsx` | Card + Separator + Badge | Seção 7.3 |
| StatCard | `components/StatCard.tsx` | Card + Progress | Seção 7.4 |
| ScorePill | `components/ScorePill.tsx` | Badge (custom colors) | Seção 6.3 |
| TrendBadge | `components/TrendBadge.tsx` | Badge (custom + icon) | Seção 6.3 |
| Sidebar | `components/Sidebar.tsx` | Sheet (mobile) + nav | Seção 8.1 |
| OpportunityTable | `components/OpportunityTable.tsx` | Table + Badge + DropdownMenu | Seção 8.2 |
| ProductDetailModal | `components/ProductDetailModal.tsx` | Dialog + Card + Progress | Seção 8.3 |
| ROICalculator | `components/ROICalculator.tsx` | Card + Input + Button | Seção 8.4 |

### Pages
| Página | Arquivo | Referência |
|--------|---------|-----------|
| Dashboard | `/dashboard/page.tsx` | Seção 9.2 |
| Analytics | `/analytics/page.tsx` | Seção 9.3 |
| Login | `/login/page.tsx` | Seção 9.4 |
| Signup | `/signup/page.tsx` | Seção 9.5 |

### Config Files
| Arquivo | Conteúdo | Referência |
|---------|----------|-----------|
| `tailwind.config.ts` | Cores Shopee + Shadcn vars | Seção 14 |
| `app/globals.css` | CSS variables dark theme | Seção 14 |
| `components.json` | Shadcn config | Auto-gerado |

---

**Próximo:** @pm cria Epic e @sm cria Stories referenciando este design.

— Uma, desenhando com empatia 💝
