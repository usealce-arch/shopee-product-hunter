# Story 6.2 — Deploy & Launch

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 6 — QA & Deployment
**Responsavel:** @devops (Gage)
**Status:** Draft
**Prioridade:** CRITICAL
**Estimativa:** 16h (2 dias)
**Dependencia:** Story 6.1 (QA aprovado)

---

## Story

**Como** dono do produto,
**Eu quero** o app publicado em producao no Vercel,
**Para que** afiliados Shopee possam comecar a usar o sistema.

---

## Dev Notes

### Deploy Target
- Vercel (producao)
- URL customizada (se disponivel) ou vercel.app
- Environment: production

### Tokens de Producao
- Vercel Token: configurado
- GitHub: configurado
- Supabase URL: https://ddotdwcmpbhlkmhrrlxf.supabase.co
- Supabase Anon Key: configurado
- Supabase Service Key: configurado
- Apify API: configurado
- Gemini API: configurar antes do deploy

### Monitoring
- Sentry: configurar error tracking
- `npm install @sentry/nextjs`
- Configurar DSN no .env

### Checklist pre-deploy
- [ ] QA aprovado (Story 6.1)
- [ ] Gemini API key configurada
- [ ] Todas as env vars no Vercel
- [ ] Build local sem erros
- [ ] Bundle size ok

---

## Tasks

- [ ] **T1:** Configurar Sentry
  - `npx @sentry/wizard@latest -i nextjs`
  - Configurar DSN no .env.local e Vercel
  - Configurar source maps
  - Testar captura de erro
- [ ] **T2:** Configurar environment variables no Vercel
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY
  - APIFY_API_KEY
  - GEMINI_API_KEY
  - SENTRY_DSN
  - NEXT_PUBLIC_APP_URL (URL de producao)
- [ ] **T3:** Deploy to Vercel production
  - Push branch main para GitHub
  - Verificar build no Vercel dashboard
  - Confirmar deploy successful
  - Anotar URL de producao
- [ ] **T4:** Smoke tests em producao
  - Acessar URL de producao
  - Signup com email teste
  - Login funcional
  - Dashboard renderiza
  - Busca funciona (Apify + Gemini)
  - Product Detail abre
  - ROI Calculator funcional
  - Analytics renderiza
  - Logout funcional
- [ ] **T5:** Performance em producao
  - Rodar Lighthouse na URL de producao
  - Verificar FCP <2s
  - Verificar que Sentry esta capturando
  - Verificar que nao ha erros no console
- [ ] **T6:** Monitoramento 24h
  - Verificar Sentry dashboard a cada 6h
  - Verificar que nao ha erros criticos
  - Verificar que API responses estao rapidas
  - Documentar qualquer issue encontrado
- [ ] **T7:** Documentar URL final
  - Atualizar WORKFLOW_EXECUTION.md com URL de producao
  - Atualizar README.md com link de acesso
  - Compartilhar URL com Douglas

---

## Acceptance Criteria

- [ ] App deployado e acessivel em producao (URL funcional)
- [ ] Sentry configurado e capturando erros
- [ ] Smoke tests passando em producao
- [ ] 24h sem erros criticos no Sentry
- [ ] Performance em producao conforme targets (Lighthouse >85, FCP <2s)
- [ ] URL final documentada e compartilhada

---

## File List

| Arquivo | Acao |
|---------|------|
| `sentry.client.config.ts` | Criado |
| `sentry.server.config.ts` | Criado |
| `next.config.js` | Modificado — Sentry plugin |
| `WORKFLOW_EXECUTION.md` | Modificado — URL producao |

---

## Testing

- [ ] Smoke tests em producao passam
- [ ] Sentry captura erro de teste
- [ ] Performance conforme targets
- [ ] 24h sem erros criticos

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
