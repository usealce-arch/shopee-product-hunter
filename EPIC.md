# EPIC: SHOPEE PRODUCT HUNTER — MVP ROBUSTO

**Epic ID:** SPH-EPIC-001
**Título:** Delivery Completo do Shopee Product Hunter — Do Zero ao Deploy em Produção
**Criado por:** Morgan (@pm)
**Data:** 07/03/2026
**Status:** Em Execução
**Prioridade:** CRITICAL

---

## RESUMO EXECUTIVO

SaaS de análise inteligente para afiliados Shopee. Transforma "eu acho que esse produto vende" em "invista R$100 e ganhe R$350 de lucro REAL" com dados concretos, scoring multi-fatorial e tracking de ROI.

**Entrega final:** Aplicação publicada em produção no Vercel, funcional end-to-end.

---

## REFERÊNCIAS

| Documento | Localização |
|-----------|-------------|
| PRD | `PRD.md` |
| Arquitetura | `ARCHITECTURE.md` |
| Database Schema | `DATABASE_SCHEMA.md` |
| Design System | `DESIGN_SYSTEM.md` |
| Plano de Implementação | `IMPLEMENTATION_PLAN.md` |
| Workflow de Orquestração | `WORKFLOW_EXECUTION.md` |

---

## TECH STACK

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS + Shadcn/ui |
| UI Components | Shadcn/ui (Radix primitives) + Lucide React icons |
| Charts | Recharts |
| Backend | Next.js API Routes + Node.js |
| Database | Supabase PostgreSQL (9 tabelas + RLS) |
| Auth | Supabase Auth (JWT) |
| Scraping | Apify REST API |
| IA/Analysis | Gemini API |
| Deploy | Vercel (serverless) |
| Monitoring | Sentry |
| Design | Dark theme, cores Shopee (#EE4D2D), Inter + JetBrains Mono |

---

## FASES E STORIES

### FASE 0: INFRA SETUP
**Responsável:** @devops (Gage)
**Esforço estimado:** 1 dia
**Gate:** Infraestrutura pronta

**Story 0.1 — Setup de Infraestrutura e Ambiente**
- Criar projeto Next.js 14 com TypeScript
- Configurar Tailwind CSS + Shadcn/ui (conforme DESIGN_SYSTEM.md seção 15)
- Instalar componentes Shadcn: button, input, badge, card, dialog, dropdown-menu, select, table, tabs, toast, tooltip, skeleton, progress, separator, avatar, sheet
- Configurar fontes Inter + JetBrains Mono
- Configurar Vercel project + GitHub repo
- Criar `.env.local` com todos os tokens (Supabase, Apify, Gemini)
- Configurar environment variables no Vercel
- Verificar acesso Supabase
- Criar tailwind.config.ts com tema Shopee (cores, fontes, CSS variables do DESIGN_SYSTEM.md seção 15)

**Acceptance Criteria:**
- [ ] `npm run dev` roda sem erros
- [ ] Shadcn/ui instalado e funcional
- [ ] Tema dark com cores Shopee (#EE4D2D) configurado
- [ ] Deploy preview funcional no Vercel
- [ ] Todas as env vars configuradas

---

### FASE 1: UX DESIGN (CONCLUÍDA)
**Responsável:** @ux-design-expert (Uma)
**Status:** APROVADO pelo Douglas

**Entregáveis aprovados:**
- DESIGN_SYSTEM.md completo (15 seções)
- Paleta de cores Shopee (#EE4D2D)
- Tipografia (Inter + JetBrains Mono)
- Componentes atômicos, moleculares e organismos
- Templates de página (Dashboard, Analytics, Login, Signup)
- Wireframes desktop + mobile
- Fluxo de navegação completo
- Configuração Tailwind + Shadcn/ui

**Gate:** Design aprovado pelo Douglas

---

### FASE 2: DATABASE FOUNDATION
**Responsável:** @dev (Dex) + @devops (Gage)
**Esforço estimado:** 1 semana (40h)
**Gate:** BD com 9 tabelas criadas, histórico base carregado
**Referência:** DATABASE_SCHEMA.md (migration script completo)

**Story 2.1 — Setup do Banco de Dados Supabase**
- Executar migration SQL completo de DATABASE_SCHEMA.md no Supabase SQL Editor
- Criar todas as 9 tabelas: users, searches, products_current, products_history, competitor_tracking, roi_estimates, roi_actuals, seasonal_patterns, search_results
- Configurar todos os índices de performance
- Ativar RLS policies por usuário
- Testar conexão via Supabase client

**Acceptance Criteria:**
- [ ] 9 tabelas criadas no Supabase
- [ ] Índices criados e verificados
- [ ] RLS policies ativas e testadas
- [ ] Conexão testada via `lib/db.ts`

**Story 2.2 — Seed de Dados Históricos**
- Criar script `scripts/seed-historical-data.ts`
- Simular 30 dias de dados em products_history
- Popular competitor_tracking com dados simulados
- Verificar integridade dos dados no BD

**Acceptance Criteria:**
- [ ] Script de seed funcional
- [ ] 30 dias de histórico simulado carregado
- [ ] Dados de competição populados
- [ ] Queries de verificação passam

---

### FASE 3: BACKEND APIs
**Responsável:** @dev (Dex)
**Esforço estimado:** 2 semanas (110h — Semanas 2+3 do IMPLEMENTATION_PLAN)
**Gate:** APIs respondendo, auth funcional, Apify + Gemini integrados
**Referência:** ARCHITECTURE.md seções 2.2, 3, 4

**Story 3.1 — Auth System (Supabase Auth)**
- Criar `lib/db.ts` (Supabase client)
- Criar `lib/auth.ts` (JWT helpers + middleware)
- Implementar `POST /api/auth/signup`
- Implementar `POST /api/auth/login`
- Implementar `POST /api/auth/logout`
- Zod validation em todos os endpoints
- Middleware JWT para rotas protegidas

**Acceptance Criteria:**
- [ ] Signup cria usuário no Supabase Auth + tabela users
- [ ] Login retorna JWT válido
- [ ] Logout invalida sessão
- [ ] Middleware bloqueia acesso sem JWT
- [ ] Validation com Zod em todos os inputs

**Story 3.2 — User Management API**
- Implementar `GET /api/user/profile` (dados do usuário logado)
- Implementar `POST /api/user/affiliate-id` (salvar Affiliate ID Shopee)
- JWT middleware aplicado
- Zod validation

**Acceptance Criteria:**
- [ ] Profile retorna dados do usuário autenticado
- [ ] Affiliate ID salvo e recuperável
- [ ] Endpoints protegidos por JWT

**Story 3.3 — Apify Integration (Scraping)**
- Criar `lib/apify.ts`
- Implementar `initializeScraping(category, maxPrice)` — inicia job no Apify
- Implementar `checkScrapingStatus(jobId)` — polling do job
- Implementar `processScrapingResults(data)` — normalização dos dados
- Salvar snapshots em products_history
- Salvar competição em competitor_tracking
- Detectar tendências (UP/STABLE/DOWN)

**Acceptance Criteria:**
- [ ] Apify scraping inicia e retorna jobId
- [ ] Polling funcional até conclusão
- [ ] Dados normalizados e salvos em products_current
- [ ] Histórico salvo em products_history
- [ ] Competição rastreada em competitor_tracking

**Story 3.4 — Gemini Deep Analysis**
- Criar `lib/gemini.ts`
- Implementar `analyzeProductDeep(product)` — análise completa
- Implementar scoring algorithm (ARCHITECTURE.md seção 4):
  - Score = (Rentabilidade x 0.35) + (Tendência x 0.25) + (Competição x 0.20) + (Sazonalidade x 0.10) + (Histórico x 0.10)
- Salvar ROI estimates em roi_estimates
- Retornar recomendação de ad spend

**Acceptance Criteria:**
- [ ] Gemini retorna análise estruturada por produto
- [ ] Score calculado corretamente (0-100)
- [ ] ROI estimates salvos no BD
- [ ] Recomendação de ad spend gerada

**Story 3.5 — Search Orchestration API**
- Implementar `POST /api/products/search` — inicia busca (Apify → Gemini → BD)
- Implementar `GET /api/products/search/:id` — polling de resultado
- Implementar `GET /api/products/current` — lista com scores, paginação, ordenação
- Implementar `GET /api/products/current/:id` — detalhes profundos

**Acceptance Criteria:**
- [ ] Search inicia pipeline Apify → Gemini → BD
- [ ] Polling retorna status + resultados quando pronto
- [ ] Listagem com paginação e ordenação por score
- [ ] Detalhes incluem histórico + análise Gemini

---

### FASE 4: FRONTEND DASHBOARD
**Responsável:** @dev (Dex)
**Esforço estimado:** 1 semana (50h)
**Gate:** Dashboard funcional seguindo DESIGN_SYSTEM.md
**Referência:** DESIGN_SYSTEM.md (TODAS as seções)

**Story 4.1 — Auth Pages (Login + Signup)**
- Implementar `/login/page.tsx` — conforme DESIGN_SYSTEM.md seção 11 (Login Template)
- Implementar `/signup/page.tsx` — conforme DESIGN_SYSTEM.md seção 11 (Signup Template)
- Integrar com Supabase Auth
- Proteção de rotas (redirect se não autenticado)
- Shadcn/ui: Input, Button, Card
- Cores Shopee (#EE4D2D) no botão principal

**Acceptance Criteria:**
- [ ] Login funcional com email/senha
- [ ] Signup funcional com criação de conta
- [ ] Redirect para /dashboard após login
- [ ] Visual conforme DESIGN_SYSTEM.md (dark theme, cores Shopee)

**Story 4.2 — App Shell (Sidebar + Layout)**
- Implementar layout principal com Sidebar — conforme DESIGN_SYSTEM.md seção 9 (Sidebar) e seção 11 (App Shell Template)
- Logo Shopee Product Hunter
- Navegação: Dashboard, Analytics, Settings
- Avatar do usuário
- Mobile: Sheet como sidebar (DESIGN_SYSTEM.md seção 12)
- Shadcn/ui: Sheet, Avatar, Separator, Tooltip

**Acceptance Criteria:**
- [ ] Sidebar funcional com navegação
- [ ] Mobile: hamburger menu com Sheet
- [ ] Avatar do usuário com iniciais
- [ ] Active state nos links de navegação

**Story 4.3 — Dashboard de Oportunidades**
- Implementar `/dashboard/page.tsx` — conforme DESIGN_SYSTEM.md seção 11 (Dashboard Template)
- SearchBar molecule (DESIGN_SYSTEM.md seção 8) — busca por categoria + filtros
- StatCards row — Total Produtos, Score Médio, Melhor ROI, Tendência
- OpportunityTable organism (DESIGN_SYSTEM.md seção 9) — tabela com:
  - Colunas: Produto, Preço, Score (pill colorida), ROI, Tendência (seta), Ação
  - Score pills: verde (75+), amarelo (50-74), vermelho (<50)
  - Tendência: setas coloridas (UP verde, STABLE cinza, DOWN vermelho)
  - Shadcn/ui: Table, Badge, Button, Skeleton
- Loading states com Skeleton
- Empty state quando sem resultados
- Polling logic para busca em andamento

**Acceptance Criteria:**
- [ ] Busca por categoria funcional
- [ ] Tabela de oportunidades com score visual
- [ ] Filtros funcionais (categoria, preço, ROI mínimo)
- [ ] Loading states com Skeleton
- [ ] Empty state amigável
- [ ] Score pills com cores corretas (verde/amarelo/vermelho)

**Story 4.4 — Product Detail Panel**
- Implementar ProductDetailPanel organism — conforme DESIGN_SYSTEM.md seção 9
- Modal ou slide panel com detalhes do produto
- Gráficos Recharts: histórico de preço (30 dias), vendas, competição
- Score breakdown visual (barras por dimensão)
- Recomendação de ad spend
- Botões: Copiar Link Afiliado, Abrir Calculadora
- Shadcn/ui: Dialog, Tabs, Progress, Badge

**Acceptance Criteria:**
- [ ] Panel abre com dados do produto selecionado
- [ ] Gráfico de histórico de preço funcional (Recharts)
- [ ] Score breakdown por dimensão
- [ ] Botão de copiar link funcional
- [ ] Visual conforme DESIGN_SYSTEM.md

**Story 4.5 — ROI Calculator**
- Implementar ROICalculatorPanel organism — conforme DESIGN_SYSTEM.md seção 9
- ROIScenarioCards (DESIGN_SYSTEM.md seção 8) — 3 cenários lado a lado:
  - R$100 → conversões, revenue, lucro
  - R$500 → conversões, revenue, lucro
  - R$1000 → conversões, revenue, lucro
- Input customizável de valor de investimento
- Breakdown visual: custo → conversões → revenue → lucro
- Shadcn/ui: Card, Input, Badge

**Acceptance Criteria:**
- [ ] 3 cenários pré-definidos exibidos
- [ ] Input customizável funcional
- [ ] Breakdown completo por cenário
- [ ] Visual conforme DESIGN_SYSTEM.md (cards com borda Shopee)

**Story 4.6 — Mobile Responsive**
- Aplicar responsividade em TODAS as páginas — conforme DESIGN_SYSTEM.md seção 12
- Sidebar → Sheet (hamburger menu)
- Tabela → Cards empilhados no mobile
- Gráficos redimensionáveis
- Touch-friendly (min tap target 44px)
- Breakpoints: sm (640px), md (768px), lg (1024px)

**Acceptance Criteria:**
- [ ] Dashboard funcional em tela 375px (iPhone SE)
- [ ] Sidebar vira Sheet no mobile
- [ ] Tabela vira cards no mobile
- [ ] Sem scroll horizontal indesejado
- [ ] Tap targets >= 44px

---

### FASE 5: INTELLIGENCE & TRACKING
**Responsável:** @dev (Dex)
**Esforço estimado:** 1 semana (40h)
**Gate:** Tracking funcionando, analytics completa
**Referência:** ARCHITECTURE.md seções 2.2, PRD.md seções 4.5-4.7

**Story 5.1 — Seasonal Pattern Detection**
- Criar `lib/seasonality.ts`
- Analisar products_history por mês
- Implementar `GET /api/analysis/seasonal/:productId`
- Identificar melhor mês pra vender cada produto

**Acceptance Criteria:**
- [ ] Padrões sazonais detectados por produto
- [ ] API retorna dados de sazonalidade
- [ ] Dados salvos em seasonal_patterns

**Story 5.2 — ROI Tracking System**
- Implementar `POST /api/roi/actual` — usuário reporta resultado real
- Comparar previsão vs realidade
- Background job para refinar modelo com dados reais
- Salvar em roi_actuals

**Acceptance Criteria:**
- [ ] Usuário pode reportar ROI real
- [ ] Comparação previsão vs realidade calculada
- [ ] Dados salvos em roi_actuals
- [ ] Modelo refinado com feedback

**Story 5.3 — Analytics Page**
- Implementar `/analytics/page.tsx` — conforme DESIGN_SYSTEM.md seção 11 (Analytics Template)
- Histórico de buscas do usuário
- ROI real vs previsto (gráfico comparativo — Recharts)
- Tendências de mercado
- Padrões sazonais por mês
- StatCards com métricas gerais
- Shadcn/ui: Card, Tabs, Table

**Acceptance Criteria:**
- [ ] Página analytics funcional
- [ ] Gráfico ROI real vs previsto
- [ ] Tendências de mercado exibidas
- [ ] Visual conforme DESIGN_SYSTEM.md

---

### FASE 6: QA & DEPLOYMENT
**Responsável:** @qa (Quinn) + @devops (Gage)
**Esforço estimado:** 1 semana (40h)
**Gate:** LAUNCH

**Story 6.1 — QA: Testing & Security Review**
- E2E test: Signup → Login → Search → Results → ROI Calculator → Analytics
- Security audit: CORS, JWT, RLS, input sanitization
- Performance: Lighthouse >85, FCP <2s, bundle <150KB
- Mobile testing em diferentes viewports
- Error scenarios: Apify fail, Gemini timeout, network error

**Acceptance Criteria:**
- [ ] E2E flow completo passando
- [ ] Sem vulnerabilidades de segurança (CORS, JWT, XSS, SQL injection)
- [ ] Lighthouse score >85
- [ ] FCP <2s
- [ ] Mobile funcional em 375px, 768px, 1024px

**Story 6.2 — Deploy & Launch**
- Deploy to Vercel (production)
- Configurar environment variables de produção
- Setup Sentry monitoring
- Smoke tests em produção
- 24h de monitoramento
- Verificar performance em produção
- Documentar URL final

**Acceptance Criteria:**
- [ ] App deployado e acessível em produção
- [ ] Sentry capturando erros
- [ ] Smoke tests passando
- [ ] 24h sem erros críticos
- [ ] Performance em produção conforme targets

---

## SEQUÊNCIA DE EXECUÇÃO

```
FASE 0 → Story 0.1 (Infra)                          @devops
FASE 1 → CONCLUÍDA (Design aprovado)                 @ux
FASE 2 → Stories 2.1, 2.2 (Database)                 @dev + @devops
FASE 3 → Stories 3.1-3.5 (Backend)                   @dev
FASE 4 → Stories 4.1-4.6 (Frontend)                  @dev
FASE 5 → Stories 5.1-5.3 (Intelligence)              @dev
FASE 6 → Stories 6.1, 6.2 (QA + Deploy)              @qa + @devops
         → LAUNCH
```

**Total: 17 stories | ~280h estimadas | 6 semanas**

---

## TOKENS DISPONÍVEIS

| Token | Valor |
|-------|-------|
| Vercel | Configurado |
| GitHub | Configurado |
| Supabase URL | `https://ddotdwcmpbhlkmhrrlxf.supabase.co` |
| Supabase Anon Key | Configurado |
| Supabase Service Key | Configurado |
| Apify API | Configurado |
| Gemini API | Pendente |

---

## QUALITY GATES

| Fase | Gate | Critério |
|------|------|----------|
| 0 | Infra Ready | `npm run dev` funciona, Vercel deploy preview OK |
| 1 | Design Approved | DESIGN_SYSTEM.md aprovado pelo Douglas |
| 2 | DB Ready | 9 tabelas criadas, RLS ativo, seed carregado |
| 3 | APIs Ready | Auth + Search + Apify + Gemini funcionais |
| 4 | UI Ready | Dashboard completo, mobile responsive |
| 5 | Intelligence Ready | Tracking + Analytics + Sazonalidade |
| 6 | LAUNCH | E2E OK, Lighthouse >85, 24h sem erros |

---

## PRÓXIMO PASSO

@sm (River) deve criar as stories detalhadas para cada fase, referenciando este Epic e os wireframes do DESIGN_SYSTEM.md.

---

— Morgan, planejando o futuro
