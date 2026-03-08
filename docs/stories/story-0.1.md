# Story 0.1 — Setup de Infraestrutura e Ambiente

**Epic:** SPH-EPIC-001 — Shopee Product Hunter MVP
**Fase:** 0 — Infra Setup
**Responsavel:** @devops (Gage)
**Status:** Draft
**Prioridade:** CRITICAL
**Estimativa:** 8h (1 dia)

---

## Story

**Como** desenvolvedor do time,
**Eu quero** ter o projeto Next.js configurado com Shadcn/ui, Tailwind, Vercel e todas as env vars,
**Para que** o desenvolvimento possa comecar imediatamente com o design system aplicado.

---

## Dev Notes

### Stack
- Next.js 14 + TypeScript + App Router
- Tailwind CSS + Shadcn/ui (Radix primitives)
- Fontes: Inter (body) + JetBrains Mono (dados/scores)
- Dark theme padrao com cores Shopee (#EE4D2D)
- Deploy: Vercel

### Referencia Design
- DESIGN_SYSTEM.md secao 14 — Shadcn/ui Setup + Tailwind Config
- DESIGN_SYSTEM.md secao 14 — CSS Variables (globals.css)
- DESIGN_SYSTEM.md secao 2 — Paleta de Cores

### Tokens Disponiveis
- Supabase URL: `https://ddotdwcmpbhlkmhrrlxf.supabase.co`
- Supabase Anon Key: configurado
- Supabase Service Key: configurado
- Apify API: configurado
- Gemini API: pendente

---

## Tasks

- [ ] **T1:** Criar projeto Next.js 14 com TypeScript e App Router
  - `npx create-next-app@14 shopee-product-hunter --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- [ ] **T2:** Inicializar Shadcn/ui
  - `npx shadcn-ui@latest init` (style: default, base color: slate, CSS variables: yes)
- [ ] **T3:** Instalar todos os componentes Shadcn necessarios
  - button, input, badge, card, dialog, dropdown-menu, select, table, tabs, toast, tooltip, skeleton, progress, separator, avatar, sheet
- [ ] **T4:** Configurar fontes Inter + JetBrains Mono
  - Usar next/font/google para ambas
  - Aplicar no layout.tsx raiz
- [ ] **T5:** Configurar tailwind.config.ts com tema Shopee
  - Cores primary (Shopee #EE4D2D escala completa)
  - Cores score (green, yellow, red)
  - Font families (Inter, JetBrains Mono)
  - Copiar config exata de DESIGN_SYSTEM.md secao 14
- [ ] **T6:** Configurar globals.css com CSS variables dark theme
  - Copiar variaveis de DESIGN_SYSTEM.md secao 14 (CSS Variables)
  - --primary: 14 86% 55% (Shopee orange)
  - --background: 222.2 84% 4.9% (slate-950)
- [ ] **T7:** Criar `.env.local` com todos os tokens
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY
  - APIFY_API_KEY
  - GEMINI_API_KEY (placeholder)
  - NEXT_PUBLIC_APP_URL=http://localhost:3000
- [ ] **T8:** Criar repositorio GitHub e conectar ao Vercel
  - `git init && git remote add origin ...`
  - Importar projeto no Vercel
  - Configurar env vars no Vercel dashboard
- [ ] **T9:** Verificar deploy preview funcional
  - Push inicial
  - Confirmar que Vercel faz build sem erros
  - Confirmar que pagina default renderiza com dark theme

---

## Acceptance Criteria

- [ ] `npm run dev` roda sem erros no localhost:3000
- [ ] Shadcn/ui instalado — todos os 16 componentes disponiveis em `components/ui/`
- [ ] Tema dark com cores Shopee (#EE4D2D) configurado no tailwind.config.ts
- [ ] Fontes Inter e JetBrains Mono carregando corretamente
- [ ] Deploy preview funcional no Vercel (URL acessivel)
- [ ] Todas as env vars configuradas no Vercel
- [ ] `.env.local` criado com todos os tokens

---

## File List

| Arquivo | Acao |
|---------|------|
| `tailwind.config.ts` | Criado — tema Shopee |
| `app/globals.css` | Modificado — CSS variables dark theme |
| `app/layout.tsx` | Modificado — fontes Inter + JetBrains Mono |
| `.env.local` | Criado — tokens |
| `.env.example` | Criado — template |
| `components.json` | Criado — config Shadcn |
| `components/ui/*` | Criado — 16 componentes Shadcn |

---

## Testing

- [ ] `npm run build` sem erros
- [ ] `npm run lint` sem warnings
- [ ] Pagina renderiza com background slate-950 (dark theme)
- [ ] Botao de teste renderiza com cor #EE4D2D

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
