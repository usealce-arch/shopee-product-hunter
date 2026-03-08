# SHOPEE PRODUCT HUNTER — ARQUITETURA TÉCNICA

**Versão:** 2.0 (Enterprise)
**Data:** 07/03/2026
**Status:** 🎯 Arquitetura robusta para análise inteligente de ROI

---

## VISÃO GERAL

Sistema inteligente que identifica oportunidades REAIS de lucro para afiliados Shopee:

- **Não é:** "Aqui está um produto rentável"
- **É:** "Invista R$100 em anúncio neste produto e ganhe R$350 de lucro REAL"

---

## 1. ARQUITETURA HIGH-LEVEL

```
┌─────────────────────────────────────────────────────────────────┐
│                        VERCEL (Deploy)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────┐    ┌──────────────────────────┐   │
│  │  Next.js 14 Frontend     │    │  Next.js API Routes      │   │
│  │  (Dashboard de Análise)  │───▶│  (Intelligence Engine)   │   │
│  │  - Product search        │    │  - Apify orchestration   │   │
│  │  - ROI calculator UI     │    │  - Gemini deep analysis  │   │
│  │  - Analytics & trends    │    │  - Scoring algorithm     │   │
│  └──────────────────────────┘    └──────────────────────────┘   │
│                ▲                           │                      │
│                │                           ▼                      │
│                │       ┌──────────────────────────┐              │
│                └───────│  Supabase PostgreSQL     │              │
│                        │  (Analytics DB)          │              │
│                        └──────────────────────────┘              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
         ▲                  │
         │                  ▼
    ┌────────────┐    ┌──────────────────┐
    │ Apify API  │    │  Gemini API      │
    │ (Scraping) │    │ (Deep Analysis)  │
    └────────────┘    └──────────────────┘
```

---

## 2. COMPONENTES TÉCNICOS

### 2.1 Frontend (Next.js 14 + React)

**Páginas principais:**

1. **Dashboard de Oportunidades** (`/dashboard/page.tsx`)
   - Lista de produtos com SCORE de oportunidade (0-100)
   - Status visual: 🟢 (75+), 🟡 (50-74), 🔴 (<50)
   - ROI estimado por produto
   - Filtros: ROI mínimo, tendência, competição, sazonalidade

2. **Detalhes de Produto** (`/product/[id]/page.tsx`)
   - Análise profunda (Gemini insights)
   - Histórico 30 dias: preço, vendas, competição
   - Gráficos (Recharts): tendência, sazonalidade
   - Recomendação de ad spend

3. **ROI Calculator** (componente)
   - Input: montante de anúncio (R$100, R$500, R$1000)
   - Output: conversões esperadas, revenue, lucro líquido
   - Cenários múltiplos lado a lado

4. **Analytics & Performance** (`/analytics/page.tsx`)
   - Histórico de ROI real vs previsão
   - Tendências de mercado
   - Padrões sazonais por mês

### 2.2 Backend (Next.js API Routes)

**Core Services:**

1. **Apify Orchestrator** (`lib/apify.ts`)
   - `initializeScraping(category, maxPrice)` - scrape em tempo real
   - `checkScrapingStatus(jobId)` - poll status
   - `processScrapingResults(data)` - normalização de dados

2. **Gemini Deep Analysis** (`lib/gemini.ts`)
   - `analyzeProductDeep(product)` - análise completa
   - Calcula: rentabilidade, tendência, competição, sazonalidade
   - Retorna: score (0-100) + recomendação de ad spend

3. **Scoring Algorithm** (`lib/scoring.ts`)
   - Multi-fatorial: Score = (Rent×0.35) + (Trend×0.25) + (Comp×0.20) + (Season×0.10) + (History×0.10)
   - Validação: score ≥ 0 e ≤ 100
   - Output: oportunidades ordenadas por score

4. **Historical Tracker** (background jobs)
   - Snapshots diários em `products_history`
   - Detecção de tendências: UP / STABLE / DOWN
   - Cálculo de sazonalidade (melhor mês para vender)

### 2.3 Database (Supabase PostgreSQL)

**9 tabelas para análise robusta:**

1. **users** - Dados básicos de usuários
2. **searches** - Histórico de buscas por usuário
3. **products_current** - Snapshot atual com scores
4. **products_history** - Série temporal (30 dias)
5. **competitor_tracking** - Número de afiliados por produto
6. **roi_estimates** - Previsões do sistema
7. **roi_actuals** - Resultados reais reportados
8. **seasonal_patterns** - Performance por mês
9. **search_results** - Resultados de cada busca

*Detalhes completos em DATABASE_SCHEMA.md*

---

## 3. FLUXO END-TO-END

```
1. USER SEARCH
   └─ "Eletrônicos, até R$200"

2. APIFY REAL-TIME SCRAPE
   └─ Coleta: nome, preço, rating, vendas/mês

3. GEMINI DEEP ANALYSIS (por produto)
   ├─ Rentabilidade = (comissão × vendas × conversão) / ad_spend
   ├─ Tendência = velocity (crescendo?)
   ├─ Competição = saturation (quantos afiliados?)
   ├─ Sazonalidade = score por mês
   └─ Score final = weighted sum

4. HISTÓRICO & DETECÇÃO
   ├─ Salva em products_history (série temporal)
   ├─ Compara com dados anteriores
   └─ Refina modelo com dados reais

5. DASHBOARD MOSTRA
   ┌─────────────────────────┐
   │ Fone Bluetooth - R$89   │
   │ 🟢 Score: 87/100        │
   │ 🟢 ROI: +250%           │
   │ 🟢 Tendência: ↗ Subindo │
   │ 💰 Invest R$100→Lucro R$350 │
   │ [Calculadora][Detalhes] │
   └─────────────────────────┘

6. USER REPORTS ACTUAL RESULTS
   └─ "Investi R$500, ganhei R$2000"
   └─ Sistema refina modelo
```

---

## 4. ALGORITMO DE SCORING (Multi-fatorial)

```
Score (0-100) =
    (Rentabilidade × 0.35) +
    (Tendência × 0.25) +
    (Competição × 0.20) +
    (Sazonalidade × 0.10) +
    (HistoricoPerformance × 0.10)

Dimensões:
- Rentabilidade: (comissão × vendas/mês × taxa_conversão) / custo_anúncio
- Tendência: Comparação 30-7 dias (está crescendo?)
- Competição: 100 - (affiliate_count / 1000 * 100)
- Sazonalidade: Performance no mês atual vs histórico
- Histórico: Taxa de sucesso anterior (refina com roi_actuals)

Resultado:
- 🟢 75-100: MUITO BOM (invista)
- 🟡 50-74: OK (avalie bem)
- 🔴 0-49: RUIM (evite)
```

---

## 5. TECH STACK

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | Next.js 14 + TypeScript + Tailwind CSS + React Query |
| **Backend** | Next.js API Routes + Node.js |
| **Database** | Supabase PostgreSQL (tabelas + índices + RLS) |
| **Scraping** | Apify REST API |
| **IA** | Gemini API (análise + scoring) |
| **Deploy** | Vercel (serverless) |
| **Monitoring** | Sentry (error tracking) |

---

## 6. DECISÕES ARQUITETURAIS

### Por que Supabase PostgreSQL (não SQLite)?
- **Time-series data:** Histórico 30 dias precisa série temporal, SQLite é limitado
- **Row Level Security:** RLS para isolamento de usuários é nativo do PostgreSQL
- **Partitioning:** Tabela products_history particionada por ano (performance)
- **Índices avançados:** GiST, BRIN para queries de tendência
- **Escala:** Múltiplos usuários simultâneos

### Por que Apify?
- Scraping em tempo real com retry automático
- Suporta rate limiting e proxy
- Job queue para processos assincronos
- Caching de resultados (24h)

### Por que Gemini?
- Análise contextual profunda
- Compreende domínio de e-commerce
- Custo eficiente ($0.075/1K input tokens)
- Modelo robusto para scoring

### Por que Vercel?
- Next.js é nativo no Vercel
- Deploy automático via Git
- Funções serverless com cold start <100ms
- Environment variables gerenciadas

---

## 7. SEGURANÇA & PERFORMANCE

**Segurança:**
- JWT tokens via Supabase Auth
- RLS policies por usuário
- CORS configurado
- Input validation com Zod
- No hardcoded secrets

**Performance:**
- Cache no frontend com React Query
- Índices em products_history, roi_estimates, products_current
- Pagination em listagens
- Lazy loading de gráficos
- Lighthouse target: >85

---

## 8. PRÓXIMAS FASES (Roadmap)

| Fase | Timeline | Escopo |
|------|----------|--------|
| MVP Robusto | 6 semanas | Core: search + análise + ROI tracking |
| Mobile App | Month 2-3 | React Native wrapper |
| Integrações | Month 3-4 | TikTok Shop, Instagram Shop |
| AI Coaching | Month 4-6 | Recomendações personalizadas |
| Marketplace | Month 6+ | Templates e estratégias compartilhadas |

---

**Referências:**
- Database schema: `DATABASE_SCHEMA.md`
- Implementation tasks: `IMPLEMENTATION_PLAN.md`
- PRD: `PRD.md`

— Aria, arquitetando o futuro 🏗️
