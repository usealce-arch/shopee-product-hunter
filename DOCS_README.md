# 📚 SHOPEE PRODUCT HUNTER — DOCUMENTAÇÃO

Bem-vindo! Aqui estão todos os documentos técnicos organizados. Leia nesta ordem:

---

## 1️⃣ PRD.md
**Leia PRIMEIRO**

Documento de requisitos do produto:
- Executive Summary
- Problema & Oportunidade
- Solução completa
- 8 Features robustas
- Diferencial Competitivo
- Público-alvo
- Modelo de Negócio (SaaS)
- Timeline 6 semanas

**Tempo:** 15 min

---

## 2️⃣ ARCHITECTURE.md
**Leia SEGUNDO**

Decisões técnicas e design da solução:
- Visão geral do sistema
- Componentes técnicos (Frontend, Backend, Database)
- Fluxo end-to-end de dados
- Algoritmo de scoring multi-fatorial
- Tech stack completo
- Decisões arquiteturais (por quê PostgreSQL, Apify, Gemini)
- Segurança & Performance

**Tempo:** 10 min

**Não contém:** SQL, tarefas de implementação

---

## 3️⃣ DATABASE_SCHEMA.md
**Leia TERCEIRO**

Estrutura completa do banco de dados:
- 9 tabelas (SQL pronto pra copiar/colar)
- Índices de performance
- Row Level Security (RLS) policies
- Relacionamentos entre tabelas
- Script de migração completo (execute em Supabase)
- Diagrama de relacionamentos

**Tempo:** 10 min

**Conteúdo puro:** SQL, índices, RLS, sem implementação

---

## 4️⃣ IMPLEMENTATION_PLAN.md
**Leia QUARTO**

Plano de 6 semanas com tarefas e checklists:

**Timeline:**
- Semana 1 (40h): Database setup
- Semana 2 (50h): Backend APIs
- Semana 3 (60h): Apify + Gemini
- Semana 4 (50h): Frontend Dashboard
- Semana 5 (40h): Intelligence & Tracking
- Semana 6 (40h): QA & Deployment

**Por semana:**
- Tarefas específicas com checkboxes
- Estimates de esforço
- Success criteria
- Weekly validation checklists

**Tempo:** 10 min

**Não contém:** Decisões arquiteturais, SQL

---

## 5️⃣ .env.example
**Consulte quando configurar**

Template de variáveis de ambiente:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
APIFY_API_KEY=...
NEXT_PUBLIC_APP_URL=...
```

**Tempo:** 1 min

---

## 📖 QUICK START

### 1. Leitura (1 hora)
1. Ler PRD.md (visão do produto)
2. Ler ARCHITECTURE.md (como funciona)
3. Ler DATABASE_SCHEMA.md (estrutura BD)
4. Ler IMPLEMENTATION_PLAN.md (tarefas)

### 2. Setup Banco (1 dia)
- Copiar SQL de DATABASE_SCHEMA.md
- Executar em Supabase SQL Editor
- Verificar tabelas criadas

### 3. Environment (30 min)
- Copiar `.env.example` → `.env.local`
- Preencher tokens (Supabase, Apify, Gemini)
- Testar conexão

### 4. Development (6 semanas)
- Seguir IMPLEMENTATION_PLAN.md semana por semana
- Usar ARCHITECTURE.md como referência
- Consultar DATABASE_SCHEMA.md para queries

### 5. Deployment (2 dias)
- Week 6 do plano
- Deploy em Vercel
- Setup Sentry

---

## 🎯 GUIA POR ROLE

### Frontend Developer
1. Ler ARCHITECTURE.md (seção 2.1)
2. Ler IMPLEMENTATION_PLAN.md (Weeks 4-5)
3. Começar: `/dashboard/page.tsx` → componentes

### Backend Developer
1. Ler ARCHITECTURE.md (seção 2.2)
2. Ler DATABASE_SCHEMA.md (completo)
3. Ler IMPLEMENTATION_PLAN.md (Weeks 2-3)
4. Começar: `/api/auth/signup`

### DevOps / Infrastructure
1. Ler ARCHITECTURE.md (seção 5 - Tech Stack)
2. Ler IMPLEMENTATION_PLAN.md (Week 1, Week 6)
3. Consultar `.env.example` para config

### Product Manager
1. Ler PRD.md (completo)
2. Ler ARCHITECTURE.md (seção 1 - Overview)
3. Usar como referência para roadmap

---

## ❓ FAQ

**Q: Por onde começo?**
A: PRD.md → ARCHITECTURE.md → DATABASE_SCHEMA.md → IMPLEMENTATION_PLAN.md

**Q: Como executo o SQL?**
A: Copie o bloco de DATABASE_SCHEMA.md seção "COMPLETE MIGRATION SCRIPT" e execute em Supabase SQL Editor

**Q: Preciso de Gemini API key?**
A: Sim, adicionar em `.env.local` (placeholder vazio por enquanto)

**Q: Qual é o próximo passo após ler?**
A: Week 1 do IMPLEMENTATION_PLAN.md - database setup

---

## 📋 DOCUMENT MAP

```
PRD.md                 → O QUE fazer (requisitos do produto)
  ↓
ARCHITECTURE.md        → COMO fazer (design técnico)
  ↓
DATABASE_SCHEMA.md     → ONDE guardar (estrutura BD)
  ↓
IMPLEMENTATION_PLAN.md → QUANDO fazer (tarefas + timeline)
  ↓
.env.example           → CONFIG (variáveis de ambiente)
```

---

## 🔗 REFERÊNCIAS CRUZADAS

- PRD.md **seção 7** → Stack técnico
- ARCHITECTURE.md **seção 2.3** → Referencia DATABASE_SCHEMA.md
- DATABASE_SCHEMA.md **final** → Referencia IMPLEMENTATION_PLAN.md
- IMPLEMENTATION_PLAN.md **final** → Proximas fases

---

## ✅ DOCUMENT RESPONSIBILITIES

| Doc | Responsibility | Owner | Update Frequency |
|-----|---|---|---|
| PRD.md | Requisitos do produto | @pm | Ao finalizar features |
| ARCHITECTURE.md | Decisões técnicas + diagramas | @architect | Ao mudar design |
| DATABASE_SCHEMA.md | Estrutura SQL + RLS | @data-engineer | Ao adicionar tabelas |
| IMPLEMENTATION_PLAN.md | Tarefas + timeline | @pm + @dev | Semanalmente |
| .env.example | Template de config | @devops | Ao adicionar var |

---

**Hora de começar!** 🚀

Comece com PRD.md.

— Aria, arquitetando o futuro 🏗️
