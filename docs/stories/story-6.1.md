# Story 6.1 — QA: Testing & Security Review

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 6 — QA & Deployment
**Responsavel:** @qa (Quinn)
**Status:** Draft
**Prioridade:** CRITICAL
**Estimativa:** 24h (3 dias)
**Dependencia:** Stories 4.1-5.3 (todo o frontend e backend)

---

## Story

**Como** time de qualidade,
**Eu quero** testar o fluxo completo e auditar seguranca,
**Para que** o app esteja pronto e seguro para publicacao.

---

## Dev Notes

### E2E Flow completo
```
Signup → Login → Dashboard → Search → Results → Product Detail → ROI Calculator → Analytics → Logout
```

### Testes de Seguranca
1. CORS: apenas origens permitidas
2. JWT: tokens expiram, refresh funciona
3. RLS: usuario A nao ve dados do usuario B
4. XSS: inputs sanitizados (sem script injection)
5. SQL Injection: parametros escapados (Supabase faz isso)
6. Rate limiting: max buscas por dia respeitado
7. Secrets: nenhum token exposto no frontend
8. HTTPS: todas as requests sobre TLS

### Performance Targets
- Lighthouse: >85 (Performance, Accessibility, Best Practices, SEO)
- FCP (First Contentful Paint): <2s
- Bundle size: <150KB (first load JS)
- TTI (Time to Interactive): <3s

### Viewports para teste mobile
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad)
- 1024px (Desktop small)
- 1440px (Desktop)

---

## Tasks

- [ ] **T1:** E2E Test — Fluxo completo
  - Signup com email novo
  - Login com credenciais criadas
  - Dashboard renderiza corretamente
  - Busca por categoria (eletronicos)
  - Resultados aparecem na tabela
  - Clicar em produto → Detail Modal abre
  - Score breakdown visivel
  - Grafico de historico renderiza
  - Abrir ROI Calculator → 3 cenarios
  - Navegar para Analytics
  - Graficos renderizam
  - Logout funcional
- [ ] **T2:** Security Audit — CORS
  - Verificar next.config.js headers
  - Testar request de origem nao permitida
- [ ] **T3:** Security Audit — JWT
  - Verificar expiracao do token
  - Testar acesso com token expirado
  - Testar acesso sem token
- [ ] **T4:** Security Audit — RLS
  - Criar 2 usuarios
  - Verificar que usuario A nao ve buscas/dados do usuario B
  - Testar direct query no Supabase
- [ ] **T5:** Security Audit — Input Sanitization
  - Testar XSS em campos de busca
  - Testar script injection no affiliate ID
  - Verificar que outputs sao escapados
- [ ] **T6:** Security Audit — Secrets
  - Verificar que nenhum token aparece no bundle JS
  - Verificar que .env.local esta no .gitignore
  - Verificar que SUPABASE_SERVICE_ROLE_KEY nao esta no client
- [ ] **T7:** Performance — Lighthouse
  - Rodar Lighthouse em /login, /dashboard, /analytics
  - Target: >85 em todas as categorias
  - Documentar scores
- [ ] **T8:** Performance — Bundle Size
  - Verificar bundle com `npm run build`
  - First load JS < 150KB
  - Identificar e resolver imports desnecessarios
- [ ] **T9:** Mobile Testing
  - Testar em 375px, 390px, 768px, 1024px
  - Verificar sem scroll horizontal
  - Verificar touch targets >= 44px
  - Verificar Sheet sidebar no mobile
  - Verificar cards no lugar de tabela no mobile
- [ ] **T10:** Error Scenarios
  - Simular Apify timeout → error toast exibido
  - Simular Gemini falha → fallback funciona
  - Simular rede offline → mensagem de erro
  - Verificar retry logic

---

## Acceptance Criteria

- [ ] E2E flow completo passando sem erros
- [ ] Sem vulnerabilidades de seguranca (CORS, JWT, XSS, RLS)
- [ ] Nenhum secret exposto no bundle JS
- [ ] Lighthouse score >85 em todas as categorias
- [ ] FCP <2s em todas as paginas
- [ ] Bundle size <150KB first load
- [ ] Mobile funcional em 375px, 768px, 1024px
- [ ] Error scenarios tratados com mensagens amigaveis

---

## File List

| Arquivo | Acao |
|---------|------|
| `docs/qa/qa-report-6.1.md` | Criado — relatorio QA |

---

## Testing

_Esta story E o teste_

---

## QA Results

_Preencher durante execucao_

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
