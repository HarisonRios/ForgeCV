# ForgeCV - Etapa 6

## 1. Objetivo

Esta etapa implementa a integração do sistema com a inteligência artificial utilizando a API do Groq (conforme solicitado pelo usuário, substituindo o Gemini). 

O sistema envia as informações do currículo base do usuário juntamente com a descrição de uma vaga de emprego para a IA, que retorna uma análise estruturada contendo:
- Score de compatibilidade
- Resumo profissional otimizado (sem inventar dados)
- Seleção das melhores habilidades, experiências e projetos
- Palavras-chave encontradas e ausentes

## 2. Arquitetura

O módulo de IA foi adicionado:

```txt
backend/src/modules/ai/
+-- application/
|   +-- job-analysis.service.ts
+-- http/
|   +-- ai.controller.ts
|   +-- ai.routes.ts
+-- infra/
    +-- groq.service.ts
```

Responsabilidades:
- `groq.service.ts`: Abstração sobre o SDK oficial `@groq/groq-sdk`, encarregada de fazer a requisição garantindo um formato de resposta `json_object`. Utiliza o modelo `llama-3.3-70b-versatile` por padrão.
- `job-analysis.service.ts`: Orquestra o caso de uso principal. Busca os dados estruturados do usuário no banco (Prisma), gera o contexto em JSON para o Prompt, envia para a IA e armazena a resposta na tabela `JobAnalysis`.
- `ai.controller.ts` e `ai.routes.ts`: Exposição dos endpoints REST protegidos para invocar a análise e buscar os resultados.

## 3. Decisões Técnicas

### Prompt JSON Exato
A resposta da API é forçada a ser um JSON válido (`response_format: { type: "json_object" }`). O prompt de sistema especifica exatamente a estrutura e os campos requeridos, facilitando o parse no TypeScript e a exibição posterior no Frontend sem necessidade de tratamentos complexos de strings.

### Apenas Dados Estruturados
O sistema opta por enviar o JSON extraído do modelo `BaseResume` e suas relações, ao invés do texto bruto do PDF. Essa abordagem melhora muito a aderência do LLM e garante a consistência (ex: "não invente dados"), pois os dados foram previamente segmentados.

### Tabela JobAnalysis
O status da análise (`PENDING`, `COMPLETED`, `FAILED`) é armazenado na tabela `JobAnalysis`, permitindo futuras implementações de background jobs/filas se a requisição da IA demorar mais do que o tolerado pelo client HTTP, embora o Groq seja extremamente rápido (normalmente 1 a 3 segundos).

## 4. Endpoints

Base URL: `/api/ai`

Todas as rotas exigem:
`Authorization: Bearer <accessToken>`

### Iniciar Análise de Vaga

```http
POST /api/ai/analyze-job
```
Body:
```json
{
  "jobDescription": "Buscamos Desenvolvedor Node.js com experiência em TypeScript, Prisma e AWS...",
  "title": "Desenvolvedor Backend Pleno",
  "company": "Tech Corp"
}
```

Retorna (201): O objeto completo do `JobAnalysis` criado e atualizado com a IA.
```json
{
  "id": "cuid...",
  "status": "COMPLETED",
  "score": 85,
  "summary": "Desenvolvedor Backend com sólida base em Node.js e TypeScript...",
  "foundKeywords": ["Node.js", "TypeScript", "Prisma"],
  "missingKeywords": ["AWS"],
  "rawAiResponse": { ... },
  ...
}
```

### Consultar Análise

```http
GET /api/ai/analysis/:id
```
Retorna (200): O objeto salvo do `JobAnalysis`.

## 5. Próxima Etapa

**Etapa 7: Geração de currículo personalizado**
- Criação e versionamento dos currículos "forjados" baseados na análise da IA (`ForgedResume`).
- Visualização e CRUD dos currículos forjados.

A Etapa 7 só deve iniciar após confirmação explícita.
