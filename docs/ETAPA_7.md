# ForgeCV - Etapa 7

## 1. Objetivo

Esta etapa implementa a Geração do Currículo Personalizado (`ForgedResume`). 
Após a inteligência artificial concluir a análise da vaga (Etapa 6), o sistema utiliza os IDs das experiências, projetos e nomes das habilidades retornados pela IA para buscar os dados completos no currículo base do usuário e criar um *snapshot* imutável.

## 2. Arquitetura

O módulo de Currículos Forjados foi adicionado:

```txt
backend/src/modules/forged-resume/
+-- application/
|   +-- forged-resume.service.ts
+-- http/
|   +-- forged-resume.controller.ts
|   +-- forged-resume.routes.ts
```

Responsabilidades:
- `forged-resume.service.ts`: Serviço que converte a saída de IA (`JobAnalysis`) em um currículo físico armazenado. Ele faz um *select* no Prisma puxando o currículo base e extraindo apenas as experiências, habilidades e projetos que deram *match*. O resultado é injetado como JSON diretamente nas colunas `selectedExperiences`, `selectedProjects` e `selectedSkills` do `ForgedResume`.
- `forged-resume.controller.ts` e `forged-resume.routes.ts`: Endpoints protegidos para invocar a criação a partir de uma análise, bem como listar os currículos forjados, buscar um específico por ID e deletá-lo.

## 3. Decisões Técnicas

### Snapshots em JSON (Imutabilidade)
Ao invés de criar tabelas de relacionamento N:N entre `ForgedResume` e `WorkExperience` / `Project`, os dados são inseridos como JSON (`selectedExperiences`, `selectedProjects`).
*Por que?* Se o usuário alterar ou deletar uma experiência do seu currículo base daqui a 1 mês, os currículos que ele "forjou" no passado para vagas específicas não podem ser alterados ou quebrados. A forja cria uma cópia congelada no tempo daquele currículo.

### Status FORGED
O modelo `ForgedResume` nasce diretamente com o status `FORGED`. O `score` e o `optimizedSummary` (resumo focado na vaga gerado pela IA) também são trazidos do `JobAnalysis` para compor o objeto final.

## 4. Endpoints

Base URL: `/api/forged-resumes`

Todas as rotas exigem:
`Authorization: Bearer <accessToken>`

### Forjar Currículo a partir da Análise

```http
POST /api/forged-resumes/from-analysis/:analysisId
```
Retorna (201): O currículo forjado recém-criado.

### Listar Currículos Forjados do Usuário

```http
GET /api/forged-resumes
```
Retorna (200): Lista contendo informações básicas e o status, ideal para exibição em Dashboard.

### Consultar Detalhes do Currículo Forjado

```http
GET /api/forged-resumes/:id
```
Retorna (200): O objeto completo com todos os snapshots em JSON (experiências, habilidades, projetos, etc) e a análise relacionada (`jobAnalysis`).

### Excluir Currículo Forjado

```http
DELETE /api/forged-resumes/:id
```
Retorna: `204 No Content`

## 5. Próxima Etapa

**Etapa 8: Geração de PDF com Puppeteer**
- Renderização de uma View HTML profissional injetando o JSON do currículo forjado.
- Uso do Puppeteer para transformar o HTML em um PDF com design limpo e exportável.
- Upload/Download desse PDF gerado (opcional dependendo da estratégia de armazenamento).

A Etapa 8 aguarda confirmação para ser iniciada.
