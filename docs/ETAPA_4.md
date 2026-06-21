# ForgeCV - Etapa 4

## 1. Objetivo

Esta etapa implementa o CRUD completo do curriculo base.

Funcionalidades entregues:

- Consultar curriculo base completo.
- Editar dados principais do curriculo base.
- Editar perfil pessoal.
- Criar, editar e remover formacoes.
- Criar, editar e remover experiencias.
- Criar, editar e remover projetos.
- Criar, editar e remover habilidades.
- Criar, editar e remover certificacoes.
- Criar, editar e remover cursos.
- Criar, editar e remover idiomas.
- Criar, editar e remover links profissionais.

Upload e processamento do `cvbase.pdf` nao foram implementados nesta etapa. Isso entra na Etapa 5.

## 2. Arquitetura

Estrutura adicionada:

```txt
backend/src/modules/resume-base/
+-- application/
|   +-- resume-base.service.ts
|   +-- resume-base.validation.ts
+-- http/
    +-- resume-base.controller.ts
    +-- resume-base.routes.ts
```

Responsabilidades:

- `resume-base.validation.ts`: schemas Zod para validar entradas.
- `resume-base.service.ts`: casos de uso e acesso ao Prisma.
- `resume-base.controller.ts`: adaptador HTTP.
- `resume-base.routes.ts`: rotas Express protegidas por JWT.

## 3. Decisoes Tecnicas

### Rotas protegidas

Todas as rotas usam `authGuard`.

O usuario so acessa e altera dados ligados ao proprio `userId`.

### Base resume garantido

O cadastro ja cria `UserProfile` e `BaseResume`.

Mesmo assim, `GET /api/resume-base` usa `upsert` para garantir compatibilidade caso exista algum usuario antigo sem estrutura inicial.

### Arrays flexiveis

Campos como conquistas, tecnologias e destaques usam arrays no payload e sao salvos como JSON:

- `WorkExperience.achievements`
- `WorkExperience.technologies`
- `Project.technologies`
- `Project.highlights`

Isso encaixa melhor com curriculos reais, que costumam ter bullets e stacks variaveis.

### Datas

Datas sao opcionais e aceitam strings coerciveis para `Date`.

Exemplo:

```json
{
  "startDate": "2024-01-01",
  "endDate": "2024-12-01"
}
```

## 4. Endpoints

Base URL:

```txt
/api/resume-base
```

Todas as rotas exigem:

```http
Authorization: Bearer <accessToken>
```

### Consultar Curriculo Base

```http
GET /api/resume-base
```

Retorna:

```json
{
  "profile": {},
  "baseResume": {
    "education": [],
    "experiences": [],
    "projects": [],
    "skills": [],
    "certifications": [],
    "courses": [],
    "languages": [],
    "professionalLinks": []
  }
}
```

### Atualizar Dados Principais

```http
PATCH /api/resume-base
```

Body:

```json
{
  "title": "Curriculo base",
  "professionalSummary": "Resumo profissional usado como materia-prima da forja."
}
```

### Atualizar Perfil

```http
PATCH /api/resume-base/profile
```

Body:

```json
{
  "headline": "Desenvolvedor Full Stack",
  "phone": "+55 11 99999-9999",
  "city": "Sao Paulo",
  "state": "SP",
  "country": "Brasil",
  "summary": "Resumo pessoal e profissional."
}
```

### Formacao

```http
POST /api/resume-base/education
PUT /api/resume-base/education/:id
DELETE /api/resume-base/education/:id
```

Body:

```json
{
  "institution": "Universidade Exemplo",
  "degree": "Bacharelado",
  "fieldOfStudy": "Ciencia da Computacao",
  "startDate": "2022-01-01",
  "endDate": null,
  "isCurrent": true,
  "description": "Descricao opcional.",
  "order": 0
}
```

### Experiencias

```http
POST /api/resume-base/experiences
PUT /api/resume-base/experiences/:id
DELETE /api/resume-base/experiences/:id
```

Body:

```json
{
  "company": "Empresa Exemplo",
  "position": "Desenvolvedor Full Stack",
  "location": "Remoto",
  "startDate": "2024-01-01",
  "endDate": null,
  "isCurrent": true,
  "description": "Contexto da experiencia.",
  "achievements": ["Implementei uma API REST", "Melhorei performance de consultas"],
  "technologies": ["Node.js", "TypeScript", "MySQL"],
  "order": 0
}
```

### Projetos

```http
POST /api/resume-base/projects
PUT /api/resume-base/projects/:id
DELETE /api/resume-base/projects/:id
```

Body:

```json
{
  "name": "ForgeCV",
  "description": "SaaS de curriculos personalizados com IA.",
  "role": "Desenvolvedor Full Stack",
  "url": "https://example.com",
  "repositoryUrl": "https://github.com/user/repo",
  "technologies": ["Next.js", "Express", "Prisma"],
  "highlights": ["Autenticacao JWT", "Arquitetura modular"],
  "startDate": "2026-01-01",
  "endDate": null,
  "order": 0
}
```

### Habilidades

```http
POST /api/resume-base/skills
PUT /api/resume-base/skills/:id
DELETE /api/resume-base/skills/:id
```

Body:

```json
{
  "name": "TypeScript",
  "category": "Backend",
  "level": "ADVANCED",
  "yearsOfExperience": 2,
  "order": 0
}
```

### Certificacoes

```http
POST /api/resume-base/certifications
PUT /api/resume-base/certifications/:id
DELETE /api/resume-base/certifications/:id
```

Body:

```json
{
  "name": "Certificacao Exemplo",
  "issuer": "Instituicao",
  "credentialId": "ABC-123",
  "credentialUrl": "https://example.com/certificate",
  "issuedAt": "2025-01-01",
  "expiresAt": null,
  "doesNotExpire": true,
  "order": 0
}
```

### Cursos

```http
POST /api/resume-base/courses
PUT /api/resume-base/courses/:id
DELETE /api/resume-base/courses/:id
```

Body:

```json
{
  "name": "Curso de Node.js",
  "provider": "Plataforma Exemplo",
  "workloadHours": 40,
  "completedAt": "2025-01-01",
  "certificateUrl": "https://example.com/certificate",
  "order": 0
}
```

### Idiomas

```http
POST /api/resume-base/languages
PUT /api/resume-base/languages/:id
DELETE /api/resume-base/languages/:id
```

Body:

```json
{
  "name": "Ingles",
  "level": "INTERMEDIATE",
  "certification": null,
  "order": 0
}
```

### Links Profissionais

```http
POST /api/resume-base/links
PUT /api/resume-base/links/:id
DELETE /api/resume-base/links/:id
```

Body:

```json
{
  "type": "GITHUB",
  "label": "GitHub",
  "url": "https://github.com/usuario",
  "order": 0
}
```

## 5. Como Executar

Na raiz:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run backend:dev
```

O arquivo `backend/.env` precisa conter:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/forgecv"
JWT_SECRET="um-segredo-local-com-pelo-menos-32-caracteres"
```

## 6. Como Testar

Validacoes tecnicas:

```bash
npm run prisma:validate
npm run backend:typecheck
npm run backend:build
```

Fluxo manual:

1. Criar usuario com `POST /api/auth/register`.
2. Copiar `accessToken`.
3. Consultar `GET /api/resume-base`.
4. Preencher perfil com `PATCH /api/resume-base/profile`.
5. Cadastrar materiais do curriculo usando as rotas de cada secao.
6. Consultar novamente `GET /api/resume-base` e conferir a estrutura completa.

## 7. Observacao Sobre o PDF Base

O arquivo `cvbase.pdf` foi identificado na raiz do projeto.

Nesta etapa ele nao e processado, porque a ordem definida reserva upload e processamento de PDF para a Etapa 5. A modelagem atual ja permite cadastrar manualmente as informacoes desse curriculo real como materiais estruturados.

Se o PDF trouxer campos que nao encaixem bem nos endpoints atuais, a proxima alteracao natural sera ajustar o schema antes de implementar o parser.

## 8. Criterios de Aceite da Etapa 4

- CRUD do curriculo base implementado.
- Rotas protegidas por JWT.
- Usuario nao acessa itens de outro usuario.
- Dados estruturados para alimentar a IA nas etapas futuras.
- Nenhum upload/processamento de PDF implementado ainda.

## 9. Proxima Etapa

Etapa 5:

- Upload de PDF com Multer.
- Armazenamento do arquivo original.
- Extracao/processamento inicial do curriculo PDF.

A Etapa 5 so deve iniciar apos confirmacao explicita.
