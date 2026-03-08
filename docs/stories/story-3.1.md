# Story 3.1 — Auth System (Supabase Auth)

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 3 — Backend APIs
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** HIGH
**Estimativa:** 16h (2 dias)
**Dependencia:** Story 2.1 (Setup BD)

---

## Story

**Como** usuario afiliado Shopee,
**Eu quero** poder criar conta e fazer login com email/senha,
**Para que** meus dados e buscas fiquem salvos e protegidos.

---

## Dev Notes

### Stack Auth
- Supabase Auth (nativo, JWT)
- `@supabase/auth-helpers-nextjs` para SSR
- Zod para validacao de inputs
- Middleware Next.js para protecao de rotas

### Endpoints
- `POST /api/auth/signup` — cria usuario no Supabase Auth + insere na tabela users
- `POST /api/auth/login` — autentica e retorna sessao JWT
- `POST /api/auth/logout` — invalida sessao

### Seguranca
- Passwords: minimo 8 chars (validacao Zod)
- Email: formato valido (validacao Zod)
- JWT: gerenciado pelo Supabase (nao precisa implementar)
- CORS: configurar em next.config.js

---

## Tasks

- [ ] **T1:** Instalar dependencias de auth
  - `npm install @supabase/auth-helpers-nextjs @supabase/supabase-js zod`
- [ ] **T2:** Criar `lib/auth.ts` — helpers de autenticacao
  - `signUp(email, password)` — cria usuario
  - `signIn(email, password)` — faz login
  - `signOut()` — faz logout
  - `getSession()` — retorna sessao atual
  - `getUser()` — retorna usuario autenticado
- [ ] **T3:** Criar `lib/validations.ts` — schemas Zod
  - `signUpSchema` — email (email valido), password (min 8), confirmPassword
  - `signInSchema` — email, password
  - `affiliateIdSchema` — affiliate_id (string, min 5)
- [ ] **T4:** Implementar `POST /api/auth/signup`
  - Validar input com Zod
  - Criar usuario no Supabase Auth
  - Inserir registro na tabela users (id, email)
  - Retornar sessao JWT
  - Error handling: email duplicado, senha fraca
- [ ] **T5:** Implementar `POST /api/auth/login`
  - Validar input com Zod
  - Autenticar via Supabase Auth
  - Retornar sessao JWT
  - Error handling: credenciais invalidas
- [ ] **T6:** Implementar `POST /api/auth/logout`
  - Invalidar sessao no Supabase
  - Limpar cookies
- [ ] **T7:** Criar middleware de protecao de rotas
  - `middleware.ts` na raiz do projeto
  - Rotas protegidas: `/dashboard/*`, `/analytics/*`, `/api/*` (exceto auth)
  - Rotas publicas: `/login`, `/signup`, `/`
  - Redirect para `/login` se nao autenticado

---

## Acceptance Criteria

- [ ] Signup cria usuario no Supabase Auth E insere na tabela users
- [ ] Login retorna sessao JWT valida
- [ ] Logout invalida sessao corretamente
- [ ] Middleware bloqueia acesso a rotas protegidas sem JWT
- [ ] Middleware redireciona para /login quando nao autenticado
- [ ] Validacao Zod rejeita inputs invalidos (email ruim, senha curta)
- [ ] Error handling retorna mensagens claras

---

## File List

| Arquivo | Acao |
|---------|------|
| `lib/auth.ts` | Criado — helpers auth |
| `lib/validations.ts` | Criado — schemas Zod |
| `app/api/auth/signup/route.ts` | Criado |
| `app/api/auth/login/route.ts` | Criado |
| `app/api/auth/logout/route.ts` | Criado |
| `middleware.ts` | Criado — protecao de rotas |

---

## Testing

- [ ] Signup com dados validos retorna 201
- [ ] Signup com email duplicado retorna 409
- [ ] Login com credenciais validas retorna 200 + JWT
- [ ] Login com credenciais invalidas retorna 401
- [ ] Logout retorna 200
- [ ] Rota protegida sem JWT retorna 401
- [ ] Middleware redireciona para /login

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
