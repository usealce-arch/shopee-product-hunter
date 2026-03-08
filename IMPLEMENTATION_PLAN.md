# SHOPEE PRODUCT HUNTER — IMPLEMENTATION PLAN

**Timeline:** 6 semanas
**Total Effort:** ~280 horas
**Status:** 🎯 Pronto para desenvolvimento

---

## SEMANA 1: DATABASE & ANALYTICS FOUNDATION (40h)

### 1.1 Setup Supabase (1 dia)
- [ ] Criar tabelas conforme DATABASE_SCHEMA.md
- [ ] Executar migrations SQL
- [ ] Verificar RLS policies
- [ ] Testar conexão
- [ ] Confirmar índices criados

### 1.2 Environment Setup (1 dia)
- [ ] Criar `.env.local` a partir de `.env.example`
- [ ] Preencher Supabase tokens
- [ ] Preencher Apify API key
- [ ] Preencher Gemini API key
- [ ] Testar conexão com BD

### 1.3 Historical Data Setup (3 dias)
- [ ] Criar script: `scripts/seed-historical-data.ts`
  - Simula 30 dias de dados históricos
  - Popula `products_history`
  - Popula `competitor_tracking`
- [ ] Executar script
- [ ] Verificar dados no BD

**Success Criteria:** BD com 9 tabelas criadas, histórico base carregado

---

## SEMANA 2: BACKEND API FOUNDATION (50h)

### 2.1 Supabase Auth Integration (2 dias)
- [ ] Create `lib/db.ts` (Supabase client)
- [ ] Create `lib/auth.ts` (JWT helpers + middleware)
- [ ] Implement `/api/auth/signup`
- [ ] Implement `/api/auth/login`
- [ ] Implement `/api/auth/logout`
- [ ] Test com Postman

### 2.2 User Management API (1 dia)
- [ ] Implement `GET /api/user/profile`
- [ ] Implement `POST /api/user/affiliate-id`
- [ ] Add JWT middleware
- [ ] Add Zod validation

### 2.3 Products Current API (2 dias)
- [ ] Implement `GET /api/products/current`
  - Lista produtos com scores atuais
  - Ordenável por opportunity_score, trend_score, etc
  - Paginação
- [ ] Implement `GET /api/products/current/:id`
  - Detalhes profundos de um produto

**Success Criteria:** APIs básicas funcionando, auth testada

---

## SEMANA 3: APIFY + GEMINI INTEGRATION (60h)

### 3.1 Apify Advanced Integration (2 dias)
- [ ] Create `lib/apify.ts`
- [ ] Implement `initializeScraping(category, maxPrice)`
- [ ] Implement `checkScrapingStatus(jobId)`
- [ ] Implement `processScrapingResults(data)` - limpar dados
- [ ] Implement histórico tracking:
  - Salvar snapshot em `products_history`
  - Salvar competição em `competitor_tracking`
  - Detectar tendências (up/stable/down)

### 3.2 Gemini Deep Analysis (2 dias)
- [ ] Create `lib/gemini.ts`
- [ ] Implement `analyzeProductDeep(product)`
  - Rentabilidade
  - Tendência
  - Competição
  - Recomendação de ad spend
  - ROI estimado
- [ ] Implement scoring algorithm:
  ```
  Score = (rentability × 0.35)
        + (trend × 0.25)
        + (competition × 0.20)
        + (seasonality × 0.10)
        + (history × 0.10)
  ```
- [ ] Salvar estimates em `roi_estimates`

### 3.3 Search Orchestration (1 dia)
- [ ] Implement `POST /api/products/search`
- [ ] Implement `GET /api/products/search/:id` (polling)

**Success Criteria:** Gemini scoring e ROI estimates funcionando

---

## SEMANA 4: FRONTEND ANALYTICS DASHBOARD (50h)

### 4.1 Auth Pages (1 dia)
- [ ] Update `/login/page.tsx`
- [ ] Update `/signup/page.tsx`

### 4.2 Dashboard Redesign (2 dias)
- [ ] Update `/dashboard/page.tsx`
  - Search form (categoria, preço, min ROI)
  - Proteção de rota (JWT)
  - Polling logic
  - Loading states

### 4.3 Results & Analytics Components (2 dias)
- [ ] Create `components/OpportunityTable.tsx`
- [ ] Create `components/ProductDetailModal.tsx`
- [ ] Create `components/ROICalculator.tsx`

**Success Criteria:** Dashboard bonito e funcional

---

## SEMANA 5: INTELLIGENCE & TRACKING (40h)

### 5.1 Seasonal Pattern Detection (2 dias)
- [ ] Create `lib/seasonality.ts`
- [ ] Analyze `products_history` por mês
- [ ] Implementar `GET /api/analysis/seasonal/:productId`

### 5.2 ROI Tracking System (2 dias)
- [ ] Implement `POST /api/roi/actual`
- [ ] Background job para refine model
- [ ] Comparar previsão vs realidade

### 5.3 Analytics Pages (1 dia)
- [ ] Create `/analytics/page.tsx`
  - Meus históricos
  - ROI real vs previsto
  - Tendências
  - Performance gráficos

**Success Criteria:** Tracking de ROI real funcionando

---

## SEMANA 6: QA & DEPLOYMENT (40h)

### 6.1 Testing & Polish (3 dias)
- [ ] End-to-end testing
  - Signup → Login → Search → Results → ROI calc
  - Mobile responsivo
  - Error scenarios (Apify fail, Gemini timeout)
- [ ] Performance optimization
  - Lighthouse > 85
  - Bundle size < 150KB
  - First contentful paint < 2s
- [ ] Security review
  - CORS config
  - Input sanitization
  - JWT expiration handling
  - RLS policies

### 6.2 Deployment (2 dias)
- [ ] Test deployment to Vercel
- [ ] Configure env vars on Vercel
- [ ] Run full smoke tests on production
- [ ] Monitor for errors (24h)

### 6.3 Launch & Monitoring (2 dias)
- [ ] Share URL com early users
- [ ] Setup Sentry error tracking
- [ ] Monitor analytics
- [ ] Collect feedback

**Success Criteria:** Deployado e testado em produção

---

## EFFORT SUMMARY

| Semana | Foco | Horas | Status |
|--------|------|-------|--------|
| 1 | DB + Setup | 40h | ⏳ |
| 2 | Backend Foundation | 50h | ⏳ |
| 3 | AI Integration | 60h | ⏳ |
| 4 | Frontend | 50h | ⏳ |
| 5 | Intelligence | 40h | ⏳ |
| 6 | QA + Deploy | 40h | ⏳ |
| **Total** | **MVP Robusto** | **~280h** | **Ready** |

---

## PRÉ-REQUISITOS

**Antes de começar:**
- [ ] Todos os tokens configurados
- [ ] `.env.local` preenchido
- [ ] npm dependencies instaladas
- [ ] Vercel account configurada
- [ ] GitHub remote conectado

---

## WEEKLY CHECKLIST

### Week 1 Success
- ✅ BD com todas as 9 tabelas criadas
- ✅ Índices em place
- ✅ RLS policies ativas
- ✅ Histórico 30-dias seed completo

### Week 2 Success
- ✅ Auth (signup/login/logout) funcional
- ✅ User profile API testada
- ✅ Products current API com paginação

### Week 3 Success
- ✅ Apify scraping funcional
- ✅ Gemini scoring funcionando
- ✅ ROI estimates salvos em BD

### Week 4 Success
- ✅ Dashboard funcional
- ✅ Search → Results → Detail flow completo
- ✅ ROI Calculator interativo

### Week 5 Success
- ✅ Seasonal patterns detectados
- ✅ ROI actual tracking funcionando
- ✅ Analytics page mostrando tendências

### Week 6 Success
- ✅ Testes E2E passando
- ✅ Performance >85 Lighthouse
- ✅ Deployado em produção
- ✅ Monitoramento ativo (Sentry)

---

## TASKS DELEGATION

### @dev (Dex)
- Week 2-3: Auth + APIs
- Week 3-4: Apify + Gemini + Frontend
- Week 5: Seasonal + Analytics

### @qa (Quinn)
- Week 6: Testing + Security review + Performance audit

### @devops (Gage)
- Week 1: Vercel setup
- Week 6: Deployment + Monitoring

---

**Next:** @sm cria histórias semanais a partir deste plano.

— Aria, arquitetando o futuro 🏗️
