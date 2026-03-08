# Story 3.2 — User Management API

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 3 — Backend APIs
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** MEDIUM
**Estimativa:** 8h (1 dia)
**Dependencia:** Story 3.1 (Auth System)

---

## Story

**Como** afiliado Shopee,
**Eu quero** poder salvar meu Affiliate ID e ver meu perfil,
**Para que** os links de afiliado sejam gerados com meu ID automaticamente.

---

## Dev Notes

### Endpoints
- `GET /api/user/profile` — retorna dados do usuario logado (email, affiliate_id, created_at)
- `POST /api/user/affiliate-id` — salva/atualiza Affiliate ID do Shopee

### Seguranca
- Todos os endpoints protegidos por JWT (middleware da Story 3.1)
- User so acessa seus proprios dados (RLS garante isso)

---

## Tasks

- [ ] **T1:** Implementar `GET /api/user/profile`
  - Obter user_id do JWT (via getUser())
  - Buscar dados na tabela users
  - Retornar: id, email, affiliate_id, created_at
  - 404 se usuario nao encontrado
- [ ] **T2:** Implementar `POST /api/user/affiliate-id`
  - Validar input com Zod (affiliate_id: string, min 5)
  - Obter user_id do JWT
  - Atualizar tabela users SET affiliate_id = input
  - Retornar usuario atualizado
  - Error handling: ID invalido
- [ ] **T3:** Criar tipo TypeScript para User
  - Interface User { id, email, affiliate_id, created_at, updated_at }
  - Exportar de `types/database.ts`

---

## Acceptance Criteria

- [ ] GET /api/user/profile retorna dados do usuario autenticado
- [ ] POST /api/user/affiliate-id salva o Affiliate ID corretamente
- [ ] Endpoints protegidos por JWT — retornam 401 sem token
- [ ] Validacao Zod rejeita affiliate_id invalido

---

## File List

| Arquivo | Acao |
|---------|------|
| `app/api/user/profile/route.ts` | Criado |
| `app/api/user/affiliate-id/route.ts` | Criado |
| `types/database.ts` | Modificado — tipo User |

---

## Testing

- [ ] Profile retorna dados corretos do usuario logado
- [ ] Profile sem JWT retorna 401
- [ ] Affiliate ID salvo e recuperavel via profile
- [ ] Affiliate ID invalido retorna 400

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
