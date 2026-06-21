# ForgeCV - Etapa 9

## 1. Objetivo

Esta etapa implementa o **Dashboard**, criando a base de análise de métricas do SaaS. 
Quando o usuário entra na plataforma, ele precisa ver rapidamente o quanto a ferramenta já o ajudou, observando os currículos gerados, as vagas avaliadas e o nível médio de compatibilidade.

## 2. Arquitetura

O módulo de Dashboard foi adicionado:

```txt
backend/src/modules/dashboard/
+-- application/
|   +-- dashboard.service.ts
+-- http/
|   +-- dashboard.controller.ts
|   +-- dashboard.routes.ts
```

Responsabilidades:
- `dashboard.service.ts`: Faz uma única requisição ao banco de dados com múltiplas operações otimizadas (`prisma.$transaction`) agregando:
  - Total de análises (`JobAnalysis`).
  - Total de currículos forjados (`ForgedResume`).
  - Compatibilidade média (`_avg.score` em `ForgedResume`).
  - Top 5 últimas forjas (`take: 5` em `ForgedResume` ordenado por data).
- `dashboard.controller.ts` e `dashboard.routes.ts`: Expõe o endpoint JSON com todos esses dados agregados.

## 3. Decisões Técnicas

### Alta Performance com Transaction
Utilizamos o `prisma.$transaction([])` passando as promises de contagem, agregação e listagem. O Prisma otimiza essas chamadas e as envia para o banco de dados de maneira mais performática do que aguardar com múltiplos `await` separados.

### Desacoplamento
Mesmo o Dashboard buscando dados de outras entidades (JobAnalysis, ForgedResume), não criamos acoplamento forte entre os controllers. Ele atua como um serviço analítico direto na camada de infraestrutura do Prisma.

## 4. Endpoints

Base URL: `/api/dashboard`

Todas as rotas exigem:
`Authorization: Bearer <accessToken>`

### Obter Métricas Principais

```http
GET /api/dashboard/metrics
```
Retorna (200): 
```json
{
  "totalAnalyses": 15,
  "totalForgedResumes": 10,
  "averageCompatibility": 78,
  "recentForges": [
    {
      "id": "cuid...",
      "title": "Currículo Forjado - Desenvolvedor Node",
      "score": 90,
      "createdAt": "2026-06-21T00:00:00.000Z",
      "jobAnalysis": {
        "company": "Google",
        "title": "Software Engineer"
      }
    }
  ]
}
```

## 5. Próxima Etapa

**Etapa 10: Deploy**
- Finalização e empacotamento da aplicação.
- Considerações de hospedagem, CI/CD, banco em produção e scripts de build finais.

A Etapa 10 aguarda confirmação para ser iniciada.
