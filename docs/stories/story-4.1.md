# Story 4.1 — Auth Pages (Login + Signup)

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 4 — Frontend Dashboard
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** HIGH
**Estimativa:** 8h (1 dia)
**Dependencia:** Story 3.1 (Auth System) + Story 0.1 (Infra)

---

## Story

**Como** visitante do site,
**Eu quero** poder criar conta e fazer login,
**Para que** eu acesse o dashboard de oportunidades.

---

## Dev Notes

### Referencia Design
- DESIGN_SYSTEM.md secao 9.4 — Login Page wireframe
- DESIGN_SYSTEM.md secao 9.5 — Signup Page wireframe
- DESIGN_SYSTEM.md secao 6.1 — Button (primary = #EE4D2D)
- DESIGN_SYSTEM.md secao 6.2 — Input (dark theme)
- DESIGN_SYSTEM.md secao 2 — Dark Theme colors

### Layout
- Pagina centralizada com card de formulario
- Background: gradient slate-900 → slate-800
- Card: bg-slate-800, rounded-xl, shadow
- Logo: icone laranja Shopee + texto "Shopee Product Hunter"
- Subtitle: "Encontre oportunidades reais" (login) / "Comece a encontrar lucro real" (signup)

### Componentes Shadcn
- Card, Input, Button, Toast (errors)

---

## Tasks

- [ ] **T1:** Criar `/app/(auth)/login/page.tsx`
  - Layout centralizado (flex center, min-h-screen)
  - Background gradient slate-900 → slate-800
  - Card com logo + subtitle + formulario
  - Campos: Email (Input), Senha (Input type=password)
  - Botao "Entrar" (Button primary, cor Shopee #EE4D2D)
  - Link "Nao tem conta? Criar conta gratis →"
  - Integrar com lib/auth.ts signIn()
  - Redirect para /dashboard apos login
  - Toast de erro se credenciais invalidas
- [ ] **T2:** Criar `/app/(auth)/signup/page.tsx`
  - Mesmo layout do login
  - Campos: Email, Senha, Confirmar Senha, Shopee Affiliate ID (opcional)
  - Botao "Criar Conta" (Button primary)
  - Link "Ja tem conta? Fazer login →"
  - Integrar com lib/auth.ts signUp()
  - Validacao client-side com Zod
  - Toast de erro se email duplicado
- [ ] **T3:** Criar componente Logo reutilizavel
  - `components/Logo.tsx`
  - Icone laranja (Shopee color) + texto
  - Tamanhos: sm, md, lg
- [ ] **T4:** Configurar redirect automatico
  - Se usuario ja logado e acessa /login → redirect /dashboard
  - Se usuario nao logado e acessa /dashboard → redirect /login

---

## Acceptance Criteria

- [ ] Login funcional com email/senha — redireciona para /dashboard
- [ ] Signup funcional — cria conta e redireciona para /dashboard
- [ ] Visual conforme DESIGN_SYSTEM.md secao 9.4 e 9.5 (dark theme, cores Shopee)
- [ ] Botao primario com cor #EE4D2D
- [ ] Toast de erro para credenciais invalidas / email duplicado
- [ ] Redirect automatico funcional (logado → dashboard, nao logado → login)
- [ ] Validacao client-side (email valido, senha min 8 chars)

---

## File List

| Arquivo | Acao |
|---------|------|
| `app/(auth)/login/page.tsx` | Criado |
| `app/(auth)/signup/page.tsx` | Criado |
| `app/(auth)/layout.tsx` | Criado — layout auth |
| `components/Logo.tsx` | Criado |

---

## Testing

- [ ] Login com dados validos redireciona para dashboard
- [ ] Signup com dados validos cria conta
- [ ] Erro exibido para email duplicado
- [ ] Erro exibido para senha curta
- [ ] Dark theme aplicado corretamente
- [ ] Responsivo em mobile (375px)

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
