# STORIES INDEX — Shopee Product Hunter

**Epic:** SPH-EPIC-001
**Total:** 17 stories
**Criado por:** @sm (River)
**Data:** 07/03/2026

---

## Fase 0 — Infra Setup (1 dia)

| Story | Titulo | Responsavel | Status |
|-------|--------|-------------|--------|
| [0.1](story-0.1.md) | Setup de Infraestrutura e Ambiente | @devops | Draft |

## Fase 1 — UX Design (CONCLUIDA)

Design aprovado pelo Douglas. Ver DESIGN_SYSTEM.md.

## Fase 2 — Database Foundation (1 semana)

| Story | Titulo | Responsavel | Status |
|-------|--------|-------------|--------|
| [2.1](story-2.1.md) | Setup do Banco de Dados Supabase | @dev + @devops | Draft |
| [2.2](story-2.2.md) | Seed de Dados Historicos | @dev | Draft |

## Fase 3 — Backend APIs (2 semanas)

| Story | Titulo | Responsavel | Status |
|-------|--------|-------------|--------|
| [3.1](story-3.1.md) | Auth System (Supabase Auth) | @dev | Draft |
| [3.2](story-3.2.md) | User Management API | @dev | Draft |
| [3.3](story-3.3.md) | Apify Integration (Scraping) | @dev | Draft |
| [3.4](story-3.4.md) | Gemini Deep Analysis | @dev | Draft |
| [3.5](story-3.5.md) | Search Orchestration API | @dev | Draft |

## Fase 4 — Frontend Dashboard (1 semana)

| Story | Titulo | Responsavel | Status |
|-------|--------|-------------|--------|
| [4.1](story-4.1.md) | Auth Pages (Login + Signup) | @dev | Draft |
| [4.2](story-4.2.md) | App Shell (Sidebar + Layout) | @dev | Draft |
| [4.3](story-4.3.md) | Dashboard de Oportunidades | @dev | Draft |
| [4.4](story-4.4.md) | Product Detail Panel | @dev | Draft |
| [4.5](story-4.5.md) | ROI Calculator | @dev | Draft |
| [4.6](story-4.6.md) | Mobile Responsive | @dev | Draft |

## Fase 5 — Intelligence & Tracking (1 semana)

| Story | Titulo | Responsavel | Status |
|-------|--------|-------------|--------|
| [5.1](story-5.1.md) | Seasonal Pattern Detection | @dev | Draft |
| [5.2](story-5.2.md) | ROI Tracking System | @dev | Draft |
| [5.3](story-5.3.md) | Analytics Page | @dev | Draft |

## Fase 6 — QA & Deployment (1 semana)

| Story | Titulo | Responsavel | Status |
|-------|--------|-------------|--------|
| [6.1](story-6.1.md) | QA: Testing & Security Review | @qa | Draft |
| [6.2](story-6.2.md) | Deploy & Launch | @devops | Draft |

---

## Ordem de Execucao

```
0.1 → 2.1 → 2.2 → 3.1 → 3.2 → 3.3 → 3.4 → 3.5 → 4.1 → 4.2 → 4.3 → 4.4 → 4.5 → 4.6 → 5.1 → 5.2 → 5.3 → 6.1 → 6.2 → LAUNCH
```

## Paralelismo possivel

```
3.1 + 3.3 podem rodar em paralelo (auth e apify sao independentes)
4.1 + 4.2 podem rodar em paralelo (auth pages e shell sao independentes)
5.1 + 5.2 podem rodar em paralelo (sazonalidade e tracking sao independentes)
```
