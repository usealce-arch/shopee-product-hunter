# Story 4.2 — App Shell (Sidebar + Layout)

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 4 — Frontend Dashboard
**Responsavel:** @dev (Dex)
**Status:** Draft
**Prioridade:** HIGH
**Estimativa:** 8h (1 dia)
**Dependencia:** Story 4.1 (Auth Pages)

---

## Story

**Como** usuario logado,
**Eu quero** ter uma navegacao lateral com sidebar,
**Para que** eu acesse Dashboard, Analytics e Settings facilmente.

---

## Dev Notes

### Referencia Design
- DESIGN_SYSTEM.md secao 8.1 — Sidebar Navigation wireframe
- DESIGN_SYSTEM.md secao 9.1 — Layout Base (App Shell) wireframe
- DESIGN_SYSTEM.md secao 11 — Mobile Responsive (bottom nav)

### Layout Desktop
- Sidebar: 240px, bg-slate-900, border-r slate-700
- Content: flex-1, bg-slate-950, overflow-y-auto
- Header: page title + actions

### Layout Mobile (< 768px)
- Top bar: hamburger + logo + avatar
- Content: full width
- Sidebar: Shadcn Sheet (slide from left)

### Nav Items
1. Dashboard (LayoutDashboard icon) — `/dashboard`
2. Analytics (TrendingUp icon) — `/analytics`
3. Settings (Settings icon) — `/settings`

### Componentes Shadcn
- Sheet (mobile sidebar), Avatar, Separator, Tooltip

### Icones (Lucide React)
- LayoutDashboard, TrendingUp, Settings, LogOut, Menu

---

## Tasks

- [ ] **T1:** Criar `components/Sidebar.tsx`
  - Logo no topo (componente Logo da Story 4.1)
  - 3 nav items com icones Lucide
  - Active state: bg-slate-800, border-l-2 border-primary-500, text-primary-400
  - Inactive: text-slate-400, hover:text-slate-200
  - Separator antes da secao de usuario
  - Avatar com iniciais do usuario
  - Botao "Sair" (LogOut icon)
- [ ] **T2:** Criar `app/(dashboard)/layout.tsx`
  - Flex row: Sidebar (240px) + Content area (flex-1)
  - Sidebar fixa no desktop
  - Content com padding e max-width
  - Verificar autenticacao — redirect /login se nao logado
- [ ] **T3:** Implementar mobile sidebar com Sheet
  - Breakpoint: < 768px (md)
  - Top bar com hamburger (Menu icon) + Logo + Avatar
  - Sheet abre da esquerda com mesmos nav items
  - Fecha ao clicar em nav item
- [ ] **T4:** Criar componente PageHeader reutilizavel
  - `components/PageHeader.tsx`
  - Title (H1) + optional actions (botoes)
  - Usado em todas as paginas do dashboard

---

## Acceptance Criteria

- [ ] Sidebar funcional com 3 links de navegacao (Dashboard, Analytics, Settings)
- [ ] Active state visual no link da pagina atual
- [ ] Avatar do usuario com iniciais (ex: "D" para Douglas)
- [ ] Botao Sair funcional (logout + redirect /login)
- [ ] Mobile: hamburger menu abre Sheet com sidebar
- [ ] Mobile: Sheet fecha ao navegar
- [ ] Layout responsivo: sidebar no desktop, Sheet no mobile

---

## File List

| Arquivo | Acao |
|---------|------|
| `components/Sidebar.tsx` | Criado |
| `components/PageHeader.tsx` | Criado |
| `app/(dashboard)/layout.tsx` | Criado |

---

## Testing

- [ ] Sidebar renderiza 3 nav items
- [ ] Active state muda ao navegar
- [ ] Logout redireciona para /login
- [ ] Sheet abre/fecha no mobile
- [ ] Layout responsivo testado em 375px e 1024px

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
