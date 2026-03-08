# SHOPEE PRODUCT HUNTER — WORKFLOW DE ORQUESTRAÇÃO

**Objetivo:** Delivery completo e publicado em produção
**Coordenação:** Multi-agente AIOS
**Status:** 🎯 Pronto para execução

---

## TIMELINE ATUALIZADO

```
FASE 0        FASE 1          FASE 1.5         FASE 2
┌──────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
│ Infra    │→ │ UX DESIGN  │→ │ PM + SM    │→ │ Database   │
│ Setup    │  │ @ux-design │  │ Epic +     │  │ Setup      │
│ @devops  │  │ Wireframes │  │ Stories    │  │ @dev+@devops│
│ 1 dia    │  │ 1 semana   │  │ @pm + @sm  │  │ 1 semana   │
└──────────┘  └────────────┘  │ 1 dia      │  └────────────┘
                              └────────────┘        ↓
                                                FASE 3
              FASE 6           FASE 5        ┌────────────┐
           ┌────────────┐  ┌────────────┐    │ Backend    │
           │ QA + Deploy│← │ Intelligence│←  │ APIs       │
           │ @qa+@devops│  │ & Tracking │    │ @dev + @qa │
           │ 1 semana   │  │ @dev + @qa │    │ 1 semana   │
           └────────────┘  └────────────┘    └────────────┘
                 ↓                ↑                ↓
            🚀 LAUNCH        FASE 5          FASE 4
                           ┌────────────┐  ┌────────────┐
                           │ Intelligence│← │ Frontend   │
                           │ & Tracking │  │ Dashboard  │
                           │ @dev + @qa │  │ @dev (segue│
                           │ 1 semana   │  │ design Uma)│
                           └────────────┘  └────────────┘
```

---

## FASE 0: INFRA SETUP (1 dia)

**Responsável:** @devops (Gage)

- [ ] Configurar Vercel + GitHub
- [ ] Configurar environment variables
- [ ] Verificar acesso Supabase

**Gate:** Infrastructure pronta ✅

---

## FASE 1: UX DESIGN (1 semana)

**Responsável:** @ux-design-expert (Uma)

*Detalhes abaixo na seção Fase 1.*

**Gate:** Design system + wireframes aprovados pelo Douglas ✅

---

## FASE 1.5: EPIC + STORIES (1 dia)

**Responsável:** @pm (Morgan) + @sm (River)

- [ ] @pm: Criar Epic baseado em PRD.md + wireframes da Uma
- [ ] @sm: Criar stories semanais (Fases 2-6) referenciando os wireframes
- [ ] @pm: Gate decision — aprovar stories

**Por que DEPOIS do design:**
- Stories referenciam wireframes específicos ("implementar conforme wireframe 1.2")
- Acceptance criteria incluem elementos visuais do design
- @dev sabe EXATAMENTE o que construir

**Gate:** Epic criado, stories aprovadas ✅

---

## FASE 1: UX DESIGN (1 semana) ← NOVA PRIMEIRA FASE

**Responsável:** @ux-design-expert (Uma)

### Entregáveis:

#### 1.1 Design System
- [ ] Paleta de cores (dark theme preferencial)
- [ ] Tipografia (fontes, tamanhos, hierarquia)
- [ ] Componentes base (botões, cards, inputs, modals)
- [ ] Ícones e iconografia
- [ ] Espaçamento e grid (8px base)

#### 1.2 Wireframes — Dashboard de Oportunidades
- [ ] Layout da página principal
- [ ] Tabela de produtos (colunas: Nome, Preço, ROI, Score, Tendência, Ação)
- [ ] Indicadores visuais (🟢🟡🔴 por score)
- [ ] Filtros (categoria, preço, ROI mínimo)
- [ ] Search bar + loading states
- [ ] Empty states

#### 1.3 Wireframes — Detalhes do Produto
- [ ] Modal/página de detalhes
- [ ] Gráficos de histórico (preço 30 dias, vendas, competição)
- [ ] Score breakdown visual
- [ ] Recomendação de ad spend
- [ ] Botões de ação (Copiar Link, Calculadora)

#### 1.4 Wireframes — ROI Calculator
- [ ] Input de valor de investimento
- [ ] Output: conversões, revenue, lucro
- [ ] Cenários lado a lado (R$100 vs R$500 vs R$1000)
- [ ] Visual de comparação

#### 1.5 Wireframes — Analytics & Performance
- [ ] Página de histórico de buscas
- [ ] ROI real vs previsão (gráfico comparativo)
- [ ] Tendências de mercado
- [ ] Padrões sazonais por mês

#### 1.6 Wireframes — Auth Pages
- [ ] Login page
- [ ] Signup page
- [ ] Onboarding (affiliate ID)

#### 1.7 Mobile Responsive
- [ ] Dashboard mobile
- [ ] Product detail mobile
- [ ] Calculator mobile
- [ ] Navigation mobile (bottom bar ou hamburger)

#### 1.8 Fluxo de Navegação
- [ ] User flow completo: Login → Dashboard → Search → Results → Detail → Calculator → Analytics
- [ ] Mapa de navegação entre páginas
- [ ] Interações e transições

**Gate:** Design system + wireframes aprovados pelo Douglas ✅

---

## FASE 2: DATABASE FOUNDATION (1 semana)

**Responsável:** @dev + @devops

- [ ] Executar migrations SQL (DATABASE_SCHEMA.md)
- [ ] Verificar RLS policies
- [ ] Criar script: `scripts/seed-historical-data.ts`
- [ ] Seed 30 dias de histórico
- [ ] Testar conexão

**Gate:** BD com 9 tabelas criadas, histórico base carregado ✅

---

## FASE 3: BACKEND APIs (1 semana)

**Responsável:** @dev + @qa

### 3.1 Auth System
- [ ] Supabase Auth integration (`lib/db.ts`, `lib/auth.ts`)
- [ ] `/api/auth/signup`, `/api/auth/login`, `/api/auth/logout`
- [ ] JWT middleware + Zod validation

### 3.2 User Management
- [ ] `GET /api/user/profile`
- [ ] `POST /api/user/affiliate-id`

### 3.3 Apify Integration
- [ ] `lib/apify.ts` (scraping orchestration)
- [ ] Historical tracking (products_history, competitor_tracking)

### 3.4 Gemini Analysis
- [ ] `lib/gemini.ts` (deep analysis + scoring)
- [ ] ROI estimates salvos em BD

### 3.5 Search API
- [ ] `POST /api/products/search`
- [ ] `GET /api/products/search/:id` (polling)

**Gate:** APIs respondendo, auth funcional, Apify + Gemini integrados ✅

---

## FASE 4: FRONTEND DASHBOARD (1 semana)

**Responsável:** @dev (seguindo wireframes da Uma)

- [ ] Auth pages (login, signup) — conforme design
- [ ] Dashboard page — conforme wireframe 1.2
- [ ] OpportunityTable.tsx — conforme wireframe 1.2
- [ ] ProductDetailModal.tsx — conforme wireframe 1.3
- [ ] ROICalculator.tsx — conforme wireframe 1.4
- [ ] Loading states, error handling
- [ ] Mobile responsive — conforme wireframe 1.7

**Gate:** Dashboard funcional seguindo design da Uma ✅

---

## FASE 5: INTELLIGENCE & TRACKING (1 semana)

**Responsável:** @dev + @qa

- [ ] `lib/seasonality.ts` (detecção de padrões)
- [ ] `POST /api/roi/actual` (ROI tracking)
- [ ] `/analytics/page.tsx` — conforme wireframe 1.5
- [ ] Background jobs (model refinement)
- [ ] Gráficos (Recharts) — conforme design

**Gate:** Tracking funcionando, analytics completa ✅

---

## FASE 6: QA & DEPLOYMENT (1 semana)

**Responsável:** @qa + @devops

- [ ] E2E tests (Signup → Search → ROI → Analytics)
- [ ] Security audit (CORS, JWT, RLS, sanitization)
- [ ] Performance: Lighthouse >85, FCP <2s
- [ ] Mobile testing
- [ ] Deploy to Vercel (production)
- [ ] Setup Sentry monitoring
- [ ] Smoke tests in production
- [ ] 24h monitoring

**Gate:** LAUNCH ✅ 🚀

---

## AGENT RESPONSIBILITIES

| Agente | Fase | Papel |
|--------|------|-------|
| **@pm (Morgan)** | 0 | Epic, gate decisions |
| **@ux-design-expert (Uma)** | 1 | Design system, wireframes, UX review |
| **@sm (River)** | 0-1 | Stories semanais |
| **@dev (Dex)** | 2-5 | 80% do código |
| **@qa (Quinn)** | 3-6 | Security, tests, gate approvals |
| **@devops (Gage)** | 0, 2, 6 | Infra, deploy, monitoring |
| **@architect (Aria)** | Consultoria | Decisões técnicas quando necessário |

---

## SEQUÊNCIA DE EXECUÇÃO DOS AGENTES

```
1. @devops → Infra setup (Fase 0)
2. @ux     → DESIGN completo (Fase 1) ← PRÓXIMO PASSO
3. @pm     → Cria Epic com base no design (Fase 1.5)
4. @sm     → Cria Stories referenciando wireframes (Fase 1.5)
5. @dev    → Implementa (Fases 2-5)
6. @qa     → Revisa (Fases 3-6)
7. @devops → Deploya (Fase 6)
8. 🚀     → LAUNCH
```

---

## TOKENS SECURED ✅

| Token | Valor | Agent |
|-------|-------|-------|
| Vercel | `[CONFIGURED IN VERCEL]` | @devops |
| GitHub | `[CONFIGURED IN GH CLI]` | @devops |
| Supabase URL | `[SEE .env.local]` | @devops |
| Supabase Anon | `[SEE .env.local]` | @devops |
| Supabase Secret | `[SEE .env.local]` | @devops |
| Apify | `[SEE .env.local]` | @dev |
| Gemini API | Pendente | @dev |

---

**Status:** 🟢 Pronto — Próximo: chamar @ux-design-expert (Uma)

— Aria, workflow redesenhado 🏗️
